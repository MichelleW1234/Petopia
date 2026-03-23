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


    return (

        <>
            {openFishScheduleFlag && 
            <SchedulingChart
                activityKey = {feedingKey}
                timeGap = {fishTimeLimits[feedingKey]}
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