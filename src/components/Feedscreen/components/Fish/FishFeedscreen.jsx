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
                timeLimits={fishTimeLimits[0]}
            />}
            <div className="NavBarContainer">
                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenFishScheduleFlag(true)}>Check Feeding Schedule</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Feeding Schedule</button>

                )}
            </div>
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-fish">
                    <h2 className="PetWindowSign PetWindowSign-fish"> Health: {PetList[ActivePetNumber][4]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetNumber][4] > 0 ? (

                        <button className = "PetWindowButton PetWindowButton-fish" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, fishTimeLimits[0]/2, 0)}>Feed me!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderfish">Feed me!</button>

                    )}
                    
                </div>
                <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
            </div>
        </>

    );

}


export default FishFeedscreen;