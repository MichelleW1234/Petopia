import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { cleaningKey, moodPetImages, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth, pauseAudios, quit } from "../../../helpers/Helpers.js";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import "./Clean.css";
import { screenFlagCloser, playSound } from "../../../../../helpers/helpers.js";
import { starter } from "../../../helpers/Helpers.js";

import clean from "../../../../../Music/PetImmersionSounds/Clean.mp3";



function Clean ({cleanAnimationImages, cleanOptions, cleanDesiredOption, setCleanDesiredOption, setCleanOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [start, setStart] = useState(false);
    const [cleanTotal, setCleanTotal] = useState(30);
    const [cleanSelection, setCleanSelection] = useState(-1);
    const [cleanCurrNumber, setCleanCurrNumber] = useState(0);
    const [cleanDone, setCleanDone] = useState(false);
    const [cleanSuccess, setCleanSuccess] = useState(false);
    const [cleanAnimationImage, setCleanAnimationImage] = useState(0);

    const cleanAnimationImageRef = useRef(cleanAnimationImage);

    const cleanAudioRef = useRef([new Audio(clean)]);



    
    useKeyboardShortcut("Enter", () => {
    
        if (cleanSelection !== -1 && cleanDone){

            screenFlagCloser(setCleanOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (cleanSelection !== -1 && !cleanDone){

            starter(setStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (cleanSelection === -1 || !cleanDone){

            quit(cleanAudioRef, setCleanOpenFlag);

        }

    },
        ".Quit"
    );
            
    



    useEffect(() => {

        const preloadImages = [...cleanAnimationImages, ...cleanOptions.map(item => item[1])];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [cleanAnimationImages]);

    useEffect(() => {
        cleanAnimationImageRef.current = cleanAnimationImage;
    }, [cleanAnimationImage]);


    useEffect(() => {

        if (!start || cleanDone) {
            return;
        }

        const interval = setInterval(() => {

            if (cleanAnimationImageRef.current === 0) {
                setCleanAnimationImage(1);
            } else {
                setCleanAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [start, cleanDone]);


    useEffect(() => {

        if (!start || cleanDone) {
            return;
        }

        cleanAudioRef.current[0].loop = true;
        cleanAudioRef.current[0].play();

        return () => {
            cleanAudioRef.current[0].pause();
            cleanAudioRef.current[0].currentTime = 0;
            cleanAudioRef.current[0].loop = false;
        };

    }, [start, cleanDone]);
    
    
    useEffect(() => {
        if (cleanCurrNumber >= cleanTotal){

            pauseAudios(cleanAudioRef);
            setCleanDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, cleaningKey, cleanDesiredOption, setCleanDesiredOption, cleanSelection, setCleanSuccess);

        }
    }, [cleanCurrNumber]);
    



    const scrub = () => {

        setCleanCurrNumber(prev => prev + 1);

    }



    return (
        
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
                
            {cleanSelection === -1 ? (

                <Options
                    optionsDesiredOption = {cleanDesiredOption}
                    optionsList = {cleanOptions}
                    setOptionsTotal = {setCleanTotal}
                    setOptionsSelection = {setCleanSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanTotal) * 100)))}
                    />


                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        {!cleanDone ? ( 

                            <div 
                                className={`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen CleanWindow`} 
                                style={{
                                    cursor: cleanSelection !== -1 && start
                                        ? `url('${cleanOptions[cleanSelection][2]}'), auto`
                                        : "default",
                                }}>

                                {!start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                    <h2> Drag your cursor back and forth to clean! </h2>
                                    <button className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowButton Start" onClick = {() => starter(setStart)}>Start <br/> [return]</button>
                                </div>}

                                <img
                                    src = {cleanAnimationImages[cleanAnimationImage]} 
                                    onMouseEnter={() => scrub()}
                                />
                            </div>

                        ) : (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen CleanWindow">

                                {cleanSuccess ? (

                                    <img src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                                ) : (

                                    <img src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][1]} />

                                )}
                        
                            </div>

                        )}
                            
                    </div>
                        
                </div>

            )}

            {cleanSelection === -1 || !cleanDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quit(cleanAudioRef, setCleanOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => screenFlagCloser(setCleanOpenFlag)}>Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Clean;