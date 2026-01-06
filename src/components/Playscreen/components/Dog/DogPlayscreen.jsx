import { Link } from "react-router-dom";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { dogTimeLimits } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./DogPlayscreen.css";

function DogPlayscreen (){

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
    const nextTimePlayedRaw = new Date(PetTimeStamps[ActivePetNumber][2][0] + dogTimeLimits[2]);
    const nextTimePlayed = nextTimePlayedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });



    return (

        <div className = "ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-dog">
                <h2 className="PetWindowSign PetWindowSign-dog"> {lastTimePlayed} | {nextTimePlayed} </h2>
                <div className = "filler"> </div>

                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, dogTimeLimits[2]/2, 2)}>Play!</button>

                ) : (

                    <button className = "PetWindowButton PetWindowButton-placeholderdog">Play!</button>

                )}

            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogPlayscreen;