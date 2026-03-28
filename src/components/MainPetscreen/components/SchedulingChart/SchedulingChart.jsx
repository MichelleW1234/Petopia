import SchedulingChartActivity from "./SchedulingChartActivity.jsx";

import { useActivePetName } from "../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap, medicineKey, speciesKey, timeLimitList } from "../../../../constants/Constants.js";

import "./SchedulingChart.css";



function SchedulingChart({setOpenScheduleFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    return (
        <div className = "FloatingFlagBackground">

            <div className="FloatingFlagContainer">
                
                {Object.entries(timeLimitList[PetList[ActivePetName][speciesKey]]).map(([key, value]) => (

                    <SchedulingChartActivity
                        key = {key}
                        activityKey = {key}
                        timeGap = {value}
                    />

                ))}

                <SchedulingChartActivity
                    activityKey = {medicineKey}
                    timeGap = {medicineDoseTimeGap}
                />

            </div>

            <button className="FloatingFlagButton" onClick={() => setOpenScheduleFlag(false)}>Close</button>

        </div>
    )
}
  
export default SchedulingChart;