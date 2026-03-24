import { Link } from "react-router-dom";
import { useState } from "react";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";
import CatFeedingWindow from "./CatScreenComponents/CatFeedingWindow.jsx";
import CatPlayingWindow from "./CatScreenComponents/CatPlayingWindow.jsx";

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

    const [activePetActivity, setActivePetActivity] = useState(-1);


    return (

        <>
            <div className="NavBarContainer">
                {/*
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <Link to = "/catfeed" className={alive &&  hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Cat </Link>
                <Link to = "/catplay" className={alive &&  restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Cat </Link>
                */}

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <button className={alive ? 
                                        hungry ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(0)}> Feed Cat </button>
                <button className={alive ? 
                                        restless ? 
                                            "NavBarButtonUrgent" 
                                            : "NavBarButton"
                                        : "NavBarButtonPlaceHolder"} onClick = {() => setActivePetActivity(1)}> Play With Cat </button>
                <Link to = "/catmeds" className="NavBarButton"> Give Cat Medicine </Link>
                
            </div>
            
            <div className = "ScreenContainer">

                {activePetActivity === 0 ? (

                    <CatFeedingWindow
                        mealOption = {Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : activePetActivity === 1 ? (

                    <CatPlayingWindow
                        gameOption = {Math.floor(Math.random() * 3)}
                        setActivePetActivity = {setActivePetActivity}
                    />

                ) : (

                    <MainPetWindow
                        petEnergy = {450}
                        mood = {mood}
                    />

                )}
    
            </div>
        </>

    );

}


export default CatMainPetscreen;