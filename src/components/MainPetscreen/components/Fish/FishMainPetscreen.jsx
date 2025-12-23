import { Link } from 'react-router-dom';
import {useState} from "react";

import MainPetInnerscreen from "../MainPetscreenComponents/MainPetInnerscreen.jsx";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { resetActivePet } from '../../helpers/Helpers.js';

import "./FishMainPetscreen.css";

function FishMainPetscreen (){

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const [needs, setNeeds] = useState(-1);



    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/fishfeed" className="NavBarButton"> Feed Fish </Link>
                <Link to = "/fishwash" className="NavBarButton"> Clean Fish Tank </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetInnerscreen
                    petNeed = {needs}
                    petEnergy = {500}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default FishMainPetscreen;