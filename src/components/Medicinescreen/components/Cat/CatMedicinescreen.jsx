import { Link } from "react-router-dom";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./CatMedicinescreen.css";


function CatMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetNumber][5] > 86400000 ? true
                                                                    : false;



    return (
        <div className="ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-cat">
                <h2 className="PetWindowSign PetWindowSign-cat"> Health: {PetList[ActivePetNumber][3]} </h2>
                <div className = "filler"></div>
                {canReceiveDose ? (

                    <button className = "GeneralNavButton" onClick = {() => healPet(setPetList, ActivePetNumber, catHealthCap)}> Give Medicine </button>

                ) : (

                    <button className = "GeneralNavButtonPlaceHolder"> Give Medicine </button>

                )}
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>
    )
}
  
export default CatMedicinescreen;