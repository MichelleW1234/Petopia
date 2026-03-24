import { Link } from "react-router-dom";
import { useState } from "react";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";
import DogCleaningWindow from "./DogScreenComponents/DogCleaningWindow.jsx";
import DogFeedingWindow from "./DogScreenComponents/DogFeedingWindow.jsx";
import DogPlayingWindow from "./DogScreenComponents/DogPlayingWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { bathingKey, dogHealthCap, dogTimeLimits, feedingKey, healthKey, playingKey } from "../../../../constants/Constants.js";



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
    const dirty = ActivePetName !== "" ? (now - PetTimeStamps[ActivePetName][bathingKey][0]) >= dogTimeLimits[bathingKey]/2 ? true
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

    const [activePetActivity, setActivePetActivity] = useState(-1);
    const [activityInProgress, setActivityInProgress] = useState(false);



    
    return (
        
        <>
            <div className="NavBarContainer">

                {/*
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <Link to = "/dogfeed" className={alive && hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Dog </Link>
                <Link to = "/dogwash" className={alive && dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Bathe Dog </Link>
                <Link to = "/dogplay" className={alive && restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Dog </Link>
                <Link to = "/dogmeds" className="NavBarButton"> Give Dog Medicine </Link>
                */}

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <button className={alive ? 
                                        hungry ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(0)}> Feed Dog </button>
                <button className={alive ? 
                                        dirty ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(1)}> Bathe Dog </button>
                <button className={alive ? 
                                        restless ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(2)}> Play With Dog </button>
                <Link to = "/dogmeds" className="NavBarButton"> Give Dog Medicine </Link>
            </div>
            <div className = "ScreenContainer">

                {activePetActivity === 0 ? (

                    <DogFeedingWindow
                        menuOption={Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : activePetActivity === 1 ? (

                    <DogCleaningWindow
                        soapOption={Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : activePetActivity === 2 ? (

                    <DogPlayingWindow
                        gameOption={Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : (

                    <MainPetWindow
                        petEnergy = {350}
                        mood = {mood}
                        activityInProgress={activityInProgress}
                    />

                )}

            </div>
        </>

    );

}


export default DogMainPetscreen;