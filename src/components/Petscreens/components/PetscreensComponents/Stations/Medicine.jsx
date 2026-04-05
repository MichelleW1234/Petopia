import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { healthCapList, healthKey, medicineKey, moodPetImages, speciesKey, stageKey } from "../../../../../constants/Constants.js";

import "./Medicine.css";
import "./Stations.css";


function Medicine ({medicineAnimationImages, medicineOptions, setMedicineOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [medicineTotal, setMedicineTotal] = useState(10);
    const [medicineSelection, setMedicineSelection] = useState(-1);
    const [medicineCurrNumber, setMedicineCurrNumber] = useState(0);
    const [medicineDone, setMedicineDone] = useState(false);
    const [medicineAnimationImage, setMedicineAnimationImage] = useState(0);

    const medicineGlobalTimerRef = useRef(GlobalTimer);
    const medicineCurrNumberRef = useRef(medicineCurrNumber);
    const medicineAnimationImageRef = useRef(medicineAnimationImage);


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

        if (medicineSelection === -1 || medicineDone) {
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

    }, [medicineSelection, medicineDone]);

    useEffect(() => {

        if (medicineSelection === -1 || medicineDone) {
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

    }, [medicineSelection, medicineDone]);




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

    }




    return (

        <div className = "FloatingFlagBackground">

            <div className="StationsFlagContainer">
        
                {medicineSelection === -1 ? (

                    <>

                        {PetList[ActivePetName][healthKey] < healthCapList[PetList[ActivePetName][speciesKey]] ? (

                            <Options
                                optionsDesiredOption = {0}
                                optionsList = {medicineOptions} 
                                setOptionsTotal = {setMedicineTotal}
                                setOptionsSelection = {setMedicineSelection}
                            />

                        ) : (

                            <Options
                                optionsDesiredOption = {-1}
                                optionsList = {medicineOptions} 
                                setOptionsTotal = {setMedicineTotal}
                                setOptionsSelection = {setMedicineSelection}
                            />

                        )}

                        <h2> Use medicine (+4 between 8pm and 6am, +2 otherwise)! </h2>
                        
                    </>

                ) : (

                    !medicineDone ? (

                        <>
                            <h2>Medicine in progress...</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicineCurrNumber/medicineTotal) * 100)))}
                            />
                            <div className="StationsWindow StationsWindow-Medicine">
                                <img className = "StationsImage StationsImage-Medicine" src = {medicineAnimationImages[medicineAnimationImage]} />
                            </div>
                        </>

                    ) : (

                        <>
                            <h2>Finished!!!!</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicineCurrNumber/medicineTotal) * 100)))}
                            />
                            <div className="StationsWindow StationsWindow-Medicine">
                                {/* Change this later!!!!!!!!!!!!!*/}
                                <img className = "StationsImage StationsImage-Medicine" src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} />
                            </div>
                        </>
                    
                    )
                
                )}

                {medicineSelection === -1 || !medicineDone ? (

                    <button className = "GeneralNavButton" onClick = {() => setMedicineOpenFlag(false)}>Quit</button>

                ) : (

                    <button className = "FloatingFlagButton" onClick = {() => setMedicineOpenFlag(false)}>Done</button>

                )}

            </div>

        </div>

    );

}


export default Medicine;