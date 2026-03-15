import { Link } from "react-router-dom";
import {useState} from "react";

import PlaySchedule from "../PlayscreenComponents/PlaySchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { dogTimeLimits, healthKey, playingKey } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./DogPlayscreen.css";

function DogPlayscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);



    return (

        <>
            {openDogScheduleFlag && 
            <PlaySchedule
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
                timeLimits={dogTimeLimits[playingKey]}
            />}

            <div className="NavBarContainer">
                <Link to = "/dogpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Playing Schedule</button>
            </div>
            
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-dog">
                    <h2 className="PetWindowSign PetWindowSign-dog"> {ActivePetName}'s Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, dogTimeLimits[playingKey]/2, playingKey)}>Play!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog">Play!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default DogPlayscreen;