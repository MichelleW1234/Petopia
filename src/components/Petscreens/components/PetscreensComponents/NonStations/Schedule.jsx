import Activity from "./NonstationsComponents/Activity.jsx";

import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { medicineDoseTimeGap, medicineKey, speciesKey, timeLimitList } from "../../../../../constants/Constants.js";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import "./Schedule.css";
import { screenFlagCloser } from "../../../../../helpers/helpers.js";



function Schedule({setScheduleOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    useKeyboardShortcut("2", () => {

        screenFlagCloser(setScheduleOpenFlag);

    },
        ".Close"
    );



    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
            
                <div className = "schedule">
                <div className="heading">
                    <h1>Schedule:</h1>
                    <hr/>
                </div>

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

            </div>
            
            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick={() => screenFlagCloser(setScheduleOpenFlag)}>Close <br/> [2] </button>

        </div>
    );
}
  
export default Schedule;