import { Link } from "react-router-dom";
import {useState} from "react";

import FeedSchedule from "../FeedscreenComponents/FeedSchedule.jsx";

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

        
    return (

        <>
            {openCatScheduleFlag && 
            <FeedSchedule
                setOpenPetScheduleFlag = {setOpenCatScheduleFlag}
                timeLimits={catTimeLimits[feedingKey]}
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