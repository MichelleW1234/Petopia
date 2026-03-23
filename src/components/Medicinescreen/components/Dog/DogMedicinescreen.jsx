import { Link } from "react-router-dom";
import {useState, useEffect} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { dogHealthCap, healthKey, medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./DogMedicinescreen.css";


function DogMedicinescreen() {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [currDate, setCurrDate] = useState(Date.now());  
    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);      

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
            {openDogScheduleFlag && 
            <SchedulingChart
                activityKey = {medicineKey}
                timeGap={medicineDoseTimeGap}
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
            />}
            
            <div className="NavBarContainer">
                <Link to = "/dogpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Medicine Availability</button>
            </div>

            <div className="ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-dog">
                    <h2 className="PetWindowSign PetWindowSign-dog"> Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"></div>
                    {PetList[ActivePetName][healthKey] > 0 && canReceiveDose ? (

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => healPet(setPetList, ActivePetName, dogHealthCap)}> Give Medicine </button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog"> Give Medicine </button>

                    )}
                </div>
            </div>
        </>
    )
}
  
export default DogMedicinescreen;