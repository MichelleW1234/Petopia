import { Link } from 'react-router-dom';

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { CheckPetHealth } from '../../../../helpers/Helpers.js';

import "./DogPlayscreen.css";

function DogPlayscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimePlayed = new Date(PetTimeStamps[ActivePetNumber][2][0]);
    const nextTimePlayed = new Date(PetTimeStamps[ActivePetNumber][2][0] + 43200000);

    return (

        <div className = "ScreenContainer">
            <h1 className="header">Pet Health: {PetList[ActivePetNumber][3]}</h1>
            <h1 className="header"> Last Played: {lastTimePlayed.toLocaleString()}</h1>
            <h1 className="header"> Play before: {nextTimePlayed.toLocaleString()}</h1>
            <button className = "GeneralNavButton" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, 21600000, 2)}>Play!</button>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogPlayscreen;