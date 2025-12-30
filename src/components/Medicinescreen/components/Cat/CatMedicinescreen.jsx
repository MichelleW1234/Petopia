import { Link } from 'react-router-dom';

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";


function CatMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    return (
        <div className="ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-cat">
                <h2 className="PetWindowSign PetWindowSign-cat"> Please give your cat Medicine </h2>
                <div className = "filler"> </div>
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>
    )
}
  
export default CatMedicinescreen;