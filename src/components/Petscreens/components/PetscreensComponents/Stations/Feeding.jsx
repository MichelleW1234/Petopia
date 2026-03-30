import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { feedingKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../../helpers/Helpers.js";

import "./Feeding.css";



function Feeding ({feedingOptions, feedingDesiredOption, setFeedingDesiredOption, setFeedingOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const feedingInnerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [feedingTotal, setFeedingTotal] = useState(10);
    const [feedingCurrNumber, setFeedingCurrNumber] = useState(0);
    const [feedingDone, setFeedingDone] = useState(false);
    const [feedingSelection, setFeedingSelection] = useState(-1);
    const [feedingAnimationImage, setFeedingAnimationImage] = useState(0);

    const feedingCurrNumberRef = useRef(feedingCurrNumber);
    const feedingAnimationImageRef = useRef(feedingAnimationImage);


    useEffect(() => {
        feedingCurrNumberRef.current = feedingCurrNumber;
    }, [feedingCurrNumber]);


    useEffect(() => {
        feedingAnimationImageRef.current = feedingAnimationImage;
    }, [feedingAnimationImage]);


    useEffect(() => {

        if (feedingSelection === -1 || feedingDone) {
            return;
        }

        const interval = setInterval(() => {
            const feedingCurrSeconds = feedingCurrNumberRef.current + 1;
            setFeedingCurrNumber(feedingCurrSeconds);
            if (feedingCurrSeconds >= feedingTotal){
                setFeedingDone(true);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [feedingSelection, feedingDone]);


    useEffect(() => {

        if (feedingSelection === -1 || feedingDone) {
            return;
        }

        const interval = setInterval(() => {
            if (feedingAnimationImageRef.current === 0) {
                setFeedingAnimationImage(1);
            } else {
                setFeedingAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [feedingSelection, feedingDone]);




    return (

        <div className = "FloatingFlagBackground">
        
            <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                {feedingSelection === -1 ? (

                    <>
                        {feedingDesiredOption === -1 ? (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: Not hungry
                            </h2>

                        ) : (

                            <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                                Option: {feedingOptions[feedingDesiredOption]}
                            </h2>

                        )}
                        <div className= "FeedingWindowSelectionContainer">  

                            {feedingOptions.map((option, index) => (

                                <button key = {index} onClick = {() => judgeSelection(index, feedingDesiredOption, feedingTotal*2, setFeedingTotal, setFeedingSelection)}> {option} </button>

                            ))}

                        </div>
                    </>
            
                ) : (

                    <>
                        <ProgressBar
                            progressPercentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((feedingCurrNumber/feedingTotal) * 100)))}
                        />

                        {!feedingDone ? (

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                                {feedingInnerScreenSpace.map((row, rowIndex) => (
                                    row.map((__, colIndex) => {

                                        return (

                                            rowIndex === 2 && colIndex === 3 ? (

                                                // Change this when I create feeding-specific images for each species!!!!!!!!!!!!!
                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][feedingAnimationImage]} />

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

            {feedingSelection === -1 || !feedingDone ? (

                <button className = "FloatingFlagButton" onClick = {() => setFeedingOpenFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, feedingKey, feedingDesiredOption, setFeedingDesiredOption, feedingSelection, setFeedingOpenFlag)}>Done</button>

            )}

        </div>

    );

}


export default Feeding;