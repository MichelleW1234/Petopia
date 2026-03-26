import {useState, useEffect, useRef} from "react";

import ProgressBar from "./PetscreenStationComponents/ProgressBar.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../constants/MainPetImages.js";
import { feedingKey, speciesKey, stageKey } from "../../../../constants/Constants.js";
import { manageHealth } from "../../helpers/Helpers.js";

import "./FeedingStation.css";


function FeedingStation ({menuOptions, desiredOption, setDesiredOption, setOpenFeedingFlag}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const totalSecsTillFull = 10;

    const [secondsAte, setSecondsAte] = useState(0);
    const [done, setDone] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [animationImage, setAnimationImage] = useState(0);

    const secondsAteRef = useRef(secondsAte);
    const animationImageRef = useRef(animationImage);


    useEffect(() => {
        secondsAteRef.current = secondsAte;
    }, [secondsAte]);


    useEffect(() => {
        animationImageRef.current = animationImage;
    }, [animationImage]);


    useEffect(() => {

        if (selection === -1 || done) {
            return;
        }

        const interval = setInterval(() => {
            const currSeconds = secondsAteRef.current + 1;
            setSecondsAte(currSeconds);
            if (currSeconds >= totalSecsTillFull){
                setDone(true);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [selection, done]);


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
                                Option: Not hungry
                            </h2>

                        ) : (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: {menuOptions[desiredOption]}
                            </h2>

                        )}
                        <div className= "FeedingWindowSelectionContainer">  

                            {menuOptions.map((option, index) => (

                                <button key = {index} onClick = {() => setSelection(index)}> {option} </button>

                            ))}

                        </div>
                    </>
            
                ) : (

                    <>
                        <ProgressBar
                            percentageUntilNextUpdate={Math.round((secondsAte/totalSecsTillFull) * 100)}
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

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                                Finished!!

                            </div>

                        )}
                    </>

                )}

            </div>

            {selection === -1 || !done ? (

                <button className = "FloatingFlagButton" onClick = {() => setOpenFeedingFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => manageHealth(setPetTimeStamps, setPetList, ActivePetName, feedingKey, desiredOption, setDesiredOption, selection, setOpenFeedingFlag)}>Done</button>

            )}

        </div>

    );

}


export default FeedingStation;