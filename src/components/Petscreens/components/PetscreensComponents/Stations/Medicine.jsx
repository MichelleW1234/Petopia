import {useState, useEffect, useRef} from "react";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBarComponent from "./StationsComponents/ProgressBar.jsx";
import OptionsComponent from "./StationsComponents/Options.jsx";

import { audioActivityFailKey, petSpeciesHealthCapList, petHealthKey, petMedicineKey, petActivityOptionImageKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, audioStartActivityKey, audioActivitySuccessKey } from "../../../../../constants/Constants.js";
import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags } from "../../../../../helpers/Helpers.js";
import { petScreensHelpers_Canceller_PetImmersionSounds, petScreensHelpers_Canceller_Activities, optionSelectionManager } from "../../../helpers/Helpers.js";

import GivingMedicine from "../../../../../Music/PetImmersionSounds/GivingMedicine.mp3";

import "../../../../../App.css";
import "./Medicine.css";



function Medicine ({medicine_CurrStageAnimationImage, medicine_OptionsCurrSpeciesList, medicine_OptionsCurrDesiredOption, set_Medicine_OptionsCurrDesiredOption, set_Medicine_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [medicine_OptionsTotalNumber, set_Medicine_OptionsTotalNumber] = useState(10);
    const [medicine_OptionsUserSelection, set_Medicine_OptionsUserSelection] = useState(-1);
    const [medicine_CurrNumber, set_Medicine_CurrNumber] = useState(0);
    const [medicine_Success, set_Medicine_Success] = useState(false);
    const [medicine_Confirmed, set_Medicine_Confirmed] = useState(false);

    const medicine_GlobalTimerRef = useRef(GlobalTimer);
    const medicine_CurrNumberRef = useRef(medicine_CurrNumber);
    const medicine_AudioRef = useRef(new Audio(GivingMedicine));

        
    useKeyboardShortcut("Enter", () => {
    
        if (medicine_OptionsUserSelection !== -1 && !medicine_Confirmed){

            optionSelectionManager(medicine_OptionsCurrDesiredOption, medicine_OptionsUserSelection, set_Medicine_OptionsTotalNumber, set_Medicine_Confirmed);

        }

    },
        ".Confirm"
    );


    useKeyboardShortcut("Escape", () => {

        petScreensHelpers_Canceller_Activities(medicine_AudioRef, set_Medicine_OpenFlag);

    },
        ".Quit"
    );
              


    useEffect(() => {

        const medicine_CurrPreloadImages = [medicine_CurrStageAnimationImage];

        medicine_CurrPreloadImages.forEach((src) => {
        const medicine_Img = new Image();
            medicine_Img.src = src;
        });

    }, [medicine_CurrStageAnimationImage]);

    useEffect(() => {
        medicine_GlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);

    useEffect(() => {
        medicine_CurrNumberRef.current = medicine_CurrNumber;
    }, [medicine_CurrNumber]);

    useEffect(() => {

        if (!medicine_Confirmed) {
            return;
        }

        const medicine_Interval = setInterval(() => {

            const medicine_Interval_CurrSeconds = medicine_CurrNumberRef.current + 1;
            set_Medicine_CurrNumber(medicine_Interval_CurrSeconds);

            if (medicine_Interval_CurrSeconds >= medicine_OptionsTotalNumber){
                clearInterval(medicine_Interval);

                petScreensHelpers_Canceller_PetImmersionSounds(medicine_AudioRef.current);
                medicine_MedicineEffectivenessManager();
                helpers_Closer_Flags(set_Medicine_OpenFlag);
            }

        }, 1000);

        return () => clearInterval(medicine_Interval);

    }, [medicine_Confirmed]);


    useEffect(() => {

        if (!medicine_Confirmed) {
            return;
        }

        medicine_AudioRef.current.loop = true;
        medicine_AudioRef.current.play();

        return () => {
            medicine_AudioRef.current.pause();
            medicine_AudioRef.current.currentTime = 0;
            medicine_AudioRef.current.loop = false;
        };

    }, [medicine_Confirmed]);




    const medicine_MedicineEffectivenessManager = () => {

        const medicine_MedicineEffectivenessManager_CurrDate = medicine_GlobalTimerRef.current;
        const medicine_MedicineEffectivenessManager_CurrDateHour = new Date(medicine_MedicineEffectivenessManager_CurrDate).getHours();
        
        if (medicine_MedicineEffectivenessManager_CurrDateHour < 6 || medicine_MedicineEffectivenessManager_CurrDateHour >= 20 && medicine_OptionsCurrDesiredOption === medicine_OptionsUserSelection){
    
            setPetList(prev => ({
    
                ...prev,
                
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [petHealthKey]: Math.min(prev[ActivePetName][petHealthKey] + 4, petSpeciesHealthCapList[prev[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]),
                    [petMedicineKey]: medicine_MedicineEffectivenessManager_CurrDate
    
                }
    
            })); 
    
        } else {
    
            setPetList(prev => ({
    
                ...prev,
    
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [petHealthKey]: Math.min(prev[ActivePetName][petHealthKey] + 2, petSpeciesHealthCapList[prev[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]),
                    [petMedicineKey]: medicine_MedicineEffectivenessManager_CurrDate
    
                }
    
            })); 
    
        }

        if (medicine_OptionsCurrDesiredOption === medicine_OptionsUserSelection){

            helpers_Player_UIIndicatorSounds(audioActivitySuccessKey);
            set_Medicine_Success(true);

        } else {

            helpers_Player_UIIndicatorSounds(audioActivityFailKey);

        }

        set_Medicine_OptionsCurrDesiredOption(-1);

    }




    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">
                
            {!medicine_Confirmed ? (

                <OptionsComponent
                    options_CurrDesiredOption = {medicine_OptionsCurrDesiredOption}
                    options_CurrSpeciesList = {medicine_OptionsCurrSpeciesList} 
                    options_UserSelection={medicine_OptionsUserSelection}
                    set_Options_UserSelection = {set_Medicine_OptionsUserSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview">Wait for your pet as it receives its dose:</h1>

                    <ProgressBarComponent
                        progressBar_CurrPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicine_CurrNumber/medicine_OptionsTotalNumber) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Medicine_ComponentContainer-Template--WindowScreen">
                            
                            <img src = {medicine_CurrStageAnimationImage} />

                        </div>

                    </div>

                </div>
                
            )}


            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => petScreensHelpers_Canceller_Activities(medicine_AudioRef, set_Medicine_OpenFlag)}>Quit <br/> [esc]</button>

                {medicine_OptionsUserSelection === -1 || medicine_Confirmed ? (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation"> Confirm <br/> [return]</button>                    

                ) : (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Confirm" onClick={() => optionSelectionManager(medicine_OptionsCurrDesiredOption, medicine_OptionsUserSelection, set_Medicine_OptionsTotalNumber, set_Medicine_Confirmed)}> Confirm <br/> [return]</button>

                )}

            </div>

        </div>

    );

}


export default Medicine;