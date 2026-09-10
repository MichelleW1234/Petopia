import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBarComponent from "./StationsComponents/ProgressBar.jsx";
import OptionsComponent from "./StationsComponents/Options.jsx";

import { petActivityTimeStampCleaningKey, petActivityOptionCursorKey, petActivityOptionImageKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_Manager_PetHealth, petScreensHelpers_Canceller_PetImmersionSounds, petScreensHelpers_Canceller_Activities, optionSelectionManager } from "../../../helpers/Helpers.js";
import { helpers_Closer_Flags} from "../../../../../helpers/Helpers.js";

import Cleaning from "../../../../../Music/PetImmersionSounds/Cleaning.mp3";
import CleaningSymbol from "../../../../../images/CleaningSymbol.gif";

import "../../../../../App.css";
import "./Clean.css";



function Clean ({clean_CurrStageAnimationImage, clean_OptionsCurrSpeciesList, clean_OptionsCurrDesiredOption, set_Clean_OptionsCurrDesiredOption, set_Clean_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [clean_OptionsTotalNumber, set_Clean_OptionsTotalNumber] = useState(30);
    const [clean_OptionsUserSelection, set_Clean_OptionsUserSelection] = useState(-1);
    const [clean_CurrNumber, set_Clean_CurrNumber] = useState(0);
    const [clean_Success, set_Clean_Success] = useState(false);
    const [clean_Hover, set_Clean_Hover] = useState(false);
    const [clean_Confirmed, set_Clean_Confirmed] = useState(false);

    const clean_TimeoutRef = useRef(null);
    const clean_AudioRef = useRef(new Audio(Cleaning));



    
    useKeyboardShortcut("Enter", () => {
    
        if (clean_OptionsUserSelection !== -1 && !clean_Confirmed){

            optionSelectionManager(clean_OptionsCurrDesiredOption, clean_OptionsUserSelection, set_Clean_OptionsTotalNumber, set_Clean_Confirmed);

        }

    },
        ".Confirm"
    );



    useKeyboardShortcut("Escape", () => {

        petScreensHelpers_Canceller_Activities(clean_AudioRef, set_Clean_OpenFlag);

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

        if (!clean_Confirmed) {
            return;
        }

        clean_AudioRef.current.loop = true;
        clean_AudioRef.current.play();

        return () => {
            clean_AudioRef.current.pause();
            clean_AudioRef.current.currentTime = 0;
            clean_AudioRef.current.loop = false;
        };

    }, [clean_Confirmed]);
    
    
    useEffect(() => {
        if (clean_CurrNumber >= clean_OptionsTotalNumber){

            petScreensHelpers_Canceller_PetImmersionSounds(clean_AudioRef.current);
            petScreensHelpers_Manager_PetHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampCleaningKey, clean_OptionsCurrDesiredOption, set_Clean_OptionsCurrDesiredOption, clean_OptionsUserSelection, set_Clean_Success);
            helpers_Closer_Flags(set_Clean_OpenFlag);

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
                
            {!clean_Confirmed ? (

                <OptionsComponent
                    options_CurrDesiredOption = {clean_OptionsCurrDesiredOption}
                    options_CurrSpeciesList = {clean_OptionsCurrSpeciesList}
                    options_UserSelection={clean_OptionsUserSelection}
                    set_Options_UserSelection = {set_Clean_OptionsUserSelection}
                />

            ) : (
                
                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview">Drag your cursor back and forth for cleaning:</h1>

                    <ProgressBarComponent
                        progressBar_CurrPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((clean_CurrNumber/clean_OptionsTotalNumber) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        <div 
                            className={`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Clean_ComponentContainer-Template--WindowScreen`} 
                            style={{
                                cursor: `url('${clean_OptionsCurrSpeciesList[clean_OptionsUserSelection][petActivityOptionCursorKey]}'), auto`
                            }}>


                            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Clean_ComponentContainer-Template--Overlay">
                            
                                <img
                                    src = {clean_CurrStageAnimationImage} 
                                    onMouseEnter={() => clean_SparkleTimer()}
                                />

                                {clean_Hover && 
                                <img
                                    className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                    src = {CleaningSymbol} 
                                    onMouseEnter={() => clean_SparkleTimer()}
                                />}

                            </div>

                        </div>

                    </div>
                        
                </div>

            )}

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => petScreensHelpers_Canceller_Activities(clean_AudioRef, set_Clean_OpenFlag)}>Quit <br/> [esc]</button>

                {clean_OptionsUserSelection === -1 || clean_Confirmed ? (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation"> Confirm <br/> [return]</button>                    

                ) : (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Confirm" onClick={() => optionSelectionManager(clean_OptionsCurrDesiredOption, clean_OptionsUserSelection, set_Clean_OptionsTotalNumber, set_Clean_Confirmed)}> Confirm <br/> [return]</button>

                )}

            </div>

        </div>

    );

}


export default Clean;