import Activity from "./NonstationsComponents/Activity.jsx";

import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap, medicineKey, speciesKey, timeLimitList } from "../../../../../constants/Constants.js";

import "./Schedule.css";



function Schedule({setScheduleOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    return (
        <div className = "ReusableMultitags_BackgroundFloatingFlag-Structure--FloatingFlags_ ReusableMultitags_BackgroundFloatingFlag-Color--FloatingFlags_Nonstation">

            <div className="Schedule_ComponentContainer-Structure--Info">
                
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

            <button className="ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick={() => setScheduleOpenFlag(false)}>Close</button>

        </div>
    )
}
  
export default Schedule;