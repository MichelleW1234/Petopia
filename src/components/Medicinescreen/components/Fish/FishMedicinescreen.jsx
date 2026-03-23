import { Link } from "react-router-dom";
import {useState, useEffect} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { fishHealthCap, healthKey, medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./FishMedicinescreen.css";


function FishMedicinescreen() {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [currDate, setCurrDate] = useState(Date.now());    
    const [openFishScheduleFlag, setOpenFishScheduleFlag] = useState(false);      

    const canReceiveDose = currDate - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? true
                                                                : false;


    useEffect(() => {

        const interval = setInterval(() => {
            setCurrDate(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

                            
    
    return (

        <>
            {openFishScheduleFlag && 
            <SchedulingChart
                activityKey = {medicineKey}
                timeGap={medicineDoseTimeGap}
                setOpenPetScheduleFlag = {setOpenFishScheduleFlag}
            />}

            <div className="NavBarContainer">
                <Link to = "/fishpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenFishScheduleFlag(true)}>Check Medicine Availability</button>
            </div>
            
            <div className="ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-fish">
                    <h2 className="PetWindowSign PetWindowSign-fish"> Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"></div>
                    {PetList[ActivePetName][healthKey] > 0 && canReceiveDose ? (

                        <button className = "PetWindowButton PetWindowButton-fish" onClick = {() => healPet(setPetList, ActivePetName, fishHealthCap)}> Give Medicine </button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderfish"> Give Medicine </button>

                    )}
                </div>
            </div>
        </>
    )
}
  
export default FishMedicinescreen;