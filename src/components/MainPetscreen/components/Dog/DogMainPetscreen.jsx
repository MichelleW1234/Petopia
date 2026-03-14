import { Link } from "react-router-dom";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { dogHealthCap, dogTimeLimits } from "../../../../constants/Constants.js";



function DogMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();
    
    const now = Date.now();
    const hungry = ActivePetNumber !== "" ? (now - PetTimeStamps[ActivePetNumber]["feeding"][0]) >= dogTimeLimits[0]/2 ? true 
                        : false
                    : false;
    const dirty = ActivePetNumber !== "" ? (now - PetTimeStamps[ActivePetNumber]["bathing"][0]) >= dogTimeLimits[1]/2 ? true
                        : false
                    : false;
    const restless = ActivePetNumber !== "" ? (now - PetTimeStamps[ActivePetNumber]["playing"][0]) >= dogTimeLimits[2]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== "" ? PetList[ActivePetNumber]["health"]/dogHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetNumber]["health"]/dogHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetNumber]["health"]/dogHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;

    
    return (
        
        <>
            <div className="NavBarContainer">
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetNumber("")}> Back to Home </Link>
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