import { Link } from "react-router-dom";
import {useState} from "react";

import WashSchedule from "../WashscreenComponents/WashSchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { bathingKey, fishTimeLimits, healthKey } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./FishWashscreen.css";


function FishWashscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [openFishScheduleFlag, setOpenFishScheduleFlag] = useState(false);



    return (

        <>
            {openFishScheduleFlag && 
            <WashSchedule
                setOpenPetScheduleFlag = {setOpenFishScheduleFlag}
                timeLimits={fishTimeLimits[bathingKey]}
            />}
            
            <div className="NavBarContainer">
                <Link to = "/fishpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenFishScheduleFlag(true)}>Check Washing Schedule</button>
            </div>

            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-fish">
                    <h2 className="PetWindowSign PetWindowSign-fish"> {ActivePetName}'s Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-fish" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, fishTimeLimits[bathingKey]/2, bathingKey)}>Wash!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderfish">Wash!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default FishWashscreen;