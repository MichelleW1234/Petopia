import { Link } from "react-router-dom";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { dogHealthCap, dogTimeLimits } from "../../../../constants/Constants.js";

import { resetActivePet } from "../../helpers/Helpers.js";


function DogMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();
    
    const now = Date.now();
    const hungry = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][0][0]) >= dogTimeLimits[0]/2 ? true 
                        : false
                    : false;
    const dirty = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][1][0]) >= dogTimeLimits[1]/2 ? true
                        : false
                    : false;
    const restless = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][2][0]) >= dogTimeLimits[2]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][4]/dogHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetNumber][4]/dogHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetNumber][4]/dogHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;

    
    return (
        
        <>
            <div className="NavBarContainer">
                <Link to = "/dogfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Dog </Link>
                <Link to = "/dogwash" className={dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Bathe Dog </Link>
                <Link to = "/dogplay" className={restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Dog </Link>
                <Link to = "/dogmeds" className="NavBarButton"> Give Dog Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {300}
                    mood = {mood}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default DogMainPetscreen;