import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";

import MainPetInnerscreen from "../MainPetscreenComponents/MainPetInnerscreen.jsx";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { resetActivePet} from '../../helpers/Helpers.js';

import "./CatMainPetscreen.css";

function CatMainPetscreen (){

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const [needs, setNeeds] = useState(-1);



    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/catfeed" className="NavBarButton"> Feed Cat </Link>
                <Link to = "/catwash" className="NavBarButton"> Bathe Cat </Link>
                <Link to = "/catplay" className="NavBarButton"> Play With Cat </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetInnerscreen
                    petNeed = {needs}
                    petEnergy = {700}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default CatMainPetscreen;