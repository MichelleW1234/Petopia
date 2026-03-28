import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import HomeStation from "../PetscreenStations/HomeStation.jsx";
import FeedingStation from "../PetscreenStations/FeedingStation.jsx";
import CleaningStation from "../PetscreenStations/CleaningStation.jsx";
import PlayingStation from "../PetscreenStations/PlayingStation.jsx";
import MedicineStation from "../PetscreenStations/MedicineStation.jsx";
import SchedulingChart from "../SchedulingChart/SchedulingChart.jsx";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, dogSpecies, healthCapList, timeLimitList} from "../../../../constants/Constants.js";
import { initiateFeeding, initiateCleaning, initiatePlaying } from "../../helpers/Helpers.js";


// CHANGE THIS LATER!!!!!!!!!
//const dogGameComponents = ["button 1", "button 2", "button 3"]

function DogMainPetscreen (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [activityInProgress, setActivityInProgress] = useState(false);
    const [dogOpenFeedingFlag, setDogOpenFeedingFlag] = useState(false);
    const [dogOpenCleaningFlag, setDogOpenCleaningFlag] = useState(false);
    const [dogOpenPlayingFlag, setDogOpenPlayingFlag] = useState(false);
    const [dogOpenMedicineFlag, setDogOpenMedicineFlag] = useState(false);
    const [dogOpenScheduleFlag, setDogOpenScheduleFlag] = useState(false);
    const [dogChosenFeedingOption, setDogChosenFeedingOption] = useState(-1);
    const [dogChosenCleaningOption, setDogChosenCleaningOption] = useState(-1);
    const [dogChosenPlayingOption, setDogChosenPlayingOption] = useState(-1);

    const alive = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey] > 0 ? 
                        true
                        : false
                    : false;
    
    const hungry = ActivePetName !== "" ? 
                        (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[dogSpecies][feedingKey]/2 ? 
                            true 
                            : false
                        : false;
    const dirty = ActivePetName !== "" ? 
                        (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][0]) >= timeLimitList[dogSpecies][cleaningKey]/2 ? 
                            true
                            : false
                        : false;
    const restless = ActivePetName !== "" ? 
                        (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][0]) >= timeLimitList[dogSpecies][playingKey]/2 ? 
                            true 
                            : false
                        : false;

    const mood = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey]/healthCapList[dogSpecies] >= 0.75 ? 
                        0
                        : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies] >= 0.5 ? 
                        1
                        : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies] >= 0.25 ? 
                        2
                        : 3
                    : -1;

    const canReceiveDose = ActivePetName !== "" ? 
                                GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                    true
                                    : false
                                : false;

    const dogMenuOptions = ["beef", "Turkey", "lamb"];
    const dogCleaningOptions = ["soap", "brush"];
    const dogGameOptions = ["tuna", "chicken", "salmon"]; // CHANGE THIS LATER!!!!!!!!!
    const dogGameComponents = ["button 1", "button 2", "button 3"]; // DELETE THIS LATER



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
                menuOptions={dogMenuOptions}
                desiredOption = {dogChosenFeedingOption}
                setDesiredOption = {setDogChosenFeedingOption}
                setOpenFeedingFlag = {setDogOpenFeedingFlag}
            />}

            {dogOpenCleaningFlag &&
            <CleaningStation
                cleaningOptions={dogCleaningOptions}
                desiredOption = {dogChosenCleaningOption}
                setDesiredOption = {setDogChosenCleaningOption}
                setOpenCleaningFlag = {setDogOpenCleaningFlag}
            />}

            {dogOpenPlayingFlag &&
            <PlayingStation
                playingOptions={dogGameOptions}
                playingComponents={dogGameComponents}
                playingDesiredOption = {dogChosenPlayingOption}
                setPlayingDesiredOption = {setDogChosenPlayingOption}
                setPlayingOpenFlag = {setDogOpenPlayingFlag}
            />}

            {dogOpenMedicineFlag &&
            <MedicineStation
                setOpenMedicineFlag = {setDogOpenMedicineFlag}
            />}

            {dogOpenScheduleFlag &&
            <SchedulingChart
                setOpenScheduleFlag={setDogOpenScheduleFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding(hungry, setDogChosenFeedingOption, setDogOpenFeedingFlag, dogMenuOptions)}> Feed Dog </button>
                        <button className={dirty ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateCleaning(dirty, setDogChosenCleaningOption, setDogOpenCleaningFlag, dogCleaningOptions)}> Bathe Dog </button>
                        <button className={restless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiatePlaying(restless, setDogChosenPlayingOption, setDogOpenPlayingFlag, dogGameOptions)}> Play With Dog </button>

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