import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { feedingKey, moodPetImages, optionImageKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { screenFlagCloser } from "../../../../../helpers/helpers.js";
import { starter, pauseAudio, quit, manageHealth} from "../../../helpers/Helpers.js";

import feed from "../../../../../Music/PetImmersionSounds/Feed.mp3";

import "./Feed.css";



function Feed ({feedAnimationImages, feedOptions, feedDesiredOption, setFeedDesiredOption, setFeedOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [start, setStart] = useState(false);
    const [feedTotal, setFeedTotal] = useState(10);
    const [feedCurrNumber, setFeedCurrNumber] = useState(0);
    const [feedDone, setFeedDone] = useState(false);
    const [feedSelection, setFeedSelection] = useState(-1);
    const [feedSuccess, setFeedSuccess] = useState(false);
    const [feedAnimationImage, setFeedAnimationImage] = useState(0);

    const feedGlobalTimerRef = useRef(GlobalTimer);
    const feedCurrNumberRef = useRef(feedCurrNumber);
    const feedAnimationImageRef = useRef(feedAnimationImage);

    const feedAudioRef = useRef(new Audio(feed));


    useKeyboardShortcut("Enter", () => {
    
        if (feedDone){

            screenFlagCloser(setFeedOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (!feedDone){

            starter(setStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!feedDone){

            quit(feedAudioRef, setFeedOpenFlag);

        }

    },
        ".Quit"
    );



    useEffect(() => {

        const preloadImages = [...feedAnimationImages, ...feedOptions.map(item => item[optionImageKey])];

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

        if (!start || feedDone) {
            return;
        }

        const interval = setInterval(() => {

            const currSeconds = feedCurrNumberRef.current + 1;
            setFeedCurrNumber(currSeconds);

            if (currSeconds >= feedTotal){
                clearInterval(interval);

                pauseAudio(feedAudioRef.current);
                setFeedDone(true);
                manageHealth(feedGlobalTimerRef.current, setPetTimeStamps, setPetList, ActivePetName, feedingKey, feedDesiredOption, setFeedDesiredOption, feedSelection, setFeedSuccess);
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [start, feedDone]);


    useEffect(() => {

        if (!start || feedDone) {
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

    }, [start, feedDone]);



    useEffect(() => {

        if (!start || feedDone) {
            return;
        }

        feedAudioRef.current.loop = true;
        feedAudioRef.current.play();

        return () => {
            feedAudioRef.current.pause();
            feedAudioRef.current.currentTime = 0;
            feedAudioRef.current.loop = false;
        };

    }, [start, feedDone]);

    


    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
                
            {feedSelection === -1 ? (

                <Options
                    optionsDesiredOption = {feedDesiredOption}
                    optionsList = {feedOptions} 
                    setOptionsTotal = {setFeedTotal}
                    setOptionsSelection = {setFeedSelection}
                />
        
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((feedCurrNumber/feedTotal) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                            {!feedDone ? (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Feed_ComponentContainer-Template--WindowScreen">
                                    {!start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                        <p>Wait for your pet as it eats!</p> 
                                        <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => starter(setStart)}>Start <br/> [return]</button>
                                    </div>}

                                    <img src = {feedAnimationImages[feedAnimationImage]} />

                                </div>

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Feed_ComponentContainer-Template--WindowScreen">

                                    {feedSuccess ? (

                                        <img src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                                    ) : (

                                        <img src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][1]} />

                                    )}

                                </div>

                            )}

                    </div>

                </div>

            )}


            {!feedDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quit(feedAudioRef, setFeedOpenFlag)}>Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => screenFlagCloser(setFeedOpenFlag)}>Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Feed;