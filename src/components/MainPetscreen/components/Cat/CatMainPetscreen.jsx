import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


import HomeStation from "../PetscreenStations/HomeStation.jsx";
import FeedingStation from "../PetscreenStations/FeedingStation.jsx";
import MedicineStation from "../PetscreenStations/MedicineStation.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap, catTimeLimits, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap } from "../../../../constants/Constants.js";


function CatMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();


    const alive = ActivePetName !== "" ? 
                    PetList[ActivePetName][healthKey] > 0 ? true
                    : false
                : false;

    const now = Date.now();
    const hungry = ActivePetName !== "" ? (now - PetTimeStamps[ActivePetName][feedingKey][0]) >= catTimeLimits[feedingKey]/2 ? true 
                        : false
                    : false;
    const restless = ActivePetName !== "" ? (now - PetTimeStamps[ActivePetName][playingKey][0]) >= catTimeLimits[playingKey]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetName !== "" ? PetList[ActivePetName][healthKey]/catHealthCap >= 0.75 ? 0
                                            : PetList[ActivePetName][healthKey]/catHealthCap >= 0.5 ? 1
                                            : PetList[ActivePetName][healthKey]/catHealthCap >= 0.25 ? 2
                                            : 3
                                        : -1;

    const [currDate, setCurrDate] = useState(Date.now()); 

    const canReceiveDose = currDate - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                                                    true
                                                                    : false;    

    const catMenu = ["tuna", "chicken", "salmon"];
    const catGames = ["tuna", "chicken", "salmon"]; // CHANGE THIS LATER!!!!!!!!!

    const [activityInProgress, setActivityInProgress] = useState(false);
    const [catOpenFeedingFlag, setCatOpenFeedingFlag] = useState(false);
    const [catOpenPlayingFlag, setCatOpenPlayingFlag] = useState(false);
    const [catOpenMedicineFlag, setCatOpenMedicineFlag] = useState(false);
    const [catChosenFeedingOption, setCatChosenFeedingOption] = useState(-1);
    const [catChosenPlayingOption, setCatChosenPlayingOption] = useState(-1);




    useEffect(() => {

        const interval = setInterval(() => {
            setCurrDate(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);


    useEffect(() => {
        if (catOpenFeedingFlag || catOpenPlayingFlag || catOpenMedicineFlag) {
            setActivityInProgress(true);
        } else {
            setActivityInProgress(false);
        }
    }, [catOpenFeedingFlag, catOpenPlayingFlag, catOpenMedicineFlag]);


    

    const initiateFeeding = () => {
        if (hungry){
            setCatChosenFeedingOption(Math.floor(Math.random() * catMenu.length));
        }
        setCatOpenFeedingFlag(true);
    }


    const initiatePlaying = () => {
        if (restless){
            setCatChosenPlayingOption(Math.floor(Math.random() * catGames.length));
        }
        setCatOpenPlayingFlag(true);
    }


    
    return (

        <>

            {catOpenFeedingFlag &&
            <FeedingStation
                menuOptions={catMenu}
                desiredOption = {catChosenFeedingOption}
                setMenuOption = {setCatChosenFeedingOption}
                setOpenFeedingFlag = {setCatOpenFeedingFlag}
            />}

            {catOpenPlayingFlag &&
            <CatPlayingWindow
                gameOption = {catChosenPlayingOption}
                setGameOption = {setCatChosenPlayingOption}
                setOpenPlayingFlag = {setCatOpenPlayingFlag}
            />}

            {catOpenMedicineFlag &&
            <MedicineStation
                healthcap = {catHealthCap}
                setOpenMedicineFlag = {setCatOpenMedicineFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding()}> Feed Cat </button>
                        <button className={restless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiatePlaying()}> Play With Cat </button>

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
                
                
            </div>
            
            <div className = "ScreenContainer">

                <HomeStation
                    petEnergy = {450}
                    mood = {mood}
                    activityInProgress = {activityInProgress}
                />
    
            </div>
        </>

    );

}


export default CatMainPetscreen;