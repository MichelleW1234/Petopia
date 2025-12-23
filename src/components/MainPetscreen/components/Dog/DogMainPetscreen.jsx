import { Link } from 'react-router-dom';
import {useState} from "react";

import PetWindow from "../MainPetscreenComponents/PetWindow.jsx";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { resetActivePet } from '../../helpers/Helpers.js';

import "./DogMainPetscreen.css";

function DogMainPetscreen (){

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const [needs, setNeeds] = useState(-1);
    


    
    return (
        
        <>
            <div className="NavBarContainer">
                <Link to = "/dogfeed" className="NavBarButton"> Feed Dog </Link>
                <Link to = "/dogwash" className="NavBarButton"> Bathe Dog </Link>
                <Link to = "/dogplay" className="NavBarButton"> Play With Dog </Link>
                <button></button>
            </div>
            <div className = "ScreenContainer">
                <PetWindow
                    petNeed = {needs}
                    petEnergy = {300}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default DogMainPetscreen;