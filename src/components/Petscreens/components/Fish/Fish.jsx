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

import { cleaningKey, feedingKey, healthKey, medicineKey, medicineDoseTimeGap, fishSpecies, healthCapList, timeLimitList, stageKey, navButtonPressSoundKey, optionNameKey, optionImageKey, optionCursorKey, happyAudioKey, sadAudioKey, sleepAudioKey, activityLastPerformedKey} from "../../../../constants/Constants.js";
import { home, pauseAudio } from "../../helpers/Helpers.js";
import { flagOpener } from "../../../../helpers/Helpers.js";

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



function Fish (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [fishMusicVolumeOpenFlag, setFishMusicVolumeOpenFlag] = useState(false);
    const [fishInventoryOpenFlag, setFishInventoryOpenFlag] = useState(false);
    const [fishActivityInProgress, setFishActivityInProgress] = useState(false);
    const [fishFeedOpenFlag, setFishFeedOpenFlag] = useState(false);
    const [fishCleanOpenFlag, setFishCleanOpenFlag] = useState(false);
    const [fishMedicineOpenFlag, setFishMedicineOpenFlag] = useState(false);
    const [fishScheduleOpenFlag, setFishScheduleOpenFlag] = useState(false);
    const [fishRecordsOpenFlag, setFishRecordsOpenFlag] = useState(false);
    const [fishFeedOptionsDesiredOption, setFishFeedOptionsDesiredOption] = useState(-1);
    const [fishCleanOptionsDesiredOption, setFishCleanOptionsDesiredOption] = useState(-1);
    const [fishMedicineOptionsDesiredOption, setFishMedicineOptionsDesiredOption] = useState(-1);

    const fishAlive = ActivePetName === "" ? 
                            false
                        :    PetList[ActivePetName][healthKey] === 0 ? 
                                false
                                : true;

    const fishHungry = ActivePetName === "" ? 
                            false 
                        :    (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][activityLastPerformedKey]) >= timeLimitList[fishSpecies][feedingKey]/2 ? 
                                true 
                                : false;
                            
    const fishDirty = ActivePetName === "" ?  
                                false
                            :   (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][activityLastPerformedKey]) >= timeLimitList[fishSpecies][cleaningKey]/2 ? 
                                    true 
                                    : false;

    const fishUnwell = ActivePetName === "" ? 
                            false
                        :   PetList[ActivePetName][healthKey] >= healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] ? 
                                false
                                : true;

    const fishMood = ActivePetName === "" ? 
                                -1
                        :   PetList[ActivePetName][healthKey]/healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] >= 0.75 ? 
                                0
                                : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] >= 0.5 ? 
                                1
                                : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] >= 0.25 ? 
                                2
                                : 3;
    
    const fishCanReceiveDose = ActivePetName === "" ? 
                                    false
                                :   GlobalTimer - PetList[ActivePetName][medicineKey] <= medicineDoseTimeGap ? 
                                        false
                                        : true;


    const fishMainImages = ActivePetName === "" ? 
                                [[NullPlaceholder,NullPlaceholder], [NullPlaceholder,NullPlaceholder]]
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        [[MainStageOneOne, MainStageOneTwo], [MainStageOneThree, MainStageOneFour]]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [[MainStageTwoOne, MainStageTwoTwo], [MainStageTwoThree, MainStageTwoFour]]
                                    : [[MainStageThreeOne, MainStageThreeTwo], [MainStageThreeThree, MainStageThreeFour]];


    const fishMainSleepingImage = ActivePetName === "" ? 
                                    NullPlaceholder
                                :   PetList[ActivePetName][stageKey] === 0 ? 
                                            SleepStageOne
                                        : PetList[ActivePetName][stageKey] === 1 ? 
                                            SleepStageTwo
                                        : SleepStageThree;

    
    const fishFeedImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        FeedStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        FeedStageTwo
                                    : FeedStageThree;

    const fishCleanImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        CleanStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        CleanStageTwo
                                    : CleanStageThree;

    const fishMedicineImage = ActivePetName === "" ? 
                                    NullPlaceholder
                                :    PetList[ActivePetName][stageKey] === 0 ? 
                                            MedicineStageOne
                                        : PetList[ActivePetName][stageKey] === 1 ? 
                                            MedicineStageTwo
                                        : MedicineStageThree;

    const fishFeedOptionsList = [{[optionNameKey]: "Shrimp", [optionImageKey]: Shrimp}, {[optionNameKey]: "Worms", [optionImageKey]: Worms}, {[optionNameKey]: "Algae", [optionImageKey]: Algae}];
    const fishCleanOptionsList = [{[optionNameKey]: "Sponge", [optionImageKey]: Sponge, [optionCursorKey] : CursorSponge}, {[optionNameKey]: "Cloth", [optionImageKey]: Cloth, [optionCursorKey]: CursorCloth}];
    const fishMedicineOptionsList = [{[optionNameKey]: "Pill", [optionImageKey]: Pill}, {[optionNameKey]: "Serum", [optionImageKey]: Serum}];

    const fishAudioRefs = useRef({[happyAudioKey]: new Audio(HappyBubbles), [sadAudioKey]: new Audio(SadSplash), [sleepAudioKey]: new Audio(Sleeping)});
    const fishBackgroundAudioRef = useRef(new Audio(Tank));

    const navigate = useNavigate();


    useKeyboardShortcut("v", () => {
                
        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
                
        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishInventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );
    

    useKeyboardShortcut("1", () => {

        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            home(setActivePetName);
            navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishRecordsOpenFlag, 0);

        }

    },
        ".Records"
    );
    


    useKeyboardShortcut("3", () => {

        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
    



    useKeyboardShortcut("4", () => {

        if (fishAlive && !fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishFeedOpenFlag, 0);

        }

    },
        ".Feed"
    );
    


    useKeyboardShortcut("5", () => {

        if (fishAlive && !fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishCleanOpenFlag, 0);

        }

    },
        ".Clean"
    );
    


    useKeyboardShortcut("6", () => {

        if (fishAlive && fishCanReceiveDose && !fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag && !fishInventoryOpenFlag){

            flagOpener(setFishMedicineOpenFlag, 0);

        }

    },
        ".Medicine"
    );
    
    


    useEffect(() => {
        if (fishFeedOpenFlag || fishCleanOpenFlag || fishMedicineOpenFlag) {
            setFishActivityInProgress(true);
        } else {
            setFishActivityInProgress(false);
        }
    }, [fishFeedOpenFlag, fishCleanOpenFlag, fishMedicineOpenFlag]);
    

    useEffect(() => {

        if (ActivePetName === "" || fishActivityInProgress){

            Object.values(fishAudioRefs.current).forEach(audio => {
                pauseAudio(audio);
            });

            pauseAudio(fishBackgroundAudioRef.current);


        } else {

            fishBackgroundAudioRef.current.play();
            fishBackgroundAudioRef.current.volume = 0.5;
            fishBackgroundAudioRef.current.loop = true;

        }

    }, [ActivePetName, fishActivityInProgress]);

    

    useEffect(() => {

        if (fishHungry){

            setFishFeedOptionsDesiredOption(Math.floor(Math.random() * fishFeedOptionsList.length));

        }

        if (fishDirty){

            setFishCleanOptionsDesiredOption(Math.floor(Math.random() * fishCleanOptionsList.length));

        }

        if (fishUnwell){

            setFishMedicineOptionsDesiredOption(Math.floor(Math.random() * fishMedicineOptionsList.length));

        }

    }, [fishHungry, fishDirty, fishUnwell]);

    

    
    return (

        <>

            {fishMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setFishMusicVolumeOpenFlag}
            />}

            {fishInventoryOpenFlag && 
            <Inventory
                setInventoryOpenFlag={setFishInventoryOpenFlag}
            />}


            {fishFeedOpenFlag &&
            <Feed
                feedAnimationImage={fishFeedImage}
                feedOptionsList={fishFeedOptionsList}
                feedOptionsDesiredOption = {fishFeedOptionsDesiredOption}
                setFeedOptionsDesiredOption = {setFishFeedOptionsDesiredOption}
                setFeedOpenFlag = {setFishFeedOpenFlag}
            />}

            {fishCleanOpenFlag &&
            <Clean
                cleanAnimationImage={fishCleanImage}
                cleanOptionsList={fishCleanOptionsList}
                cleanOptionsDesiredOption = {fishCleanOptionsDesiredOption}
                setCleanOptionsDesiredOption = {setFishCleanOptionsDesiredOption}
                setCleanOpenFlag = {setFishCleanOpenFlag}
            />}

            {fishMedicineOpenFlag &&
            <Medicine
                medicineAnimationImage={fishMedicineImage}
                medicineOptionsList = {fishMedicineOptionsList}
                medicineOptionsDesiredOption = {fishMedicineOptionsDesiredOption}
                setMedicineOptionsDesiredOption = {setFishMedicineOptionsDesiredOption}
                setMedicineOpenFlag = {setFishMedicineOpenFlag}
            />}

            {fishScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setFishScheduleOpenFlag}
            />}

            {fishRecordsOpenFlag &&
            <Records
                setRecordsOpenFlag = {setFishRecordsOpenFlag}
            />}


            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => flagOpener(setFishRecordsOpenFlag, 0)}> Records <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setFishScheduleOpenFlag, 0)}> Schedule <br/> [3]</button>

                    {fishAlive ? (

                        <>
                            <button className={fishHungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {() => flagOpener(setFishFeedOpenFlag, 0)}> Feed <br/> [4]</button>
                            <button className={fishDirty ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Clean" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Clean"} onClick = {() => flagOpener(setFishCleanOpenFlag, 0)}> Clean <br/> [5]</button>

                            {fishCanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Medicine" onClick = {() => flagOpener(setFishMedicineOpenFlag, 0)}> Medicine <br/> [6]</button>

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

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                    
                    <h1>Living Room:</h1>
                    <Main
                        mainAnimationImages={fishMainImages}
                        mainSleepingImage={fishMainSleepingImage}
                        mainPetAudios={fishAudioRefs}
                        mainPetEnergy = {400}
                        mainPetMood = {fishMood}
                        mainActivityInProgress={fishActivityInProgress}
                    />
                </div>

            </div>

            <div className="MiscellaneousElements_ComponentButton-Position--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => flagOpener(setFishMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => flagOpener(setFishInventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
            </div>

        </>

    );

}


export default Fish;