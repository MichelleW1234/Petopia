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
import Clean from "../PetscreensComponents/Stations/Clean.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";

import { petActivityTimeStampCleaningKey, petActivityTimeStampFeedingKey, petHealthKey, petMedicineKey, petActivityTimeStampMedicineDoseTimeGapKey, petSpeciesFishKey, petSpeciesHealthCapList, petSpeciesActivityTimeStampTimeLimitList, petStageKey, audioNavButtonPressKey, petActivityOptionNameKey, petActivityOptionImageKey, petActivityOptionCursorKey, petSoundHappyKey, petSoundSadKey, petSoundSleepKey, petActivityTimeStampLastPerformedKey} from "../../../../constants/Constants.js";
import { petScreensHelpers_HomeNavigator, petScreensHelpers_AudioCanceller } from "../../helpers/Helpers.js";
import { helpers_FlagOpener } from "../../../../helpers/Helpers.js";

import HappyBubbles from "../../../../Music/PetImmersionSounds/Fish/HappyBubbles.mp3";
import SadSplash from "../../../../Music/PetImmersionSounds/Fish/SadSplash.mp3";
import Tank from "../../../../Music/PetImmersionSounds/Fish/Tank.mp3";
import Sleeping from "../../../../Music/PetImmersionSounds/Sleeping.mp3";

import MainStageOneOne from "../../../../images/Fish/Main/Awake/StageOneOne.png";
import MainStageOneTwo from "../../../../images/Fish/Main/Awake/StageOneTwo.png";
import MainStageOneThree from "../../../../images/Fish/Main/Awake/StageOneThree.png";
import MainStageOneFour from "../../../../images/Fish/Main/Awake/StageOneFour.png";
import MainStageTwoOne from "../../../../images/Fish/Main/Awake/StageTwoOne.png";
import MainStageTwoTwo from "../../../../images/Fish/Main/Awake/StageTwoTwo.png";
import MainStageTwoThree from "../../../../images/Fish/Main/Awake/StageTwoThree.png";
import MainStageTwoFour from "../../../../images/Fish/Main/Awake/StageTwoFour.png";
import MainStageThreeOne from "../../../../images/Fish/Main/Awake/StageThreeOne.png";
import MainStageThreeTwo from "../../../../images/Fish/Main/Awake/StageThreeTwo.png";
import MainStageThreeThree from "../../../../images/Fish/Main/Awake/StageThreeThree.png";
import MainStageThreeFour from "../../../../images/Fish/Main/Awake/StageThreeFour.png";

import SleepStageOne from "../../../../images/Fish/Main/Asleep/StageOne.gif";
import SleepStageTwo from "../../../../images/Fish/Main/Asleep/StageTwo.gif";
import SleepStageThree from "../../../../images/Fish/Main/Asleep/StageThree.gif";

import FeedStageOne from "../../../../images/Fish/Feed/Animation/StageOne.gif";
import FeedStageTwo from "../../../../images/Fish/Feed/Animation/StageTwo.gif";
import FeedStageThree from "../../../../images/Fish/Feed/Animation/StageThree.gif";

import CleanStageOne from "../../../../images/Fish/Clean/Animation/StageOne.gif";
import CleanStageTwo from "../../../../images/Fish/Clean/Animation/StageTwo.gif";
import CleanStageThree from "../../../../images/Fish/Clean/Animation/StageThree.gif";

import MedicineStageOne from "../../../../images/Fish/Medicine/Animation/StageOne.gif";
import MedicineStageTwo from "../../../../images/Fish/Medicine/Animation/StageTwo.gif";
import MedicineStageThree from "../../../../images/Fish/Medicine/Animation/StageThree.gif";

import NullPlaceholder from "../../../../images/NullPlaceholder.png";

import Shrimp from "../../../../images/Fish/Feed/Options/Shrimp.png";
import Worms from "../../../../images/Fish/Feed/Options/Worm.png";
import Algae from "../../../../images/Fish/Feed/Options/Algae.png";
import Sponge from "../../../../images/Fish/Clean/Options/Sponge.png";
import Cloth from "../../../../images/Fish/Clean/Options/Cloth.png";
import CursorSponge from "../../../../images/Fish/Clean/Options/Sponge.cur";
import CursorCloth from "../../../../images/Fish/Clean/Options/Cloth.cur";
import Pill from "../../../../images/Fish/Medicine/Options/Pill.png";
import Serum from  "../../../../images/Fish/Medicine/Options/Serum.png";
import Notifications from "../../../GlobalComponents/components/Notifications.jsx";



function Fish (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [fish_MusicVolumeOpenFlag, set_Fish_MusicVolumeOpenFlag] = useState(false);
    const [fish_InventoryOpenFlag, set_Fish_InventoryOpenFlag] = useState(false);
    const [fish_ActivityInProgress, set_Fish_ActivityInProgress] = useState(false);
    const [fish_FeedOpenFlag, set_Fish_FeedOpenFlag] = useState(false);
    const [fish_CleanOpenFlag, set_Fish_CleanOpenFlag] = useState(false);
    const [fish_MedicineOpenFlag, set_Fish_MedicineOpenFlag] = useState(false);
    const [fish_ScheduleOpenFlag, set_Fish_ScheduleOpenFlag] = useState(false);
    const [fish_RecordsOpenFlag, set_Fish_RecordsOpenFlag] = useState(false);
    const [fish_FeedOptionsCurrDesiredOption, set_Fish_FeedOptionsCurrDesiredOption] = useState(-1);
    const [fish_CleanOptionsCurrDesiredOption, set_Fish_CleanOptionsCurrDesiredOption] = useState(-1);
    const [fish_MedicineOptionsCurrDesiredOption, set_Fish_MedicineOptionsCurrDesiredOption] = useState(-1);

    const fish_Alive = ActivePetName === "" ? 
                            false
                        :    PetList[ActivePetName][petHealthKey] === 0 ? 
                                false
                                : true;

    const fish_Hungry = ActivePetName === "" ? 
                            false 
                        :    (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey][petActivityTimeStampFeedingKey]/2 ? 
                                true 
                                : false;
                            
    const fish_Dirty = ActivePetName === "" ?  
                                false
                            :   (GlobalTimer - PetTimeStamps[ActivePetName][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey]) >= petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey][petActivityTimeStampCleaningKey]/2 ? 
                                    true 
                                    : false;

    const fish_Unwell = ActivePetName === "" ? 
                            false
                        :   PetList[ActivePetName][petHealthKey] >= petSpeciesHealthCapList[petSpeciesFishKey][PetList[ActivePetName][petStageKey]] ? 
                                false
                                : true;

    const fish_CurrMood = ActivePetName === "" ? 
                                -1
                        :   PetList[ActivePetName][petHealthKey]/petSpeciesHealthCapList[petSpeciesFishKey][PetList[ActivePetName][petStageKey]] >= 0.5 ? 
                                1
                            : 0;
    
    const fish_CanReceiveDose = ActivePetName === "" ? 
                                    false
                                :   GlobalTimer - PetList[ActivePetName][petMedicineKey] <= petActivityTimeStampMedicineDoseTimeGapKey ? 
                                        false
                                        : true;


    const fish_MainCurrStageAnimationImages = ActivePetName === "" ? 
                                [[NullPlaceholder,NullPlaceholder], [NullPlaceholder,NullPlaceholder]]
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        [[MainStageOneOne, MainStageOneTwo], [MainStageOneThree, MainStageOneFour]]
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        [[MainStageTwoOne, MainStageTwoTwo], [MainStageTwoThree, MainStageTwoFour]]
                                    : [[MainStageThreeOne, MainStageThreeTwo], [MainStageThreeThree, MainStageThreeFour]];


    const fish_MainCurrStageSleepAnimationImage = ActivePetName === "" ? 
                                    NullPlaceholder
                                :   PetList[ActivePetName][petStageKey] === 0 ? 
                                            SleepStageOne
                                        : PetList[ActivePetName][petStageKey] === 1 ? 
                                            SleepStageTwo
                                        : SleepStageThree;

    
    const fish_FeedCurrStageAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        FeedStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        FeedStageTwo
                                    : FeedStageThree;

    const fish_CleanCurrStageAnimationImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][petStageKey] === 0 ? 
                                        CleanStageOne
                                    : PetList[ActivePetName][petStageKey] === 1 ? 
                                        CleanStageTwo
                                    : CleanStageThree;

    const fish_MedicineCurrStageAnimationImage = ActivePetName === "" ? 
                                    NullPlaceholder
                                :    PetList[ActivePetName][petStageKey] === 0 ? 
                                            MedicineStageOne
                                        : PetList[ActivePetName][petStageKey] === 1 ? 
                                            MedicineStageTwo
                                        : MedicineStageThree;

    const fish_FeedOptionsList = [{[petActivityOptionNameKey]: "Shrimp", [petActivityOptionImageKey]: Shrimp}, {[petActivityOptionNameKey]: "Worms", [petActivityOptionImageKey]: Worms}, {[petActivityOptionNameKey]: "Algae", [petActivityOptionImageKey]: Algae}];
    const fish_CleanOptionsList = [{[petActivityOptionNameKey]: "Sponge", [petActivityOptionImageKey]: Sponge, [petActivityOptionCursorKey] : CursorSponge}, {[petActivityOptionNameKey]: "Cloth", [petActivityOptionImageKey]: Cloth, [petActivityOptionCursorKey]: CursorCloth}];
    const fish_MedicineOptionsList = [{[petActivityOptionNameKey]: "Pill", [petActivityOptionImageKey]: Pill}, {[petActivityOptionNameKey]: "Serum", [petActivityOptionImageKey]: Serum}];

    const fish_AudioRefs = useRef({[petSoundHappyKey]: new Audio(HappyBubbles), [petSoundSadKey]: new Audio(SadSplash), [petSoundSleepKey]: new Audio(Sleeping)});
    const fish_BackgroundAudioRef = useRef(new Audio(Tank));

    const fish_Navigate = useNavigate();


    useKeyboardShortcut("v", () => {
                
        if (!fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
                
        if (!fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );
    

    useKeyboardShortcut("1", () => {

        if (!fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            petScreensHelpers_HomeNavigator(setActivePetName);
            fish_Navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_RecordsOpenFlag, 0);

        }

    },
        ".Records"
    );
    


    useKeyboardShortcut("3", () => {

        if (!fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_ScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
    



    useKeyboardShortcut("4", () => {

        if (fish_Alive && !fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_FeedOpenFlag, 0);

        }

    },
        ".Feed"
    );
    


    useKeyboardShortcut("5", () => {

        if (fish_Alive && !fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_CleanOpenFlag, 0);

        }

    },
        ".Clean"
    );
    


    useKeyboardShortcut("6", () => {

        if (fish_Alive && fish_CanReceiveDose && !fish_FeedOpenFlag && !fish_CleanOpenFlag && !fish_MedicineOpenFlag && !fish_ScheduleOpenFlag && !fish_RecordsOpenFlag && !fish_MusicVolumeOpenFlag && !fish_InventoryOpenFlag){

            helpers_FlagOpener(set_Fish_MedicineOpenFlag, 0);

        }

    },
        ".Medicine"
    );
    
    


    useEffect(() => {
        if (fish_FeedOpenFlag || fish_CleanOpenFlag || fish_MedicineOpenFlag) {
            set_Fish_ActivityInProgress(true);
        } else {
            set_Fish_ActivityInProgress(false);
        }
    }, [fish_FeedOpenFlag, fish_CleanOpenFlag, fish_MedicineOpenFlag]);
    

    useEffect(() => {

        if (ActivePetName === "" || fish_ActivityInProgress){

            Object.values(fish_AudioRefs.current).forEach(audio => {
                petScreensHelpers_AudioCanceller(audio);
            });

            petScreensHelpers_AudioCanceller(fish_BackgroundAudioRef.current);


        } else {

            fish_BackgroundAudioRef.current.play();
            fish_BackgroundAudioRef.current.volume = 0.5;
            fish_BackgroundAudioRef.current.loop = true;

        }

    }, [ActivePetName, fish_ActivityInProgress]);

    

    useEffect(() => {

        if (fish_Hungry){

            set_Fish_FeedOptionsCurrDesiredOption(Math.floor(Math.random() * fish_FeedOptionsList.length));

        }

        if (fish_Dirty){

            set_Fish_CleanOptionsCurrDesiredOption(Math.floor(Math.random() * fish_CleanOptionsList.length));

        }

        if (fish_Unwell){

            set_Fish_MedicineOptionsCurrDesiredOption(Math.floor(Math.random() * fish_MedicineOptionsList.length));

        }

    }, [fish_Hungry, fish_Dirty, fish_Unwell]);

    

    
    return (

        <>

            {fish_MusicVolumeOpenFlag && 
            <MusicVolume
                set_MusicVolume_OpenFlag={set_Fish_MusicVolumeOpenFlag}
            />}

            {fish_InventoryOpenFlag && 
            <Inventory
                set_Inventory_OpenFlag={set_Fish_InventoryOpenFlag}
            />}


            {fish_FeedOpenFlag &&
            <Feed
                feed_CurrStageAnimationImage={fish_FeedCurrStageAnimationImage}
                feed_OptionsCurrSpeciesList={fish_FeedOptionsList}
                feed_OptionsCurrDesiredOption = {fish_FeedOptionsCurrDesiredOption}
                set_Feed_OptionsCurrDesiredOption = {set_Fish_FeedOptionsCurrDesiredOption}
                set_Feed_OpenFlag = {set_Fish_FeedOpenFlag}
            />}

            {fish_CleanOpenFlag &&
            <Clean
                clean_CurrStageAnimationImage={fish_CleanCurrStageAnimationImage}
                clean_OptionsCurrSpeciesList={fish_CleanOptionsList}
                clean_OptionsCurrDesiredOption = {fish_CleanOptionsCurrDesiredOption}
                set_Clean_OptionsCurrDesiredOption = {set_Fish_CleanOptionsCurrDesiredOption}
                set_Clean_OpenFlag = {set_Fish_CleanOpenFlag}
            />}

            {fish_MedicineOpenFlag &&
            <Medicine
                medicine_CurrStageAnimationImage={fish_MedicineCurrStageAnimationImage}
                medicine_OptionsCurrSpeciesList = {fish_MedicineOptionsList}
                medicine_OptionsCurrDesiredOption = {fish_MedicineOptionsCurrDesiredOption}
                set_Medicine_OptionsCurrDesiredOption = {set_Fish_MedicineOptionsCurrDesiredOption}
                set_Medicine_OpenFlag = {set_Fish_MedicineOpenFlag}
            />}

            {fish_ScheduleOpenFlag &&
            <Schedule
                set_Schedule_OpenFlag={set_Fish_ScheduleOpenFlag}
            />}

            {fish_RecordsOpenFlag &&
            <Records
                set_Records_OpenFlag = {set_Fish_RecordsOpenFlag}
            />}


            <div className = "UIStapleElements_Background-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => petScreensHelpers_HomeNavigator(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => helpers_FlagOpener(set_Fish_RecordsOpenFlag, 0)}> Records <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => helpers_FlagOpener(set_Fish_ScheduleOpenFlag, 0)}> Schedule <br/> [3]</button>

                    {fish_Alive ? (

                        <>
                            <button className={fish_Hungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {() => helpers_FlagOpener(set_Fish_FeedOpenFlag, 0)}> Feed <br/> [4]</button>
                            <button className={fish_Dirty ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Clean" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Clean"} onClick = {() => helpers_FlagOpener(set_Fish_CleanOpenFlag, 0)}> Clean <br/> [5]</button>

                            {fish_CanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Medicine" onClick = {() => helpers_FlagOpener(set_Fish_MedicineOpenFlag, 0)}> Medicine <br/> [6]</button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine <br/> [6]</button>

                            )}

                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Feed <br/> [4]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clean <br/> [5]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine <br/> [6]</button>
                        </>

                    )}

                </div>

                <Notifications/>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                    
                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline">Living Room:</h1>
                    <Main
                        main_CurrStageAnimationImages={fish_MainCurrStageAnimationImages}
                        main_CurrStageSleepAnimationImage={fish_MainCurrStageSleepAnimationImage}
                        main_CurrSpeciesAudios={fish_AudioRefs}
                        main_CurrPetEnergy = {400}
                        main_CurrMood = {fish_CurrMood}
                        main_ActivityInProgress={fish_ActivityInProgress}
                    />
                </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_FlagOpener(set_Fish_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_FlagOpener(set_Fish_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
            </div>

        </>

    );

}


export default Fish;