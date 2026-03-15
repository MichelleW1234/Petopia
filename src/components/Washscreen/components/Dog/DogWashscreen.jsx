import { Link } from "react-router-dom";
import {useState} from "react";

import WashSchedule from "../WashscreenComponents/WashSchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { dogTimeLimits } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./DogWashscreen.css";


function DogWashscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);



    return (

        <>
            {openDogScheduleFlag && 
            <WashSchedule
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
                timeLimits={dogTimeLimits["bathing"]}
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

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, dogTimeLimits["bathing"]/2, "bathing")}>Wash!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog">Wash!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default DogWashscreen;