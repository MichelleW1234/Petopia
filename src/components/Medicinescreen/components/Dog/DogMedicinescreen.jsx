import { Link } from "react-router-dom";
import {useState} from "react";

import MedicineSchedule from "../MedicinescreenComponents/MedicineSchedule.jsx";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { dogHealthCap, medicineDoseTimeGap } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./DogMedicinescreen.css";


function DogMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetNumber][6] > medicineDoseTimeGap ? true
                                                                    : false;

    const [openDogScheduleFlag, setOpenDogScheduleFlag] = useState(false);               


                                                                    
    return (

        <>
            {openDogScheduleFlag && 
            <MedicineSchedule
                setOpenPetScheduleFlag = {setOpenDogScheduleFlag}
            />}
            <div className="NavBarContainer">
                <Link to = "/dogpet" className = "NavBarButton"> Back </Link> 
                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Medicine Availability</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Medicine Availability</button>

                )}
            </div>
            <div className="ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-dog">
                    <h2 className="PetWindowSign PetWindowSign-dog"> Health: {PetList[ActivePetNumber][4]} </h2>
                    <div className = "filler"></div>
                    {canReceiveDose ? (

                        <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => healPet(setPetList, ActivePetNumber, dogHealthCap)}> Give Medicine </button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderdog"> Give Medicine </button>

                    )}
                </div>
            </div>
        </>
    )
}
  
export default DogMedicinescreen;