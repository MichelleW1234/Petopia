import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { cleaningKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../../helpers/Helpers.js";

import "./Cleaning.css";



function Cleaning ({cleaningOptions, cleaningDesiredOption, setCleaningDesiredOption, setCleaningOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const cleaningInnerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [cleaningTotal, setCleaningTotal] = useState(30);
    const [cleaningSelection, setCleaningSelection] = useState(-1);
    const [cleaningCurrNumber, setCleaningCurrNumber] = useState(0);
    const [cleaningDone, setCleaningDone] = useState(false);
    const [cleaningAnimationImage, setAnimationImage] = useState(0);

    const cleaningAnimationImageRef = useRef(cleaningAnimationImage);



    useEffect(() => {
        cleaningAnimationImageRef.current = cleaningAnimationImage;
    }, [cleaningAnimationImage]);


    useEffect(() => {
        if (cleaningCurrNumber >= cleaningTotal){
            setCleaningDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, cleaningKey, cleaningDesiredOption, setCleaningDesiredOption, cleaningSelection);
        }
    }, [cleaningCurrNumber]);


    useEffect(() => {

        if (cleaningSelection === -1 || cleaningDone) {
            return;
        }

        const interval = setInterval(() => {
            if (cleaningAnimationImageRef.current === 0) {
                setAnimationImage(1);
            } else {
                setAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [cleaningSelection, cleaningDone]);




    return (
        
        <div className = "FloatingFlagBackground">

            <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                {cleaningSelection === -1 ? (

                    <>
                        {cleaningDesiredOption === -1 ? (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: Not dirty
                            </h2>

                        ) : (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: {cleaningOptions[cleaningDesiredOption]}
                            </h2>

                        )}
                        <div className= "FeedingWindowSelectionContainer">  

                            {cleaningOptions.map((option, index) => (

                                <button key = {index} onClick = {() => judgeSelection(index, cleaningDesiredOption, cleaningTotal*2, setCleaningTotal, setCleaningSelection)}> {option} </button>

                            ))}

                        </div>
                    </>

                ) : (

                    !cleaningDone ? ( 

                        <>
                            <ProgressBar
                                progressPercentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleaningCurrNumber/cleaningTotal) * 100)))}
                            />

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                                {cleaningInnerScreenSpace.map((row, rowIndex) => (
                                    row.map((__, colIndex) => {

                                        return (

                                            rowIndex === 2 && colIndex === 3 ? (

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][cleaningAnimationImage]} 
                                                    onMouseEnter={() => setCleaningCurrNumber(prev => prev + 1)}
                                                />

                                            ) : (

                                                <div key={rowIndex + "," + colIndex} className = "MainPetWindowGridCell"></div>

                                            )

                                        )
                                    
                                    })
                                ))}
                            </div>
                        </>

                    ) : (

                        <>
                            <ProgressBar
                                    progressPercentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleaningCurrNumber/cleaningTotal) * 100)))}
                                />

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  
                                Done!!!!!!
                            </div>
                        </>

                    )

                )}
                
            </div>

            {cleaningSelection === -1 || !cleaningDone ? (

                <button className = "FloatingFlagButton" onClick = {() => setCleaningOpenFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => setCleaningOpenFlag(false)}>Done</button>

            )}

        </div>

    );

}


export default Cleaning;