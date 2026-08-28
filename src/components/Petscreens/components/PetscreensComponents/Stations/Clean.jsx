import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { petActivityTimeStampCleaningKey, petActivityOptionCursorKey, petActivityOptionImageKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { petScreensHelpersManageHealth, petScreensHelpersPauseAudio, petScreensHelpersQuitActivity, petScreensHelpersStartActivity } from "../../../helpers/Helpers.js";
import { helpersFlagCloser} from "../../../../../helpers/Helpers.js";

import Cleaning from "../../../../../Music/PetImmersionSounds/Cleaning.mp3";
import CleaningSymbol from "../../../../../images/CleaningSymbol.gif";

import "./Clean.css";



function Clean ({cleanAnimationImage, cleanOptionsList, cleanOptionsDesiredOption, setCleanOptionsDesiredOption, setCleanOpenFlag}){

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
    const [cleanHover, setCleanHover] = useState(false);

    const cleanTimeoutRef = useRef(null);
    const cleanAudioRef = useRef(new Audio(Cleaning));



    
    useKeyboardShortcut("Enter", () => {
    
        if (cleanDone){

            helpersFlagCloser(setCleanOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (cleanOptionsSelection !== -1 && !cleanStart && !cleanDone){

            petScreensHelpersStartActivity(setCleanStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!cleanDone){

            petScreensHelpersQuitActivity(cleanAudioRef, setCleanOpenFlag);

        }

    },
        ".Quit"
    );
            
    



    useEffect(() => {

        const cleanPreloadImages = [cleanAnimationImage, ...cleanOptionsList.map(item => item[petActivityOptionCursorKey])];

        cleanPreloadImages.forEach((src) => {
        const cleanImg = new Image();
            cleanImg.src = src;
        });

    }, [cleanAnimationImage]);


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

            petScreensHelpersPauseAudio(cleanAudioRef.current);
            setCleanDone(true);
            petScreensHelpersManageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampCleaningKey, cleanOptionsDesiredOption, setCleanOptionsDesiredOption, cleanOptionsSelection, setCleanSuccess);

        }
    }, [cleanCurrNumber]);
    


    const cleanScrub = () => {

        setCleanCurrNumber(prev => prev + 1);

        setCleanHover(true);

        // Cancels any existing timers:
        if (cleanTimeoutRef.current) {
            clearTimeout(cleanTimeoutRef.current);
        }

        // Starts a fresh 1s timer:
        cleanTimeoutRef.current = setTimeout(() => {
            setCleanHover(false);
            cleanTimeoutRef.current = null;
        }, 1000);

    };



    return (
        
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">
                
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

                        {cleanDone ? ( 

                            cleanSuccess ? (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenSuccess">
                                    <h2>Success!!!</h2>
                                </div>

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenFail">
                                    <h2>Something's off...</h2>
                                </div>

                            )

                        ) : (

                            <div 
                                className={`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Clean_ComponentContainer-Template--WindowScreen`} 
                                style={{
                                    cursor: cleanStart ?
                                                `url('${cleanOptionsList[cleanOptionsSelection][petActivityOptionCursorKey]}'), auto`
                                            :   "default",
                                }}>

                                {cleanStart ? (

                                    <>
                                    
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                            src = {cleanAnimationImage} 
                                            onMouseEnter={() => cleanScrub()}
                                        />

                                        {cleanHover && 
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                            src = {CleaningSymbol} 
                                            onMouseEnter={() => cleanScrub()}
                                        />}

                                    </>

                                ) : (

                                    <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                        <h2> Drag your cursor back and forth for cleaning. </h2>
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpersStartActivity(setCleanStart)}> Start <br/> [return]</button>
                                    </div>

                                )}

                            </div>

                        )}

                    </div>
                        
                </div>

            )}

            {cleanDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => helpersFlagCloser(setCleanOpenFlag)}>Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => petScreensHelpersQuitActivity(cleanAudioRef, setCleanOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Clean;