import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { audioCircleButtonPressKey, petActivityOptionImageKey, petActivityOptionNameKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey } from "../../../../../../constants/Constants.js";
import { helpers_Player_UIIndicatorSounds } from "../../../../../../helpers/helpers.js";

import "../../../../../../App.css";




function Options({options_CurrDesiredOption, options_CurrSpeciesList, options_UserSelection, set_Options_UserSelection}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const options_SelectionManager = (options_SelectionManager_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);

        if (options_UserSelection === options_SelectionManager_UserSelection){

            set_Options_UserSelection(-1)

        } else {

            set_Options_UserSelection(options_SelectionManager_UserSelection);

        }


    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">
        
            <div className= "MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">  

                {options_CurrSpeciesList.map((option, index) => (

                    <div key = {index} className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                        {options_UserSelection === index ? (

                            <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => options_SelectionManager(index)}>
                                <img src = {option[petActivityOptionImageKey]}/>
                            </button>

                        ) : (

                            <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => options_SelectionManager(index)}>
                                <img src = {option[petActivityOptionImageKey]}/>
                            </button>

                        )}

                        <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryDescriptor">
                            <h1>{option[petActivityOptionNameKey]}</h1>
                        </div>
                        
                    </div>

                ))}

            </div>
                    
        </div>
    );
}
  
export default Options