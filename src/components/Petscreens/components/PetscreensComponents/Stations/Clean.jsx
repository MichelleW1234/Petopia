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

            {cleanSelection === -1 ? (

                <Options
                    optionsDesiredOption = {cleanDesiredOption}
                    optionsList = {cleanOptions} 
                    setOptionsTotal = {setCleanTotal}
                    setOptionsSelection = {setCleanSelection}
                />

            ) : (

                <>
                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((cleanCurrNumber/cleanTotal) * 100)))}
                    />

                    <div className="ReusableComponentContainer_Structure FloatingFlag_ReusableComponentContainer_StationColor Stations_WindowBorder">
                        <div className="Stations_InnerWindow">
                            {!cleanDone ? ( 

                                <>
                                    <h2> Drag your cursor back and forth</h2>
                                    <img
                                        className = "Stations_Image" 
                                        src = {cleanAnimationImages[cleanAnimationImage]} 
                                        onMouseEnter={() => setCleanCurrNumber(prev => prev + 1)}
                                    />
                                </>

                            ) : (

                                <img className = "Stations_Image" src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                            )}
                        </div>
                    </div>
                </>


            )}

            <div className="buttonContainer">
                {cleanSelection === -1 || !cleanDone ? (

                    <>
                        <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_StationColor" onClick = {() => setCleanOpenFlag(false)}>Quit</button>
                        <button className = "ReusableComponentButtonPill_PlaceholderStructure FloatingFlag_ReusableComponentButtonPill_StationPlaceholderColor">Done</button>
                    </>

                ) : (

                    <>
                        <button className = "ReusableComponentButtonPill_PlaceholderStructure FloatingFlag_ReusableComponentButtonPill_StationPlaceholderColor">Quit</button>
                        <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_StationColor" onClick = {() => setCleanOpenFlag(false)}>Done</button>
                    </>

                )}
            </div>

        </div>

    );

}


export default Clean;