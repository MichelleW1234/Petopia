import { Link } from "react-router-dom";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { dogHealthCap } from "../../../../constants/Constants.js";

import { healPet } from "../../helpers/Helpers.js";

import "./DogMedicinescreen.css";


function DogMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const canReceiveDose = Date.now() - PetList[ActivePetNumber][5] > 86400000 ? true
                                                                    : false;


                                                                    
    return (
        <div className="ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-dog">
                <h2 className="PetWindowSign PetWindowSign-dog"> Health: {PetList[ActivePetNumber][3]} </h2>
                <div className = "filler"></div>
                {canReceiveDose ? (

                    <button className = "PetWindowButton PetWindowButton-dog" onClick = {() => healPet(setPetList, ActivePetNumber, dogHealthCap)}> Give Medicine </button>

                ) : (

                    <button className = "PetWindowButtonPlaceholder PetWindowButtonPlaceholder-dog"> Give Medicine </button>

                )}
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>
    )
}
  
export default DogMedicinescreen;