import { Link } from "react-router-dom";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { catTimeLimits } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./CatFeedscreen.css";

function CatFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimeFedRaw = new Date(PetTimeStamps[ActivePetNumber][0][0]);
    const lastTimeFed = lastTimeFedRaw.toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
    const nextTimeFedRaw = new Date(PetTimeStamps[ActivePetNumber][0][0] + catTimeLimits[0]);
    const nextTimeFed = nextTimeFedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        
    return (

        <div className = "ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-cat">
                <h2 className="PetWindowSign PetWindowSign-cat"> {lastTimeFed} | {nextTimeFed} </h2>
                <div className = "filler"> </div>

                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, catTimeLimits[0]/2, 0)}>Feed me!</button>

                ) : (

                    <button className = "PetWindowButton PetWindowButton-placeholdercat">Feed me!</button>

                )}
                
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default CatFeedscreen;