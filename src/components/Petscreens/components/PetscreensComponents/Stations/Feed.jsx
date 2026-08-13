import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { dogSpecies, feedingKey, fishSpecies, optionImageKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { flagCloser } from "../../../../../helpers/Helpers.js";
import { startActivity, pauseAudio, quitActivity, manageHealth} from "../../../helpers/Helpers.js";

import Feeding from "../../../../../Music/PetImmersionSounds/Feeding.mp3";

import "./Feed.css";



function Feed ({feedAnimationImage, feedOptionsList, feedOptionsDesiredOption, setFeedOptionsDesiredOption, setFeedOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [feedStart, setFeedStart] = useState(false);
    const [feedOptionsTotal, setFeedOptionsTotal] = useState(10);
    const [feedCurrNumber, setFeedCurrNumber] = useState(0);
    const [feedDone, setFeedDone] = useState(false);
    const [feedOptionsSelection, setFeedOptionsSelection] = useState(-1);
    const [feedSuccess, setFeedSuccess] = useState(false);

    const feedGlobalTimerRef = useRef(GlobalTimer);
    const feedCurrNumberRef = useRef(feedCurrNumber);
    const feedAudioRef = useRef(new Audio(Feeding));


    useKeyboardShortcut("Enter", () => {
    
        if (feedDone){

            flagCloser(setFeedOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (feedOptionsSelection !== -1 && !feedStart && !feedDone){

            startActivity(setFeedStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!feedDone){

            quitActivity(feedAudioRef, setFeedOpenFlag);

        }

    },
        ".Quit"
    );



    useEffect(() => {

        const preloadImages = [feedAnimationImage];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [feedAnimationImage]);

    useEffect(() => {
        feedGlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);
    
    useEffect(() => {
        feedCurrNumberRef.current = feedCurrNumber;
    }, [feedCurrNumber]);


    useEffect(() => {

        if (!feedStart || feedDone) {
            return;
        }

        const interval = setInterval(() => {

            const currSeconds = feedCurrNumberRef.current + 1;
            setFeedCurrNumber(currSeconds);

            if (currSeconds >= feedOptionsTotal){
                clearInterval(interval);

                pauseAudio(feedAudioRef.current);
                setFeedDone(true);
                manageHealth(feedGlobalTimerRef.current, setPetTimeStamps, setPetList, ActivePetName, feedingKey, feedOptionsDesiredOption, setFeedOptionsDesiredOption, feedOptionsSelection, setFeedSuccess);
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [feedStart, feedDone]);



    useEffect(() => {

        if (!feedStart || feedDone) {
            return;
        }

        feedAudioRef.current.loop = true;
        feedAudioRef.current.play();

        return () => {
            feedAudioRef.current.pause();
            feedAudioRef.current.currentTime = 0;
            feedAudioRef.current.loop = false;
        };

    }, [feedStart, feedDone]);

    


    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">
                
            {feedOptionsSelection === -1 ? (

                <Options
                    optionsDesiredOption = {feedOptionsDesiredOption}
                    optionsList = {feedOptionsList} 
                    setOptionsTotal = {setFeedOptionsTotal}
                    setOptionsSelection = {setFeedOptionsSelection}
                />
        
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((feedCurrNumber/feedOptionsTotal) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                            {feedDone ? (

                                feedSuccess ? (
                               
                                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenSuccess">
                                        <h2>Success!</h2>
                                    </div>
    
                                ) : (
    
                                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenFail">
                                        <h2>Something's off...</h2>
                                    </div>
    
                                )

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Feed_ComponentContainer-Template--WindowScreen">

                                    {feedStart ? (

                                        <img src = {feedAnimationImage} />

                                    ) : (

                                        <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                            <h2>Wait for your pet as it eats.</h2> 
                                            <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setFeedStart)}> Start <br/> [return]</button>
                                        </div>

                                    )}

                                </div>

                            )}

                    </div>

                </div>

            )}


            {feedDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => flagCloser(setFeedOpenFlag)}>Done <br/> [return]</button>
                </div>
               
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => quitActivity(feedAudioRef, setFeedOpenFlag)}>Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Feed;