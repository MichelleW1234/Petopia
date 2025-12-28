import { Link } from 'react-router-dom';
import {useState} from "react";

import PetWindow from "../MainPetscreenComponents/PetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { resetActivePet } from '../../helpers/Helpers.js';

import "./DogMainPetscreen.css";

function DogMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();
    
    const now = Date.now();
    const hungry = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][0][0]) >= 21600000 ? true 
                        : false
                    : false;
    const dirty = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][1][0]) >= 43200000 ? true
                        : false
                    : false;
    const restless = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][2][0]) >= 21600000 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][3] > 12 ? 0
                                        : PetList[ActivePetNumber][3] > 8 ? 1
                                        : PetList[ActivePetNumber][3] > 4 ? 2
                                        : 3
                                    : -1;
    
    return (
        
        <>
            <div className="NavBarContainer">
                <Link to = "/dogfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Dog </Link>
                <Link to = "/dogwash" className={dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Bathe Dog </Link>
                <Link to = "/dogplay" className={restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Dog </Link>
            </div>
            <div className = "ScreenContainer">
                <PetWindow
                    petEnergy = {300}
                    mood = {mood}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default DogMainPetscreen;