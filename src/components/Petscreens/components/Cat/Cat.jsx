import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import MusicVolume from "../../../GlobalComponents/components/MusicVolume.jsx";
import Inventory from "../../../GlobalComponents/components/Inventory.jsx";
import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Play from "../PetscreensComponents/Stations/Play.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";
import MouseHunt from "./CatComponents/MouseHunt.jsx";
import FeatherFishing from "./CatComponents/FeatherFishing.jsx";

import {petStageKey, petActivityTimeStampFeedingKey, petHealthKey, petActivityTimeStampPlayingKey, petMedicineKey, petActivityTimeStampMedicineDoseTimeGapKey, petSpeciesCatKey, petSpeciesHealthCapList, petSpeciesActivityTimeStampTimeLimitList, petActivityOptionNameKey, petActivityOptionImageKey, petActivityOptionGameKey, petSoundHappyKey, petSoundSadKey, petSoundSleepKey, petActivityTimeStampLastPerformedKey } from "../../../../constants/Constants.js";
import { petScreensHelpers_HomeNavigator, petScreensHelpers_AudioCanceller } from "../../helpers/Helpers.js";
import { helpers_FlagOpener } from "../../../../helpers/Helpers.js";

import HappyMeow from "../../../../Music/PetImmersionSounds/Cat/HappyMeow.mp3";
import SadMeow from "../../../../Music/PetImmersionSounds/Cat/SadMeow.mp3";
import Sleeping from "../../../../Music/PetImmersionSounds/Sleeping.mp3";
import Candle from "../../../../Music/PetImmersionSounds/Cat/Candle.mp3";

import MainStageOneOne from "../../../../images/Cat/Main/Awake/StageOneOne.png";
import MainStageOneTwo from "../../../../images/Cat/Main/Awake/StageOneTwo.png";
import MainStageOneThree from "../../../../images/Cat/Main/Awake/StageOneThree.png";
import MainStageOneFour from "../../../../images/Cat/Main/Awake/StageOneFour.png";
import MainStageTwoOne from "../../../../images/Cat/Main/Awake/StageTwoOne.png";
import MainStageTwoTwo from "../../../../images/Cat/Main/Awake/StageTwoTwo.png";
import MainStageTwoThree from "../../../../images/Cat/Main/Awake/StageTwoThree.png";
import MainStageTwoFour from "../../../../images/Cat/Main/Awake/StageTwoFour.png";
import MainStageThreeOne from "../../../../images/Cat/Main/Awake/StageThreeOne.png";
import MainStageThreeTwo from "../../../../images/Cat/Main/Awake/StageThreeTwo.png";
import MainStageThreeThree from "../../../../images/Cat/Main/Awake/StageThreeThree.png";
import MainStageThreeFour from "../../../../images/Cat/Main/Awake/StageThreeFour.png";

import SleepStageOne from "../../../../images/Cat/Main/Asleep/StageOne.gif";
import SleepStageTwo from "../../../../images/Cat/Main/Asleep/StageTwo.gif";
import SleepStageThree from "../../../../images/Cat/Main/Asleep/StageThree.gif";

import FeedStageOne from "../../../../images/Cat/Feed/Animation/StageOne.gif";
import FeedStageTwo from "../../../../images/Cat/Feed/Animation/StageTwo.gif";
import FeedStageThree from "../../../../images/Cat/Feed/Animation/StageThree.gif";

import MedicineStageOne from "../../../../images/Cat/Medicine/Animation/StageOne.gif";
import MedicineStageTwo from "../../../../images/Cat/Medicine/Animation/StageTwo.gif";
import MedicineStageThree from "../../../../images/Cat/Medicine/Animation/StageThree.gif";

import NullPlaceholder from "../../../../images/NullPlaceholder.png";

import Tuna from "../../../../images/Cat/Feed/Options/Tuna.png";
import Chicken from "../../../../images/Cat/Feed/Options/Chicken.png";
import Salmon from "../../../../images/Cat/Feed/Options/Salmon.png";
import Magnifier from "../../../../images/Cat/Play/Options/Magnifier.png";
import Rod from "../../../../images/Cat/Play/Options/Rod.png";
import Pill from "../../../../images/Cat/Medicine/Options/Pill.png";
import Tablet from "../../../../images/Cat/Medicine/Options/Tablet.png";
import Notifications from "../../../GlobalComponents/components/Notifications.jsx";




function Cat (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [cat_MusicVolumeOpenFlag, set_Cat_MusicVolumeOpenFlag] = useState(false);
    const [cat_InventoryOpenFlag, set_Cat_InventoryOpenFlag] = useState(false);
    const [cat_ActivityInProgress, set_Cat_ActivityInProgress] = useState(false);
    const [cat_FeedOpenFlag, set_Cat_FeedOpenFlag] = useState(false);
    const [cat_PlayOpenFlag, set_Cat_PlayOpenFlag] = useState(false);
    const [cat_MedicineOpenFlag, set_Cat_MedicineOpenFlag] = useState(false);
    const [cat_ScheduleOpenFlag, set_Cat_ScheduleOpenFlag] = useState(false);
    const [cat_RecordsOpenFlag, set_Cat_RecordsOpenFlag] = useState(false);
    const [cat_FeedOptionsCurrDesiredOption, set_Cat_FeedOptionsCurrDesiredOption] = useState(-1);
    const [cat_PlayOptionsCurrDesiredOption, set_Cat_PlayOptionsCurrDesiredOption] = useState(-1);
    const [cat_MedicineOptionsCurrDesiredOption, set_Cat_MedicineOptionsCurrDesiredOption] = useState(-1);

    const cat_Alive = ActivePetName === "" ? 
                            false
                        :   PetList[ActivePetName][petHealthKey] === 0 ? 
                                false
                                : true;


    const cat_Hungry = ActivePetName === "" ? 
                            false
                        :   (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey][petActivityTimeStampFeedingKey]/2 ? 
                                true 
                                : false;
                            
    const cat_Restless = ActivePetName === "" ? 
                            false
                        :    (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey][petActivityTimeStampPlayingKey]/2 ? 
                                true 
                                : false;


    const cat_Unwell =  ActivePetName === "" ? 
                            false
                        :    PetList[ActivePetName][petHealthKey] >= petSpeciesHealthCapList[petSpeciesCatKey][PetList[ActivePetName][petStageKey]] ? 
                                false
                                : true;


    const cat_CurrMood = ActivePetName === "" ? 
                        -1
                    :   PetList[ActivePetName][petHealthKey]/petSpeciesHealthCapList[petSpeciesCatKey][PetList[ActivePetName][petStageKey]] >= 0.5 ? 
                            1
                        :   0;


    const cat_CanReceiveDose = ActivePetName === "" ? 
                                    false
                                :   GlobalTimer - PetList[ActivePetName][petMedicineKey] <= petActivityTimeStampMedicineDoseTimeGapKey ? 
                                        false
                                        : true;


    const cat_MainCurrStageAnimationImages = ActivePetName === "" ? 
                                [[NullPlaceholder,NullPlaceholder], [NullPlaceholder,NullPlaceholder]]
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        [[MainStageOneOne, MainStageOneTwo], [MainStageOneThree, MainStageOneFour]]
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        [[MainStageTwoOne, MainStageTwoTwo], [MainStageTwoThree, MainStageTwoFour]]
                                    : [[MainStageThreeOne, MainStageThreeTwo], [MainStageThreeThree, MainStageThreeFour]];


    const cat_MainCurrStageSleepAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        SleepStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        SleepStageTwo
                                    : SleepStageThree;

    const cat_FeedCurrStageAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        FeedStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        FeedStageTwo
                                    : FeedStageThree; 

    const cat_MedicineCurrStageAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        MedicineStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        MedicineStageTwo
                                    : MedicineStageThree;



    const cat_FeedOptionsList = [{[petActivityOptionNameKey]: "Tuna", [petActivityOptionImageKey]: Tuna}, {[petActivityOptionNameKey]: "Chicken", [petActivityOptionImageKey]: Chicken}, {[petActivityOptionNameKey]: "Salmon", [petActivityOptionImageKey]: Salmon}];
    const cat_PlayOptionsList = [{[petActivityOptionNameKey]: "Mouse Hunt", [petActivityOptionImageKey]: Magnifier, [petActivityOptionGameKey]: MouseHunt}, {[petActivityOptionNameKey]: "Feather Fishing", [petActivityOptionImageKey]: Rod, [petActivityOptionGameKey]: FeatherFishing}];
    const cat_MedicineOptionsList = [{[petActivityOptionNameKey]: "Pill", [petActivityOptionImageKey]: Pill}, {[petActivityOptionNameKey]: "Tablet", [petActivityOptionImageKey]: Tablet}];

    const cat_AudioRefs = useRef({[petSoundHappyKey]: new Audio(HappyMeow), [petSoundSadKey]: new Audio(SadMeow), [petSoundSleepKey]: new Audio(Sleeping)});
    const cat_BackgroundAudioRef = useRef(new Audio(Candle));

    const cat_Navigate = useNavigate();
        

    useKeyboardShortcut("v", () => {
        
        if (!cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    useKeyboardShortcut("i", () => {
        
        if (!cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );

        
    useKeyboardShortcut("1", () => {

        if (!cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            petScreensHelpers_HomeNavigator(setActivePetName);
            cat_Navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_RecordsOpenFlag, 0);

        }

    },
        ".Records"
    );


    useKeyboardShortcut("3", () => {

        if (!cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_ScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
        


    useKeyboardShortcut("4", () => {

        if (cat_Alive && !cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_FeedOpenFlag, 0);

        }

    },
        ".Feed"
    );    


    useKeyboardShortcut("5", () => {

        if (cat_Alive && !cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_PlayOpenFlag, 0);

        }

    },
        ".Play"
    );
    


    useKeyboardShortcut("6", () => {

        if (cat_Alive && cat_CanReceiveDose && !cat_FeedOpenFlag && !cat_PlayOpenFlag && !cat_MedicineOpenFlag && !cat_ScheduleOpenFlag && !cat_RecordsOpenFlag && !cat_MusicVolumeOpenFlag && !cat_InventoryOpenFlag){

            helpers_FlagOpener(set_Cat_MedicineOpenFlag, 0);

        }

    },
        ".Medicine"
    );



    useEffect(() => {
        if (cat_FeedOpenFlag || cat_PlayOpenFlag || cat_MedicineOpenFlag) {
            set_Cat_ActivityInProgress(true);
        } else {
            set_Cat_ActivityInProgress(false);
        }
    }, [cat_FeedOpenFlag, cat_PlayOpenFlag, cat_MedicineOpenFlag]);
    
    
    useEffect(() => {

        if (ActivePetName === "" || cat_ActivityInProgress){

            Object.values(cat_AudioRefs.current).forEach(audio => {
                petScreensHelpers_AudioCanceller(audio);
            });

            petScreensHelpers_AudioCanceller(cat_BackgroundAudioRef.current);

        } else {

            cat_BackgroundAudioRef.current.play();
            cat_BackgroundAudioRef.current.volume = 0.5;
            cat_BackgroundAudioRef.current.loop = true;

        }

    }, [ActivePetName, cat_ActivityInProgress]);



    useEffect(() => {

        if (cat_Hungry){

            set_Cat_FeedOptionsCurrDesiredOption(Math.floor(Math.random() * cat_FeedOptionsList.length));

        }

        if (cat_Restless){

            set_Cat_PlayOptionsCurrDesiredOption(Math.floor(Math.random() * cat_PlayOptionsList.length));

        }

        if (cat_Unwell){

            set_Cat_MedicineOptionsCurrDesiredOption(Math.floor(Math.random() * cat_MedicineOptionsList.length));

        }

    }, [cat_Hungry, cat_Restless, cat_Unwell]);




    

    return (

        <>

            {cat_MusicVolumeOpenFlag && 
            <MusicVolume
                set_MusicVolume_OpenFlag={set_Cat_MusicVolumeOpenFlag}
            />}

            {cat_InventoryOpenFlag && 
            <Inventory
                set_Inventory_OpenFlag={set_Cat_InventoryOpenFlag}
            />}

            {cat_FeedOpenFlag &&
            <Feed
                feed_CurrStageAnimationImage={cat_FeedCurrStageAnimationImage}
                feed_OptionsCurrSpeciesList={cat_FeedOptionsList}
                feed_OptionsCurrDesiredOption = {cat_FeedOptionsCurrDesiredOption}
                set_Feed_OptionsCurrDesiredOption = {set_Cat_FeedOptionsCurrDesiredOption}
                set_Feed_OpenFlag = {set_Cat_FeedOpenFlag}
            />}

            {cat_PlayOpenFlag &&
            <Play
                play_OptionsCurrSpeciesList={cat_PlayOptionsList}
                play_OptionsCurrDesiredOption = {cat_PlayOptionsCurrDesiredOption}
                set_Play_OptionsCurrDesiredOption = {set_Cat_PlayOptionsCurrDesiredOption}
                set_Play_OpenFlag = {set_Cat_PlayOpenFlag}
            />}

            {cat_MedicineOpenFlag &&
            <Medicine
                medicine_CurrStageAnimationImage={cat_MedicineCurrStageAnimationImage}
                medicine_OptionsCurrSpeciesList={cat_MedicineOptionsList}
                medicine_OptionsCurrDesiredOption = {cat_MedicineOptionsCurrDesiredOption}
                set_Medicine_OptionsCurrDesiredOption = {set_Cat_MedicineOptionsCurrDesiredOption}
                set_Medicine_OpenFlag = {set_Cat_MedicineOpenFlag}
            />}

            {cat_ScheduleOpenFlag &&
            <Schedule
                set_Schedule_OpenFlag={set_Cat_ScheduleOpenFlag}
            />}

            {cat_RecordsOpenFlag &&
            <Records
                set_Records_OpenFlag = {set_Cat_RecordsOpenFlag}
            />}
        
            <div className = "UIStapleElements_Background-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => petScreensHelpers_HomeNavigator(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => helpers_FlagOpener(set_Cat_RecordsOpenFlag, 0)}> Records <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => helpers_FlagOpener(set_Cat_ScheduleOpenFlag, 0)}> Schedule <br/> [3]</button>

                    {cat_Alive ? (

                        <>
                            <button className={cat_Hungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {() => helpers_FlagOpener(set_Cat_FeedOpenFlag, 0)}> Feed <br/> [4]</button>
                            <button className={cat_Restless ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Play" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Play"} onClick = {() => helpers_FlagOpener(set_Cat_PlayOpenFlag, 0)}> Play <br/> [5] </button>

                            {cat_CanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Medicine" onClick = {() => helpers_FlagOpener(set_Cat_MedicineOpenFlag, 0)}> Medicine <br/> [6]</button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine <br/> [6]</button>

                            )}
                        
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Feed <br/> [4]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Play <br/> [5]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine <br/> [6]</button>
                        </>

                    )}

                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline">Living Room:</h1>
                    <Main
                        main_CurrStageAnimationImages={cat_MainCurrStageAnimationImages}
                        main_CurrStageSleepAnimationImage = {cat_MainCurrStageSleepAnimationImage}
                        main_CurrSpeciesAudios = {cat_AudioRefs}
                        main_CurrPetEnergy = {450}
                        main_CurrMood = {cat_CurrMood}
                        main_ActivityInProgress = {cat_ActivityInProgress}
                    />
                </div>

            </div>

            <Notifications/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_FlagOpener(set_Cat_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_FlagOpener(set_Cat_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
            </div>

        </>

    );

}


export default Cat;