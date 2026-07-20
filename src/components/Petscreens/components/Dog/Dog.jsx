import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import MusicVolume from "../../../GlobalComponents//MusicVolume.jsx";
import StrollPatrol from "./DogComponents/StrollPatrol.jsx";
import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Clean from "../PetscreensComponents/Stations/Clean.jsx";
import Play from "../PetscreensComponents/Stations/Play.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import Records from "../PetscreensComponents/Nonstations/Records.jsx";

import { stageKey, cleaningKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, dogSpecies, healthCapList, timeLimitList, optionNameKey, optionImageKey, optionCursorKey, optionGameKey, happyAudioKey, sadAudioKey, sleepAudioKey, activityLastPerformedKey} from "../../../../constants/Constants.js";
import { home, pauseAudio } from "../../helpers/Helpers.js";
import { flagOpener } from "../../../../helpers/helpers.js";

import dogHappy from "../../../../Music/PetImmersionSounds/dogHappy.mp3";
import dogSad from "../../../../Music/PetImmersionSounds/dogSad.mp3";
import dogSleep from "../../../../Music/PetImmersionSounds/asleep.mp3";
import fireplace from "../../../../Music/PetImmersionSounds/Fireplace.mp3";

import s1DogLeftOne from "../../../../images/Dog/Main/Awake/s1.png";
import s1DogLeftTwo from "../../../../images/Dog/Main/Awake/s11.png";
import s1DogRightOne from "../../../../images/Dog/Main/Awake/s12.png";
import s1DogRightTwo from "../../../../images/Dog/Main/Awake/s13.png";
import s2DogLeftOne from "../../../../images/Dog/Main/Awake/s2.png";
import s2DogLeftTwo from "../../../../images/Dog/Main/Awake/s21.png";
import s2DogRightOne from "../../../../images/Dog/Main/Awake/s22.png";
import s2DogRightTwo from "../../../../images/Dog/Main/Awake/s23.png";
import s3DogLeftOne from "../../../../images/Dog/Main/Awake/s3.png";
import s3DogLeftTwo from "../../../../images/Dog/Main/Awake/s31.png";
import s3DogRightOne from "../../../../images/Dog/Main/Awake/s32.png";
import s3DogRightTwo from "../../../../images/Dog/Main/Awake/s33.png";

import s1DogSleepOne from "../../../../images/Dog/Main/Asleep/s1.png";
import s1DogSleepTwo from "../../../../images/Dog/Main/Asleep/s11.png";
import s2DogSleepOne from "../../../../images/Dog/Main/Asleep/s2.png";
import s2DogSleepTwo from "../../../../images/Dog/Main/Asleep/s21.png";
import s3DogSleepOne from "../../../../images/Dog/Main/Asleep/s3.png";
import s3DogSleepTwo from "../../../../images/Dog/Main/Asleep/s31.png";

import s1DogFeed from "../../../../images/Dog/Feed/Animation/s1.gif";
import s2DogFeed from "../../../../images/Dog/Feed/Animation/s2.gif";
import s3DogFeed from "../../../../images/Dog/Feed/Animation/s3.gif";

import s1DogClean from "../../../../images/Dog/Clean/Animation/s1.png";
import s2DogClean from "../../../../images/Dog/Clean/Animation/s2.png";
import s3DogClean from "../../../../images/Dog/Clean/Animation/s3.png";

import s1DogMed from "../../../../images/Dog/Medicine/Animation/s1.gif";
import s2DogMed from "../../../../images/Dog/Medicine/Animation/s2.gif";
import s3DogMed from "../../../../images/Dog/Medicine/Animation/s3.gif";

import beef from "../../../../images/Dog/Feed/Options/beef.png";
import turkey from "../../../../images/Dog/Feed/Options/turkey.png";
import lamb from "../../../../images/Dog/Feed/Options/lamb.png";
import soap from "../../../../images/Dog/Clean/Options/soap.png";
import brush from "../../../../images/Dog/Clean/Options/brush.png";
import soapCursor from "../../../../images/Dog/Clean/Options/soap.cur";
import brushCursor from "../../../../images/Dog/Clean/Options/brush.cur";
import leash from "../../../../images/Dog/Play/Options/leash.png";
import pill from "../../../../images/Dog/Medicine/Options/pill.png";
import chew from "../../../../images/Dog/Medicine/Options/chew.png";

import "./Dog.css";




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

    const dogAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const dogHungry = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][activityLastPerformedKey]) >= timeLimitList[dogSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;

    const dogDirty = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][activityLastPerformedKey]) >= timeLimitList[dogSpecies][cleaningKey]/2 ? 
                                true
                                : false
                            : false;
                            
    const dogRestless = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][activityLastPerformedKey]) >= timeLimitList[dogSpecies][playingKey]/2 ? 
                                true 
                                : false
                            : false;

    const dogUnwell = ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey] < healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] ? 
                            true 
                            : false
                        : false;


    const dogMood = ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey]/healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies][PetList[ActivePetName][stageKey]] >= 0.25 ? 
                            2
                            : 3
                        : -1;

    const dogCanReceiveDose = ActivePetName !== "" ? 
                                    GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                        true
                                        : false
                                    : false;


    const dogMainImages = ActivePetName !== "" ? 
                            PetList[ActivePetName][stageKey] === 0 ? 
                                    [[s1DogLeftOne, s1DogLeftTwo], [s1DogRightOne, s1DogRightTwo]]
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    [[s2DogLeftOne, s2DogLeftTwo], [s2DogRightOne, s2DogRightTwo]]
                                : [[s3DogLeftOne, s3DogLeftTwo], [s3DogRightOne, s3DogRightTwo]]
                            : [[,], [,]];  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogMainSleepingImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1DogSleepOne, s1DogSleepTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2DogSleepOne, s2DogSleepTwo]
                                    : [s3DogSleepOne, s3DogSleepTwo]
                                : []; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogFeedImage = ActivePetName !== "" ? 
                            PetList[ActivePetName][stageKey] === 0 ? 
                                    s1DogFeed
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    s2DogFeed
                                : s3DogFeed
                            : null;  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogCleanImage = ActivePetName !== "" ? 
                            PetList[ActivePetName][stageKey] === 0 ? 
                                    s1DogClean
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    s2DogClean
                                : s3DogClean
                            : null;  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogMedicineImage = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        s1DogMed
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        s2DogMed
                                    : s3DogMed
                                : null;  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogFeedOptionsList = [{[optionNameKey]: "beef", [optionImageKey]: beef}, {[optionNameKey]: "turkey", [optionImageKey]: turkey}, {[optionNameKey]: "lamb", [optionImageKey]: lamb}]; 
    const dogCleanOptionsList = [{[optionNameKey]: "soap", [optionImageKey]: soap, [optionCursorKey]: soapCursor}, {[optionNameKey]: "brush", [optionImageKey]: brush, [optionCursorKey]: brushCursor}];
    const dogPlayOptionsList = [{[optionNameKey]: "Stroll Patrol", [optionImageKey]: leash, [optionGameKey]: StrollPatrol}];
    const dogMedicineOptionsList = [{[optionNameKey]: "pill", [optionImageKey]: pill}, {[optionNameKey]: "chew", [optionImageKey]: chew}];

    const dogAudioRefs = useRef({[happyAudioKey]: new Audio(dogHappy), [sadAudioKey]: new Audio(dogSad), [sleepAudioKey]: new Audio(dogSleep)});
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

            flagOpener(setDogScheduleOpenFlag, 0);

        }

    },
        ".Schedule"
    );
    

    useKeyboardShortcut("3", () => {

        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogRecordsOpenFlag && !dogMusicVolumeOpenFlag){

            flagOpener(setDogRecordsOpenFlag, 0);

        }

    },
        ".Records"
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
                cleanImage={dogCleanImage}
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
            
            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home <br/> [1]</Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setDogScheduleOpenFlag, 0)}> Schedule <br/> [2]</button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Records" onClick = {() => flagOpener(setDogRecordsOpenFlag, 0)}> Records <br/> [3]</button>

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
                    <Main
                        mainAnimationImages={dogMainImages}
                        mainSleepingImages={dogMainSleepingImages}
                        mainPetAudios={dogAudioRefs}
                        mainPetEnergy = {350}
                        mainPetMood = {dogMood}
                        mainActivityInProgress={dogActivityInProgress}
                    />
                </div>

            </div>

            <button 
                className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen MiscellaneousElements_ComponentButton-Position--ScreenToggle Volume" 
                onClick = {() => flagOpener(setDogMusicVolumeOpenFlag, 1)}>
                Volume <br/> [v]
            </button>
        </>

    );

}


export default Dog;