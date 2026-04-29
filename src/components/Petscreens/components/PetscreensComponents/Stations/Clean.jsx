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
        
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlagStation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagContent">
                
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

                        <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--GlobalFloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowEncapsulation">
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

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                {cleanSelection === -1 || !cleanDone ? (

                    <>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClickFloatingFlagStation" onClick = {() => setCleanOpenFlag(false)}>Quit</button>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclickFloatingFlagStation">Done</button>
                    </>

                ) : (

                    <>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclickFloatingFlagStation">Quit</button>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClickFloatingFlagStation" onClick = {() => setCleanOpenFlag(false)}>Done</button>
                    </>

                )}
            </div>

        </div>

    );

}


export default Clean;