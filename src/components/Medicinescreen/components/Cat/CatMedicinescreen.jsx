import { Link } from "react-router-dom";
import {useState} from "react";

import MedicineSchedule from "../MedicinescreenComponents/MedicineSchedule.jsx";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap, medicineDoseTimeGap } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./CatMedicinescreen.css";


function CatMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetNumber][6] > medicineDoseTimeGap ? true
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
                {PetList[ActivePetNumber][4] > 0 ? (

                    <button className ="NavBarButton" onClick = {() => setOpenCatScheduleFlag(true)}>Check Medicine Availability</button>

                ) : (

                    <button className ="NavBarButtonPlaceHolder">Check Medicine Availability</button>

                )}
            </div>
            <div className="ScreenContainer">
                <div className="PetWindowBorder PetWindowBorder-cat">
                    <h2 className="PetWindowSign PetWindowSign-cat"> Health: {PetList[ActivePetNumber][4]} </h2>
                    <div className = "filler"></div>
                    {PetList[ActivePetNumber][4] > 0 && canReceiveDose ? (

                        <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => healPet(setPetList, ActivePetNumber, catHealthCap)}> Give Medicine </button>

                    ) : (

                        <button className = "PetWindowButton PetWindowButton-placeholdercat"> Give Medicine </button>

                    )}
                </div>
            </div>
        </>
    )
}
  
export default CatMedicinescreen;