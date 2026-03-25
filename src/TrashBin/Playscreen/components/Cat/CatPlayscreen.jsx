import { Link } from "react-router-dom";
import {useState} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { catTimeLimits, healthKey, playingKey } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./CatPlayscreen.css";


function CatPlayscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [openCatScheduleFlag, setOpenCatScheduleFlag] = useState(false);



    return (

        <>
            {openCatScheduleFlag && 
            <SchedulingChart
                activityKey = {playingKey}
                timeGap={catTimeLimits[playingKey]}
                setOpenPetScheduleFlag = {setOpenCatScheduleFlag}
            />}

            <div className="NavBarContainer">
                <Link to = "/catpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenCatScheduleFlag(true)}>Check Playing Schedule</button>
            </div>
            
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-cat">
                    <h2 className="PetWindowSign PetWindowSign-cat"> {ActivePetName}'s Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (
                    
                        <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, catTimeLimits[playingKey]/2, playingKey)}>Play!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholdercat">Play!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default CatPlayscreen;