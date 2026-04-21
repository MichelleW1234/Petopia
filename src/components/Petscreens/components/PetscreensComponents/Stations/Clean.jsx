import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { cleaningKey, moodPetImages, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth } from "../../../helpers/Helpers.js";

import "./Clean.css";
import "./Stations.css";



function Clean ({cleanAnimationImages, cleanOptions, cleanDesiredOption, setCleanDesiredOption, setCleanOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [cleanTotal, setCleanTotal] = useState(30);
    const [cleanSelection, setCleanSelection] = useState(-1);
    const [cleanCurrNumber, setCleanCurrNumber] = useState(0);
    const [cleanDone, setCleanDone] = useState(false);
    const [cleanAnimationImage, setCleanAnimationImage] = useState(0);

    const cleanAnimationImageRef = useRef(cleanAnimationImage);




    useEffect(() => {

        const preloadImages = [...cleanAnimationImages, ...cleanOptions];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [cleanAnimationImages]);

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
        
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_StationBackgroundColor">

            <div className="StationsFlagContainer">

                {cleanSelection === -1 ? (

                    <Options
                        optionsDesiredOption = {cleanDesiredOption}
                        optionsList = {cleanOptions} 
                        setOptionsTotal = {setCleanTotal}
                        setOptionsSelection = {setCleanSelection}
                    />

                ) : (
 
                    !cleanDone ? ( 

                        <>
                            <h2> Cleaning in progress...</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanTotal) * 100)))}
                            />
                            <div className="StationsWindow StationsWindow-Clean">
                                <h2> Drag your cursor back and forth</h2>
                                <img
                                    className = "StationsImage StationsImage-Clean" 
                                    src = {cleanAnimationImages[cleanAnimationImage]} 
                                    onMouseEnter={() => setCleanCurrNumber(prev => prev + 1)}
                                />
                            </div>
                        </>

                    ) : (

                        <>
                            <h2> Done!!!!!!</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanTotal) * 100)))}
                            />
                            <div className="StationsWindow StationsWindow-Clean">
                                {/* Change this later!!!!!!!!!!!!!*/}
                                <img
                                    className = "StationsImage StationsImage-Clean" 
                                    src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} 
                                />
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

        </div>

    );

}


export default Clean;