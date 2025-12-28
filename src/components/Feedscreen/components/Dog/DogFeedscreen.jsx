import { Link } from 'react-router-dom';

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { CheckPetHealth } from '../../../../helpers/Helpers.js';

import "./DogFeedscreen.css";

function DogFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimeFed = new Date(PetTimeStamps[ActivePetNumber][0][0]);
    const nextTimeFed = new Date(PetTimeStamps[ActivePetNumber][0][0] + 28800000);

    return (

        <div className = "ScreenContainer">
            <h1 className="header">Pet Health: {PetList[ActivePetNumber][3]}</h1>
            <h1 className="header"> Last fed: {lastTimeFed.toLocaleString()}</h1>
            <h1 className="header"> Feed before: {nextTimeFed.toLocaleString()}</h1>
            <button className = "GeneralNavButton" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, 21600000, 0)}>Feed me!</button>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogFeedscreen;