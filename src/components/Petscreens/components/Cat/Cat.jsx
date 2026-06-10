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
import Play from "../PetscreensComponents/Stations/Play.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";
import MouseHunt from "./CatComponents/MouseHunt.jsx";

import {stageKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, catSpecies, healthCapList, timeLimitList, optionNameKey, optionImageKey, optionGameKey, happyAudioKey, sadAudioKey, sleepAudioKey, activityLastPerformedKey } from "../../../../constants/Constants.js";
import { home, pauseAudio } from "../../helpers/helpers.js";
import { flagOpener } from "../../../../helpers/helpers.js";

import catHappy from "../../../../Music/PetImmersionSounds/catHappy.mp3";
import catSad from "../../../../Music/PetImmersionSounds/catSad.mp3";
import catSleep from "../../../../Music/PetImmersionSounds/asleep.mp3";

import s1CatLeftOne from "../../../../images/Cat/Main/Awake/s1.svg";
import s1CatLeftTwo from "../../../../images/Cat/Main/Awake/s11.svg";
import s1CatRightOne from "../../../../images/Cat/Main/Awake/s12.svg";
import s1CatRightTwo from "../../../../images/Cat/Main/Awake/s13.svg";
import s2CatLeftOne from "../../../../images/Cat/Main/Awake/s2.svg";
import s2CatLeftTwo from "../../../../images/Cat/Main/Awake/s21.svg";
import s2CatRightOne from "../../../../images/Cat/Main/Awake/s22.svg";
import s2CatRightTwo from "../../../../images/Cat/Main/Awake/s23.svg";
import s3CatLeftOne from "../../../../images/Cat/Main/Awake/s3.svg";
import s3CatLeftTwo from "../../../../images/Cat/Main/Awake/s31.svg";
import s3CatRightOne from "../../../../images/Cat/Main/Awake/s32.svg";
import s3CatRightTwo from "../../../../images/Cat/Main/Awake/s33.svg";

import s1CatSleepOne from "../../../../images/Cat/Main/Asleep/s1.png";
import s1CatSleepTwo from "../../../../images/Cat/Main/Asleep/s11.png";
import s2CatSleepOne from "../../../../images/Cat/Main/Asleep/s2.png";
import s2CatSleepTwo from "../../../../images/Cat/Main/Asleep/s21.png";
import s3CatSleepOne from "../../../../images/Cat/Main/Asleep/s3.png";
import s3CatSleepTwo from "../../../../images/Cat/Main/Asleep/s31.png";

import s1CatFeedOne from "../../../../images/Cat/Feed/Animation/s1.png";
import s1CatFeedTwo from "../../../../images/Cat/Feed/Animation/s11.png";
import s2CatFeedOne from "../../../../images/Cat/Feed/Animation/s2.png";
import s2CatFeedTwo from "../../../../images/Cat/Feed/Animation/s21.png";
import s3CatFeedOne from "../../../../images/Cat/Feed/Animation/s3.png";
import s3CatFeedTwo from "../../../../images/Cat/Feed/Animation/s31.png";

import s1CatMedOne from "../../../../images/Cat/Feed/Animation/s1.png";
import s1CatMedTwo from "../../../../images/Cat/Feed/Animation/s11.png";
import s2CatMedOne from "../../../../images/Cat/Feed/Animation/s2.png";
import s2CatMedTwo from "../../../../images/Cat/Feed/Animation/s21.png";
import s3CatMedOne from "../../../../images/Cat/Feed/Animation/s3.png";
import s3CatMedTwo from "../../../../images/Cat/Feed/Animation/s31.png";

import tuna from "../../../../images/Cat/Feed/Options/tuna.png";
import chicken from "../../../../images/Cat/Feed/Options/chicken.png";
import salmon from "../../../../images/Cat/Feed/Options/salmon.png";
import magnifier from "../../../../images/Cat/Play/Options/magnifier.png";
import pill from "../../../../images/Cat/Medicine/Options/pill.png";
import tablet from "../../../../images/Cat/Medicine/Options/tablet.png";

import "./Cat.css";




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

    const catAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const catHungry = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][activityLastPerformedKey]) >= timeLimitList[catSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;
                            
    const catRestless = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][activityLastPerformedKey]) >= timeLimitList[catSpecies][playingKey]/2 ? 
                                true 
                                : false
                            : false;

    const catUnwell =  ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey] < healthCapList[catSpecies][PetList[ActivePetName][stageKey]] ? 
                            true 
                            : false
                        : false;


    const catMood = ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey]/healthCapList[catSpecies][PetList[ActivePetName][stageKey]] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies][PetList[ActivePetName][stageKey]] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies][PetList[ActivePetName][stageKey]] >= 0.25 ? 
                            2
                            : 3
                        : -1;

    const catCanReceiveDose = ActivePetName !== "" ? 
                                    GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                        true
                                        : false
                                    : false;

    const catMainImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [[s1CatLeftOne, s1CatLeftTwo], [s1CatRightOne, s1CatRightTwo]]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [[s2CatLeftOne, s2CatLeftTwo], [s2CatRightOne, s2CatRightTwo]]
                                    : [[s3CatLeftOne, s3CatLeftTwo], [s3CatRightOne, s3CatRightTwo]]
                                : [[s1CatLeftOne, s1CatLeftTwo], [s1CatRightOne, s1CatRightTwo]];  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const catMainSleepingImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1CatSleepOne, s1CatSleepTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2CatSleepOne, s2CatSleepTwo]
                                    : [s3CatSleepOne, s3CatSleepTwo]
                                : [s1CatSleepOne, s1CatSleepTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const catFeedImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1CatFeedOne, s1CatFeedTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2CatFeedOne, s2CatFeedTwo]
                                    : [s3CatFeedOne, s3CatFeedTwo]
                                : [s1CatFeedOne, s1CatFeedTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const catMedicineImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1CatMedOne, s1CatMedTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2CatMedOne, s2CatMedTwo]
                                    : [s3CatMedOne, s3CatMedTwo]
                                : [s1CatMedOne, s1CatMedTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!



    const catFeedOptionsList = [{[optionNameKey]: "tuna", [optionImageKey]: tuna}, {[optionNameKey]: "chicken", [optionImageKey]: chicken}, {[optionNameKey]: "salmon", [optionImageKey]: salmon}];
    const catPlayOptionsList = [{[optionNameKey]: "Mouse Hunt", [optionImageKey]: magnifier, [optionGameKey]: MouseHunt}];
    const catMedicineOptionsList = [{[optionNameKey]: "pill", [optionImageKey]: pill}, {[optionNameKey]: "tablet", [optionImageKey]: tablet}];

    const catAudioRefs = useRef({[happyAudioKey]: new Audio(catHappy), [sadAudioKey]: new Audio(catSad), [sleepAudioKey]: new Audio(catSleep)});

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

            flagOpener(setCatScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
    


    useKeyboardShortcut("3", () => {

        if (!catFeedOpenFlag && !catPlayOpenFlag && !catMedicineOpenFlag && !catScheduleOpenFlag && !catRecordsOpenFlag && !catMusicVolumeOpenFlag){

            flagOpener(setCatRecordsOpenFlag, 0);

        }

    },
        ".Records"
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
                feedAnimationImages={catFeedImages}
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
                medicineAnimationImages={catMedicineImages}
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
        
            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setCatScheduleOpenFlag, 0)}> Schedule <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => flagOpener(setCatRecordsOpenFlag, 0)}> Records <br/> [3]</button>

                    {catAlive ? (

                        <>
                            <button className={catHungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {() => flagOpener(setCatFeedOpenFlag, 0)}> Feed <br/> [4]</button>
                            <button className={catRestless ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Play"} onClick = {() => flagOpener(setCatPlayOpenFlag, 0)}> Play <br/> [5] </button>

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
                    <Main
                        mainAnimationImages={catMainImages}
                        mainSleepingImages = {catMainSleepingImages}
                        mainPetAudios = {catAudioRefs}
                        mainPetEnergy = {450}
                        mainPetMood = {catMood}
                        mainActivityInProgress = {catActivityInProgress}
                    />
                </div>

            </div>

            <button 
                className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen MiscellaneousElements_ComponentButton-Position--ScreenToggle Volume" 
                onClick = {() => flagOpener(setCatMusicVolumeOpenFlag, 1)}>
                Volume <br/> [v]
            </button>

        </>

    );

}


export default Cat;