import { Link } from "react-router-dom";
import { useState, useEffect } from "react";



import s1FishLeftOne from "../../../../images/Fish/Main/s1.svg";
import s1FishLeftTwo from "../../../../images/Fish/Main/s11.svg";
import s1FishRightOne from "../../../../images/Fish/Main/s12.svg";
import s1FishRightTwo from "../../../../images/Fish/Main/s13.svg";

import s2FishLeftOne from "../../../../images/Fish/Main/s2.svg";
import s2FishLeftTwo from "../../../../images/Fish/Main/s21.svg";
import s2FishRightOne from "../../../../images/Fish/Main/s22.svg";
import s2FishRightTwo from "../../../../images/Fish/Main/s23.svg";

import s3FishLeftOne from "../../../../images/Fish/Main/s3.svg";
import s3FishLeftTwo from "../../../../images/Fish/Main/s31.svg";
import s3FishRightOne from "../../../../images/Fish/Main/s32.svg";
import s3FishRightTwo from "../../../../images/Fish/Main/s33.svg";


import s1FishFeedOne from "../../../../images/Fish/Feed/Animation/s1.png";
import s1FishFeedTwo from "../../../../images/Fish/Feed/Animation/s11.png";
import s2FishFeedOne from "../../../../images/Fish/Feed/Animation/s2.png";
import s2FishFeedTwo from "../../../../images/Fish/Feed/Animation/s21.png";
import s3FishFeedOne from "../../../../images/Fish/Feed/Animation/s3.png";
import s3FishFeedTwo from "../../../../images/Fish/Feed/Animation/s31.png";


import s1FishCleanOne from "../../../../images/Fish/Clean/Animation/s1.png";
import s1FishCleanTwo from "../../../../images/Fish/Clean/Animation/s11.png";
import s2FishCleanOne from "../../../../images/Fish/Clean/Animation/s2.png";
import s2FishCleanTwo from "../../../../images/Fish/Clean/Animation/s21.png";
import s3FishCleanOne from "../../../../images/Fish/Clean/Animation/s3.png";
import s3FishCleanTwo from "../../../../images/Fish/Clean/Animation/s31.png";


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


import Main from "../PetscreensComponents/Main.jsx";
import Feed from "../PetscreensComponents/Stations/Feed.jsx";
import Clean from "../PetscreensComponents/Stations/Clean.jsx";
import Medicine from "../PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "../PetscreensComponents/Nonstations/Schedule.jsx";
import PetCareGuide from "../PetscreensComponents/Nonstations/PetCareGuide.jsx";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, healthKey, medicineKey, medicineDoseTimeGap, fishSpecies, healthCapList, timeLimitList, stageKey} from "../../../../constants/Constants.js";

import "./Fish.css";



function Fish (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [fishActivityInProgress, setFishActivityInProgress] = useState(false);
    const [fishFeedOpenFlag, setFishFeedOpenFlag] = useState(false);
    const [fishCleanOpenFlag, setFishCleanOpenFlag] = useState(false);
    const [fishMedicineOpenFlag, setFishMedicineOpenFlag] = useState(false);
    const [fishScheduleOpenFlag, setFishScheduleOpenFlag] = useState(false);
    const [fishPetCareGuideOpenFlag, setFishPetCareGuideOpenFlag] = useState(false);
    const [fishFeedDesiredOption, setFishFeedDesiredOption] = useState(-1);
    const [fishCleanDesiredOption, setFishCleanDesiredOption] = useState(-1);
    const [fishMedicineDesiredOption, setFishMedicineDesiredOption] = useState(-1);

    const fishAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const fishHungry = ActivePetName !== "" ?  
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[fishSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;
                            
    const fishDirty = ActivePetName !== "" ?  
                            (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][0]) >= timeLimitList[fishSpecies][cleaningKey]/2 ? 
                                true 
                                : false
                            : false;

    const fishUnwell = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] < healthCapList[fishSpecies] ? 
                                true 
                                : false
                            : false;

    const fishMood = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey]/healthCapList[fishSpecies] >= 0.75 ? 
                                0
                                : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies] >= 0.5 ? 
                                1
                                : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies] >= 0.25 ? 
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

    
    const fishFeedImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1FishFeedOne, s1FishFeedTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2FishFeedOne, s2FishFeedTwo]
                                    : [s3FishFeedOne, s3FishFeedTwo]
                                : [s1FishFeedOne, s1FishFeedTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const fishCleanImages = ActivePetName !== "" ? 
                                PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1FishCleanOne, s1FishCleanTwo]
                                    : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2FishCleanOne, s2FishCleanTwo]
                                    : [s3FishCleanOne, s3FishCleanTwo]
                                : [s1FishCleanOne, s1FishCleanTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const fishMedicineImages = ActivePetName !== "" ? 
                                    PetList[ActivePetName][stageKey] === 0 ? 
                                        [s1FishMedOne, s1FishMedTwo]
                                        : PetList[ActivePetName][stageKey] === 1 ? 
                                        [s2FishMedOne, s2FishMedTwo]
                                        : [s3FishMedOne, s3FishMedTwo]
                                    :  [s1FishMedOne, s1FishMedTwo]; //CHANGE THIS TO UNIVERSAL DEFAULT!!!!!!!!!

    const fishFeedOptions = [["shrimp", shrimp], ["worms", worms], ["algae", algae]];
    const fishCleanOptions = [["sponge", sponge, spongeCursor], ["cloth", cloth, clothCursor]];
    const fishMedicineOptions = [["pill", pill]];


    

    useEffect(() => {

        if (fishHungry){

            setFishFeedDesiredOption(Math.floor(Math.random() * fishFeedOptions.length));

        }

        if (fishDirty){

            setFishCleanDesiredOption(Math.floor(Math.random() * fishCleanOptions.length));

        }

        if (fishUnwell){

            setFishMedicineDesiredOption(Math.floor(Math.random() * fishMedicineOptions.length));

        }

    }, [fishHungry, fishDirty, fishUnwell]);

    
    useEffect(() => {
        if (fishFeedOpenFlag || fishCleanOpenFlag || fishMedicineOpenFlag) {
            setFishActivityInProgress(true);
        } else {
            setFishActivityInProgress(false);
        }
    }, [fishFeedOpenFlag, fishCleanOpenFlag, fishMedicineOpenFlag]);
    



    return (

        <>
            {fishFeedOpenFlag &&
            <Feed
                feedAnimationImages={fishFeedImages}
                feedOptions={fishFeedOptions}
                feedDesiredOption = {fishFeedDesiredOption}
                setFeedDesiredOption = {setFishFeedDesiredOption}
                setFeedOpenFlag = {setFishFeedOpenFlag}
            />}

            {fishCleanOpenFlag &&
            <Clean
                cleanAnimationImages={fishCleanImages}
                cleanOptions={fishCleanOptions}
                cleanDesiredOption = {fishCleanDesiredOption}
                setCleanDesiredOption = {setFishCleanDesiredOption}
                setCleanOpenFlag = {setFishCleanOpenFlag}
            />}

            {fishMedicineOpenFlag &&
            <Medicine
                medicineAnimationImages={fishMedicineImages}
                medicineOptions = {fishMedicineOptions}
                medicineDesiredOption = {fishMedicineDesiredOption}
                setMedicineDesiredOption = {setFishMedicineDesiredOption}
                setMedicineOpenFlag = {setFishMedicineOpenFlag}
            />}

            {fishScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setFishScheduleOpenFlag}
            />}

            {fishPetCareGuideOpenFlag &&
            <PetCareGuide
                setPetCareGuideOpenFlag = {setFishPetCareGuideOpenFlag}
            />}


            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen--Station">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setActivePetName("")}> Home </Link>

                    {fishAlive ? (

                        <>
                            <button className={fishHungry ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar"} onClick = {() => setFishFeedOpenFlag(true)}> Feed </button>
                            <button className={fishDirty ? "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbarUrgent" : "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar"} onClick = {() => setFishCleanOpenFlag(true)}> Clean </button>

                            {fishCanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setFishMedicineOpenFlag(true)}> Medicine </button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine </button>

                            )}

                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Feed </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clean </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Medicine </button>
                        </>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setFishScheduleOpenFlag(true)}> Schedule </button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setFishPetCareGuideOpenFlag(true)}> Guide </button>

                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                    <Main
                        mainAnimationImages={fishMainImages}
                        mainPetEnergy = {400}
                        mainPetMood = {fishMood}
                        mainActivityInProgress={fishActivityInProgress}
                    />
                </div>

            </div>
        </>

    );

}


export default Fish;