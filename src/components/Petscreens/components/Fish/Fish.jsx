import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import MusicVolume from "../../../GlobalComponents/MusicVolume.jsx";
import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Clean from "../PetscreensComponents/Stations/Clean.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";

import { cleaningKey, feedingKey, healthKey, medicineKey, medicineDoseTimeGap, fishSpecies, healthCapList, timeLimitList, stageKey, buttonSoundKey, optionNameKey, optionImageKey, optionCursorKey, happyAudioKey, sadAudioKey, sleepAudioKey, activityLastPerformedKey} from "../../../../constants/Constants.js";
import { home, pauseAudio } from "../../helpers/Helpers.js";
import { flagOpener } from "../../../../helpers/helpers.js";

import fishHappy from "../../../../Music/PetImmersionSounds/fishHappy.mp3";
import fishSad from "../../../../Music/PetImmersionSounds/fishSad.mp3";
import fishSleep from "../../../../Music/PetImmersionSounds/asleep.mp3";
import fishTank from "../../../../Music/PetImmersionSounds/Tank.mp3";

import s1FishLeftOne from "../../../../images/Fish/Main/Awake/s1.svg";
import s1FishLeftTwo from "../../../../images/Fish/Main/Awake/s11.svg";
import s1FishRightOne from "../../../../images/Fish/Main/Awake/s12.svg";
import s1FishRightTwo from "../../../../images/Fish/Main/Awake/s13.svg";
import s2FishLeftOne from "../../../../images/Fish/Main/Awake/s2.svg";
import s2FishLeftTwo from "../../../../images/Fish/Main/Awake/s21.svg";
import s2FishRightOne from "../../../../images/Fish/Main/Awake/s22.svg";
import s2FishRightTwo from "../../../../images/Fish/Main/Awake/s23.svg";
import s3FishLeftOne from "../../../../images/Fish/Main/Awake/s3.svg";
import s3FishLeftTwo from "../../../../images/Fish/Main/Awake/s31.svg";
import s3FishRightOne from "../../../../images/Fish/Main/Awake/s32.svg";
import s3FishRightTwo from "../../../../images/Fish/Main/Awake/s33.svg";

import s1FishSleepOne from "../../../../images/Fish/Main/Asleep/s1.png";
import s1FishSleepTwo from "../../../../images/Fish/Main/Asleep/s11.png";
import s2FishSleepOne from "../../../../images/Fish/Main/Asleep/s2.png";
import s2FishSleepTwo from "../../../../images/Fish/Main/Asleep/s21.png";
import s3FishSleepOne from "../../../../images/Fish/Main/Asleep/s3.png";
import s3FishSleepTwo from "../../../../images/Fish/Main/Asleep/s31.png";

import s1FishFeedOne from "../../../../images/Fish/Feed/Animation/s1.png";
import s1FishFeedTwo from "../../../../images/Fish/Feed/Animation/s11.png";
import s2FishFeedOne from "../../../../images/Fish/Feed/Animation/s2.png";
import s2FishFeedTwo from "../../../../images/Fish/Feed/Animation/s21.png";
import s3FishFeedOne from "../../../../images/Fish/Feed/Animation/s3.png";
import s3FishFeedTwo from "../../../../images/Fish/Feed/Animation/s31.png";

import s1FishClean from "../../../../images/Fish/Clean/Animation/s1.png";
import s2FishClean from "../../../../images/Fish/Clean/Animation/s2.png";
import s3FishClean from "../../../../images/Fish/Clean/Animation/s3.png";

import s1FishMedOne from "../../../../images/Fish/Feed/Animation/s1.png";
import s1FishMedTwo from "../../../../images/Fish/Feed/Animation/s11.png";
import s2FishMedOne from "../../../../images/Fish/Feed/Animation/s2.png";
import s2FishMedTwo from "../../../../images/Fish/Feed/Animation/s21.png";
import s3FishMedOne from "../../../../images/Fish/Feed/Animation/s3.png";
import s3FishMedTwo from "../../../../images/Fish/Feed/Animation/s31.png";

import shrimp from "../../../../images/Fish/Feed/Options/shrimp.png";
import worms from "../../../../images/Fish/Feed/Options/worm.png";
import algae from "../../../../images/Fish/Feed/Options/algae.png";
import sponge from "../../../../images/Fish/Clean/Options/sponge.png";
import cloth from "../../../../images/Fish/Clean/Options/cloth.png";
import spongeCursor from "../../../../images/Fish/Clean/Options/sponge.cur";
import clothCursor from "../../../../images/Fish/Clean/Options/cloth.cur";
import pill from "../../../../images/Fish/Medicine/Options/pill.png";
import serum from  "../../../../images/Fish/Medicine/Options/serum.png";


import "./Fish.css";



function Fish (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [fishMusicVolumeOpenFlag, setFishMusicVolumeOpenFlag] = useState(false);
    const [fishActivityInProgress, setFishActivityInProgress] = useState(false);
    const [fishFeedOpenFlag, setFishFeedOpenFlag] = useState(false);
    const [fishCleanOpenFlag, setFishCleanOpenFlag] = useState(false);
    const [fishMedicineOpenFlag, setFishMedicineOpenFlag] = useState(false);
    const [fishScheduleOpenFlag, setFishScheduleOpenFlag] = useState(false);
    const [fishRecordsOpenFlag, setFishRecordsOpenFlag] = useState(false);
    const [fishFeedOptionsDesiredOption, setFishFeedOptionsDesiredOption] = useState(-1);
    const [fishCleanOptionsDesiredOption, setFishCleanOptionsDesiredOption] = useState(-1);
    const [fishMedicineOptionsDesiredOption, setFishMedicineOptionsDesiredOption] = useState(-1);

    const fishAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const fishHungry = ActivePetName !== "" ?  
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][activityLastPerformedKey]) >= timeLimitList[fishSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;
                            
    const fishDirty = ActivePetName !== "" ?  
                            (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][activityLastPerformedKey]) >= timeLimitList[fishSpecies][cleaningKey]/2 ? 
                                true 
                                : false
                            : false;

    const fishUnwell = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] < healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] ? 
                                true 
                                : false
                            : false;

    const fishMood = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey]/healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] >= 0.75 ? 
                                0
                                : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] >= 0.5 ? 
                                1
                                : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies][PetList[ActivePetName][stageKey]] >= 0.25 ? 
                                2
                                : 3
                            : -1;
    
    const fishCanReceiveDose = ActivePetName !== "" ? 
                                    GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                        true
                                        : false
                                    : false;


    const fishMainImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [[s1FishLeftOne, s1FishLeftTwo], [s1FishRightOne, s1FishRightTwo]]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [[s2FishLeftOne, s2FishLeftTwo], [s2FishRightOne, s2FishRightTwo]]
                                    : [[s3FishLeftOne, s3FishLeftTwo], [s3FishRightOne, s3FishRightTwo]]
                                : [[s1FishLeftOne, s1FishLeftTwo], [s1FishRightOne, s1FishRightTwo]]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!


    const fishMainSleepingImages = ActivePetName !== "" ? 
                                    PetList[ActivePetName][stageKey] === 0 ? 
                                            [s1FishSleepOne, s1FishSleepTwo]
                                        : PetList[ActivePetName][stageKey] === 1 ? 
                                            [s2FishSleepOne, s2FishSleepTwo]
                                        : [s3FishSleepOne, s3FishSleepTwo]
                                    : [s1FishSleepOne, s1FishSleepTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    
    const fishFeedImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1FishFeedOne, s1FishFeedTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2FishFeedOne, s2FishFeedTwo]
                                    : [s3FishFeedOne, s3FishFeedTwo]
                                : [s1FishFeedOne, s1FishFeedTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const fishCleanImage = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1FishClean]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2FishClean]
                                    : [s3FishClean]
                                : [s1FishClean]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const fishMedicineImages = ActivePetName !== "" ? 
                                    PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1FishMedOne, s1FishMedTwo]
                                        : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2FishMedOne, s2FishMedTwo]
                                        : [s3FishMedOne, s3FishMedTwo]
                                    :  [s1FishMedOne, s1FishMedTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const fishFeedOptionsList = [{[optionNameKey]: "shrimp", [optionImageKey]: shrimp}, {[optionNameKey]: "worms", [optionImageKey]: worms}, {[optionNameKey]: "algae", [optionImageKey]: algae}];
    const fishCleanOptionsList = [{[optionNameKey]: "sponge", [optionImageKey]: sponge, [optionCursorKey] : spongeCursor}, {[optionNameKey]: "cloth", [optionImageKey]: cloth, [optionCursorKey]: clothCursor}];
    const fishMedicineOptionsList = [{[optionNameKey]: "pill", [optionImageKey]: pill}, {[optionNameKey]: "serum", [optionImageKey]: serum}];

    const fishAudioRefs = useRef({[happyAudioKey]: new Audio(fishHappy), [sadAudioKey]: new Audio(fishSad), [sleepAudioKey]: new Audio(fishSleep)});
    const fishBackgroundAudioRef = useRef(new Audio(fishTank));


    const navigate = useNavigate();


    useKeyboardShortcut("v", () => {
                
            if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){
    
                flagOpener(setFishMusicVolumeOpenFlag, 1);
    
            }
    
        },
            ".Volume"
        );
    

    useKeyboardShortcut("1", () => {

        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){

            home(setActivePetName);
            navigate("/home");

        }

    },
        ".Home"
    );



    useKeyboardShortcut("2", () => {

        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){

            flagOpener(setFishScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
    

    useKeyboardShortcut("3", () => {

        if (!fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){

            flagOpener(setFishRecordsOpenFlag, 0);

        }

    },
        ".Records"
    );
    


    useKeyboardShortcut("4", () => {

        if (fishAlive && !fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){

            flagOpener(setFishFeedOpenFlag, 0);

        }

    },
        ".Feed"
    );
    


    useKeyboardShortcut("5", () => {

        if (fishAlive && !fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){

            flagOpener(setFishCleanOpenFlag, 0);

        }

    },
        ".Clean"
    );
    


    useKeyboardShortcut("6", () => {

        if (fishAlive && fishCanReceiveDose && !fishFeedOpenFlag && !fishCleanOpenFlag && !fishMedicineOpenFlag && !fishScheduleOpenFlag && !fishRecordsOpenFlag && !fishMusicVolumeOpenFlag){

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
            fishBackgroundAudioRef.current.volume = 0.25;
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

            {fishFeedOpenFlag &&
            <Feed
                feedAnimationImages={fishFeedImages}
                feedOptionsList={fishFeedOptionsList}
                feedOptionsDesiredOption = {fishFeedOptionsDesiredOption}
                setFeedOptionsDesiredOption = {setFishFeedOptionsDesiredOption}
                setFeedOpenFlag = {setFishFeedOpenFlag}
            />}

            {fishCleanOpenFlag &&
            <Clean
                cleanImage={fishCleanImage}
                cleanOptionsList={fishCleanOptionsList}
                cleanOptionsDesiredOption = {fishCleanOptionsDesiredOption}
                setCleanOptionsDesiredOption = {setFishCleanOptionsDesiredOption}
                setCleanOpenFlag = {setFishCleanOpenFlag}
            />}

            {fishMedicineOpenFlag &&
            <Medicine
                medicineAnimationImages={fishMedicineImages}
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


            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setFishScheduleOpenFlag, 0)}> Schedule <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => flagOpener(setFishRecordsOpenFlag, 0)}> Records <br/> [3]</button>

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
                    <Main
                        mainAnimationImages={fishMainImages}
                        mainSleepingImages={fishMainSleepingImages}
                        mainPetAudios={fishAudioRefs}
                        mainPetEnergy = {400}
                        mainPetMood = {fishMood}
                        mainActivityInProgress={fishActivityInProgress}
                    />
                </div>

            </div>

            <button 
                className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen MiscellaneousElements_ComponentButton-Position--ScreenToggle Volume" 
                onClick = {() => flagOpener(setFishMusicVolumeOpenFlag, 1)}>
                Volume <br/> [v]
            </button>

        </>

    );

}


export default Fish;