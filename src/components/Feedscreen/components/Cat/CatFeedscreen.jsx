import { Link } from "react-router-dom";
import {useState} from "react";

import FeedSchedule from "../FeedscreenComponents/FeedSchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { catTimeLimits } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./CatFeedscreen.css";

function CatFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const [openCatScheduleFlag, setOpenCatScheduleFlag] = useState(false);

        
    return (

        <>
            {openCatScheduleFlag && 
            <FeedSchedule
                setOpenPetScheduleFlag = {setOpenCatScheduleFlag}
                timeLimits={catTimeLimits[0]}
            />}
            <div className="NavBarContainer">
                <Link to = "/catpet" className = "NavBarButton"> Back </Link> 
                {PetList[ActivePetNumber]["health"] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenCatScheduleFlag(true)}>Check Feeding Schedule</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Feeding Schedule</button>

                )}
            </div>
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-cat">
                    <h2 className="PetWindowSign PetWindowSign-cat"> {ActivePetNumber}'s Health: {PetList[ActivePetNumber]["health"]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetNumber]["health"] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, catTimeLimits[0]/2, "feeding")}>Feed me!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholdercat">Feed me!</button>

                    )}
                    
                </div>
            </div>
        </>

    );

}


export default CatFeedscreen;