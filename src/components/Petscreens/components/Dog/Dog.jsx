import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import s1DogLeftOne from "../../../../images/Dog/Main/Awake/s1.svg";
import s1DogLeftTwo from "../../../../images/Dog/Main/Awake/s11.svg";
import s1DogRightOne from "../../../../images/Dog/Main/Awake/s12.svg";
import s1DogRightTwo from "../../../../images/Dog/Main/Awake/s13.svg";
import s2DogLeftOne from "../../../../images/Dog/Main/Awake/s2.svg";
import s2DogLeftTwo from "../../../../images/Dog/Main/Awake/s21.svg";
import s2DogRightOne from "../../../../images/Dog/Main/Awake/s22.svg";
import s2DogRightTwo from "../../../../images/Dog/Main/Awake/s23.svg";
import s3DogLeftOne from "../../../../images/Dog/Main/Awake/s3.svg";
import s3DogLeftTwo from "../../../../images/Dog/Main/Awake/s31.svg";
import s3DogRightOne from "../../../../images/Dog/Main/Awake/s32.svg";
import s3DogRightTwo from "../../../../images/Dog/Main/Awake/s33.svg";

import s1DogSleepOne from "../../../../images/Dog/Main/Asleep/s1.png";
import s1DogSleepTwo from "../../../../images/Dog/Main/Asleep/s11.png";
import s2DogSleepOne from "../../../../images/Dog/Main/Asleep/s2.png";
import s2DogSleepTwo from "../../../../images/Dog/Main/Asleep/s21.png";
import s3DogSleepOne from "../../../../images/Dog/Main/Asleep/s3.png";
import s3DogSleepTwo from "../../../../images/Dog/Main/Asleep/s31.png";


import s1DogFeedOne from "../../../../images/Dog/Feed/Animation/s1.png";
import s1DogFeedTwo from "../../../../images/Dog/Feed/Animation/s11.png";
import s2DogFeedOne from "../../../../images/Dog/Feed/Animation/s2.png";
import s2DogFeedTwo from "../../../../images/Dog/Feed/Animation/s21.png";
import s3DogFeedOne from "../../../../images/Dog/Feed/Animation/s3.png";
import s3DogFeedTwo from "../../../../images/Dog/Feed/Animation/s31.png";


import s1DogCleanOne from "../../../../images/Dog/Main/Awake/s1.svg";
import s1DogCleanTwo from "../../../../images/Dog/Main/Awake/s11.svg";
import s2DogCleanOne from "../../../../images/Dog/Main/Awake/s2.svg";
import s2DogCleanTwo from "../../../../images/Dog/Main/Awake/s21.svg";
import s3DogCleanOne from "../../../../images/Dog/Main/Awake/s3.svg";
import s3DogCleanTwo from "../../../../images/Dog/Main/Awake/s31.svg";


import s1DogMedOne from "../../../../images/Dog/Feed/Animation/s1.png";
import s1DogMedTwo from "../../../../images/Dog/Feed/Animation/s11.png";
import s2DogMedOne from "../../../../images/Dog/Feed/Animation/s2.png";
import s2DogMedTwo from "../../../../images/Dog/Feed/Animation/s21.png";
import s3DogMedOne from "../../../../images/Dog/Feed/Animation/s3.png";
import s3DogMedTwo from "../../../../images/Dog/Feed/Animation/s31.png";


import beef from "../../../../images/Dog/Feed/Options/beef.png";
import turkey from "../../../../images/Dog/Feed/Options/turkey.png";
import lamb from "../../../../images/Dog/Feed/Options/lamb.png";
import soap from "../../../../images/Dog/Clean/Options/soap.png";
import brush from "../../../../images/Dog/Clean/Options/brush.png";
import soapCursor from "../../../../images/Dog/Clean/Options/soap.cur";
import brushCursor from "../../../../images/Dog/Clean/Options/brush.cur";
import leash from "../../../../images/Dog/Play/leash.png";
import pill from "../../../../images/Dog/Medicine/Options/pill.png";

import GameOne from "./DogComponents/GameOne.jsx";

import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Clean from "../PetscreensComponents/Stations/Clean.jsx";
import Play from "../PetscreensComponents/Stations/Play.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import BirthCertificate from "../PetscreensComponents/Nonstations/BirthCertificate.jsx";



import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { stageKey, cleaningKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, dogSpecies, healthCapList, timeLimitList} from "../../../../constants/Constants.js";
import { home, pauseAudios } from "../../helpers/Helpers.js";
import { flagOpener } from "../../../../helpers/helpers.js";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import dogHappy from "../../../../Music/PetImmersionSounds/dogHappy.mp3";
import dogSad from "../../../../Music/PetImmersionSounds/dogSad.mp3";
import dogSleep from "../../../../Music/PetImmersionSounds/asleep.mp3";

import "./Dog.css";




function Dog (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [dogActivityInProgress, setDogActivityInProgress] = useState(false);
    const [dogFeedOpenFlag, setDogFeedOpenFlag] = useState(false);
    const [dogCleanOpenFlag, setDogCleanOpenFlag] = useState(false);
    const [dogPlayOpenFlag, setDogPlayOpenFlag] = useState(false);
    const [dogMedicineOpenFlag, setDogMedicineOpenFlag] = useState(false);
    const [dogBirthCertificateOpenFlag, setDogBirthCertificateOpenFlag] = useState(false);
    const [dogScheduleOpenFlag, setDogScheduleOpenFlag] = useState(false);
    const [dogFeedDesiredOption, setDogFeedDesiredOption] = useState(-1);
    const [dogCleanDesiredOption, setDogCleanDesiredOption] = useState(-1);
    const [dogPlayDesiredOption, setDogPlayDesiredOption] = useState(-1);
    const [dogMedicineDesiredOption, setDogMedicineDesiredOption] = useState(-1);

    const dogAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const dogHungry = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[dogSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;

    const dogDirty = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][0]) >= timeLimitList[dogSpecies][cleaningKey]/2 ? 
                                true
                                : false
                            : false;
                            
    const dogRestless = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][0]) >= timeLimitList[dogSpecies][playingKey]/2 ? 
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
                            : [[s1DogLeftOne, s1DogLeftTwo], [s1DogRightOne, s1DogRightTwo]];  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogMainSleepingImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1DogSleepOne, s1DogSleepTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2DogSleepOne, s2DogSleepTwo]
                                    : [s3DogSleepOne, s3DogSleepTwo]
                                : [s1DogSleepOne, s1DogSleepTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogFeedImages = ActivePetName !== "" ? 
                            PetList[ActivePetName][stageKey] === 0 ? 
                                    [s1DogFeedOne, s1DogFeedTwo]
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    [s2DogFeedOne, s2DogFeedTwo]
                                : [s3DogFeedOne, s3DogFeedTwo]
                            : [s1DogFeedOne, s1DogFeedTwo];  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogCleanImages = ActivePetName !== "" ? 
                            PetList[ActivePetName][stageKey] === 0 ? 
                                    [s1DogCleanOne, s1DogCleanTwo]
                                : PetList[ActivePetName][stageKey] === 1 ? 
                                    [s2DogCleanOne, s2DogCleanTwo]
                                : [s3DogCleanOne, s3DogCleanTwo]
                            : [s1DogCleanOne, s1DogCleanTwo];  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogMedicineImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1DogMedOne, s1DogMedTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2DogMedOne, s2DogMedTwo]
                                    : [s3DogMedOne, s3DogMedTwo]
                                : [s1DogMedOne, s1DogMedTwo];  //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const dogFeedOptions = [["beef", beef], ["turkey", turkey], ["lamb", lamb]]; 
    const dogCleanOptions = [["soap", soap, soapCursor], ["brush", brush, brushCursor]];
    const dogPlayOptions = [["Stroll Patrol", leash, GameOne]];
    const dogMedicineOptions = [["pill", pill]];


    const dogAudioRefs = useRef([new Audio(dogHappy), new Audio(dogSad), new Audio(dogSleep)]);

    const navigate = useNavigate();
    
    
    useKeyboardShortcut("1", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            home(setActivePetName);
            navigate("/home");

        }

    },
        ".Home"
    );


    useKeyboardShortcut("2", () => {

        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            flagOpener(setDogScheduleOpenFlag);

        }

    },
        ".Schedule"
    );
    

    useKeyboardShortcut("3", () => {

        if (!dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            flagOpener(setDogBirthCertificateOpenFlag);

        }

    },
        ".Guide"
    );
    


    useKeyboardShortcut("4", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            flagOpener(setDogFeedOpenFlag);

        }

    },
        ".Feed"
    );


    useKeyboardShortcut("5", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            flagOpener(setDogCleanOpenFlag);

        }

    },
        ".Clean"
    );
    
    


    useKeyboardShortcut("6", () => {

        if (dogAlive && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            flagOpener(setDogPlayOpenFlag);

        }

    },
        ".Play"
    );
    


    useKeyboardShortcut("7", () => {

        if (dogAlive && dogCanReceiveDose && !dogFeedOpenFlag && !dogCleanOpenFlag && !dogPlayOpenFlag && !dogMedicineOpenFlag && !dogScheduleOpenFlag && !dogBirthCertificateOpenFlag){

            flagOpener(setDogMedicineOpenFlag);

        }

    },
        ".Medicine"
    );
    



    useEffect(() => {

        if (ActivePetName === "" || dogFeedOpenFlag || dogCleanOpenFlag || dogPlayOpenFlag || dogMedicineOpenFlag){

            pauseAudios(dogAudioRefs);

        }

    }, [ActivePetName, dogFeedOpenFlag, dogCleanOpenFlag, dogPlayOpenFlag, dogMedicineOpenFlag]);
    

    useEffect(() => {
        if (dogFeedOpenFlag || dogCleanOpenFlag || dogPlayOpenFlag || dogMedicineOpenFlag) {
            setDogActivityInProgress(true);
        } else {
            setDogActivityInProgress(false);
        }
    }, [dogFeedOpenFlag, dogCleanOpenFlag, dogPlayOpenFlag, dogMedicineOpenFlag]);

    
    useEffect(() => {

        if (dogHungry){

            setDogFeedDesiredOption(Math.floor(Math.random() * dogFeedOptions.length));

        }

        if (dogDirty){

            setDogCleanDesiredOption(Math.floor(Math.random() * dogCleanOptions.length));

        }

        if (dogRestless){

            setDogPlayDesiredOption(Math.floor(Math.random() * dogPlayOptions.length));

        }

        if (dogUnwell){

            setDogMedicineDesiredOption(Math.floor(Math.random() * dogMedicineOptions.length));

        }

    }, [dogHungry, dogDirty, dogRestless, dogUnwell]);

    
    return (
        
        <>
            {dogFeedOpenFlag &&
            <Feed
                feedAnimationImages={dogFeedImages}
                feedOptions={dogFeedOptions}
                feedDesiredOption = {dogFeedDesiredOption}
                setFeedDesiredOption = {setDogFeedDesiredOption}
                setFeedOpenFlag = {setDogFeedOpenFlag}
            />}

            {dogCleanOpenFlag &&
            <Clean
                cleanAnimationImages={dogCleanImages}
                cleanOptions={dogCleanOptions}
                cleanDesiredOption = {dogCleanDesiredOption}
                setCleanDesiredOption = {setDogCleanDesiredOption}
                setCleanOpenFlag = {setDogCleanOpenFlag}
            />}

            {dogPlayOpenFlag &&
            <Play
                playOptions={dogPlayOptions}
                playDesiredOption = {dogPlayDesiredOption}
                setPlayDesiredOption = {setDogPlayDesiredOption}
                setPlayOpenFlag = {setDogPlayOpenFlag}
            />}

            {dogMedicineOpenFlag &&
            <Medicine
                medicineAnimationImages={dogMedicineImages}
                medicineOptions={dogMedicineOptions}
                medicineDesiredOption = {dogMedicineDesiredOption}
                setMedicineDesiredOption = {setDogMedicineDesiredOption}
                setMedicineOpenFlag = {setDogMedicineOpenFlag}
            />}

            {dogScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setDogScheduleOpenFlag}
            />}

            {dogBirthCertificateOpenFlag &&
            <BirthCertificate
                setBirthCertificateOpenFlag = {setDogBirthCertificateOpenFlag}
            />}
            
            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen--Station">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Home" onClick = {() => home(setActivePetName)}> Home </Link>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Schedule" onClick = {() => flagOpener(setDogScheduleOpenFlag)}> Schedule </button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Guide" onClick = {() => flagOpener(setDogBirthCertificateOpenFlag)}> About </button>

                    {dogAlive ? (

                        <>
                            <button className={dogHungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Feed" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Feed"} onClick = {(e) => flagOpener(setDogFeedOpenFlag)}> Feed </button>
                            <button className={dogDirty ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Clean" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Clean"} onClick = {() => flagOpener(setDogCleanOpenFlag)}> Clean </button>
                            <button className={dogRestless ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent Play" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Play"} onClick = {() => flagOpener(setDogPlayOpenFlag)}> Play </button>

                            {dogCanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Medicine" onClick = {() => flagOpener(setDogMedicineOpenFlag)}> Medicine </button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine </button>

                            )}
                        
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Feed </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clean </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Play </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine </button>
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
        </>

    );

}


export default Dog;