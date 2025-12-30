import { Link } from 'react-router-dom';

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";


function FishMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    return (
        <div className="ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-fish">
                <h2 className="PetWindowSign PetWindowSign-fish"> Please give your fish Medicine </h2>
                <div className = "filler"> </div>
            </div>
            <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
        </div>
    )
}
  
export default FishMedicinescreen;