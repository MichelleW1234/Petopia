import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import MusicVolume from "../../../GlobalComponents/components/MusicVolume.jsx";
import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Play from "../PetscreensComponents/Stations/Play.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";
import MouseHunt from "./CatComponents/MouseHunt.jsx";
import CatGameTwo from "./CatComponents/CatGameTwo.jsx";

import {stageKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, catSpecies, healthCapList, timeLimitList, optionNameKey, optionImageKey, optionGameKey, happyAudioKey, sadAudioKey, sleepAudioKey, activityLastPerformedKey } from "../../../../constants/Constants.js";
import { home, pauseAudio } from "../../helpers/Helpers.js";
import { flagOpener } from "../../../../helpers/Helpers.js";

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
import Pill from "../../../../images/Cat/Medicine/Options/Pill.png";
import Tablet from "../../../../images/Cat/Medicine/Options/Tablet.png";




function Cat (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [catMusicVolumeOpenFlag, setCatMusicVolumeOpenFlag] = useState(false);
    const [catActivityInProgress, setCatActivityInProgress] = useState(false);
    const [catFeedOpenFlag, setCatFeedOpenFlag] = useState(false);
    const [catPlayOpenFlag, setCatPlayOpenFlag] = useState(false);
    const [catMedicineOpenFlag, setCatMedicineOpenFlag] = useState(false);
    const [catScheduleOpenFlag, setCatScheduleOpenFlag] = useState(false);
    const [catRecordsOpenFlag, setCatRecordsOpenFlag] = useState(false);
    const [catFeedOptionsDesiredOption, setCatFeedOptionsDesiredOption] = useState(-1);
    const [catPlayOptionsDesiredOption, setCatPlayOptionsDesiredOption] = useState(-1);
    const [catMedicineOptionsDesiredOption, setCatMedicineOptionsDesiredOption] = useState(-1);

    const catAlive = ActivePetName === "" ? 
                            false
                        :   PetList[ActivePetName][healthKey] === 0 ? 
                                false
                                : true;


    const catHungry = ActivePetName === "" ? 
                            false
                        :   (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][activityLastPerformedKey]) >= timeLimitList[catSpecies][feedingKey]/2 ? 
                                true 
                                : false;
                            
    const catRestless = ActivePetName === "" ? 
                            false
                        :    (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][activityLastPerformedKey]) >= timeLimitList[catSpecies][playingKey]/2 ? 
                                true 
                                : false;


    const catUnwell =  ActivePetName === "" ? 
                            false
                        :    PetList[ActivePetName][healthKey] >= healthCapList[catSpecies][PetList[ActivePetName][stageKey]] ? 
                                false
                                : true;


    const catMood = ActivePetName === "" ? 
                        -1
                    :   PetList[ActivePetName][healthKey]/healthCapList[catSpecies][PetList[ActivePetName][stageKey]] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies][PetList[ActivePetName][stageKey]] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies][PetList[ActivePetName][stageKey]] >= 0.25 ? 
                            2
                            : 3;


    const catCanReceiveDose = ActivePetName === "" ? 
                                    false
                                :   GlobalTimer - PetList[ActivePetName][medicineKey] <= medicineDoseTimeGap ? 
                                        false
                                        : true;


    const catMainImages = ActivePetName === "" ? 
                                [[NullPlaceholder,NullPlaceholder], [NullPlaceholder,NullPlaceholder]]
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        [[MainStageOneOne, MainStageOneTwo], [MainStageOneThree, MainStageOneFour]]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [[MainStageTwoOne, MainStageTwoTwo], [MainStageTwoThree, MainStageTwoFour]]
                                    : [[MainStageThreeOne, MainStageThreeTwo], [MainStageThreeThree, MainStageThreeFour]];


    const catMainSleepingImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        SleepStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        SleepStageTwo
                                    : SleepStageThree;

    const catFeedImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        FeedStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        FeedStageTwo
                                    : FeedStageThree; 

    const catMedicineImage = ActivePetName === "" ? 
                                NullPlaceholder
                            :   PetList[ActivePetName][stageKey] === 0 ? 
                                        MedicineStageOne
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        MedicineStageTwo
                                    : MedicineStageThree;



    const catFeedOptionsList = [{[optionNameKey]: "Tuna", [optionImageKey]: Tuna}, {[optionNameKey]: "Chicken", [optionImageKey]: Chicken}, {[optionNameKey]: "Salmon", [optionImageKey]: Salmon}];
    const catPlayOptionsList = [{[optionNameKey]: "Mouse Hunt", [optionImageKey]: Magnifier, [optionGameKey]: MouseHunt}, {[optionNameKey]: "Feather Fishing", [optionImageKey]: Chicken, [optionGameKey]: CatGameTwo}];
    const catMedicineOptionsList = [{[optionNameKey]: "Pill", [optionImageKey]: Pill}, {[optionNameKey]: "Tablet", [optionImageKey]: Tablet}];

    const catAudioRefs = useRef({[happyAudioKey]: new Audio(HappyMeow), [sadAudioKey]: new Audio(SadMeow), [sleepAudioKey]: new Audio(Sleeping)});
    const catBackgroundAudioRef = useRef(new Audio(Candle));

    const navigate = useNavigate();
        

    useKeyboardShortcut("v", () => {
        
        if (!catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

        
    useKeyboardShortcut("1", () => {

        if (!catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            home(setActivePetName);
            navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatRecordsOpenFlag, 0);

        }

    },
        ".Records"
    );


    useKeyboardShortcut("3", () => {

        if (!catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
        


    useKeyboardShortcut("4", () => {

        if (catAlive && !catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatFeedOpenFlag, 0);

        }

    },
        ".Feed"
    );    


    useKeyboardShortcut("5", () => {

        if (catAlive && !catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatPlayOpenFlag, 0);

        }

    },
        ".Play"
    );
    


    useKeyboardShortcut("6", () => {

        if (catAlive && catCanReceiveDose && !catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatMedicineOpenFlag, 0);

        }

    },
        ".Medicine"
    );



    useEffect(() => {
        if (catFeedOpenFlag || catPlayOpenFlag || catMedicineOpenFlag) {
            setCatActivityInProgress(true);
        } else {
            setCatActivityInProgress(false);
        }
    }, [catFeedOpenFlag, catPlayOpenFlag, catMedicineOpenFlag]);
    
    
    useEffect(() => {

        if (ActivePetName === "" || catActivityInProgress){

            Object.values(catAudioRefs.current).forEach(audio => {
                pauseAudio(audio);
            });

            pauseAudio(catBackgroundAudioRef.current);

        } else {

            catBackgroundAudioRef.current.play();
            catBackgroundAudioRef.current.volume = 0.5;
            catBackgroundAudioRef.current.loop = true;

        }

    }, [ActivePetName, catActivityInProgress]);



    useEffect(() => {

        if (catHungry){

            setCatFeedOptionsDesiredOption(Math.floor(Math.random() * catFeedOptionsList.length));

        }

        if (catRestless){

            setCatPlayOptionsDesiredOption(Math.floor(Math.random() * catPlayOptionsList.length));

        }

        if (catUnwell){

            setCatMedicineOptionsDesiredOption(Math.floor(Math.random() * catMedicineOptionsList.length));

        }

    }, [catHungry, catRestless, catUnwell]);




    

    return (

        <>

            {catMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setCatMusicVolumeOpenFlag}
            />}

            {catFeedOpenFlag &&
            <Feed
                feedAnimationImage={catFeedImage}
                feedOptionsList={catFeedOptionsList}
                feedOptionsDesiredOption = {catFeedOptionsDesiredOption}
                setFeedOptionsDesiredOption = {setCatFeedOptionsDesiredOption}
                setFeedOpenFlag = {setCatFeedOpenFlag}
            />}

            {catPlayOpenFlag &&
            <Play
                playOptionsList={catPlayOptionsList}
                playOptionsDesiredOption = {catPlayOptionsDesiredOption}
                setPlayOptionsDesiredOption = {setCatPlayOptionsDesiredOption}
                setPlayOpenFlag = {setCatPlayOpenFlag}
            />}

            {catMedicineOpenFlag &&
            <Medicine
                medicineAnimationImage={catMedicineImage}
                medicineOptionsList={catMedicineOptionsList}
                medicineOptionsDesiredOption = {catMedicineOptionsDesiredOption}
                setMedicineOptionsDesiredOption = {setCatMedicineOptionsDesiredOption}
                setMedicineOpenFlag = {setCatMedicineOpenFlag}
            />}

            {catScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setCatScheduleOpenFlag}
            />}

            {catRecordsOpenFlag &&
            <Records
                setRecordsOpenFlag = {setCatRecordsOpenFlag}
            />}
        
            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => flagOpener(setCatRecordsOpenFlag, 0)}> Records <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setCatScheduleOpenFlag, 0)}> Schedule <br/> [3]</button>

                    {catAlive ? (

                        <>
                            <button className={catHungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {() => flagOpener(setCatFeedOpenFlag, 0)}> Feed <br/> [4]</button>
                            <button className={catRestless ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Play" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Play"} onClick = {() => flagOpener(setCatPlayOpenFlag, 0)}> Play <br/> [5] </button>

                            {catCanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Medicine" onClick = {() => flagOpener(setCatMedicineOpenFlag, 0)}> Medicine <br/> [6]</button>

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

                    <h1>Living Room:</h1>
                    <Main
                        mainAnimationImages={catMainImages}
                        mainSleepingImage = {catMainSleepingImage}
                        mainPetAudios = {catAudioRefs}
                        mainPetEnergy = {450}
                        mainPetMood = {catMood}
                        mainActivityInProgress = {catActivityInProgress}
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


export default Cat;