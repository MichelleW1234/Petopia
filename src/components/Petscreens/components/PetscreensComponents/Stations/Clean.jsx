import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { cleaningKey, moodPetImages, optionCursorKey, optionImageKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth, pauseAudio, quitActivity, startActivity } from "../../../helpers/Helpers.js";
import { flagCloser, playSound } from "../../../../../helpers/helpers.js";

import clean from "../../../../../Music/PetImmersionSounds/Clean.mp3";

import "./Clean.css";



function Clean ({cleanAnimationImages, cleanOptionsList, cleanOptionsDesiredOption, setCleanOptionsDesiredOption, setCleanOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [cleanStart, setCleanStart] = useState(false);
    const [cleanOptionsTotal, setCleanOptionsTotal] = useState(30);
    const [cleanOptionsSelection, setCleanOptionsSelection] = useState(-1);
    const [cleanCurrNumber, setCleanCurrNumber] = useState(0);
    const [cleanDone, setCleanDone] = useState(false);
    const [cleanSuccess, setCleanSuccess] = useState(false);
    const [cleanAnimationImage, setCleanAnimationImage] = useState(0);

    const cleanAnimationImageRef = useRef(cleanAnimationImage);

    const cleanAudioRef = useRef(new Audio(clean));



    
    useKeyboardShortcut("Enter", () => {
    
        if (cleanDone){

            flagCloser(setCleanOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (cleanOptionsSelection !== -1 && !cleanStart && !cleanDone){

            startActivity(setCleanStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!cleanDone){

            quitActivity(cleanAudioRef, setCleanOpenFlag);

        }

    },
        ".Quit"
    );
            
    



    useEffect(() => {

        const preloadImages = [...cleanAnimationImages, ...cleanOptionsList.map(item => item[optionImageKey]), ...cleanOptionsList.map(item => item[optionCursorKey])];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [cleanAnimationImages]);

    useEffect(() => {
        cleanAnimationImageRef.current = cleanAnimationImage;
    }, [cleanAnimationImage]);


    useEffect(() => {

        if (!cleanStart || cleanDone) {
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

    }, [cleanStart, cleanDone]);


    useEffect(() => {

        if (!cleanStart || cleanDone) {
            return;
        }

        cleanAudioRef.current.loop = true;
        cleanAudioRef.current.play();

        return () => {
            cleanAudioRef.current.pause();
            cleanAudioRef.current.currentTime = 0;
            cleanAudioRef.current.loop = false;
        };

    }, [cleanStart, cleanDone]);
    
    
    useEffect(() => {
        if (cleanCurrNumber >= cleanOptionsTotal){

            pauseAudio(cleanAudioRef.current);
            setCleanDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, cleaningKey, cleanOptionsDesiredOption, setCleanOptionsDesiredOption, cleanOptionsSelection, setCleanSuccess);

        }
    }, [cleanCurrNumber]);
    




    return (
        
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
                
            {cleanOptionsSelection === -1 ? (

                <Options
                    optionsDesiredOption = {cleanOptionsDesiredOption}
                    optionsList = {cleanOptionsList}
                    setOptionsTotal = {setCleanOptionsTotal}
                    setOptionsSelection = {setCleanOptionsSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanOptionsTotal) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        {!cleanDone ? ( 

                            <div 
                                className={`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Clean_ComponentContainer-Template--WindowScreen`} 
                                style={{
                                    cursor: cleanOptionsSelection !== -1 && cleanStart
                                        ? `url('${cleanOptionsList[cleanOptionsSelection][optionCursorKey]}'), auto`
                                        : "default",
                                }}>

                                {!cleanStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                    <p> Drag your cursor back and forth for cleaning! </p>
                                    <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setCleanStart)}> Start <br/> [return]</button>
                                </div>}

                                <img
                                    src = {cleanAnimationImages[cleanAnimationImage]} 
                                    onMouseEnter={() => setCleanCurrNumber(prev => prev + 1)}
                                />
                            </div>

                        ) : (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Clean_ComponentContainer-Template--WindowScreen">

                                <img src = {cleanSuccess ? 
                                            moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]
                                            : moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][1]
                                        }/>

                            </div>

                        )}
                            
                    </div>
                        
                </div>

            )}

            {!cleanDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quitActivity(cleanAudioRef, setCleanOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => flagCloser(setCleanOpenFlag)}>Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Clean;