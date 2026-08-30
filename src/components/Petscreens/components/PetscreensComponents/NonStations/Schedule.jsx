import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import Activity from "./NonstationsComponents/Activity.jsx";

import { petActivityTimeStampMedicineDoseTimeGapKey, petMedicineKey, petSpeciesKey, petSpeciesActivityTimeStampTimeLimitList } from "../../../../../constants/Constants.js";
import { helpers_Closer_Flags } from "../../../../../helpers/Helpers.js";



function Schedule({set_Schedule_OpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    
    useKeyboardShortcut("3", () => {

        helpers_Closer_Flags(set_Schedule_OpenFlag);

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
                            activity_CurrActivityKey = {key}
                            activity_CurrActivityTimeLimit = {value}
                        />

                    ))}

                    <Activity
                        activity_CurrActivityKey = {petMedicineKey}
                        activity_CurrActivityTimeLimit = {petActivityTimeStampMedicineDoseTimeGapKey}
                    />
                </div>

            </div>
            
            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick={() => helpers_Closer_Flags(set_Schedule_OpenFlag)}>Close <br/> [3] </button>

        </div>
    );
}
  
export default Schedule;