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
                timeLimits={dogTimeLimits[1]}
            />}
            <div className="NavBarContainer">
                <Link to = "/dogpet" className = "NavBarButton"> Back </Link> 

                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Playing Schedule</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Playing Schedule</button>

                )}
            </div>
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-dog">
                    <h2 className="PetWindowSign PetWindowSign-dog"> {PetList[ActivePetNumber][0]}'s Health: {PetList[ActivePetNumber][4]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetNumber][4] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, dogTimeLimits[1]/2, 1)}>Wash!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog">Wash!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default DogWashscreen;