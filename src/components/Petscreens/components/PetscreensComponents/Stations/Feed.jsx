import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petActivityOptionImageKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { helpersFlagCloser } from "../../../../../helpers/Helpers.js";
import { petScreensHelpersStartActivity, petScreensHelpersPauseAudio, petScreensHelpersQuitActivity, petScreensHelpersManageHealth} from "../../../helpers/Helpers.js";

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

            helpersFlagCloser(setFeedOpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (feedOptionsSelection !== -1 && !feedStart && !feedDone){

            petScreensHelpersStartActivity(setFeedStart);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!feedDone){

            petScreensHelpersQuitActivity(feedAudioRef, setFeedOpenFlag);

        }

    },
        ".Quit"
    );



    useEffect(() => {

        const feedPreloadImages = [feedAnimationImage];

        feedPreloadImages.forEach((src) => {
        const feedImg = new Image();
            feedImg.src = src;
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

        const feedInterval = setInterval(() => {

            const feedIntervalCurrSeconds = feedCurrNumberRef.current + 1;
            setFeedCurrNumber(feedIntervalCurrSeconds);

            if (feedIntervalCurrSeconds >= feedOptionsTotal){
                clearInterval(feedInterval);

                petScreensHelpersPauseAudio(feedAudioRef.current);
                setFeedDone(true);
                petScreensHelpersManageHealth(feedGlobalTimerRef.current, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampFeedingKey, feedOptionsDesiredOption, setFeedOptionsDesiredOption, feedOptionsSelection, setFeedSuccess);
            }

        }, 1000);

        return () => clearInterval(feedInterval);

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

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">
                
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
                                            <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpersStartActivity(setFeedStart)}> Start <br/> [return]</button>
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
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => helpersFlagCloser(setFeedOpenFlag)}>Done <br/> [return]</button>
                </div>
               
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => petScreensHelpersQuitActivity(feedAudioRef, setFeedOpenFlag)}>Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Feed;