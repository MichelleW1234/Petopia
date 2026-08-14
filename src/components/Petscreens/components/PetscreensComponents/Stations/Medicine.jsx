import {useState, useEffect, useRef} from "react";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { soundActivityFailKey, petSpeciesHealthCapList, petHealthKey, petMedicineKey, petActivityOptionImageKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, soundStartActivityKey, soundActivitySuccessKey } from "../../../../../constants/Constants.js";
import { playSound, flagCloser } from "../../../../../helpers/Helpers.js";
import { pauseAudio, quitActivity, startActivity } from "../../../helpers/Helpers.js";

import GivingMedicine from "../../../../../Music/PetImmersionSounds/GivingMedicine.mp3";

import "./Medicine.css";



function Medicine ({medicineAnimationImage, medicineOptionsList, medicineOptionsDesiredOption, setMedicineOptionsDesiredOption, setMedicineOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [medicineStart, setMedicineStart] = useState(false);
    const [medicineOptionsTotal, setMedicineOptionsTotal] = useState(10);
    const [medicineOptionsSelection, setMedicineOptionsSelection] = useState(-1);
    const [medicineCurrNumber, setMedicineCurrNumber] = useState(0);
    const [medicineDone, setMedicineDone] = useState(false);
    const [medicineSuccess, setMedicineSuccess] = useState(false);

    const medicineGlobalTimerRef = useRef(GlobalTimer);
    const medicineCurrNumberRef = useRef(medicineCurrNumber);
    const medicineAudioRef = useRef(new Audio(GivingMedicine));

        
    useKeyboardShortcut("Enter", () => {
    
        if (medicineDone){

            flagCloser(setMedicineOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (medicineOptionsSelection !== -1 && !medicineStart && !medicineDone){

            startActivity(setMedicineStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!medicineDone){

            quitActivity(medicineAudioRef, setMedicineOpenFlag);

        }

    },
        ".Quit"
    );
              


    useEffect(() => {

        const preloadImages = [medicineAnimationImage];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [medicineAnimationImage]);

    useEffect(() => {
        medicineGlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);

    useEffect(() => {
        medicineCurrNumberRef.current = medicineCurrNumber;
    }, [medicineCurrNumber]);

    useEffect(() => {

        if (!medicineStart || medicineDone) {
            return;
        }

        const interval = setInterval(() => {

            const currSeconds = medicineCurrNumberRef.current + 1;
            setMedicineCurrNumber(currSeconds);

            if (currSeconds >= medicineOptionsTotal){
                clearInterval(interval);

                pauseAudio(medicineAudioRef.current);
                setMedicineDone(true);
                manageMedicineEffectiveness();
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [medicineStart, medicineDone]);


    useEffect(() => {

        if (!medicineStart || medicineDone) {
            return;
        }

        medicineAudioRef.current.loop = true;
        medicineAudioRef.current.play();

        return () => {
            medicineAudioRef.current.pause();
            medicineAudioRef.current.currentTime = 0;
            medicineAudioRef.current.loop = false;
        };

    }, [medicineStart, medicineDone]);



    const manageMedicineEffectiveness = () => {

        const currDate = medicineGlobalTimerRef.current;
        const currentHour = new Date(currDate).getHours();
        
        if (currentHour < 6 || currentHour >= 20 && medicineOptionsDesiredOption === medicineOptionsSelection){
    
            setPetList(prev => ({
    
                ...prev,
                
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [petHealthKey]: Math.min(prev[ActivePetName][petHealthKey] + 4, petSpeciesHealthCapList[prev[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]),
                    [petMedicineKey]: currDate
    
                }
    
            })); 
    
        } else {
    
            setPetList(prev => ({
    
                ...prev,
    
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [petHealthKey]: Math.min(prev[ActivePetName][petHealthKey] + 2, petSpeciesHealthCapList[prev[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]),
                    [petMedicineKey]: currDate
    
                }
    
            })); 
    
        }

        if (medicineOptionsDesiredOption === medicineOptionsSelection){

            playSound(soundActivitySuccessKey);
            setMedicineSuccess(true);

        } else {

            playSound(soundActivityFailKey);

        }

        setMedicineOptionsDesiredOption(-1);

    }




    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
                
            {medicineOptionsSelection === -1 ? (

                <Options
                    optionsDesiredOption = {medicineOptionsDesiredOption}
                    optionsList = {medicineOptionsList} 
                    setOptionsTotal = {setMedicineOptionsTotal}
                    setOptionsSelection = {setMedicineOptionsSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicineCurrNumber/medicineOptionsTotal) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                        {medicineDone ? (

                            medicineSuccess ? (
                            
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

                                {medicineStart ? (
                        
                                    <img src = {medicineAnimationImage} />

                                ) : (

                                    <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                        <h2>Wait for your pet as it receives its dose.</h2> 
                                        <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setMedicineStart)}> Start <br/> [return]</button>
                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>
                
            )}

            {medicineDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => flagCloser(setMedicineOpenFlag)}>Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quitActivity(medicineAudioRef, setMedicineOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Medicine;