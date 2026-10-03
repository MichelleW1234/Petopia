import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ActivityComponent from "./NonstationsComponents/Activity.jsx";

import { petActivityTimeStampMedicineDoseTimeGapKey, petMedicineKey, petSpeciesKey, petSpeciesActivityTimeStampTimeLimitList } from "../../../../../constants/Constants.js";
import { helpers_Closer_Flags } from "../../../../../helpers/helpers.js";

import "../../../../../App.css";


function Schedule({set_Schedule_OpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    
    useKeyboardShortcut("3", () => {

        helpers_Closer_Flags(set_Schedule_OpenFlag);

    },
        ".Close"
    );



    return (

        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">
            
                <div className = "UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocument">
                    <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocumentContent">
                        {Object.entries(petSpeciesActivityTimeStampTimeLimitList[PetList[ActivePetName][petSpeciesKey]]).map(([key, value]) => (

                            <ActivityComponent
                                key = {key}
                                activity_CurrActivityKey = {key}
                                activity_CurrActivityTimeLimit = {value}
                            />

                        ))}

                        <ActivityComponent
                            activity_CurrActivityKey = {petMedicineKey}
                            activity_CurrActivityTimeLimit = {petActivityTimeStampMedicineDoseTimeGapKey}
                        />
                    </div>
                </div>

            </div>
            
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Close" onClick={() => helpers_Closer_Flags(set_Schedule_OpenFlag)}> 
                    <div>
                        Close <br/> [3] 
                    </div>
                </button>
            </div>

        </div>
    );
}
  
export default Schedule;