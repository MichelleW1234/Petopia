import {useState, useEffect, useRef} from "react";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { failSoundKey, healthCapList, healthKey, medicineKey, moodPetImages, optionImageKey, playingKey, speciesKey, stageKey, startSoundKey, successSoundKey } from "../../../../../constants/Constants.js";
import { playSound, screenFlagCloser } from "../../../../../helpers/helpers.js";
import { pauseAudio, quit, starter } from "../../../helpers/Helpers.js";

import medicine from "../../../../../Music/PetImmersionSounds/Medicine.mp3";

import "./Medicine.css";




function Medicine ({medicineAnimationImages, medicineOptions, medicineDesiredOption, setMedicineDesiredOption, setMedicineOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [start, setStart] = useState(false);
    const [medicineTotal, setMedicineTotal] = useState(10);
    const [medicineSelection, setMedicineSelection] = useState(-1);
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

            screenFlagCloser(setMedicineOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (!medicineDone){

            starter(setStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!medicineDone){

            quit(medicineAudioRef, setMedicineOpenFlag);

        }

    },
        ".Quit"
    );
              


    useEffect(() => {

        const preloadImages = [...medicineAnimationImages, ...medicineOptions.map(item => item[optionImageKey])];

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

        if (!start || medicineDone) {
            return;
        }

        const interval = setInterval(() => {

            const currSeconds = medicineCurrNumberRef.current + 1;
            setMedicineCurrNumber(currSeconds);

            if (currSeconds >= medicineTotal){
                clearInterval(interval);

                pauseAudio(medicineAudioRef.current);
                setMedicineDone(true);
                manageMedicineEffectiveness();
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [start, medicineDone]);

    
    useEffect(() => {

        if (!start || medicineDone) {
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

    }, [start, medicineDone]);


    useEffect(() => {

        if (!start || medicineDone) {
            return;
        }

        medicineAudioRef.current.loop = true;
        medicineAudioRef.current.play();

        return () => {
            medicineAudioRef.current.pause();
            medicineAudioRef.current.currentTime = 0;
            medicineAudioRef.current.loop = false;
        };

    }, [start, medicineDone]);



    const manageMedicineEffectiveness = () => {

        const currDate = medicineGlobalTimerRef.current;
        const currentHour = new Date(currDate).getHours();
        
        if (currentHour < 6 || currentHour >= 20 && medicineDesiredOption === medicineSelection){
    
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

        if (medicineDesiredOption === medicineSelection){

            playSound(successSoundKey);
            setMedicineSuccess(true);

        } else {

            playSound(failSoundKey);

        }

        setMedicineDesiredOption(-1);

    }




    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
                
            {medicineSelection === -1 ? (

                <Options
                    optionsDesiredOption = {medicineDesiredOption}
                    optionsList = {medicineOptions} 
                    setOptionsTotal = {setMedicineTotal}
                    setOptionsSelection = {setMedicineSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicineCurrNumber/medicineTotal) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                        {!medicineDone ? (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Medicine_ComponentContainer-Template--WindowScreen">

                                {!start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                    <p>Wait for your pet as it receives its dose!</p> 
                                    <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => starter(setStart)}>Start <br/> [return]</button>
                                </div>}
                        
                                <img src = {medicineAnimationImages[medicineAnimationImage]} />

                            </div>

                        ) : (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Medicine_ComponentContainer-Template--WindowScreen">

                                {medicineSuccess ? (

                                    <img src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                                ) : (

                                    <img src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][1]} />

                                )}
                             
                            </div>
                            
                        )}

                    </div>

                </div>
                
            )}

            {!medicineDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quit(medicineAudioRef, setMedicineOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => screenFlagCloser(setMedicineOpenFlag)}>Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Medicine;