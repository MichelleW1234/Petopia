import { Link } from 'react-router-dom';

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { CheckPetHealth } from '../../../../helpers/Helpers.js';

import "./FishWashscreen.css";

function FishWashscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimeWashed = new Date(PetTimeStamps[ActivePetNumber][1][0]);
    const nextTimeWashed = new Date(PetTimeStamps[ActivePetNumber][1][0] + 86400000);

    return (

        <div className = "ScreenContainer">
            <h1 className="header">Pet Health: {PetList[ActivePetNumber][3]}</h1>
            <h1 className="header"> Last Played: {lastTimeWashed.toLocaleString()}</h1>
            <h1 className="header"> Play before: {nextTimeWashed.toLocaleString()}</h1>
            <button className = "GeneralNavButton" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, 43200000, 1)}>Play!</button>
            <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default FishWashscreen;