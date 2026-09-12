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
import { petScreensHelpers_Canceller_PetImmersionSounds, petScreensHelpers_Canceller_Activities, petScreensHelpers_Manager_PetHealth, optionSelectionManager} from "../../../helpers/Helpers.js";

import Feeding from "../../../../../Music/PetImmersionSounds/Feeding.mp3";

import "../../../../../App.css";
import "./Feed.css";



function Feed ({feed_CurrStageAnimationImage, feed_OptionsCurrSpeciesList, feed_OptionsCurrDesiredOption, set_Feed_OptionsCurrDesiredOption, set_Feed_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [feed_OptionsTotalNumber, set_Feed_OptionsTotalNumber] = useState(10);
    const [feed_CurrNumber, set_Feed_CurrNumber] = useState(0);
    const [feed_OptionsUserSelection, set_Feed_OptionsUserSelection] = useState(-1);
    const [feed_Success, set_Feed_Success] = useState(false);
    const [feed_Confirmed, set_Feed_Confirmed] = useState(false);

    const feed_GlobalTimerRef = useRef(GlobalTimer);
    const feed_CurrNumberRef = useRef(feed_CurrNumber);
    const feed_AudioRef = useRef(new Audio(Feeding));


    useKeyboardShortcut("Enter", () => {
    
        if (feed_OptionsUserSelection !== -1 && !feed_Confirmed){

            optionSelectionManager(feed_OptionsCurrDesiredOption, feed_OptionsUserSelection, set_Feed_OptionsTotalNumber, set_Feed_Confirmed);

        }

    },
        ".Confirm"
    );


    useKeyboardShortcut("Escape", () => {

        petScreensHelpers_Canceller_Activities(feed_AudioRef, set_Feed_OpenFlag);

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

        if (!feed_Confirmed) {
            return;
        }

        const feed_Interval = setInterval(() => {

            const feed_Interval_CurrSeconds = feed_CurrNumberRef.current + 1;
            set_Feed_CurrNumber(feed_Interval_CurrSeconds);

            if (feed_Interval_CurrSeconds >= feed_OptionsTotalNumber){
                clearInterval(feed_Interval);

                petScreensHelpers_Canceller_PetImmersionSounds(feed_AudioRef.current);
                petScreensHelpers_Manager_PetHealth(feed_GlobalTimerRef.current, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampFeedingKey, feed_OptionsCurrDesiredOption, set_Feed_OptionsCurrDesiredOption, feed_OptionsUserSelection, set_Feed_Success);
                helpers_Closer_Flags(set_Feed_OpenFlag);
            }

        }, 1000);

        return () => clearInterval(feed_Interval);

    }, [feed_Confirmed]);



    useEffect(() => {

        if (!feed_Confirmed) {
            return;
        }

        feed_AudioRef.current.loop = true;
        feed_AudioRef.current.play();

        return () => {
            feed_AudioRef.current.pause();
            feed_AudioRef.current.currentTime = 0;
            feed_AudioRef.current.loop = false;
        };

    }, [feed_Confirmed]);


    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Global">
                
            {!feed_Confirmed ? (

                <OptionsComponent
                    options_CurrDesiredOption = {feed_OptionsCurrDesiredOption}
                    options_CurrSpeciesList = {feed_OptionsCurrSpeciesList} 
                    options_UserSelection={feed_OptionsUserSelection}
                    set_Options_UserSelection = {set_Feed_OptionsUserSelection}
                />
        
            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview">Wait for your pet as it eats:</h1>
                    
                    <ProgressBarComponent
                        progressBar_CurrPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((feed_CurrNumber/feed_OptionsTotalNumber) * 100)))}
                    />

                    <div className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--FloatingFlag MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">  

                        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Feed_ComponentContainer-Template--WindowScreen">

                            <img src = {feed_CurrStageAnimationImage} />

                        </div>

                    </div>

                </div>

            )}

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
            

                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlag" onClick = {() => petScreensHelpers_Canceller_Activities(feed_AudioRef, set_Feed_OpenFlag)}>Quit <br/> [esc]</button>


                {feed_OptionsUserSelection === -1 || feed_Confirmed ? (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlag"> Confirm <br/> [return]</button>                    

                ) : (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlag Confirm" onClick={() => optionSelectionManager(feed_OptionsCurrDesiredOption, feed_OptionsUserSelection, set_Feed_OptionsTotalNumber, set_Feed_Confirmed)}> Confirm <br/> [return]</button>

                )}

            </div>

        </div>

    );

}


export default Feed;