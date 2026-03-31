import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "./PetscreensComponents/Stations/Main.jsx";
import Feed from "./PetscreensComponents/Stations/Feed.jsx";
import Clean from "./PetscreensComponents/Stations/Clean.jsx";
import Medicine from "./PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "./PetscreensComponents/Schedule/Schedule.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, healthKey, medicineKey, medicineDoseTimeGap, fishSpecies, healthCapList, timeLimitList} from "../../../constants/Constants.js";
import { initiateActivity } from "../helpers/Helpers.js";



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
    const [fishFeedDesiredOption, setFishFeedDesiredOption] = useState(-1);
    const [fishCleanDesiredOption, setFishCleanDesiredOption] = useState(-1);

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
    
    const fishFeedOptions = ["shrimp", "worms", "algae"];
    const fishCleanOptions = ["sponge", "cloth"];



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
                feedOptions={fishFeedOptions}
                feedDesiredOption = {fishFeedDesiredOption}
                setFeedDesiredOption = {setFishFeedDesiredOption}
                setFeedOpenFlag = {setFishFeedOpenFlag}
            />}

            {fishCleanOpenFlag &&
            <Clean
                cleanOptions={fishCleanOptions}
                cleanDesiredOption = {fishCleanDesiredOption}
                setCleanDesiredOption = {setFishCleanDesiredOption}
                setCleanOpenFlag = {setFishCleanOpenFlag}
            />}

            {fishMedicineOpenFlag &&
            <Medicine
                setMedicineOpenFlag = {setFishMedicineOpenFlag}
            />}

            {fishScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setFishScheduleOpenFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {fishAlive ? (

                    <>
                        <button className={fishHungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(fishHungry, setFishChosenFeedingOption, setFishFeedOpenFlag, fishFeedOptions)}> Feed Fish </button>
                        <button className={fishDirty ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(fishDirty, setFishCleanDesiredOption, setFishCleanOpenFlag, fishCleanOptions)}> Clean Fish Tank </button>

                        {fishCanReceiveDose ? (

                            <button className="NavBarButton" onClick = {() => setFishMedicineOpenFlag(true)}> Give Fish Medicine </button>

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

                <button className="NavBarButton" onClick = {() => setFishScheduleOpenFlag(true)}> Check Schedule </button>

            </div>
            <div className = "ScreenContainer">

                <Main
                    mainPetEnergy = {400}
                    mainPetMood = {fishMood}
                    mainActivityInProgress={fishActivityInProgress}
                />

            </div>
        </>

    );

}


export default Fish;