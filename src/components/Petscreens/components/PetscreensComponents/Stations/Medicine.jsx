import {useState, useEffect, useRef} from "react";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { failSoundKey, healthCapList, healthKey, medicineKey, optionImageKey, playingKey, speciesKey, stageKey, startSoundKey, successSoundKey } from "../../../../../constants/Constants.js";
import { playSound, flagCloser } from "../../../../../helpers/helpers.js";
import { pauseAudio, quitActivity, startActivity } from "../../../helpers/Helpers.js";

import medicine from "../../../../../Music/PetImmersionSounds/Medicine.mp3";
import success from "../../../../../images/Success.png";
import fail from "../../../../../images/Fail.png";

import "./Medicine.css";



function Medicine ({medicineAnimationImages, medicineOptionsList, medicineOptionsDesiredOption, setMedicineOptionsDesiredOption, setMedicineOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [medicineStart, setMedicineStart] = useState(false);
    const [medicineOptionsTotal, setMedicineOptionsTotal] = useState(10);
    const [medicineOptionsSelection, setMedicineOptionsSelection] = useState(-1);
    const [medicineCurrNumber, setMedicineCurrNumber] = useState(0);
    const [medicineDone, setMedicineDone] = useState(false);
    const [medicineSuccess, setMedicineSuccess] = useState(false);
    const [medicineAnimationImage, setMedicineAnimationImage] = useState(0);

    const medicineGlobalTimerRef = useRef(GlobalTimer);
    const medicineCurrNumberRef = useRef(medicineCurrNumber);
    const medicineAnimationImageRef = useRef(medicineAnimationImage);

    const medicineAudioRef = useRef(new Audio(medicine));

        
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

        const preloadImages = [...medicineAnimationImages, ...medicineOptionsList.map(item => item[optionImageKey])];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [medicineAnimationImages]);

    useEffect(() => {
        medicineGlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);

    useEffect(() => {
        medicineCurrNumberRef.current = medicineCurrNumber;
    }, [medicineCurrNumber]);

    useEffect(() => {
        medicineAnimationImageRef.current = medicineAnimationImage;
    }, [medicineAnimationImage]);

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

        const interval = setInterval(() => {

            if (medicineAnimationImageRef.current === 0) {
                setMedicineAnimationImage(1);
            } else {
                setMedicineAnimationImage(0);
            }
        }, 300);

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
                    [healthKey]: Math.min(prev[ActivePetName][healthKey] + 4, healthCapList[prev[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]]),
                    [medicineKey]: currDate
    
                }
    
            })); 
    
        } else {
    
            setPetList(prev => ({
    
                ...prev,
    
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [healthKey]: Math.min(prev[ActivePetName][healthKey] + 2, healthCapList[prev[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]]),
                    [medicineKey]: currDate
    
                }
    
            })); 
    
        }

        if (medicineOptionsDesiredOption === medicineOptionsSelection){

            playSound(successSoundKey);
            setMedicineSuccess(true);

        } else {

            playSound(failSoundKey);

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

                        {!medicineDone ? (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Medicine_ComponentContainer-Template--WindowScreen">

                                {!medicineStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                    <p>Wait for your pet as it receives its dose!</p> 
                                    <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setMedicineStart)}> Start <br/> [return]</button>
                                </div>}
                        
                                <img src = {medicineAnimationImages[medicineAnimationImage]} />

                            </div>

                        ) : (

                            medicineSuccess ? (
                            
                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenSuccess">
                                    <p>You chose the right option!</p>
                                    <img src = {success} />
                                </div>

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenFail">
                                    <p>You chose the wrong option.</p>
                                    <img src = {fail} />
                                </div>

                            )
                            
                        )}

                    </div>

                </div>
                
            )}

            {!medicineDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quitActivity(medicineAudioRef, setMedicineOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => flagCloser(setMedicineOpenFlag)}>Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Medicine;