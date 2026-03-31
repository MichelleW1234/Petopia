import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { cleaningKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../../helpers/Helpers.js";

import "./Clean.css";
import "./Stations.css";



function Clean ({cleanOptions, cleanDesiredOption, setCleanDesiredOption, setCleanOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const cleanInnerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [cleanTotal, setCleanTotal] = useState(30);
    const [cleanSelection, setCleanSelection] = useState(-1);
    const [cleanCurrNumber, setCleanCurrNumber] = useState(0);
    const [cleanDone, setCleanDone] = useState(false);
    const [cleanAnimationImage, setCleanAnimationImage] = useState(0);

    const cleanAnimationImageRef = useRef(cleanAnimationImage);



    useEffect(() => {
        cleanAnimationImageRef.current = cleanAnimationImage;
    }, [cleanAnimationImage]);


    useEffect(() => {
        if (cleanCurrNumber >= cleanTotal){
            setCleanDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, cleaningKey, cleanDesiredOption, setCleanDesiredOption, cleanSelection);
        }
    }, [cleanCurrNumber]);


    useEffect(() => {

        if (cleanSelection === -1 || cleanDone) {
            return;
        }

        const interval = setInterval(() => {
            if (cleanAnimationImageRef.current === 0) {
                setCleanAnimationImage(1);
            } else {
                setCleanAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [cleanSelection, cleanDone]);




    return (
        
        <div className = "FloatingFlagBackground">

            {cleanSelection === -1 ? (

                <>
                    {cleanDesiredOption === -1 ? (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                            Option: Not dirty
                        </h2>

                    ) : (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}> 
                            Option: {cleanOptions[cleanDesiredOption]}
                        </h2>

                    )}
                    <div className= "StationsWindowSelectionContainer">  

                        {cleanOptions.map((option, index) => (

                            <button key = {index} className = "StationsWindowSelectionOptionButton" onClick = {() => judgeSelection(index, cleanDesiredOption, cleanTotal*2, setCleanTotal, setCleanSelection)}> {option} </button>

                        ))}

                    </div>
                </>

            ) : (

                !cleanDone ? ( 

                    <>
                        <ProgressBar
                            progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanTotal) * 100)))}
                        />

                        <div className="StationsInProgressWindow StationsInProgressWindow-Clean">  
                            
                            {/* Change this when I create feeding-specific images for each species!!!!!!!!!!!!!*/}
                            <img
                                className = "StationsInProgressPet StationsInProgressPet-Clean" 
                                src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][cleanAnimationImage]} 
                                onMouseEnter={() => setCleanCurrNumber(prev => prev + 1)}
                            />

                        </div>
                    </>

                ) : (

                    <>
                        <ProgressBar
                            progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanTotal) * 100)))}
                        />

                        <div className= "StationsInProgressWindow StationsInProgressWindow-Clean">  
                            Done!!!!!!
                        </div>
                    </>

                )

            )}

            {cleanSelection === -1 || !cleanDone ? (

                <button className = "FloatingFlagButton" onClick = {() => setCleanOpenFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => setCleanOpenFlag(false)}>Done</button>

            )}

        </div>

    );

}


export default Clean;