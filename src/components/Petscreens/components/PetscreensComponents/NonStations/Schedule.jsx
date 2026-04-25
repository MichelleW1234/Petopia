import Activity from "./NonStationsComponents/Activity.jsx";

import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap, medicineKey, speciesKey, timeLimitList } from "../../../../../constants/Constants.js";

import "./Schedule.css";



function Schedule({setScheduleOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    return (
        <div className = "Global_ReusableMultitag-BackgroundFloatingFlag_Structure Global_ReusableMultitag-BackgroundFloatingFlag_NonStationColor">

            <div className="Schedule_InfoContainer">
                
                {Object.entries(timeLimitList[PetList[ActivePetName][speciesKey]]).map(([key, value]) => (

                    <Activity
                        key = {key}
                        activityKey = {key}
                        activityTimeGap = {value}
                    />

                ))}

                <Activity
                    activityKey = {medicineKey}
                    activityTimeGap = {medicineDoseTimeGap}
                />

            </div>

            <button className="Global_ReusableMultitag-ComponentButtonPill_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationNormalColor" onClick={() => setScheduleOpenFlag(false)}>Close</button>

        </div>
    )
}
  
export default Schedule;