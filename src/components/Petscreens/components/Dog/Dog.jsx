import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import MusicVolume from "../../../GlobalComponents//components/MusicVolume.jsx";
import StrollPatrol from "./DogComponents/StrollPatrol.jsx";
import DogGameTwo from "./DogComponents/DogGameTwo.jsx";
import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Clean from "../PetscreensComponents/Stations/Clean.jsx";
import Play from "../PetscreensComponents/Stations/Play.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";

import { stageKey, cleaningKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, dogSpecies, healthCapList, timeLimitList, optionNameKey, optionImageKey, optionCursorKey, optionGameKey, happyAudioKey, sadAudioKey, sleepAudioKey, activityLastPerformedKey} from "../../../../constants/Constants.js";
import { home, pauseAudio } from "../../helpers/Helpers.js";
import { flagOpener } from "../../../../helpers/Helpers.js";

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
import Pill from "../../../../images/Dog/Medicine/Options/Pill.png";
import Chew from "../../../../images/Dog/Medicine/Options/Chew.png";




function Dog (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [dogMusicVolumeOpenFlag, setDogMusicVolumeOpenFlag] = useState(false);
    const [dogActivityInProgress, setDogActivityInProgress] = useState(false);
    const [dogFeedOpenFlag, setDogFeedOpenFlag] = useState(false);
    const [dogCleanOpenFlag, setDogCleanOpenFlag] = useState(false);
    const [dogPlayOpenFlag, setDogPlayOpenFlag] = useState(false);
    const [dogMedicineOpenFlag, setDogMedicineOpenFlag] = useState(false);
    const [dogRecordsOpenFlag, setDogRecordsOpenFlag] = useState(false);
    const [dogScheduleOpenFlag, setDogScheduleOpenFlag] = useState(false);
    const [dogFeedOptionsDesiredOption, setDogFeedOptionsDesiredOption] = useState(-1);
    const [dogCleanOptionsDesiredOption, setDogCleanOptionsDesiredOption] = useState(-1);
    const [dogPlayOptionsDesiredOption, setDogPlayOptionsDesiredOption] = useState(-1);
    const [dogMedicineOptionsDesiredOption, setDogMedicineOptionsDesiredOption] = useState(-1);

    const dogAlive = ActivePetName === "" ? 
                            false
                        :   PetList[ActivePetName][healthKey] === 0 ? 
                                false
                                : true;

    const dogHungry = ActivePetName === "" ? 
                            false
                        :    (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][activityLastPerformedKey]) >= timeLimitList[dogSpecies][feedingKey]/2 ? 
                                true 
                                : false;

    const dogDirty = ActivePetName === "" ? 
                            false
                        :   (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][activityLastPerformedKey]) >= timeLimitList[dogSpecies][cleaningKey]/2 ? 
                                true
                                : false;
                            
    const dogRestless = ActivePetName === "" ? 
                            false
                        :   (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][activityLastPerformedKey]) >= timeLimitList[dogSpecies][playingKey]/2 ? 
                                true 
                                : false;

    const dogUnwell = ActivePetName === "" ? 
                        false
                    :   PetList[ActivePetName][healthKey] >= healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] ? 
                            false
                            : true;


    const dogMood = ActivePetName === "" ? 
                        -1
                    :   PetList[ActivePetName][healthKey]/healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] >= 0.25 ? 
                            2
                            : 3;

    const dogCanReceiveDose = ActivePetName === "" ? 
                                    false
                                :   GlobalTimer - PetList[ActivePetName][medicineKey] <= medicineDoseTimeGap ? 
                                        false
                                        : true;


    const dogMainImages = ActivePetName === "" ? 
                            [[NullPlaceholder,NullPlaceholder], [NullPlaceholder,NullPlaceholder]]
                        :   PetList[ActivePetName][stageKey] === 0 ? 
                                    [[MainStageOneOne, MainStageOneTwo], [MainStageOneThree, MainStageOneFour]]
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    [[MainStageTwoOne, MainStageTwoTwo], [MainStageTwoThree, MainStageTwoFour]]
                                : [[MainStageThreeOne, MainStageThreeTwo], [MainStageThreeThree, MainStageThreeFour]];

    const dogMainSleepingImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        SleepStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        SleepStageTwo
                                    : SleepStageThree;

    const dogFeedImage = ActivePetName === "" ? 
                            NullPlaceholder
                        :   PetList[ActivePetName][stageKey] === 0 ? 
                                    FeedStageOne
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    FeedStageTwo
                                : FeedStageThree;

    const dogCleanImage = ActivePetName === "" ? 
                            NullPlaceholder
                        :   PetList[ActivePetName][stageKey] === 0 ? 
                                    CleanStageOne
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    CleanStageTwo
                                : CleanStageThree;

    const dogMedicineImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        MedicineStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        MedicineStageTwo
                                    : MedicineStageThree;


    const dogFeedOptionsList = [{[optionNameKey]: "Beef", [optionImageKey]: Beef}, {[optionNameKey]: "Turkey", [optionImageKey]: Turkey}, {[optionNameKey]: "Lamb", [optionImageKey]: Lamb}]; 
    const dogCleanOptionsList = [{[optionNameKey]: "Soap", [optionImageKey]: Soap, [optionCursorKey]: CursorSoap}, {[optionNameKey]: "Brush", [optionImageKey]: Brush, [optionCursorKey]: CursorBrush}];
    const dogPlayOptionsList = [{[optionNameKey]: "Stroll Patrol", [optionImageKey]: Leash, [optionGameKey]: StrollPatrol}, {[optionNameKey]: "Pawformer", [optionImageKey]: Brush, [optionGameKey]: DogGameTwo}];
    const dogMedicineOptionsList = [{[optionNameKey]: "Pill", [optionImageKey]: Pill}, {[optionNameKey]: "Chew", [optionImageKey]: Chew}];

    const dogAudioRefs = useRef({[happyAudioKey]: new Audio(HappyBarks), [sadAudioKey]: new Audio(SadWhine), [sleepAudioKey]: new Audio(Sleeping)});
    const dogBackgroundAudioRef = useRef(new Audio(fireplace));

    const navigate = useNavigate();
    

    useKeyboardShortcut("v", () => {
            
        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    useKeyboardShortcut("1", () => {

        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            home(setActivePetName);
            navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogRecordsOpenFlag, 0);

        }

    },
        ".Records"
    );



    useKeyboardShortcut("3", () => {

        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );



    useKeyboardShortcut("4", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogFeedOpenFlag, 0);

        }

    },
        ".Feed"
    );


    useKeyboardShortcut("5", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogCleanOpenFlag, 0);

        }

    },
        ".Clean"
    );
    
    


    useKeyboardShortcut("6", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogPlayOpenFlag, 0);

        }

    },
        ".Play"
    );
    


    useKeyboardShortcut("7", () => {

        if (dogAlive && dogCanReceiveDose && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogMedicineOpenFlag, 0);

        }

    },
        ".Medicine"
    );
    



    useEffect(() => {
        if (dogFeedOpenFlag || dogCleanOpenFlag || dogPlayOpenFlag || dogMedicineOpenFlag) {
            setDogActivityInProgress(true);
        } else {
            setDogActivityInProgress(false);
        }
    }, [dogFeedOpenFlag, dogCleanOpenFlag, dogPlayOpenFlag, dogMedicineOpenFlag]);

    
    
    useEffect(() => {

        if (ActivePetName === "" || dogActivityInProgress){

            Object.values(dogAudioRefs.current).forEach(audio => {
                pauseAudio(audio);
            });

            pauseAudio(dogBackgroundAudioRef.current);

        } else {

            dogBackgroundAudioRef.current.play();
            dogBackgroundAudioRef.current.volume = 0.5;
            dogBackgroundAudioRef.current.loop = true;

        }

    }, [ActivePetName, dogActivityInProgress]);
    

    
    
    useEffect(() => {

        if (dogHungry){

            setDogFeedOptionsDesiredOption(Math.floor(Math.random() * dogFeedOptionsList.length));

        }

        if (dogDirty){

            setDogCleanOptionsDesiredOption(Math.floor(Math.random() * dogCleanOptionsList.length));

        }

        if (dogRestless){

            setDogPlayOptionsDesiredOption(Math.floor(Math.random() * dogPlayOptionsList.length));

        }

        if (dogUnwell){

            setDogMedicineOptionsDesiredOption(Math.floor(Math.random() * dogMedicineOptionsList.length));

        }

    }, [dogHungry, dogDirty, dogRestless, dogUnwell]);

    
    return (
        
        <>

            {dogMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setDogMusicVolumeOpenFlag}
            />}

            {dogFeedOpenFlag &&
            <Feed
                feedAnimationImage={dogFeedImage}
                feedOptionsList={dogFeedOptionsList}
                feedOptionsDesiredOption = {dogFeedOptionsDesiredOption}
                setFeedOptionsDesiredOption = {setDogFeedOptionsDesiredOption}
                setFeedOpenFlag = {setDogFeedOpenFlag}
            />}

            {dogCleanOpenFlag &&
            <Clean
                cleanAnimationImage={dogCleanImage}
                cleanOptionsList={dogCleanOptionsList}
                cleanOptionsDesiredOption = {dogCleanOptionsDesiredOption}
                setCleanOptionsDesiredOption = {setDogCleanOptionsDesiredOption}
                setCleanOpenFlag = {setDogCleanOpenFlag}
            />}

            {dogPlayOpenFlag &&
            <Play
                playOptionsList={dogPlayOptionsList}
                playOptionsDesiredOption = {dogPlayOptionsDesiredOption}
                setPlayOptionsDesiredOption = {setDogPlayOptionsDesiredOption}
                setPlayOpenFlag = {setDogPlayOpenFlag}
            />}

            {dogMedicineOpenFlag &&
            <Medicine
                medicineAnimationImage={dogMedicineImage}
                medicineOptionsList={dogMedicineOptionsList}
                medicineOptionsDesiredOption = {dogMedicineOptionsDesiredOption}
                setMedicineOptionsDesiredOption = {setDogMedicineOptionsDesiredOption}
                setMedicineOpenFlag = {setDogMedicineOpenFlag}
            />}

            {dogScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setDogScheduleOpenFlag}
            />}

            {dogRecordsOpenFlag &&
            <Records
                setRecordsOpenFlag = {setDogRecordsOpenFlag}
            />}
            
            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => flagOpener(setDogRecordsOpenFlag, 0)}> Records <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setDogScheduleOpenFlag, 0)}> Schedule <br/> [3]</button>

                    {dogAlive ? (

                        <>
                            <button className={dogHungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {(e) => flagOpener(setDogFeedOpenFlag, 0)}> Feed <br/> [4] </button>
                            <button className={dogDirty ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Clean" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Clean"} onClick = {() => flagOpener(setDogCleanOpenFlag, 0)}> Clean <br/> [5]</button>
                            <button className={dogRestless ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Play" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Play"} onClick = {() => flagOpener(setDogPlayOpenFlag, 0)}> Play <br/> [6]</button>

                            {dogCanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Medicine" onClick = {() => flagOpener(setDogMedicineOpenFlag, 0)}> Medicine <br/> [7]</button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine <br/> [7]</button>

                            )}
                        
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Feed <br/> [4]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clean <br/> [5]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Play <br/> [6]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine <br/> [7] </button>
                        </>

                    )}
                
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                    
                    <h1>Living Room:</h1>
                    <Main
                        mainAnimationImages={dogMainImages}
                        mainSleepingImage={dogMainSleepingImage}
                        mainPetAudios={dogAudioRefs}
                        mainPetEnergy = {350}
                        mainPetMood = {dogMood}
                        mainActivityInProgress={dogActivityInProgress}
                    />
                </div>

            </div>

            <div className="MiscellaneousElements_ComponentButton-Position--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => flagOpener(setHomeMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => flagOpener(setHomeMusicVolumeOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
            </div>
            
        </>

    );

}


export default Dog;