import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";

import { healthKey, medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

function MedicineSchedule({setOpenPetScheduleFlag}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const lastDoseRecievedRaw = new Date(PetList[ActivePetName][medicineKey]);
    const lastDoseRecieved = PetList[ActivePetName][medicineKey] > 0 ? lastDoseRecievedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }) 
        : "N/A";

    const nextDoseAvailableRaw = new Date(PetList[ActivePetName][medicineKey] + medicineDoseTimeGap);
    const nextDoseAvailable = PetList[ActivePetName][medicineKey] > 0 ? nextDoseAvailableRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }) 
        : "On Demand";
    

    return (
        <div className = "FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">

                    {PetList[ActivePetName][healthKey] === 0 ? (

                        <> 
                            <h2>Last Dose Recieved: {lastDoseRecieved} </h2>
                            <h2>Next Dose Available: -- </h2>
                        </>

                    ) : (

                        <> 
                            <h2>Last Dose Recieved: {lastDoseRecieved}</h2>
                            <h2>Next Dose Available: {nextDoseAvailable}</h2>
                        </>

                    )}
                   
                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default MedicineSchedule;