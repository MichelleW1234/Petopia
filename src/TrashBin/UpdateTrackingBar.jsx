import {usePetList} from "../providers/PetListProvider.jsx";
import {useActivePetName} from "../providers/ActivePetNameProvider.jsx";

import { healthKey} from "../constants/Constants.js";

function UpdateTrackingBar({percentageUntilNextUpdate}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    return (
        <>
        
            {PetList[ActivePetName][healthKey] === 0 ? (

                <div className = "ProgressBar">
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = "ProgressCellCancelled"></div>

                    ))}
                </div>

            ) : (

                <div className = "ProgressBar">
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        num <= percentageUntilNextUpdate ? (

                            <div key = {num} className = "ProgressCellDone"></div>

                        ) : (

                            <div key = {num} className = "ProgressCellLeft"></div>

                        )

                    ))}
                </div>

            )} 

        </>
    )
}
  
export default UpdateTrackingBar;