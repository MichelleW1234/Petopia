import { Link } from "react-router-dom";
import {useState} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { catTimeLimits, feedingKey, healthKey } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./CatFeedscreen.css";


function CatFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [openCatScheduleFlag, setOpenCatScheduleFlag] = useState(false);


    const deadLine = PetTimeStamps[ActivePetName][feedingKey][0] + catTimeLimits[feedingKey];

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
                                        Math.round(((currTime - PetTimeStamps[ActivePetName][feedingKey][0])/catTimeLimits[feedingKey]) * 100)
                                        : 100;

        
    return (

        <>
            {openCatScheduleFlag && 
             <SchedulingChart
                activity = {feedingKey}
                lastActivityString = {lastTimeFed}
                nextActivityString = {nextTimeFed}
                percentageUntilNextUpdate={percentageUntilNextUpdate}
                setOpenPetScheduleFlag = {setOpenCatScheduleFlag}
            />}
            
            <div className="NavBarContainer">
                <Link to = "/catpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenCatScheduleFlag(true)}>Check Feeding Schedule</button>
            </div>

            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-cat">
                    <h2 className="PetWindowSign PetWindowSign-cat"> {ActivePetName}'s Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, catTimeLimits[feedingKey]/2, feedingKey)}>Feed me!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholdercat">Feed me!</button>

                    )}
                    
                </div>
            </div>
        </>

    );

}


export default CatFeedscreen;