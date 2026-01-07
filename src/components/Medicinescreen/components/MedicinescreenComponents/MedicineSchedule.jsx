import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import { usePetList } from "../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap } from "../../../../constants/Constants.js";

function MedicineSchedule({setOpenPetScheduleFlag}) {

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const lastDoseRecievedRaw = new Date(PetList[ActivePetNumber][6]);
    const lastDoseRecieved = PetList[ActivePetNumber][6] > 0 ? lastDoseRecievedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }) 
        : "N/A";

    const nextDoseAvailableRaw = new Date(PetList[ActivePetNumber][6] + medicineDoseTimeGap);
    const nextDoseAvailable = PetList[ActivePetNumber][6] > 0 ? nextDoseAvailableRaw.toLocaleString([], {
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
                    <h2>Last Dose Recieved: {lastDoseRecieved}</h2>
                    <h2>Next Dose Available: {nextDoseAvailable}</h2>
                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default MedicineSchedule;