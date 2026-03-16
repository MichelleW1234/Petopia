import { Link } from "react-router-dom";
import {useState} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

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

    const deadLine = PetTimeStamps[ActivePetName][bathingKey][0] + dogTimeLimits[bathingKey];
    
    const lastTimeWashedRaw = new Date(PetTimeStamps[ActivePetName][bathingKey][0]);
    const lastTimeWashed = lastTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeWashedRaw = new Date(deadLine);
    const nextTimeWashed = nextTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

    const currTime = Date.now();
    const percentageUntilNextUpdate = deadLine > currTime ? 
                                        Math.round(((currTime - PetTimeStamps[ActivePetName][bathingKey][0])/dogTimeLimits[bathingKey]) * 100)
                                        : 100;



    return (

        <>
            {openDogScheduleFlag && 
            <SchedulingChart
                activity = {bathingKey}
                lastActivityString = {lastTimeWashed}
                nextActivityString = {nextTimeWashed}
                percentageUntilNextUpdate={percentageUntilNextUpdate}
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
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