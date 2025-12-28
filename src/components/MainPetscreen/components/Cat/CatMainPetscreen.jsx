import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";

import PetWindow from "../MainPetscreenComponents/PetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { resetActivePet} from '../../helpers/Helpers.js';

import "./CatMainPetscreen.css";

function CatMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const now = Date.now();
    
    const hungry = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][0][0]) >= 14400000 ? true 
                        : false
                    : false;
    const restless = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][2][0]) >= 43200000 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][3] > 15 ? 0
                                            : PetList[ActivePetNumber][3] > 10 ? 1
                                            : PetList[ActivePetNumber][3] > 5 ? 2
                                            : 3
                                        : -1;


    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/catfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Cat </Link>
                <Link to = "/catplay" className={restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Cat </Link>
            </div>
            <div className = "ScreenContainer">
                <PetWindow
                    petEnergy = {700}
                    mood = {mood}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default CatMainPetscreen;