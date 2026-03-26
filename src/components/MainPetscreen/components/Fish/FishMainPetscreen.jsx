import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import HomeStation from "../PetscreenStations/HomeStation.jsx";
import FeedingStation from "../PetscreenStations/FeedingStation.jsx";
import CleaningStation from "../PetscreenStations/CleaningStation.jsx";
import MedicineStation from "../PetscreenStations/MedicineStation.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, fishHealthCap, fishTimeLimits, healthKey, medicineKey, medicineDoseTimeGap } from "../../../../constants/Constants.js";


function FishMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const alive = ActivePetName !== "" ? 
                PetList[ActivePetName][healthKey] > 0 ? true
                : false
            : false;

    const now = Date.now();
    const hungry = ActivePetName !== "" ?  (now - PetTimeStamps[ActivePetName][feedingKey][0]) >= fishTimeLimits[feedingKey]/2 ? true 
                        : false
                    : false;
    const dirty = ActivePetName !== "" ?  (now - PetTimeStamps[ActivePetName][cleaningKey][0]) >= fishTimeLimits[cleaningKey]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetName !== "" ? PetList[ActivePetName][healthKey]/fishHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetName][healthKey]/fishHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetName][healthKey]/fishHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;

    const [currDate, setCurrDate] = useState(Date.now()); 
    
    const canReceiveDose = currDate - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                                                    true
                                                                    : false;
                                
    const fishMenu = ["shrimp", "worms", "algae"];
    const fishTools = ["sponge", "cloth"];

    const [activityInProgress, setActivityInProgress] = useState(false);
    const [fishOpenFeedingFlag, setFishOpenFeedingFlag] = useState(false);
    const [fishOpenCleaningFlag, setFishOpenCleaningFlag] = useState(false);
    const [fishOpenMedicineFlag, setFishOpenMedicineFlag] = useState(false);
    const [fishChosenFeedingOption, setFishChosenFeedingOption] = useState(-1);
    const [fishChosenCleaningOption, setFishChosenCleaningOption] = useState(-1);



    useEffect(() => {

        const interval = setInterval(() => {
            setCurrDate(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);


    useEffect(() => {
        if (fishOpenFeedingFlag || fishOpenCleaningFlag || fishOpenMedicineFlag) {
            setActivityInProgress(true);
        } else {
            setActivityInProgress(false);
        }
    }, [fishOpenFeedingFlag, fishOpenCleaningFlag, fishOpenMedicineFlag]);

    
    
    const initiateFeeding = () => {
        if (hungry){
            setFishChosenFeedingOption(Math.floor(Math.random() * fishMenu.length));
        }
        setFishOpenFeedingFlag(true);
    }

    const initiateCleaning = () => {
        if (dirty){
            setFishChosenCleaningOption(Math.floor(Math.random() * fishTools.length));
        }
        setFishOpenCleaningFlag(true);
    }



    return (

        <>

            {fishOpenFeedingFlag &&
            <FeedingStation
                menuOptions={fishMenu}
                desiredOption = {fishChosenFeedingOption}
                setDesiredOption = {setFishChosenFeedingOption}
                setOpenFeedingFlag = {setFishOpenFeedingFlag}
            />}

            {fishOpenCleaningFlag &&
            <CleaningStation
                cleaningOptions={fishTools}
                desiredOption = {fishChosenCleaningOption}
                setDesiredOption = {setFishChosenCleaningOption}
                setOpenCleaningFlag = {setFishOpenCleaningFlag}
            />}

            {fishOpenMedicineFlag &&
            <MedicineStation
                healthcap = {fishHealthCap}
                setOpenMedicineFlag = {setFishOpenMedicineFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding()}> Feed Fish </button>
                        <button className={dirty ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateCleaning()}> Clean Fish Tank </button>

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