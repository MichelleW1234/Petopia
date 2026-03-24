import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";
import CatFeedingWindow from "./CatScreenComponents/CatFeedingWindow.jsx";
import CatPlayingWindow from "./CatScreenComponents/CatPlayingWindow.jsx";
import CatMedicineWindow from "./CatScreenComponents/CatMedicineWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap, catTimeLimits, feedingKey, healthKey, playingKey } from "../../../../constants/Constants.js";


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

    const [menuOption, setMenuOption] = useState(-1);
    const [gameOption, setGameOption] = useState(-1);

    const [openFeedingFlag, setOpenFeedingFlag] = useState(false);
    const [openPlayingFlag, setOpenPlayingFlag] = useState(false);
    const [openMedicineFlag, setOpenMedicineFlag] = useState(false);
    const [activityInProgress, setActivityInProgress] = useState(false);



    useEffect(() => {
    
        if (openFeedingFlag || openPlayingFlag || openMedicineFlag) {
            setActivityInProgress(true);
        } else {
            setActivityInProgress(false);
        }

    }, [openFeedingFlag, openPlayingFlag, openMedicineFlag]);


    

    const initiateFeeding = () => {

        if (hungry){

            setMenuOption(Math.floor(Math.random() * 3));

        }

        setOpenFeedingFlag(true);

    }


    const initiatePlaying = () => {

        if (hungry){

            setGameOption(Math.floor(Math.random() * 3));

        }

        setOpenPlayingFlag(true);
        
    }


    return (

        <>

            {openFeedingFlag &&
            <CatFeedingWindow
                menuOption = {menuOption}
                setMenuOption = {setMenuOption}
                setOpenFeedingFlag = {setOpenFeedingFlag}
            />}

            {openPlayingFlag &&
            <CatPlayingWindow
                gameOption = {gameOption}
                setGameOption = {setGameOption}
                setOpenPlayingFlag = {setOpenPlayingFlag}
            />}

            {openMedicineFlag &&
            <CatMedicineWindow
                setOpenMedicineFlag = {setOpenMedicineFlag}
            />}



            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {alive ? (

                    <>
                        <button className={hungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateFeeding()}> Feed Cat </button>
                        <button className={restless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiatePlaying()}> Play With Cat </button>
                        <button className="NavBarButton" onClick = {() => setOpenMedicineFlag(true)}> Give Cat Medicine </button>
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

                <MainPetWindow
                    petEnergy = {450}
                    mood = {mood}
                    activityInProgress = {activityInProgress}
                />
    
            </div>
        </>

    );

}


export default CatMainPetscreen;