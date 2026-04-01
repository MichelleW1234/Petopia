import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";

import {useGlobalTimer} from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { healthCapList, healthKey, medicineKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";

import "./Medicine.css";
import "./Stations.css";


function Medicine ({setMedicineOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const medicineTotal = 10;

    const [medicineStart, setMedicineStart] = useState(false);
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

        if (!medicineStart || medicineDone) {
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
        
                {!medicineStart ? (

                    <>
                        {PetList[ActivePetName][healthKey] < healthCapList[PetList[ActivePetName][speciesKey]] ? (

                            <>
                                <h2> {ActivePetName} has {PetList[ActivePetName][healthKey]} health. Use medicine (+4 between 8pm and 6am, +2 otherwise)! </h2>
                                {/* Change this!!!!!!!!!!!!!*/}
                                <img className = "StationsInProgressPet StationsInProgressPet-Medicine" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} />
                            </>

                        ) : (

                            <>
                                <h2> {ActivePetName} is at full health! No medicine is needed currently. </h2>
                                {/* Change this!!!!!!!!!!!!!*/}
                                <img className = "StationsInProgressPet StationsInProgressPet-Medicine" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} />
                            </>

                        )}
                        
                        <button className = "GeneralNavButton" onClick = {() => setMedicineStart(true)}> Give Medicine </button>

                    </>

                ) : (

                    !medicineDone ? (

                        <>
                            <h2>Medicine in progress...</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicineCurrNumber/medicineTotal) * 100)))}
                            />
                            <div className="StationsInProgressWindow StationsInProgressWindow-Medicine">  
                                {/* Change this when I create feeding-specific images for each species!!!!!!!!!!!!!*/}
                                <img className = "StationsInProgressPet StationsInProgressPet-Medicine" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][medicineAnimationImage]} />

                            </div>
                        </>

                    ) : (

                        <>
                            <h2>Finished!!!!</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((medicineCurrNumber/medicineTotal) * 100)))}
                            />
                            <div className="StationsInProgressWindow StationsInProgressWindow-Medicine">  
                                {/* Change this when I create feeding-specific images for each species!!!!!!!!!!!!!*/}
                                <img className = "StationsInProgressPet StationsInProgressPet-Medicine" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} />

                            </div>
                        </>
                    
                    )
                
                )}

                {!medicineStart || !medicineDone ? (

                    <button className = "GeneralNavButton" onClick = {() => setMedicineOpenFlag(false)}>Quit</button>

                ) : (

                    <button className = "FloatingFlagButton" onClick = {() => setMedicineOpenFlag(false)}>Done</button>

                )}

            </div>

        </div>

    );

}


export default Medicine;