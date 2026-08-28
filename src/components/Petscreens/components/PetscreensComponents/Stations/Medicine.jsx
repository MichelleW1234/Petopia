import {useState, useEffect, useRef} from "react";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { soundActivityFailKey, petSpeciesHealthCapList, petHealthKey, petMedicineKey, petActivityOptionImageKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, soundStartActivityKey, soundActivitySuccessKey } from "../../../../../constants/Constants.js";
import { helpers_PlaySound, helpers_FlagCloser } from "../../../../../helpers/Helpers.js";
import { petScreensHelpers_PauseAudio, petScreensHelpers_QuitActivity, petScreensHelpers_StartActivity } from "../../../helpers/Helpers.js";

import GivingMedicine from "../../../../../Music/PetImmersionSounds/GivingMedicine.mp3";

import "./Medicine.css";



function Medicine ({medicine_AnimationImage, medicine_OptionsList, medicine_OptionsDesiredOption, set_Medicine_OptionsDesiredOption, set_Medicine_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [medicine_Start, set_Medicine_Start] = useState(false);
    const [medicine_OptionsTotal, set_Medicine_OptionsTotal] = useState(10);
    const [medicine_OptionsSelection, set_Medicine_OptionsSelection] = useState(-1);
    const [medicine_CurrNumber, set_Medicine_CurrNumber] = useState(0);
    const [medicine_Done, set_Medicine_Done] = useState(false);
    const [medicine_Success, set_Medicine_Success] = useState(false);

    const medicine_GlobalTimerRef = useRef(GlobalTimer);
    const medicine_CurrNumberRef = useRef(medicine_CurrNumber);
    const medicine_AudioRef = useRef(new Audio(GivingMedicine));

        
    useKeyboardShortcut("Enter", () => {
    
        if (medicine_Done){

            helpers_FlagCloser(set_Medicine_OpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (medicine_OptionsSelection !== -1 && !medicine_Start && !medicine_Done){

            petScreensHelpers_StartActivity(set_Medicine_Start);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!medicine_Done){

            petScreensHelpers_QuitActivity(medicine_AudioRef, set_Medicine_OpenFlag);

        }

    },
        ".Quit"
    );
              


    useEffect(() => {

        const medicine_PreloadImages = [medicine_AnimationImage];

        medicine_PreloadImages.forEach((src) => {
        const medicine_Img = new Image();
            medicine_Img.src = src;
        });

    }, [medicine_AnimationImage]);

    useEffect(() => {
        medicine_GlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);

    useEffect(() => {
        medicine_CurrNumberRef.current = medicine_CurrNumber;
    }, [medicine_CurrNumber]);

    useEffect(() => {

        if (!medicine_Start || medicine_Done) {
            return;
        }

        const medicine_Interval = setInterval(() => {

            const medicine_Interval_CurrSeconds = medicine_CurrNumberRef.current + 1;
            set_Medicine_CurrNumber(medicine_Interval_CurrSeconds);

            if (medicine_Interval_CurrSeconds >= medicine_OptionsTotal){
                clearInterval(medicine_Interval);

                petScreensHelpers_PauseAudio(medicine_AudioRef.current);
                set_Medicine_Done(true);
                medicine_ManageMedicineEffectiveness();
            }

        }, 1000);

        return () => clearInterval(medicine_Interval);

    }, [medicine_Start, medicine_Done]);


    useEffect(() => {

        if (!medicine_Start || medicine_Done) {
            return;
        }

        medicine_AudioRef.current.loop = true;
        medicine_AudioRef.current.play();

        return () => {
            medicine_AudioRef.current.pause();
            medicine_AudioRef.current.currentTime = 0;
            medicine_AudioRef.current.loop = false;
        };

    }, [medicine_Start, medicine_Done]);



    const medicine_ManageMedicineEffectiveness = () => {

        const medicine_ManageMedicineEffectiveness_CurrDate = medicine_GlobalTimerRef.current;
        const medicine_ManageMedicineEffectiveness_CurrHour = new Date(medicine_ManageMedicineEffectiveness_CurrDate).getHours();
        
        if (medicine_ManageMedicineEffectiveness_CurrHour < 6 || medicine_ManageMedicineEffectiveness_CurrHour >= 20 && medicine_OptionsDesiredOption === medicine_OptionsSelection){
    
            setPetList(prev => ({
    
                ...prev,
                
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [petHealthKey]: Math.min(prev[ActivePetName][petHealthKey] + 4, petSpeciesHealthCapList[prev[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]),
                    [petMedicineKey]: medicine_ManageMedicineEffectiveness_CurrDate
    
                }
    
            })); 
    
        } else {
    
            setPetList(prev => ({
    
                ...prev,
    
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [petHealthKey]: Math.min(prev[ActivePetName][petHealthKey] + 2, petSpeciesHealthCapList[prev[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]),
                    [petMedicineKey]: medicine_ManageMedicineEffectiveness_CurrDate
    
                }
    
            })); 
    
        }

        if (medicine_OptionsDesiredOption === medicine_OptionsSelection){

            helpers_PlaySound(soundActivitySuccessKey);
            set_Medicine_Success(true);

        } else {

            helpers_PlaySound(soundActivityFailKey);

        }

        set_Medicine_OptionsDesiredOption(-1);

    }




    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">
                
            {medicine_OptionsSelection === -1 ? (

                <Options
                    options_DesiredOption = {medicine_OptionsDesiredOption}
                    options_List = {medicine_OptionsList} 
                    set_Options_Total = {set_Medicine_OptionsTotal}
                    set_Options_Selection = {set_Medicine_OptionsSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBar_PercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicine_CurrNumber/medicine_OptionsTotal) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                        {medicine_Done ? (

                            medicine_Success ? (
                            
                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenSuccess">
                                    <h2>Success!</h2>
                                </div>

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenFail">
                                    <h2>Something's off...</h2>
                                </div>

                            )

                        ) : (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Medicine_ComponentContainer-Template--WindowScreen">

                                {medicine_Start ? (
                        
                                    <img src = {medicine_AnimationImage} />

                                ) : (

                                    <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                        <h2>Wait for your pet as it receives its dose.</h2> 
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpers_StartActivity(set_Medicine_Start)}> Start <br/> [return]</button>
                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>
                
            )}

            {medicine_Done ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => helpers_FlagCloser(set_Medicine_OpenFlag)}>Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => petScreensHelpers_QuitActivity(medicine_AudioRef, set_Medicine_OpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Medicine;