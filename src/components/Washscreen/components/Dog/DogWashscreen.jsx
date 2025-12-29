import { Link } from 'react-router-dom';

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { CheckPetHealth } from '../../../../helpers/Helpers.js';

import "./DogWashscreen.css";

function DogWashscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimeWashedRaw = new Date(PetTimeStamps[ActivePetNumber][1][0]);
    const lastTimeWashed = lastTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeWashedRaw = new Date(PetTimeStamps[ActivePetNumber][1][0] + 86400000);
    const nextTimeWashed = nextTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });


        
    return (

        <div className = "ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-dog">
                <h2 className={`PetWindowSign PetWindowSign-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}> {lastTimeWashed} | {nextTimeWashed} </h2>
                <div className = "filler"> </div>
                <button className = "GeneralNavButton" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, 43200000, 1)}>Play!</button>
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogWashscreen;