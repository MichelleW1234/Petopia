import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import HomeStation from "../PetscreenStations/HomeStation.jsx";
import FeedingStation from "../PetscreenStations/FeedingStation.jsx";
import CleaningStation from "../PetscreenStations/CleaningStation.jsx";
import PlayingStation from "../PetscreenStations/PlayingStation.jsx";
import MedicineStation from "../PetscreenStations/MedicineStation.jsx";
import SchedulingChart from "../SchedulingChart/SchedulingChart.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { cleaningKey, dogHealthCap, dogTimeLimits, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap } from "../../../../constants/Constants.js";
import { initiateFeeding, initiateCleaning, initiatePlaying } from "../../helpers/Helpers.js";



function DogMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const alive = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey] > 0 ? true
                    : false
                : false;
    
    const now = Date.now();
    const hungry = ActivePetName !== "" ? (now - PetTimeStamps[ActivePetName][feedingKey][0]) >= dogTimeLimits[feedingKey]/2 ? true 
                        : false
                    : false;
    const dirty = ActivePetName !== "" ? (now - PetTimeStamps[ActivePetName][cleaningKey][0]) >= dogTimeLimits[cleaningKey]/2 ? true
                        : false
                    : false;
    const restless = ActivePetName !== "" ? (now - PetTimeStamps[ActivePetName][playingKey][0]) >= dogTimeLimits[playingKey]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetName !== "" ? PetList[ActivePetName][healthKey]/dogHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetName][healthKey]/dogHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetName][healthKey]/dogHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;

    const [currDate, setCurrDate] = useState(Date.now()); 

    const canReceiveDose = currDate - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                                                    true
                                                                    : false;    

    const dogMenu = ["beef", "Turkey", "lamb"];
    const dogGames = ["tuna", "chicken", "salmon"]; // CHANGE THIS LATER!!!!!!!!!
    const dogTools = ["soap", "brush"];

    const [activityInProgress, setActivityInProgress] = useState(false);
    const [dogOpenFeedingFlag, setDogOpenFeedingFlag] = useState(false);
    const [dogOpenCleaningFlag, setDogOpenCleaningFlag] = useState(false);
    const [dogOpenPlayingFlag, setDogOpenPlayingFlag] = useState(false);
    const [dogOpenMedicineFlag, setDogOpenMedicineFlag] = useState(false);
    const [dogOpenScheduleFlag, setDogOpenScheduleFlag] = useState(false);
    const [dogChosenFeedingOption, setDogChosenFeedingOption] = useState(-1);
    const [dogChosenCleaningOption, setDogChosenCleaningOption] = useState(-1);
    const [dogChosenPlayingOption, setDogChosenPlayingOption] = useState(-1);



    useEffect(() => {

        const interval = setInterval(() => {
            setCurrDate(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);


    useEffect(() => {
        if (dogOpenFeedingFlag || dogOpenCleaningFlag || dogOpenPlayingFlag || dogOpenMedicineFlag) {
            setActivityInProgress(true);
        } else {
            setActivityInProgress(false);
        }
    }, [dogOpenFeedingFlag, dogOpenCleaningFlag, dogOpenPlayingFlag, dogOpenMedicineFlag]);



    
    return (
        
        <>

            {dogOpenFeedingFlag &&
            <FeedingStation
                menuOptions={dogMenu}
                desiredOption = {dogChosenFeedingOption}
                setDesiredOption = {setDogChosenFeedingOption}
                setOpenFeedingFlag = {setDogOpenFeedingFlag}
            />}

            {dogOpenCleaningFlag &&
            <CleaningStation
                cleaningOptions={dogTools}
                desiredOption = {dogChosenCleaningOption}
                setDesiredOption = {setDogChosenCleaningOption}
                setOpenCleaningFlag = {setDogOpenCleaningFlag}
            />}

            {dogOpenPlayingFlag &&
            <PlayingStation
                gameOptions = {dogGames}
                desiredOption = {dogChosenPlayingOption}
                setDesiredOption = {setDogChosenPlayingOption}
                setOpenPlayingFlag = {setDogOpenPlayingFlag}
            />}

            {dogOpenMedicineFlag &&
            <MedicineStation
                healthcap = {dogHealthCap}
                setOpenMedicineFlag = {setDogOpenMedicineFlag}
            />}

            {dogOpenScheduleFlag &&
            <SchedulingChart
                timeLimits={dogTimeLimits}
                setOpenScheduleFlag={setDogOpenScheduleFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding(hungry, setDogChosenFeedingOption, setDogOpenFeedingFlag, dogMenu)}> Feed Dog </button>
                        <button className={dirty ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateCleaning(dirty, setDogChosenCleaningOption, setDogOpenCleaningFlag, dogTools)}> Bathe Dog </button>
                        <button className={restless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiatePlaying(restless, setDogChosenPlayingOption, setDogOpenPlayingFlag, dogGames)}> Play With Dog </button>

                        {canReceiveDose ? (

                            <button className="NavBarButton" onClick = {() => setDogOpenMedicineFlag(true)}> Give Dog Medicine </button>

                        ) : (

                            <button className="NavBarButtonPlaceHolder"> Give Dog Medicine </button>

                        )}
                      
                    </>

                ) : (

                    <>
                        <button className="NavBarButtonPlaceHolder"> Feed Dog </button>
                        <button className="NavBarButtonPlaceHolder"> Clean Dog </button>
                        <button className="NavBarButtonPlaceHolder"> Play With Dog </button>
                        <button className="NavBarButtonPlaceHolder"> Give Dog Medicine </button>
                    </>

                )}

                <button className="NavBarButton" onClick = {() => setDogOpenScheduleFlag(true)}> Check Schedule </button>
               
            </div>
            <div className = "ScreenContainer">

                <HomeStation
                    petEnergy = {350}
                    mood = {mood}
                    activityInProgress={activityInProgress}
                />

            </div>
        </>

    );

}


export default DogMainPetscreen;