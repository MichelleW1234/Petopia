import { Link } from "react-router-dom";
import {useState} from "react";

import FeedSchedule from "../FeedscreenComponents/FeedSchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { fishTimeLimits } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./FishFeedscreen.css";


function FishFeedscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const [openFishScheduleFlag, setOpenFishScheduleFlag] = useState(false);


    return (

        <>
            {openFishScheduleFlag && 
            <FeedSchedule
                setOpenPetScheduleFlag = {setOpenFishScheduleFlag}
                timeLimits={fishTimeLimits["feeding"]}
            />}
            <div className="NavBarContainer">
                <Link to = "/fishpet" className = "NavBarButton"> Back </Link> 
                {PetList[ActivePetNumber]["health"] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenFishScheduleFlag(true)}>Check Feeding Schedule</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Feeding Schedule</button>

                )}
            </div>
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-fish">
                    <h2 className="PetWindowSign PetWindowSign-fish"> {ActivePetNumber}'s Health: {PetList[ActivePetNumber]["health"]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetNumber]["health"] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-fish" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, fishTimeLimits["feeding"]/2, "feeding")}>Feed me!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderfish">Feed me!</button>

                    )}
                    
                </div>
            </div>
        </>

    );

}


export default FishFeedscreen;