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
        
        <div className = "ReusableMultitags_BackgroundFloatingFlag-Structure--FloatingFlags_ ReusableMultitags_BackgroundFloatingFlag-Color--FloatingFlags_Station">

            <div className="FloatingFlags_ComponentContainer-Structure--Content">
                
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

                        <div className="ReusableMultitags_ComponentContainer-Structure--Window ReusableMultitags_ComponentContainer-Color--FloatingFlags_Station">
                            <div className="Stations_ComponentContainer-Structure--Window">
                                {!cleanDone ? ( 

                                    <>
                                        <h2> Drag your cursor back and forth</h2>
                                        <img
                                            className = "Stations_ComponentImage-Template--Window" 
                                            src = {cleanAnimationImages[cleanAnimationImage]} 
                                            onMouseEnter={() => setCleanCurrNumber(prev => prev + 1)}
                                        />
                                    </>

                                ) : (

                                    <img className = "Stations_ComponentImage-Template--Window" src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                                )}
                            </div>
                        </div>
                    </>


                )}

            </div>

            <div className="ComponentContainer-Structure--Row">
                {cleanSelection === -1 || !cleanDone ? (

                    <>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationNormal" onClick = {() => setCleanOpenFlag(false)}>Quit</button>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationUnclickable">Done</button>
                    </>

                ) : (

                    <>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationUnclickable">Quit</button>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationNormal" onClick = {() => setCleanOpenFlag(false)}>Done</button>
                    </>

                )}
            </div>

        </div>

    );

}


export default Clean;