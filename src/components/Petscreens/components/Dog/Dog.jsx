import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import MusicVolumeComponent from "../../../GlobalComponents//components/MusicVolume.jsx";
import InventoryComponent from "../../../GlobalComponents/components/Inventory.jsx";
import StrollPatrolComponent from "./DogComponents/StrollPatrol.jsx";
import PawformerComponent from "./DogComponents/Pawformer.jsx";
import MainComponent from "../PetscreensComponents/Main.jsx";
import FeedComponent from "../PetscreensComponents/Stations/Feed.jsx";
import CleanComponent from "../PetscreensComponents/Stations/Clean.jsx";
import PlayComponent from "../PetscreensComponents/Stations/Play.jsx";
import MedicineComponent from "../PetscreensComponents/Stations/Medicine.jsx";
import ScheduleComponent from "../PetscreensComponents/Nonstations/Schedule.jsx";
import RecordsComponent from "../PetscreensComponents/Nonstations/Records.jsx";
import NotificationsComponent from "../../../GlobalComponents/components/Notifications.jsx";

import { petStageKey, petActivityTimeStampCleaningKey, petActivityTimeStampFeedingKey, petHealthKey, petActivityTimeStampPlayingKey, petMedicineKey, petActivityTimeStampMedicineDoseTimeGapKey, petSpeciesDogKey, petSpeciesHealthCapList, petSpeciesActivityTimeStampTimeLimitList, petActivityOptionNameKey, petActivityOptionImageKey, petActivityOptionCursorKey, petActivityOptionGameKey, petSoundHappyKey, petSoundSadKey, petSoundSleepKey, petActivityTimeStampLastPerformedKey} from "../../../../constants/Constants.js";
import { petScreensHelpers_Navigator_Home, petScreensHelpers_Canceller_PetImmersionSounds } from "../../helpers/Helpers.js";
import { helpers_Opener_Flags } from "../../../../helpers/Helpers.js";

import HappyBarks from "../../../../Music/PetImmersionSounds/Dog/HappyBarks.mp3";
import SadWhine from "../../../../Music/PetImmersionSounds/Dog/SadWhine.mp3";
import fireplace from "../../../../Music/PetImmersionSounds/Dog/Fireplace.mp3";
import Sleeping from "../../../../Music/PetImmersionSounds/Sleeping.mp3";


import MainStageOneOne from "../../../../images/Dog/Main/Awake/StageOneOne.png";
import MainStageOneTwo from "../../../../images/Dog/Main/Awake/StageOneTwo.png";
import MainStageOneThree from "../../../../images/Dog/Main/Awake/StageOneThree.png";
import MainStageOneFour from "../../../../images/Dog/Main/Awake/StageOneFour.png";
import MainStageTwoOne from "../../../../images/Dog/Main/Awake/StageTwoOne.png";
import MainStageTwoTwo from "../../../../images/Dog/Main/Awake/StageTwoTwo.png";
import MainStageTwoThree from "../../../../images/Dog/Main/Awake/StageTwoThree.png";
import MainStageTwoFour from "../../../../images/Dog/Main/Awake/StageTwoFour.png";
import MainStageThreeOne from "../../../../images/Dog/Main/Awake/StageThreeOne.png";
import MainStageThreeTwo from "../../../../images/Dog/Main/Awake/StageThreeTwo.png";
import MainStageThreeThree from "../../../../images/Dog/Main/Awake/StageThreeThree.png";
import MainStageThreeFour from "../../../../images/Dog/Main/Awake/StageThreeFour.png";

import SleepStageOne from "../../../../images/Dog/Main/Asleep/StageOne.gif";
import SleepStageTwo from "../../../../images/Dog/Main/Asleep/StageTwo.gif";
import SleepStageThree from "../../../../images/Dog/Main/Asleep/StageThree.gif";

import FeedStageOne from "../../../../images/Dog/Feed/Animation/StageOne.gif";
import FeedStageTwo from "../../../../images/Dog/Feed/Animation/StageTwo.gif";
import FeedStageThree from "../../../../images/Dog/Feed/Animation/StageThree.gif";

import CleanStageOne from "../../../../images/Dog/Clean/Animation/StageOne.gif";
import CleanStageTwo from "../../../../images/Dog/Clean/Animation/StageTwo.gif";
import CleanStageThree from "../../../../images/Dog/Clean/Animation/StageThree.gif";

import MedicineStageOne from "../../../../images/Dog/Medicine/Animation/StageOne.gif";
import MedicineStageTwo from "../../../../images/Dog/Medicine/Animation/StageTwo.gif";
import MedicineStageThree from "../../../../images/Dog/Medicine/Animation/StageThree.gif";

import NullPlaceholder from "../../../../images/NullPlaceholder.png";

import Beef from "../../../../images/Dog/Feed/Options/Beef.png";
import Turkey from "../../../../images/Dog/Feed/Options/Turkey.png";
import Lamb from "../../../../images/Dog/Feed/Options/Lamb.png";
import Soap from "../../../../images/Dog/Clean/Options/Soap.png";
import Brush from "../../../../images/Dog/Clean/Options/Brush.png";
import CursorSoap from "../../../../images/Dog/Clean/Options/Soap.cur";
import CursorBrush from "../../../../images/Dog/Clean/Options/Brush.cur";
import Leash from "../../../../images/Dog/Play/Options/Leash.png";
import Mask from "../../../../images/Dog/Play/Options/Mask.png";
import Pill from "../../../../images/Dog/Medicine/Options/Pill.png";
import Chew from "../../../../images/Dog/Medicine/Options/Chew.png";




function Dog (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [dog_MusicVolumeOpenFlag, set_Dog_MusicVolumeOpenFlag] = useState(false);
    const [dog_InventoryOpenFlag, set_Dog_InventoryOpenFlag] = useState(false);
    const [dog_ActivityInProgress, set_Dog_ActivityInProgress] = useState(false);
    const [dog_FeedOpenFlag, set_Dog_FeedOpenFlag] = useState(false);
    const [dog_CleanOpenFlag, set_Dog_CleanOpenFlag] = useState(false);
    const [dog_PlayOpenFlag, set_Dog_PlayOpenFlag] = useState(false);
    const [dog_MedicineOpenFlag, set_Dog_MedicineOpenFlag] = useState(false);
    const [dog_RecordsOpenFlag, set_Dog_RecordsOpenFlag] = useState(false);
    const [dog_ScheduleOpenFlag, set_Dog_ScheduleOpenFlag] = useState(false);
    const [dog_FeedOptionsCurrDesiredOption, set_Dog_FeedOptionsCurrDesiredOption] = useState(-1);
    const [dog_CleanOptionsCurrDesiredOption, set_Dog_CleanOptionsCurrDesiredOption] = useState(-1);
    const [dog_PlayOptionsCurrDesiredOption, set_Dog_PlayOptionsCurrDesiredOption] = useState(-1);
    const [dog_MedicineOptionsCurrDesiredOption, set_Dog_MedicineOptionsCurrDesiredOption] = useState(-1);

    const dog_Alive = ActivePetName === "" ? 
                            false
                        :   PetList[ActivePetName][petHealthKey] === 0 ? 
                                false
                                : true;

    const dog_Hungry = ActivePetName === "" ? 
                            false
                        :    (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey][petActivityTimeStampFeedingKey]/2 ? 
                                true 
                                : false;

    const dog_Dirty = ActivePetName === "" ? 
                            false
                        :   (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey][petActivityTimeStampCleaningKey]/2 ? 
                                true
                                : false;
                            
    const dog_Restless = ActivePetName === "" ? 
                            false
                        :   (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey][petActivityTimeStampPlayingKey]/2 ? 
                                true 
                                : false;

    const dog_Unwell = ActivePetName === "" ? 
                        false
                    :   PetList[ActivePetName][petHealthKey] >= petSpeciesHealthCapList[petSpeciesDogKey][PetList[ActivePetName][petStageKey]] ? 
                            false
                            : true;


    const dog_CurrMood = ActivePetName === "" ? 
                        -1
                    :   PetList[ActivePetName][petHealthKey]/petSpeciesHealthCapList[petSpeciesDogKey][PetList[ActivePetName][petStageKey]] >= 0.5 ? 
                            1
                        :   0;

    const dog_CanReceiveDose = ActivePetName === "" ? 
                                    false
                                :   GlobalTimer - PetList[ActivePetName][petMedicineKey] <= petActivityTimeStampMedicineDoseTimeGapKey ? 
                                        false
                                        : true;


    const dog_MainCurrStageAnimationImages = ActivePetName === "" ? 
                            [[NullPlaceholder,NullPlaceholder], [NullPlaceholder,NullPlaceholder]]
                        :   PetList[ActivePetName][petStageKey] === 0 ? 
                                    [[MainStageOneOne, MainStageOneTwo], [MainStageOneThree, MainStageOneFour]]
                                : PetList[ActivePetName][petStageKey] === 1 ? 
                                    [[MainStageTwoOne, MainStageTwoTwo], [MainStageTwoThree, MainStageTwoFour]]
                                : [[MainStageThreeOne, MainStageThreeTwo], [MainStageThreeThree, MainStageThreeFour]];

    const dog_MainCurrStageSleepAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        SleepStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        SleepStageTwo
                                    : SleepStageThree;

    const dog_FeedCurrStageAnimationImage = ActivePetName === "" ? 
                            NullPlaceholder
                        :   PetList[ActivePetName][petStageKey] === 0 ? 
                                    FeedStageOne
                                : PetList[ActivePetName][petStageKey] === 1 ? 
                                    FeedStageTwo
                                : FeedStageThree;

    const dog_CleanCurrStageAnimationImage = ActivePetName === "" ? 
                            NullPlaceholder
                        :   PetList[ActivePetName][petStageKey] === 0 ? 
                                    CleanStageOne
                                : PetList[ActivePetName][petStageKey] === 1 ? 
                                    CleanStageTwo
                                : CleanStageThree;

    const dog_MedicineCurrStageAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        MedicineStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        MedicineStageTwo
                                    : MedicineStageThree;


    const dog_FeedOptionsList = [{[petActivityOptionNameKey]: "Beef", [petActivityOptionImageKey]: Beef}, {[petActivityOptionNameKey]: "Turkey", [petActivityOptionImageKey]: Turkey}, {[petActivityOptionNameKey]: "Lamb", [petActivityOptionImageKey]: Lamb}]; 
    const dog_CleanOptionsList = [{[petActivityOptionNameKey]: "Soap", [petActivityOptionImageKey]: Soap, [petActivityOptionCursorKey]: CursorSoap}, {[petActivityOptionNameKey]: "Brush", [petActivityOptionImageKey]: Brush, [petActivityOptionCursorKey]: CursorBrush}];
    const dog_PlayOptionsList = [{[petActivityOptionNameKey]: "Stroll Patrol", [petActivityOptionImageKey]: Leash, [petActivityOptionGameKey]: StrollPatrolComponent}, {[petActivityOptionNameKey]: "Pawformer", [petActivityOptionImageKey]: Mask, [petActivityOptionGameKey]: PawformerComponent}];
    const dog_MedicineOptionsList = [{[petActivityOptionNameKey]: "Pill", [petActivityOptionImageKey]: Pill}, {[petActivityOptionNameKey]: "Chew", [petActivityOptionImageKey]: Chew}];

    const dog_AudioRefs = useRef({[petSoundHappyKey]: new Audio(HappyBarks), [petSoundSadKey]: new Audio(SadWhine), [petSoundSleepKey]: new Audio(Sleeping)});
    const dog_BackgroundAudioRef = useRef(new Audio(fireplace));

    const dog_Navigate = useNavigate();
    

    useKeyboardShortcut("v", () => {
            
        if (!dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    useKeyboardShortcut("i", () => {
            
        if (!dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {

        if (!dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            petScreensHelpers_Navigator_Home(setActivePetName);
            dog_Navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_RecordsOpenFlag, 0);

        }

    },
        ".Records"
    );



    useKeyboardShortcut("3", () => {

        if (!dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_ScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );



    useKeyboardShortcut("4", () => {

        if (dog_Alive && !dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_FeedOpenFlag, 0);

        }

    },
        ".Feed"
    );


    useKeyboardShortcut("5", () => {

        if (dog_Alive && !dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_CleanOpenFlag, 0);

        }

    },
        ".Clean"
    );
    
    


    useKeyboardShortcut("6", () => {

        if (dog_Alive && !dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_PlayOpenFlag, 0);

        }

    },
        ".Play"
    );
    


    useKeyboardShortcut("7", () => {

        if (dog_Alive && dog_CanReceiveDose && !dog_FeedOpenFlag && !dog_CleanOpenFlag && !dog_PlayOpenFlag && !dog_MedicineOpenFlag && !dog_ScheduleOpenFlag && !dog_RecordsOpenFlag && !dog_MusicVolumeOpenFlag && !dog_InventoryOpenFlag){

            helpers_Opener_Flags(set_Dog_MedicineOpenFlag, 0);

        }

    },
        ".Medicine"
    );
    



    useEffect(() => {
        if (dog_FeedOpenFlag || dog_CleanOpenFlag || dog_PlayOpenFlag || dog_MedicineOpenFlag) {
            set_Dog_ActivityInProgress(true);
        } else {
            set_Dog_ActivityInProgress(false);
        }
    }, [dog_FeedOpenFlag, dog_CleanOpenFlag, dog_PlayOpenFlag, dog_MedicineOpenFlag]);

    
    
    useEffect(() => {

        if (ActivePetName === "" || dog_ActivityInProgress){

            Object.values(dog_AudioRefs.current).forEach(audio => {
                petScreensHelpers_Canceller_PetImmersionSounds(audio);
            });

            petScreensHelpers_Canceller_PetImmersionSounds(dog_BackgroundAudioRef.current);

        } else {

            dog_BackgroundAudioRef.current.play();
            dog_BackgroundAudioRef.current.volume = 0.5;
            dog_BackgroundAudioRef.current.loop = true;

        }

    }, [ActivePetName, dog_ActivityInProgress]);
    

    
    
    useEffect(() => {

        if (dog_Hungry){

            set_Dog_FeedOptionsCurrDesiredOption(Math.floor(Math.random() * dog_FeedOptionsList.length));

        }

        if (dog_Dirty){

            set_Dog_CleanOptionsCurrDesiredOption(Math.floor(Math.random() * dog_CleanOptionsList.length));

        }

        if (dog_Restless){

            set_Dog_PlayOptionsCurrDesiredOption(Math.floor(Math.random() * dog_PlayOptionsList.length));

        }

        if (dog_Unwell){

            set_Dog_MedicineOptionsCurrDesiredOption(Math.floor(Math.random() * dog_MedicineOptionsList.length));

        }

    }, [dog_Hungry, dog_Dirty, dog_Restless, dog_Unwell]);

    
    return (
        
        <>

            {dog_MusicVolumeOpenFlag && 
            <MusicVolumeComponent
                set_MusicVolume_OpenFlag={set_Dog_MusicVolumeOpenFlag}
            />}

            {dog_InventoryOpenFlag && 
            <InventoryComponent
                set_Inventory_OpenFlag={set_Dog_InventoryOpenFlag}
            />}

            {dog_FeedOpenFlag &&
            <FeedComponent
                feed_CurrStageAnimationImage={dog_FeedCurrStageAnimationImage}
                feed_OptionsCurrSpeciesList={dog_FeedOptionsList}
                feed_OptionsCurrDesiredOption = {dog_FeedOptionsCurrDesiredOption}
                set_Feed_OptionsCurrDesiredOption = {set_Dog_FeedOptionsCurrDesiredOption}
                set_Feed_OpenFlag = {set_Dog_FeedOpenFlag}
            />}

            {dog_CleanOpenFlag &&
            <CleanComponent
                clean_CurrStageAnimationImage={dog_CleanCurrStageAnimationImage}
                clean_OptionsCurrSpeciesList={dog_CleanOptionsList}
                clean_OptionsCurrDesiredOption = {dog_CleanOptionsCurrDesiredOption}
                set_Clean_OptionsCurrDesiredOption = {set_Dog_CleanOptionsCurrDesiredOption}
                set_Clean_OpenFlag = {set_Dog_CleanOpenFlag}
            />}

            {dog_PlayOpenFlag &&
            <PlayComponent
                play_OptionsCurrSpeciesList={dog_PlayOptionsList}
                play_OptionsCurrDesiredOption = {dog_PlayOptionsCurrDesiredOption}
                set_Play_OptionsCurrDesiredOption = {set_Dog_PlayOptionsCurrDesiredOption}
                set_Play_OpenFlag = {set_Dog_PlayOpenFlag}
            />}

            {dog_MedicineOpenFlag &&
            <MedicineComponent
                medicine_CurrStageAnimationImage={dog_MedicineCurrStageAnimationImage}
                medicine_OptionsCurrSpeciesList={dog_MedicineOptionsList}
                medicine_OptionsCurrDesiredOption = {dog_MedicineOptionsCurrDesiredOption}
                set_Medicine_OptionsCurrDesiredOption = {set_Dog_MedicineOptionsCurrDesiredOption}
                set_Medicine_OpenFlag = {set_Dog_MedicineOpenFlag}
            />}

            {dog_ScheduleOpenFlag &&
            <ScheduleComponent
                set_Schedule_OpenFlag={set_Dog_ScheduleOpenFlag}
            />}

            {dog_RecordsOpenFlag &&
            <RecordsComponent
                set_Records_OpenFlag = {set_Dog_RecordsOpenFlag}
            />}
            
            <div className = "UIStapleElements_Background-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenMenuButtonRow">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Home" onClick = {() => petScreensHelpers_Navigator_Home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Records" onClick = {() => helpers_Opener_Flags(set_Dog_RecordsOpenFlag, 0)}> Records <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Schedule" onClick = {() => helpers_Opener_Flags(set_Dog_ScheduleOpenFlag, 0)}> Schedule <br/> [3]</button>

                    {dog_Alive ? (

                        <>
                            <button className={dog_Hungry ? "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenuUrgent Feed" : "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Feed"} onClick = {(e) => helpers_Opener_Flags(set_Dog_FeedOpenFlag, 0)}> Feed <br/> [4] </button>
                            <button className={dog_Dirty ? "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenuUrgent Clean" : "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Clean"} onClick = {() => helpers_Opener_Flags(set_Dog_CleanOpenFlag, 0)}> Clean <br/> [5]</button>
                            <button className={dog_Restless ? "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenuUrgent Play" : "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Play"} onClick = {() => helpers_Opener_Flags(set_Dog_PlayOpenFlag, 0)}> Play <br/> [6]</button>

                            {dog_CanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Medicine" onClick = {() => helpers_Opener_Flags(set_Dog_MedicineOpenFlag, 0)}> Medicine <br/> [7]</button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Medicine <br/> [7]</button>

                            )}
                        
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Feed <br/> [4]</button>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Clean <br/> [5]</button>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Play <br/> [6]</button>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Medicine <br/> [7] </button>
                        </>

                    )}
                
                </div>

                <NotificationsComponent/>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                    
                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline">Living Room:</h1>
                    <MainComponent
                        main_Sequence_StageAnimationImages={dog_MainCurrStageAnimationImages}
                        main_Image_StageSleepAnimation={dog_MainCurrStageSleepAnimationImage}
                        main_Sequence_AudioRefs={dog_AudioRefs}
                        main_Number_PetEnergy = {350}
                        main_Number_Mood = {dog_CurrMood}
                        main_Boolean_ActivityInProgress={dog_ActivityInProgress}
                    />
                </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_Opener_Flags(set_Dog_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_Opener_Flags(set_Dog_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
            </div>
            
        </>

    );

}


export default Dog;