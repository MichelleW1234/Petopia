import { Link } from "react-router-dom";
import {useState} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { feedingKey, fishTimeLimits, healthKey } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./FishFeedscreen.css";


function FishFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [openFishScheduleFlag, setOpenFishScheduleFlag] = useState(false);

    const deadLine = PetTimeStamps[ActivePetName][feedingKey][0] + fishTimeLimits[feedingKey];

    const lastTimeFedRaw = new Date(PetTimeStamps[ActivePetName][feedingKey][0]);
    const lastTimeFed = lastTimeFedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeFedRaw = new Date(deadLine);
    const nextTimeFed = nextTimeFedRaw.toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    const currTime = Date.now();
    const percentageUntilNextUpdate = deadLine > currTime ? 
                                        Math.round(((currTime - PetTimeStamps[ActivePetName][feedingKey][0])/fishTimeLimits[feedingKey]) * 100)
                                        : 100;


    return (

        <>
            {openFishScheduleFlag && 
            <SchedulingChart
                activity = {feedingKey}
                lastActivityString = {lastTimeFed}
                nextActivityString = {nextTimeFed}
                percentageUntilNextUpdate={percentageUntilNextUpdate}
                setOpenPetScheduleFlag = {setOpenFishScheduleFlag}
            />}

            <div className="NavBarContainer">
                <Link to = "/fishpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenFishScheduleFlag(true)}>Check Feeding Schedule</button>
            </div>
            
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-fish">
                    <h2 className="PetWindowSign PetWindowSign-fish"> {ActivePetName}'s Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-fish" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, fishTimeLimits[feedingKey]/2, feedingKey)}>Feed me!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderfish">Feed me!</button>

                    )}
                    
                </div>
            </div>
        </>

    );

}


export default FishFeedscreen;