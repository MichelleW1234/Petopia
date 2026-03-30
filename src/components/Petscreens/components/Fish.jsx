import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "./PetscreensComponents/Stations/Main.jsx";
import Feeding from "./PetscreensComponents/Stations/Feeding.jsx";
import Cleaning from "./PetscreensComponents/Stations/Cleaning.jsx";
import Medicine from "./PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "./PetscreensComponents/Schedule/Schedule.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, healthKey, medicineKey, medicineDoseTimeGap, fishSpecies, healthCapList, timeLimitList} from "../../../constants/Constants.js";
import { initiateFeeding, initiateCleaning } from "../helpers/Helpers.js";



function Fish (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [activityInProgress, setActivityInProgress] = useState(false);
    const [fishOpenFeedingFlag, setFishOpenFeedingFlag] = useState(false);
    const [fishOpenCleaningFlag, setFishOpenCleaningFlag] = useState(false);
    const [fishOpenMedicineFlag, setFishOpenMedicineFlag] = useState(false);
    const [fishOpenScheduleFlag, setFishOpenScheduleFlag] = useState(false);
    const [fishChosenFeedingOption, setFishChosenFeedingOption] = useState(-1);
    const [fishChosenCleaningOption, setFishChosenCleaningOption] = useState(-1);

    const alive = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey] > 0 ? 
                        true
                        : false
                    : false;

    const hungry = ActivePetName !== "" ?  
                        (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[fishSpecies][feedingKey]/2 ? 
                            true 
                            : false
                        : false;
    const dirty = ActivePetName !== "" ?  
                        (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][0]) >= timeLimitList[fishSpecies][cleaningKey]/2 ? 
                            true 
                            : false
                        : false;

    const mood = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey]/healthCapList[fishSpecies] >= 0.75 ? 
                        0
                        : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies] >= 0.5 ? 
                        1
                        : PetList[ActivePetName][healthKey]/healthCapList[fishSpecies] >= 0.25 ? 
                        2
                        : 3
                    : -1;
    
    const canReceiveDose = ActivePetName !== "" ? 
                                GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                    true
                                    : false
                                : false;
    
    const fishMenuOptions = ["shrimp", "worms", "algae"];
    const fishCleaningOptions = ["sponge", "cloth"];



    useEffect(() => {
        if (fishOpenFeedingFlag || fishOpenCleaningFlag || fishOpenMedicineFlag) {
            setActivityInProgress(true);
        } else {
            setActivityInProgress(false);
        }
    }, [fishOpenFeedingFlag, fishOpenCleaningFlag, fishOpenMedicineFlag]);
    



    return (

        <>

            {fishOpenFeedingFlag &&
            <Feeding
                feedingOptions={fishMenuOptions}
                feedingDesiredOption = {fishChosenFeedingOption}
                setFeedingDesiredOption = {setFishChosenFeedingOption}
                setFeedingOpenFlag = {setFishOpenFeedingFlag}
            />}

            {fishOpenCleaningFlag &&
            <Cleaning
                cleaningOptions={fishCleaningOptions}
                cleaningDesiredOption = {fishChosenCleaningOption}
                setCleaningDesiredOption = {setFishChosenCleaningOption}
                setCleaningOpenFlag = {setFishOpenCleaningFlag}
            />}

            {fishOpenMedicineFlag &&
            <Medicine
                setMedicineOpenFlag = {setFishOpenMedicineFlag}
            />}

            {fishOpenScheduleFlag &&
            <Schedule
                setOpenScheduleFlag={setFishOpenScheduleFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding(hungry, setFishChosenFeedingOption, setFishOpenFeedingFlag, fishMenuOptions)}> Feed Fish </button>
                        <button className={dirty ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateCleaning(dirty, setFishChosenCleaningOption, setFishOpenCleaningFlag, fishCleaningOptions)}> Clean Fish Tank </button>

                        {canReceiveDose ? (

                            <button className="NavBarButton" onClick = {() => setFishOpenMedicineFlag(true)}> Give Fish Medicine </button>

                        ) : (

                            <button className="NavBarButtonPlaceHolder"> Give Fish Medicine </button>

                        )}

                    </>

                ) : (

                    <>
                        <button className="NavBarButtonPlaceHolder"> Feed Fish </button>
                        <button className="NavBarButtonPlaceHolder"> Clean Fish Tank </button>
                        <button className="NavBarButtonPlaceHolder"> Give Fish Medicine </button>
                    </>

                )}

                <button className="NavBarButton" onClick = {() => setFishOpenScheduleFlag(true)}> Check Schedule </button>

            </div>
            <div className = "ScreenContainer">

                <Main
                    homePetEnergy = {400}
                    homePetMood = {mood}
                    homeActivityInProgress={activityInProgress}
                />

            </div>
        </>

    );

}


export default Fish;