import {useState, useEffect, useRef} from "react";

import ProgressBar from "./PetscreenStationComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../constants/MainPetImages.js";
import { cleaningKey, speciesKey, stageKey } from "../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../helpers/Helpers.js";

import "./CleaningStation.css";



function CleaningStation ({cleaningOptions, desiredOption, setDesiredOption, setOpenCleaningFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [totalScrubsTillClean, setTotalScrubsTillClean] = useState(30);
    const [selection, setSelection] = useState(-1);
    const [scrubs, setScrubs] = useState(0);
    const [done, setDone] = useState(false);
    const [animationImage, setAnimationImage] = useState(0);

    const animationImageRef = useRef(animationImage);



    useEffect(() => {
        animationImageRef.current = animationImage;
    }, [animationImage]);


    useEffect(() => {
        if (scrubs >= totalScrubsTillClean){
            setDone(true);
        }
    }, [scrubs]);


    useEffect(() => {

        if (selection === -1 || done) {
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

    }, [selection, done]);




    return (
        
        <div className = "FloatingFlagBackground">

            <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                {selection === -1 ? (

                    <>
                        {desiredOption === -1 ? (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: Not dirty
                            </h2>

                        ) : (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: {cleaningOptions[desiredOption]}
                            </h2>

                        )}
                        <div className= "FeedingWindowSelectionContainer">  

                            {cleaningOptions.map((option, index) => (

                                <button key = {index} onClick = {() => judgeSelection(index, desiredOption, totalScrubsTillClean*2, setTotalScrubsTillClean, setSelection)}> {option} </button>

                            ))}

                        </div>
                    </>

                ) : (

                    !done ? ( 

                        <>
                            <ProgressBar
                                percentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((scrubs/totalScrubsTillClean) * 100)))}
                            />

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                                {innerScreenSpace.map((row, rowIndex) => (
                                    row.map((__, colIndex) => {

                                        return (

                                            rowIndex === 2 && colIndex === 3 ? (

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][animationImage]} 
                                                    onMouseEnter={() => setScrubs(prev => prev + 1)}
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
                                    percentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((scrubs/totalScrubsTillClean) * 100)))}
                                />

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  
                                Done!!!!!!
                            </div>
                        </>

                    )

                )}
                
            </div>

            {selection === -1 || !done ? (

                <button className = "FloatingFlagButton" onClick = {() => setOpenCleaningFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, cleaningKey, desiredOption, setDesiredOption, selection, setOpenCleaningFlag)}>Done</button>

            )}

        </div>

    );

}


export default CleaningStation;