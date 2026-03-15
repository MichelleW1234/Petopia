import { Link } from "react-router-dom";
import {useState} from "react";

import MedicineSchedule from "../MedicinescreenComponents/MedicineSchedule.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { fishHealthCap, healthKey, medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./FishMedicinescreen.css";


function FishMedicinescreen() {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? true
                                                                : false;

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);         


                                                                
    return (

        <>
            {openDogScheduleFlag && 
            <MedicineSchedule
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
            />}

            <div className="NavBarContainer">
                <Link to = "/fishpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Medicine Availability</button>
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