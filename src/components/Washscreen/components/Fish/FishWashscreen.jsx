import { Link } from "react-router-dom";
import {useState} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

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

    const deadLine = PetTimeStamps[ActivePetName][bathingKey][0] + fishTimeLimits[bathingKey];

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
                                        Math.round(((currTime - PetTimeStamps[ActivePetName][bathingKey][0])/fishTimeLimits[bathingKey]) * 100)
                                        : 100;



    return (

        <>
            {openFishScheduleFlag && 
            <SchedulingChart
                activity = {bathingKey}
                lastActivityString = {lastTimeWashed}
                nextActivityString = {nextTimeWashed}
                percentageUntilNextUpdate={percentageUntilNextUpdate}
                setOpenPetScheduleFlag = {setOpenFishScheduleFlag}
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