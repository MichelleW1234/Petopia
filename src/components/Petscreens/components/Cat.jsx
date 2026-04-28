import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import s1CatLeftOne from "../../../images/Cat/Main/1cat.svg";
import s1CatLeftTwo from "../../../images/Cat/Main/1cat1.svg";
import s1CatRightOne from "../../../images/Cat/Main/1cat2.svg";
import s1CatRightTwo from "../../../images/Cat/Main/1cat3.svg";

import s2CatLeftOne from "../../../images/Cat/Main/2cat.svg";
import s2CatLeftTwo from "../../../images/Cat/Main/2cat1.svg";
import s2CatRightOne from "../../../images/Cat/Main/2cat2.svg";
import s2CatRightTwo from "../../../images/Cat/Main/2cat3.svg";

import s3CatLeftOne from "../../../images/Cat/Main/3cat.svg";
import s3CatLeftTwo from "../../../images/Cat/Main/3cat1.svg";
import s3CatRightOne from "../../../images/Cat/Main/3cat2.svg";
import s3CatRightTwo from "../../../images/Cat/Main/3cat3.svg";


import s1CatFeedOne from "../../../images/Cat/Main/1cat.svg";
import s1CatFeedTwo from "../../../images/Cat/Main/1cat1.svg";
import s2CatFeedOne from "../../../images/Cat/Main/2cat.svg";
import s2CatFeedTwo from "../../../images/Cat/Main/2cat1.svg";
import s3CatFeedOne from "../../../images/Cat/Main/3cat.svg";
import s3CatFeedTwo from "../../../images/Cat/Main/3cat1.svg";


import s1CatMedOne from "../../../images/Cat/Main/1cat.svg";
import s1CatMedTwo from "../../../images/Cat/Main/1cat1.svg";
import s2CatMedOne from "../../../images/Cat/Main/2cat.svg";
import s2CatMedTwo from "../../../images/Cat/Main/2cat1.svg";
import s3CatMedOne from "../../../images/Cat/Main/3cat.svg";
import s3CatMedTwo from "../../../images/Cat/Main/3cat1.svg";


import tuna from "../../../images/Cat/Main/1cat.svg";
import chicken from "../../../images/Cat/Main/1cat1.svg";
import salmon from "../../../images/Cat/Main/1cat2.svg";
import pill from "../../../images/Cat/Main/1cat.svg";



import Main from "./PetscreensComponents/Main.jsx";
import Feed from "./PetscreensComponents/Stations/Feed.jsx";
import Play from "./PetscreensComponents/Stations/Play.jsx";
import Medicine from "./PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "./PetscreensComponents/Nonstations/Schedule.jsx";
import PetCareGuide from "./PetscreensComponents/Nonstations/PetCareGuide.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import {stageKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, catSpecies, healthCapList, timeLimitList} from "../../../constants/Constants.js";
import { initiateActivity } from "../helpers/Helpers.js";

import "./Cat.css";


// CHANGE THIS LATER!!!!!!!!!
//const catPlayComponents = ["button 1", "button 2", "button 3"]

function Cat (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [catActivityInProgress, setCatActivityInProgress] = useState(false);
    const [catFeedOpenFlag, setCatFeedOpenFlag] = useState(false);
    const [catPlayOpenFlag, setCatPlayOpenFlag] = useState(false);
    const [catMedicineOpenFlag, setCatMedicineOpenFlag] = useState(false);
    const [catScheduleOpenFlag, setCatScheduleOpenFlag] = useState(false);
    const [catPetCareGuideOpenFlag, setCatPetCareGuideOpenFlag] = useState(false);
    const [catFeedDesiredOption, setCatFeedDesiredOption] = useState(-1);
    const [catPlayDesiredOption, setCatPlayDesiredOption] = useState(-1);

    const catAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const catHungry = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[catSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;
                            
    const catRestless = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][0]) >= timeLimitList[catSpecies][playingKey]/2 ? 
                                true 
                                : false
                            : false;

    const catMood = ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.25 ? 
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


    const catFeedOptions = [tuna, chicken, salmon]; 
    const catPlayOptions = [tuna, chicken, salmon]; // CHANGE THIS LATER!!!!!!!!! 
    const catPlayComponents = ["button 1", "button 2", "button 3"]; // DELETE THIS LATER!!!!!!!
    const catMedicineOptions = [pill];





    useEffect(() => {
        if (catFeedOpenFlag || catPlayOpenFlag || catMedicineOpenFlag) {
            setCatActivityInProgress(true);
        } else {
            setCatActivityInProgress(false);
        }
    }, [catFeedOpenFlag, catPlayOpenFlag, catMedicineOpenFlag]);


    

    return (

        <>
            {catFeedOpenFlag &&
            <Feed
                feedAnimationImages={catFeedImages}
                feedOptions={catFeedOptions}
                feedDesiredOption = {catFeedDesiredOption}
                setFeedDesiredOption = {setCatFeedDesiredOption}
                setFeedOpenFlag = {setCatFeedOpenFlag}
            />}

            {catPlayOpenFlag &&
            <Play
                playOptions={catPlayOptions}
                playComponents={catPlayComponents}
                playDesiredOption = {catPlayDesiredOption}
                setPlayDesiredOption = {setCatPlayDesiredOption}
                setPlayOpenFlag = {setCatPlayOpenFlag}
            />}

            {catMedicineOpenFlag &&
            <Medicine
                medicineAnimationImages={catMedicineImages}
                medicineOptions={catMedicineOptions}
                setMedicineOpenFlag = {setCatMedicineOpenFlag}
            />}

            {catScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setCatScheduleOpenFlag}
            />}

            {catPetCareGuideOpenFlag &&
            <PetCareGuide
                setPetCareGuideOpenFlag = {setCatPetCareGuideOpenFlag}
            />}
        
            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--ScreenStation">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal" onClick = {() => setActivePetName("")}> Home </Link>

                    {catAlive ? (

                        <>
                            <button className={catHungry ? "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarUrgent" : "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal"} onClick = {() => initiateActivity(catHungry, setCatFeedDesiredOption, setCatFeedOpenFlag, catFeedOptions)}> Feed </button>
                            <button className={catRestless ? "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarUrgent" : "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal"} onClick = {() => initiateActivity(catRestless, setCatPlayDesiredOption, setCatPlayOpenFlag, catPlayOptions)}> Play </button>

                            {catCanReceiveDose ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal" onClick = {() => setCatMedicineOpenFlag(true)}> Medicine </button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--Unclickable UIStapleElements_ComponentButtonPill-Color--ScreenNavbarUnclickable"> Medicine </button>

                            )}
                        
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--Unclickable UIStapleElements_ComponentButtonPill-Color--ScreenNavbarUnclickable"> Feed </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--Unclickable UIStapleElements_ComponentButtonPill-Color--ScreenNavbarUnclickable"> Play </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--Unclickable UIStapleElements_ComponentButtonPill-Color--ScreenNavbarUnclickable"> Medicine </button>
                        </>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal" onClick = {() => setCatScheduleOpenFlag(true)}> Schedule </button>
                    <button className="UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal" onClick = {() => setCatPetCareGuideOpenFlag(true)}> Guide </button>

                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--ScreenContent">
                    <Main
                        mainAnimationImages={catMainImages}
                        mainPetEnergy = {450}
                        mainPetMood = {catMood}
                        mainActivityInProgress = {catActivityInProgress}
                    />
                </div>

            </div>
        </>

    );

}


export default Cat;