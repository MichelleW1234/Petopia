import { Link } from "react-router-dom";
import {useState} from "react";

import SchedulingChart from "../../../GlobalComponents/SchedulingChart.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { dogHealthCap, healthKey, medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./DogMedicinescreen.css";


function DogMedicinescreen() {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? true
                                                                    : false;

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);      
    
    
    const reset = PetList[ActivePetName][medicineKey] + medicineDoseTimeGap;

    const lastDoseRecievedRaw = new Date(PetList[ActivePetName][medicineKey]);
    const lastDoseRecieved = PetList[ActivePetName][medicineKey] > 0 ? lastDoseRecievedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }) 
        : "N/A";

    const nextDoseAvailableRaw = new Date(reset);
    const nextDoseAvailable = PetList[ActivePetName][medicineKey] > 0 ? nextDoseAvailableRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }) 
        : "On Demand";


    const currTime = Date.now();
    const percentageUntilNextUpdate =  PetList[ActivePetName][medicineKey] === 0 ? 
                                            100
                                        : reset > currTime ? 
                                            Math.round(((currTime -  PetList[ActivePetName][medicineKey])/medicineDoseTimeGap) * 100)
                                        : 100;


                                                                    
    return (

        <>
            {openDogScheduleFlag && 
            <SchedulingChart
                activity = {medicineKey}
                lastActivityString = {lastDoseRecieved}
                nextActivityString = {nextDoseAvailable}
                percentageUntilNextUpdate={percentageUntilNextUpdate}
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