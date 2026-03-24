import { Link } from "react-router-dom";
import { useState } from "react";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";
import FishCleaningWindow from "./FishScreenComponents/FishCleaningWindow.jsx";
import FishFeedingWindow from "./FishScreenComponents/FishFeedingWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { bathingKey, feedingKey, fishHealthCap, fishTimeLimits, healthKey } from "../../../../constants/Constants.js";


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
    const dirty = ActivePetName !== "" ?  (now - PetTimeStamps[ActivePetName][bathingKey][0]) >= fishTimeLimits[bathingKey]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetName !== "" ? PetList[ActivePetName][healthKey]/fishHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetName][healthKey]/fishHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetName][healthKey]/fishHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;

    const [activePetActivity, setActivePetActivity] = useState(-1);


    return (

        <>
            <div className="NavBarContainer">

                {/*
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <Link to = "/fishfeed" className={alive &&  hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Fish </Link>
                <Link to = "/fishwash" className={alive &&  dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Clean Fish Tank </Link>
                <Link to = "/fishmeds" className="NavBarButton"> Give Fish Medicine </Link>
                */}

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <button className={alive ? 
                                        hungry ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(0)}> Feed Fish </button>
                <button className={alive ? 
                                        dirty ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(1)}> Clean Fish Tank </button>
                <Link to = "/fishmeds" className="NavBarButton"> Give Fish Medicine </Link>

            </div>
            <div className = "ScreenContainer">

                {activePetActivity === 0 ? (

                    <FishFeedingWindow
                        menuOption={Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : activePetActivity === 1 ? (

                    <FishCleaningWindow
                        soapOption={Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : (

                    <MainPetWindow
                        petEnergy = {400}
                        mood = {mood}
                    />

                )}

            </div>
        </>

    );

}


export default FishMainPetscreen;