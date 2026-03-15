import { Link } from "react-router-dom";
import {useState} from "react";

import MedicineSchedule from "../MedicinescreenComponents/MedicineSchedule.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap, healthKey, medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./CatMedicinescreen.css";


function CatMedicinescreen() {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? true
                                                                    : false;

    const [openCatScheduleFlag, setOpenCatScheduleFlag] = useState(false);                                                            



    return (

        <>
            {openCatScheduleFlag && 
            <MedicineSchedule
                setOpenPetScheduleFlag = {setOpenCatScheduleFlag}
            />}

            <div className="NavBarContainer">
                <Link to = "/catpet" className = "NavBarButton"> Back </Link> 
                <button className ="NavBarButton" onClick = {() => setOpenCatScheduleFlag(true)}>Check Medicine Availability</button>
            </div>
            
            <div className="ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-cat">
                    <h2 className="PetWindowSign PetWindowSign-cat"> Health: {PetList[ActivePetName][healthKey]} </h2>
                    <div className = "filler"></div>
                    {PetList[ActivePetName][healthKey] > 0 && canReceiveDose ? (

                        <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => healPet(setPetList, ActivePetName, catHealthCap)}> Give Medicine </button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholdercat"> Give Medicine </button>

                    )}
                </div>
            </div>
        </>
    )
}
  
export default CatMedicinescreen;