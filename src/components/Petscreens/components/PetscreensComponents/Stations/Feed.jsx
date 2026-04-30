import {useState, useEffect, useRef} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { feedingKey, moodPetImages, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth } from "../../../helpers/Helpers.js";

import "./Feed.css";
import "./Stations.css";



function Feed ({feedAnimationImages, feedOptions, feedDesiredOption, setFeedDesiredOption, setFeedOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [feedTotal, setFeedTotal] = useState(10);
    const [feedCurrNumber, setFeedCurrNumber] = useState(0);
    const [feedDone, setFeedDone] = useState(false);
    const [feedSelection, setFeedSelection] = useState(-1);
    const [feedAnimationImage, setFeedAnimationImage] = useState(0);

    const feedGlobalTimerRef = useRef(GlobalTimer);
    const feedCurrNumberRef = useRef(feedCurrNumber);
    const feedAnimationImageRef = useRef(feedAnimationImage);



    useEffect(() => {

        const preloadImages = [...feedAnimationImages, ...feedOptions];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [feedAnimationImages]);

    useEffect(() => {
        feedGlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);
    

    useEffect(() => {
        feedCurrNumberRef.current = feedCurrNumber;
    }, [feedCurrNumber]);


    useEffect(() => {
        feedAnimationImageRef.current = feedAnimationImage;
    }, [feedAnimationImage]);


    useEffect(() => {

        if (feedSelection === -1 || feedDone) {
            return;
        }

        const interval = setInterval(() => {

            const currSeconds = feedCurrNumberRef.current + 1;
            setFeedCurrNumber(currSeconds);

            if (currSeconds >= feedTotal){
                clearInterval(interval);
                setFeedDone(true);
                manageHealth(feedGlobalTimerRef.current, setPetTimeStamps, setPetList, ActivePetName, feedingKey, feedDesiredOption, setFeedDesiredOption, feedSelection);
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [feedSelection, feedDone]);


    useEffect(() => {

        if (feedSelection === -1 || feedDone) {
            return;
        }

        const interval = setInterval(() => {
            if (feedAnimationImageRef.current === 0) {
                setFeedAnimationImage(1);
            } else {
                setFeedAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [feedSelection, feedDone]);




    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
        
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagContent">
                
                {feedSelection === -1 ? (

                    <Options
                        optionsDesiredOption = {feedDesiredOption}
                        optionsList = {feedOptions} 
                        setOptionsTotal = {setFeedTotal}
                        setOptionsSelection = {setFeedSelection}
                    />
            
                ) : (

                    <>

                        <ProgressBar
                            progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((feedCurrNumber/feedTotal) * 100)))}
                        />

                        <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowEncapsulation">  
                            <div className="Stations_ComponentContainer-Template--Window">
                                {!feedDone ? (

                                    <img className = "Stations_ComponentImage-Template--Window" src = {feedAnimationImages[feedAnimationImage]} />

                                ) : (

                                    /* Change this!!!!!!!!!!!!!*/
                                    <img className = "Stations_ComponentImage-Template--Window" src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                                )}
                            </div>
                        </div>

                    </>

                )}

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                {feedSelection === -1 || !feedDone ? (

                    <>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => setFeedOpenFlag(false)}>Quit</button>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done</button>
                    </>

                ) : (

                    <>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit</button>
                        <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => setFeedOpenFlag(false)}>Done</button>
                    </>

                )}
            </div>

        </div>

    );

}


export default Feed;