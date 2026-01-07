import { Link } from "react-router-dom";
import {useState} from "react";

import MedicineSchedule from "../MedicinescreenComponents/MedicineSchedule.jsx";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { fishHealthCap, medicineDoseTimeGap } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./FishMedicinescreen.css";


function FishMedicinescreen() {

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
                <Link to = "/fishpet" className = "NavBarButton"> Back </Link> 
                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenDogScheduleFlag(true)}>Check Medicine Availability</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Medicine Availability</button>

                )}
            </div>
            <div className="ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-fish">
                    <h2 className="PetWindowSign PetWindowSign-fish"> Health: {PetList[ActivePetNumber][4]} </h2>
                    <div className = "filler"></div>
                    {PetList[ActivePetNumber][4] > 0 && canReceiveDose ? (

                        <button className = "PetWindowButton PetWindowButton-fish" onClick = {() => healPet(setPetList, ActivePetNumber, fishHealthCap)}> Give Medicine </button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholderfish"> Give Medicine </button>

                    )}
                </div>
            </div>
        </>
    )
}
  
export default FishMedicinescreen;