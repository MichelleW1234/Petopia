import { Link } from 'react-router-dom';

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";


function DogMedicinescreen() {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    return (
        <div className="ScreenContainer">
            <div className="PetWindowBorder PetWindowBorder-dog">
                <h2 className="PetWindowSign PetWindowSign-dog"> Please give your dog Medicine </h2>
                <div className = "filler"> </div>
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>
    )
}
  
export default DogMedicinescreen;