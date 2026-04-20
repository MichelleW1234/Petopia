import Activity from "./ScheduleComponents/Activity.jsx";

import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap, medicineKey, speciesKey, timeLimitList } from "../../../../../constants/Constants.js";

import "./Schedule.css";



function Schedule({setScheduleOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    return (
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonstationBackgroundColor">

            <div className="ReusableComponentContainer_Structure FloatingFlag_ReusableComponentContainer_NonStationColor  Schedule_InfoContainer">
                
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

            <button className="ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick={() => setScheduleOpenFlag(false)}>Close</button>

        </div>
    )
}
  
export default Schedule;