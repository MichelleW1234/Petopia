import { Link } from 'react-router-dom';

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { CheckPetHealth } from '../../../../helpers/Helpers.js';

import "./CatPlayscreen.css";

function CatPlayscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimePlayedRaw = new Date(PetTimeStamps[ActivePetNumber][2][0]);
    const lastTimePlayed = lastTimePlayedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimePlayedRaw = new Date(PetTimeStamps[ActivePetNumber][2][0] + 86400000);
    const nextTimePlayed = nextTimePlayedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (

        <div className = "ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-cat">
                <h2 className={`PetWindowSign PetWindowSign-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}> {lastTimePlayed} | {nextTimePlayed} </h2>
                <div className = "filler"> </div>
                <button className = "GeneralNavButton" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, 43200000, 2)}>Play!</button>
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default CatPlayscreen;