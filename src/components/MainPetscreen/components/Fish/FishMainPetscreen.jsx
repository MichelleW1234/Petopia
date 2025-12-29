import { Link } from 'react-router-dom';
import {useState} from "react";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { resetActivePet } from '../../helpers/Helpers.js';

import "./FishMainPetscreen.css";

function FishMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const now = Date.now();
    const hungry = ActivePetNumber !== -1 ?  (now - PetTimeStamps[ActivePetNumber][0][0]) >= 43200000 ? true 
                        : false
                    : false;
    const dirty = ActivePetNumber !== -1 ?  (now - PetTimeStamps[ActivePetNumber][1][0]) >= 43200000 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][3] > 4 ? 0
                                    : PetList[ActivePetNumber][3] > 3 ? 1
                                    : PetList[ActivePetNumber][3] > 2 ? 2
                                    : 3
                                : -1;


    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/fishfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Fish </Link>
                <Link to = "/fishwash" className={dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Clean Fish Tank </Link>
                <Link to = "/home" className="NavBarButton"> Buy Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {500}
                    mood = {mood}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default FishMainPetscreen;