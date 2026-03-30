import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "./PetscreensComponents/Stations/Main.jsx";
import Feeding from "./PetscreensComponents/Stations/Feeding.jsx";
import Playing from "./PetscreensComponents/Stations/Playing.jsx";
import Medicine from "./PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "./PetscreensComponents/Schedule/Schedule.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import {feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, catSpecies, healthCapList, timeLimitList} from "../../../constants/Constants.js";
import { initiateFeeding, initiatePlaying } from "../helpers/Helpers.js";



// CHANGE THIS LATER!!!!!!!!!
//const catGameComponents = ["button 1", "button 2", "button 3"]

function Cat (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [activityInProgress, setActivityInProgress] = useState(false);
    const [catOpenFeedingFlag, setCatOpenFeedingFlag] = useState(false);
    const [catOpenPlayingFlag, setCatOpenPlayingFlag] = useState(false);
    const [catOpenMedicineFlag, setCatOpenMedicineFlag] = useState(false);
    const [catOpenScheduleFlag, setCatOpenScheduleFlag] = useState(false);
    const [catChosenFeedingOption, setCatChosenFeedingOption] = useState(-1);
    const [catChosenPlayingOption, setCatChosenPlayingOption] = useState(-1);

    const alive = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey] > 0 ? 
                        true
                        : false
                    : false;

    const hungry = ActivePetName !== "" ? 
                        (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[catSpecies][feedingKey]/2 ? 
                            true 
                            : false
                        : false;
    const restless = ActivePetName !== "" ? 
                        (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][0]) >= timeLimitList[catSpecies][playingKey]/2 ? 
                            true 
                            : false
                        : false;

    const mood = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.75 ? 
                        0
                        : PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.5 ? 
                        1
                        : PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.25 ? 
                        2
                        : 3
                    : -1;

    const canReceiveDose = ActivePetName !== "" ? 
                                GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                    true
                                    : false
                                : false;

    const catMenuOptions = ["tuna", "chicken", "salmon"];
    const catGameOptions = ["tuna", "chicken", "salmon"]; // CHANGE THIS LATER!!!!!!!!! 
    const catGameComponents = ["button 1", "button 2", "button 3"]; // DELETE THIS LATER




    useEffect(() => {
        if (catOpenFeedingFlag || catOpenPlayingFlag || catOpenMedicineFlag) {
            setActivityInProgress(true);
        } else {
            setActivityInProgress(false);
        }
    }, [catOpenFeedingFlag, catOpenPlayingFlag, catOpenMedicineFlag]);


    

    return (

        <>

            {catOpenFeedingFlag &&
            <Feeding
                feedingOptions={catMenuOptions}
                feedingDesiredOption = {catChosenFeedingOption}
                setFeedingDesiredOption = {setCatChosenFeedingOption}
                setFeedingOpenFlag = {setCatOpenFeedingFlag}
            />}

            {catOpenPlayingFlag &&
            <Playing
                playingOptions={catGameOptions}
                playingComponents={catGameComponents}
                playingDesiredOption = {catChosenPlayingOption}
                setPlayingDesiredOption = {setCatChosenPlayingOption}
                setPlayingOpenFlag = {setCatOpenPlayingFlag}
            />}

            {catOpenMedicineFlag &&
            <Medicine
                setMedicineOpenFlag = {setCatOpenMedicineFlag}
            />}

            {catOpenScheduleFlag &&
            <Schedule
                setOpenScheduleFlag={setCatOpenScheduleFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding(hungry, setCatChosenFeedingOption, setCatOpenFeedingFlag, catMenuOptions)}> Feed Cat </button>
                        <button className={restless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiatePlaying(restless, setCatChosenPlayingOption, setCatOpenPlayingFlag, catGameOptions)}> Play With Cat </button>

                        {canReceiveDose ? (

                            <button className="NavBarButton" onClick = {() => setCatOpenMedicineFlag(true)}> Cat Medicine Available </button>

                        ) : (

                            <button className="NavBarButtonPlaceHolder"> Cat Medicine Available </button>

                        )}
                       
                    </>

                ) : (

                    <>
                        <button className="NavBarButtonPlaceHolder"> Feed Cat </button>
                        <button className="NavBarButtonPlaceHolder"> Play With Cat </button>
                        <button className="NavBarButtonPlaceHolder"> Give Cat Medicine </button>
                    </>

                )}

                <button className="NavBarButton" onClick = {() => setCatOpenScheduleFlag(true)}> Check Schedule </button>
                
            </div>
            
            <div className = "ScreenContainer">

                <Main
                    homePetEnergy = {450}
                    homePetMood = {mood}
                    homeActivityInProgress = {activityInProgress}
                />
    
            </div>
        </>

    );

}


export default Cat;