import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import Activity from "./NonstationsComponents/Activity.jsx";

import { petActivityTimeStampMedicineDoseTimeGapKey, petMedicineKey, petSpeciesKey, petSpeciesActivityTimeStampTimeLimitList } from "../../../../../constants/Constants.js";
import { flagCloser } from "../../../../../helpers/Helpers.js";



function Schedule({setScheduleOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    
    useKeyboardShortcut("3", () => {

        flagCloser(setScheduleOpenFlag);

    },
        ".Close"
    );



    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
            
                <div className = "MiscellaneousElements_ComponentContainer-Template--GlobalDocument">
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                        <h1>Schedule:</h1>
                        <hr/>
                    </div>

                    {Object.entries(petSpeciesActivityTimeStampTimeLimitList[PetList[ActivePetName][petSpeciesKey]]).map(([key, value]) => (

                        <Activity
                            key = {key}
                            activityKey = {key}
                            activityTimeGap = {value}
                        />

                    ))}

                    <Activity
                        activityKey = {petMedicineKey}
                        activityTimeGap = {petActivityTimeStampMedicineDoseTimeGapKey}
                    />
                </div>

            </div>
            
            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick={() => flagCloser(setScheduleOpenFlag)}>Close <br/> [3] </button>

        </div>
    );
}
  
export default Schedule;