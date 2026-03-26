import {useState, useEffect, useRef} from "react";

import ProgressBar from "./PetscreenStationComponents/ProgressBar.jsx";

import { useActivePetName } from "../../../../providers/ActivePetNameProvider.jsx";;
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../constants/MainPetImages.js";
import { healthKey, speciesKey, stageKey } from "../../../../constants/Constants.js";
import { healPet } from "../../../../helpers/Helpers.js";

import "./MedicineStation.css";


function MedicineStation ({healthcap, setOpenMedicineFlag}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const totalSecsTillDosed = 10;

    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [doseInitiated, setDoseInitiated] = useState(false);
    const [secondsDosed, setSecondsDosed] = useState(0);
    const [done, setDone] = useState(false);

    const [animationImage, setAnimationImage] = useState(0);

    const secondsDosedRef = useRef(secondsDosed);
    const animationImageRef = useRef(animationImage);


    useEffect(() => {
        secondsDosedRef.current = secondsDosed;
    }, [secondsDosed]);


    useEffect(() => {
        animationImageRef.current = animationImage;
    }, [animationImage]);


    useEffect(() => {

        if (!doseInitiated || done) {
            return;
        }

        const interval = setInterval(() => {
            const currSeconds = secondsDosedRef.current + 1;
            setSecondsDosed(currSeconds);
            if (currSeconds >= totalSecsTillDosed){
                setDone(true);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [doseInitiated, done]);


    useEffect(() => {

        if (!doseInitiated || done) {
            return;
        }

        const interval = setInterval(() => {
            if (animationImageRef.current === 0) {
                setAnimationImage(1);
            } else {
                setAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [doseInitiated, done]);




    const manageHealth = () => {

        healPet(setPetList, ActivePetName, healthcap);
        setOpenMedicineFlag(false);

    }




    return (

        <div className = "FloatingFlagBackground">
        
            {!doseInitiated ? (

                <div className={`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>
                    <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> Health: {PetList[ActivePetName][healthKey]} </h2>
                    <button className = {`PetWindowButton PetWindowButton-${PetList[ActivePetName][speciesKey]}`} onClick = {() => setDoseInitiated(true)}> Give Medicine </button>
                </div>

            ) : (

                <div className={`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                    <ProgressBar
                        percentageUntilNextUpdate={Math.round((secondsDosed/totalSecsTillDosed) * 100)}
                    />

                    {!done ? (
                        
                        <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  
                            {innerScreenSpace.map((row, rowIndex) => (
                                row.map((__, colIndex) => {

                                    return (

                                        rowIndex === 2 && colIndex === 3 ? (

                                            // Change this when I create feeding-specific images for each species!!!!!!!!!!!!!
                                            <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][animationImage]} />

                                        ) : (

                                            <div key={rowIndex + "," + colIndex} className = "MainPetWindowGridCell"></div>

                                        )

                                    )
                                
                                })

                            ))}
                        </div>
                        

                    ) : (

                        <h2>Finished!!!!</h2>
                        
                    )}

                </div>
                
            )}

            {!doseInitiated || !done ? (

                <button className = "GeneralNavButton" onClick = {() => setOpenMedicineFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => manageHealth()}>Done</button>

            )}

        </div>

    );

}


export default MedicineStation;