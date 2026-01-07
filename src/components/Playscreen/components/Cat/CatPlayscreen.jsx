import { Link } from "react-router-dom";
import {useState} from "react";

import PlaySchedule from "../PlayscreenComponents/PlaySchedule.jsx";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { catTimeLimits } from "../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../helpers/Helpers.js";

import "./CatPlayscreen.css";

function CatPlayscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const [openCatScheduleFlag, setOpenCatScheduleFlag] = useState(false);



    return (

        <>
            {openCatScheduleFlag && 
            <PlaySchedule
                setOpenPetScheduleFlag = {setOpenCatScheduleFlag}
                timeLimits={catTimeLimits[2]}
            />}
            <div className="NavBarContainer">
                <Link to = "/catpet" className = "NavBarButton"> Back </Link> 
                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenCatScheduleFlag(true)}>Check Playing Schedule</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Playing Schedule</button>

                )}
            </div>
            <div className = "ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-cat">
                    <h2 className="PetWindowSign PetWindowSign-cat"> {PetList[ActivePetNumber][0]}'s Health: {PetList[ActivePetNumber][4]} </h2>
                    <div className = "filler"> </div>

                    {PetList[ActivePetNumber][4] > 0 ? (
                        
                        <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => CheckPetHealth(PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, catTimeLimits[2]/2, 2)}>Play!</button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholdercat">Play!</button>

                    )}

                </div>
            </div>
        </>

    );

}


export default CatPlayscreen;