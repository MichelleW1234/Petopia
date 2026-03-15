import { Link } from "react-router-dom";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { bathingKey, dogHealthCap, dogTimeLimits, feedingKey, healthKey, playingKey } from "../../../../constants/Constants.js";



function DogMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();
    
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

    
    return (
        
        <>
            <div className="NavBarContainer">
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>
                <Link to = "/dogfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Dog </Link>
                <Link to = "/dogwash" className={dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Bathe Dog </Link>
                <Link to = "/dogplay" className={restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Dog </Link>
                <Link to = "/dogmeds" className="NavBarButton"> Give Dog Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {350}
                    mood = {mood}
                />
            </div>
        </>

    );

}


export default DogMainPetscreen;