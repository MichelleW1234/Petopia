import { Link } from "react-router-dom";
import {useState} from "react";

import WashSchedule from "../WashscreenComponents/WashSchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { bathingKey, dogTimeLimits, healthKey } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./DogWashscreen.css";


function DogWashscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);



    return (

        <>
            {openDogScheduleFlag && 
            <WashSchedule
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
                timeLimits={dogTimeLimits[bathingKey]}
            />}

            <div className="NavBarContainer">
                <Link to = "/dogpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Washing Schedule</button>
            </div>
            
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-dog">
                    <h2 className="PetWindowSign PetWindowSign-dog"> {ActivePetName}'s Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, dogTimeLimits[bathingKey]/2, bathingKey)}>Wash!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog">Wash!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default DogWashscreen;