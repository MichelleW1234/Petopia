import Activity from "./NonstationsComponents/Activity.jsx";

import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap, medicineKey, speciesKey, timeLimitList } from "../../../../../constants/Constants.js";

import "./Schedule.css";



function Schedule({setScheduleOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
            
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
            
            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation" onClick={() => setScheduleOpenFlag(false)}>Close</button>

        </div>
    );
}
  
export default Schedule;