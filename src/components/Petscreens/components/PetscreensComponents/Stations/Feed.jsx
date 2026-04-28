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

        <div className = "ReusableMultitags_BackgroundFloatingFlag-Structure--FloatingFlags_ ReusableMultitags_BackgroundFloatingFlag-Color--FloatingFlags_Station">
        
            <div className="FloatingFlags_ComponentContainer-Structure--Content">
                
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

                        <div className="ReusableMultitags_ComponentContainer-Structure--Window ReusableMultitags_ComponentContainer-Color--FloatingFlags_Station">  
                            <div className="Stations_ComponentContainer-Structure--Window">
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

            <div className="ComponentContainer-Structure--Row">
                {feedSelection === -1 || !feedDone ? (

                    <>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationNormal" onClick = {() => setFeedOpenFlag(false)}>Quit</button>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationUnclickable">Done</button>
                    </>

                ) : (

                    <>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationUnclickable">Quit</button>
                        <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_StationNormal" onClick = {() => setFeedOpenFlag(false)}>Done</button>
                    </>

                )}
            </div>

        </div>

    );

}


export default Feed;