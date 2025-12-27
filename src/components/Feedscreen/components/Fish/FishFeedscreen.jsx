import { Link } from 'react-router-dom';

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { FeedPet } from '../../helpers/Helpers';

import "./FishFeedscreen.css";

function FishFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimeFed = new Date(PetTimeStamps[ActivePetNumber][0][0]);

    return (

        <div className = "ScreenContainer">
            <h1 className="header">Pet Health: {PetList[ActivePetNumber][3]}</h1>
            <h1 className="header"> Last fed: {lastTimeFed.toLocaleString()}</h1>
            <button className = "GeneralNavButton" onClick = {() => FeedPet(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, 43200000)}>Feed me!</button>
            <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default FishFeedscreen;