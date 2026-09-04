import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBarComponent from "./StationsComponents/ProgressBar.jsx";
import OptionsComponent from "./StationsComponents/Options.jsx";

import { petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petActivityOptionImageKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { helpers_Closer_Flags } from "../../../../../helpers/Helpers.js";
import { petScreensHelpers_Starter_Activities, petScreensHelpers_Canceller_PetImmersionSounds, petScreensHelpers_Canceller_Activities, petScreensHelpers_Manager_PetHealth} from "../../../helpers/Helpers.js";

import Feeding from "../../../../../Music/PetImmersionSounds/Feeding.mp3";

import "./Feed.css";



function Feed ({feed_CurrStageAnimationImage, feed_OptionsCurrSpeciesList, feed_OptionsCurrDesiredOption, set_Feed_OptionsCurrDesiredOption, set_Feed_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [feed_Start, set_Feed_Start] = useState(false);
    const [feed_OptionsTotalNumber, set_Feed_OptionsTotalNumber] = useState(10);
    const [feed_CurrNumber, set_Feed_CurrNumber] = useState(0);
    const [feed_Done, set_Feed_Done] = useState(false);
    const [feed_OptionsUserSelection, set_Feed_OptionsUserSelection] = useState(-1);
    const [feed_Success, set_Feed_Success] = useState(false);

    const feed_GlobalTimerRef = useRef(GlobalTimer);
    const feed_CurrNumberRef = useRef(feed_CurrNumber);
    const feed_AudioRef = useRef(new Audio(Feeding));


    useKeyboardShortcut("Enter", () => {
    
        if (feed_Done){

            helpers_Closer_Flags(set_Feed_OpenFlag);

        }

    },
        ".Done"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        if (feed_OptionsUserSelection !== -1 && !feed_Start && !feed_Done){

            petScreensHelpers_Starter_Activities(set_Feed_Start);

        }

    },
        ".Start"
    );



    useKeyboardShortcut("Escape", () => {

        if (!feed_Done){

            petScreensHelpers_Canceller_Activities(feed_AudioRef, set_Feed_OpenFlag);

        }

    },
        ".Quit"
    );



    useEffect(() => {

        const feed_CurrPreloadImages = [feed_CurrStageAnimationImage];

        feed_CurrPreloadImages.forEach((src) => {
        const feed_Img = new Image();
            feed_Img.src = src;
        });

    }, [feed_CurrStageAnimationImage]);

    useEffect(() => {
        feed_GlobalTimerRef.current = GlobalTimer;
    }, [GlobalTimer]);
    
    useEffect(() => {
        feed_CurrNumberRef.current = feed_CurrNumber;
    }, [feed_CurrNumber]);


    useEffect(() => {

        if (!feed_Start || feed_Done) {
            return;
        }

        const feed_Interval = setInterval(() => {

            const feed_Interval_CurrSeconds = feed_CurrNumberRef.current + 1;
            set_Feed_CurrNumber(feed_Interval_CurrSeconds);

            if (feed_Interval_CurrSeconds >= feed_OptionsTotalNumber){
                clearInterval(feed_Interval);

                petScreensHelpers_Canceller_PetImmersionSounds(feed_AudioRef.current);
                set_Feed_Done(true);
                petScreensHelpers_Manager_PetHealth(feed_GlobalTimerRef.current, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampFeedingKey, feed_OptionsCurrDesiredOption, set_Feed_OptionsCurrDesiredOption, feed_OptionsUserSelection, set_Feed_Success);
            }

        }, 1000);

        return () => clearInterval(feed_Interval);

    }, [feed_Start, feed_Done]);



    useEffect(() => {

        if (!feed_Start || feed_Done) {
            return;
        }

        feed_AudioRef.current.loop = true;
        feed_AudioRef.current.play();

        return () => {
            feed_AudioRef.current.pause();
            feed_AudioRef.current.currentTime = 0;
            feed_AudioRef.current.loop = false;
        };

    }, [feed_Start, feed_Done]);

    


    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">
                
            {feed_OptionsUserSelection === -1 ? (

                <OptionsComponent
                    options_CurrDesiredOption = {feed_OptionsCurrDesiredOption}
                    options_CurrSpeciesList = {feed_OptionsCurrSpeciesList} 
                    set_Options_TotalNumber = {set_Feed_OptionsTotalNumber}
                    set_Options_UserSelection = {set_Feed_OptionsUserSelection}
                />
        
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBarComponent
                        progressBar_CurrPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((feed_CurrNumber/feed_OptionsTotalNumber) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                            {feed_Done ? (

                                feed_Success ? (
                               
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

                                    {feed_Start ? (

                                        <img src = {feed_CurrStageAnimationImage} />

                                    ) : (

                                        <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                                            <h2>Wait for your pet as it eats.</h2> 
                                            <button className = "UIStapleElements_ComponentButtonRectangle-Structure--GlobalClick UIStapleElements_ComponentButtonRectangle-Color--GlobalClick Start" onClick = {() => petScreensHelpers_Starter_Activities(set_Feed_Start)}> Start <br/> [return]</button>
                                        </div>

                                    )}

                                </div>

                            )}

                    </div>

                </div>

            )}


            {feed_Done ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalNavigationButtonRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Done" onClick = {() => helpers_Closer_Flags(set_Feed_OpenFlag)}>Done <br/> [return]</button>
                </div>
               
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalNavigationButtonRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation Quit" onClick = {() => petScreensHelpers_Canceller_Activities(feed_AudioRef, set_Feed_OpenFlag)}>Quit <br/> [esc] </button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Feed;