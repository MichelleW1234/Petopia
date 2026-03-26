import SchedulingChartActivity from "./SchedulingChartActivity.jsx";

import { medicineDoseTimeGap, medicineKey } from "../../../../constants/Constants.js";

import "./SchedulingChart.css";



function SchedulingChart({timeLimits, setOpenScheduleFlag}) {

    return (
        <div className = "FloatingFlagBackground">

            <div className="FloatingFlagContainer">
                
                {Object.entries(timeLimits).map(([key, value]) => (

                    <SchedulingChartActivity
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