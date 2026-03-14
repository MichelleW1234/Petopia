import { Link } from "react-router-dom";
import {useState} from "react";

import PlaySchedule from "../PlayscreenComponents/PlaySchedule.jsx";

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

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);



    return (

        <>
            {openDogScheduleFlag && 
            <PlaySchedule
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
                timeLimits={dogTimeLimits[2]}
            />}
            <div className="NavBarContainer">
                <Link to = "/dogpet" className = "NavBarButton"> Back </Link> 

                {PetList[ActivePetNumber]["health"] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Playing Schedule</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Playing Schedule</button>

                )}
            </div>
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-dog">
                    <h2 className="PetWindowSign PetWindowSign-dog"> {ActivePetNumber}'s Health: {PetList[ActivePetNumber]["health"]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetNumber]["health"] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, dogTimeLimits[2]/2, "playing")}>Play!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog">Play!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default DogPlayscreen;