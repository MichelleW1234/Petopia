import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { healthCapList, healthKey, medicineKey, moodPetImages, speciesKey, stageKey } from "../../../../../constants/Constants.js";

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



    useEffect(() => {

        const preloadImages = [...medicineAnimationImages, ...medicineOptions.map(item => item[1])];

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

        if (!start || medicineSelection === -1 || medicineDone) {
            return;
        }

        const interval = setInterval(() => {

            const currSeconds = medicineCurrNumberRef.current + 1;
            setMedicineCurrNumber(currSeconds);

            if (currSeconds >= medicineTotal){
                clearInterval(interval);
                setMedicineDone(true);
                manageMedicineEffectiveness();
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [start, medicineSelection, medicineDone]);

    
    useEffect(() => {

        if (!start || medicineSelection === -1 || medicineDone) {
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

    }, [start, medicineSelection, medicineDone]);




    const manageMedicineEffectiveness = () => {

        const currDate = medicineGlobalTimerRef.current;
        const currentHour = new Date(currDate).getHours();
        
        if (currentHour < 6 || currentHour >= 20){
    
            setPetList(prev => ({
    
                ...prev,
                
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [healthKey]: Math.min(prev[ActivePetName][healthKey] + 4, healthCapList[prev[ActivePetName][speciesKey]]),
                    [medicineKey]: currDate
    
                }
    
            })); 
    
        } else {
    
            setPetList(prev => ({
    
                ...prev,
    
                [ActivePetName]: {
    
                    ...prev[ActivePetName],
                    [healthKey]: Math.min(prev[ActivePetName][healthKey] + 2, healthCapList[prev[ActivePetName][speciesKey]]),
                    [medicineKey]: currDate
    
                }
    
            })); 
    
        }

        if (medicineDesiredOption === medicineSelection){

            setMedicineSuccess(true);

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

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MedicineWindow">

                                {!start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                    <h2>Feed your pet!</h2> 
                                    <button className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowButton" onClick = {() => setStart(true)}>Start</button>
                                </div>}
                        
                                <img src = {medicineAnimationImages[medicineAnimationImage]} />

                            </div>

                        ) : (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MedicineWindow">

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

            {medicineSelection === -1 || !medicineDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => setMedicineOpenFlag(false)}>Quit</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => setMedicineOpenFlag(false)}>Done</button>
                </div>

            )}

        </div>

    );

}


export default Medicine;