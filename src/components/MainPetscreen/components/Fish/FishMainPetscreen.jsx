import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import HomeStation from "../PetscreenStations/HomeStation.jsx";
import FeedingStation from "../PetscreenStations/FeedingStation.jsx";
import CleaningStation from "../PetscreenStations/CleaningStation.jsx";
import MedicineStation from "../PetscreenStations/MedicineStation.jsx";
import SchedulingChart from "../SchedulingChart/SchedulingChart.jsx";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, healthKey, medicineKey, medicineDoseTimeGap, fishSpecies, healthCapList, timeLimitList} from "../../../../constants/Constants.js";
import { initiateFeeding, initiateCleaning } from "../../helpers/Helpers.js";



function FishMainPetscreen (){

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
            <FeedingStation
                menuOptions={fishMenuOptions}
                desiredOption = {fishChosenFeedingOption}
                setDesiredOption = {setFishChosenFeedingOption}
                setOpenFeedingFlag = {setFishOpenFeedingFlag}
            />}

            {fishOpenCleaningFlag &&
            <CleaningStation
                cleaningOptions={fishCleaningOptions}
                desiredOption = {fishChosenCleaningOption}
                setDesiredOption = {setFishChosenCleaningOption}
                setOpenCleaningFlag = {setFishOpenCleaningFlag}
            />}

            {fishOpenMedicineFlag &&
            <MedicineStation
                setOpenMedicineFlag = {setFishOpenMedicineFlag}
            />}

            {fishOpenScheduleFlag &&
            <SchedulingChart
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

                <HomeStation
                    petEnergy = {400}
                    mood = {mood}
                    activityInProgress={activityInProgress}
                />

            </div>
        </>

    );

}


export default FishMainPetscreen;