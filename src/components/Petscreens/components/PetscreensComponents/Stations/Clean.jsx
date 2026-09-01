import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBarComponent from "./StationsComponents/ProgressBar.jsx";
import OptionsComponent from "./StationsComponents/Options.jsx";

import { petActivityTimeStampCleaningKey, petActivityOptionCursorKey, petActivityOptionImageKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_Manager_PetHealth, petScreensHelpers_Canceller_PetImmersionSounds, petScreensHelpers_Canceller_Activities, petScreensHelpers_Starter_Activities } from "../../../helpers/Helpers.js";
import { helpers_Closer_Flags} from "../../../../../helpers/Helpers.js";

import Cleaning from "../../../../../Music/PetImmersionSounds/Cleaning.mp3";
import CleaningSymbol from "../../../../../images/CleaningSymbol.gif";

import "./Clean.css";



function Clean ({clean_CurrStageAnimationImage, clean_OptionsCurrSpeciesList, clean_OptionsCurrDesiredOption, set_Clean_OptionsCurrDesiredOption, set_Clean_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [clean_Start, set_Clean_Start] = useState(false);
    const [clean_OptionsTotalNumber, set_Clean_OptionsTotalNumber] = useState(30);
    const [clean_OptionsUserSelection, set_Clean_OptionsUserSelection] = useState(-1);
    const [clean_CurrNumber, set_Clean_CurrNumber] = useState(0);
    const [clean_Done, set_Clean_Done] = useState(false);
    const [clean_Success, set_Clean_Success] = useState(false);
    const [clean_Hover, set_Clean_Hover] = useState(false);

    const clean_TimeoutRef = useRef(null);
    const clean_AudioRef = useRef(new Audio(Cleaning));



    
    useKeyboardShortcut("Enter", () => {
    
        if (clean_Done){

            helpers_Closer_Flags(set_Clean_OpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (clean_OptionsUserSelection !== -1 && !clean_Start && !clean_Done){

            petScreensHelpers_Starter_Activities(set_Clean_Start);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!clean_Done){

            petScreensHelpers_Canceller_Activities(clean_AudioRef, set_Clean_OpenFlag);

        }

    },
        ".Quit"
    );
            
    



    useEffect(() => {

        const clean_CurrPreloadImages = [clean_CurrStageAnimationImage, ...clean_OptionsCurrSpeciesList.map(item => item[petActivityOptionCursorKey])];

        clean_CurrPreloadImages.forEach((src) => {
        const clean_Img = new Image();
            clean_Img.src = src;
        });

    }, [clean_CurrStageAnimationImage]);


    useEffect(() => {

        if (!clean_Start || clean_Done) {
            return;
        }

        clean_AudioRef.current.loop = true;
        clean_AudioRef.current.play();

        return () => {
            clean_AudioRef.current.pause();
            clean_AudioRef.current.currentTime = 0;
            clean_AudioRef.current.loop = false;
        };

    }, [clean_Start, clean_Done]);
    
    
    useEffect(() => {
        if (clean_CurrNumber >= clean_OptionsTotalNumber){

            petScreensHelpers_Canceller_PetImmersionSounds(clean_AudioRef.current);
            set_Clean_Done(true);
            petScreensHelpers_Manager_PetHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampCleaningKey, clean_OptionsCurrDesiredOption, set_Clean_OptionsCurrDesiredOption, clean_OptionsUserSelection, set_Clean_Success);

        }
    }, [clean_CurrNumber]);
    


    const clean_SparkleTimer = () => {

        set_Clean_CurrNumber(prev => prev + 1);

        set_Clean_Hover(true);

        // Cancels any existing timers:
        if (clean_TimeoutRef.current) {
            clearTimeout(clean_TimeoutRef.current);
        }

        // Starts a fresh 1s timer:
        clean_TimeoutRef.current = setTimeout(() => {
            set_Clean_Hover(false);
            clean_TimeoutRef.current = null;
        }, 1000);

    };



    return (
        
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">
                
            {clean_OptionsUserSelection === -1 ? (

                <OptionsComponent
                    options_CurrDesiredOption = {clean_OptionsCurrDesiredOption}
                    options_CurrSpeciesList = {clean_OptionsCurrSpeciesList}
                    set_Options_TotalNumber = {set_Clean_OptionsTotalNumber}
                    set_Options_UserSelection = {set_Clean_OptionsUserSelection}
                />

            ) : (
                

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBarComponent
                        progressBar_CurrPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((clean_CurrNumber/clean_OptionsTotalNumber) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        {clean_Done ? ( 

                            clean_Success ? (

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
                                    cursor: clean_Start ?
                                                `url('${clean_OptionsCurrSpeciesList[clean_OptionsUserSelection][petActivityOptionCursorKey]}'), auto`
                                            :   "default",
                                }}>

                                {clean_Start ? (

                                    <>
                                    
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                            src = {clean_CurrStageAnimationImage} 
                                            onMouseEnter={() => clean_SparkleTimer()}
                                        />

                                        {clean_Hover && 
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                            src = {CleaningSymbol} 
                                            onMouseEnter={() => clean_SparkleTimer()}
                                        />}

                                    </>

                                ) : (

                                    <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                        <h2> Drag your cursor back and forth for cleaning. </h2>
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpers_Starter_Activities(set_Clean_Start)}> Start <br/> [return]</button>
                                    </div>

                                )}

                            </div>

                        )}

                    </div>
                        
                </div>

            )}

            {clean_Done ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => helpers_Closer_Flags(set_Clean_OpenFlag)}>Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => petScreensHelpers_Canceller_Activities(clean_AudioRef, set_Clean_OpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Clean;