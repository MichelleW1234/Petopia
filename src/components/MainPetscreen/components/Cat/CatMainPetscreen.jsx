import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap, catTimeLimits } from '../../../../constants/Constants.js';

import { resetActivePet} from '../../helpers/Helpers.js';


function CatMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const now = Date.now();
    
    const hungry = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][0][0]) >= catTimeLimits[0]/2 ? true 
                        : false
                    : false;
    const restless = ActivePetNumber !== -1 ? (now - PetTimeStamps[ActivePetNumber][2][0]) >= catTimeLimits[2]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][3]/catHealthCap >= 0.75 ? 0
                                            : PetList[ActivePetNumber][3]/catHealthCap >= 0.5 ? 1
                                            : PetList[ActivePetNumber][3]/catHealthCap >= 0.25 ? 2
                                            : 3
                                        : -1;


    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/catfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Cat </Link>
                <Link to = "/catplay" className={restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Cat </Link>
                <Link to = "/home" className="NavBarButton"> Buy Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {700}
                    mood = {mood}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default CatMainPetscreen;