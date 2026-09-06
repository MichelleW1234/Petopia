import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { audioSelectionButtonPressKey, petActivityOptionImageKey, petActivityOptionNameKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey } from "../../../../../../constants/Constants.js";
import { helpers_Player_UIIndicatorSounds } from "../../../../../../helpers/Helpers.js";

import PetUnwantedActivity from "../../../../../../images/PetUnwantedActivity.png";
import PetThoughtBubble from "../../../../../../images/PetThoughtBubble.png";

import "./Options.css";




function Options({options_CurrDesiredOption, options_CurrSpeciesList, options_UserSelection, set_Options_UserSelection}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const options_SelectionManager = (options_SelectionManager_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);

        if (options_UserSelection === options_SelectionManager_UserSelection){

            set_Options_UserSelection(-1)

        } else {

            set_Options_UserSelection(options_SelectionManager_UserSelection);

        }


    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

            <div className="Options_ComponentContainer-Structure--PetThought"> 

                <img src = {petSpeciesImagePortraitList[PetList[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]} className = "Options_ComponentImage-Template--PetThoughtPet" />

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">

                    <img src = {PetThoughtBubble} className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase Options_ComponentImage-Template--PetThoughtDesiredOptionBubble"/>
                    <img src = {options_CurrDesiredOption === -1 ? PetUnwantedActivity : options_CurrSpeciesList[options_CurrDesiredOption][petActivityOptionImageKey]} className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer  Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                </div>

            </div>
            <div className= "MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">  

                {options_CurrSpeciesList.map((option, index) => (

                    <div key = {index} className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                        {options_UserSelection === index ? (

                            <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagStationSelected" onClick = {() => options_SelectionManager(index)}>
                                <img src = {option[petActivityOptionImageKey]}/>
                            </button>

                        ) : (

                            <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagStation" onClick = {() => options_SelectionManager(index)}>
                                <img src = {option[petActivityOptionImageKey]}/>
                            </button>

                        )}

                        <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                            <h2>{option[petActivityOptionNameKey]}</h2>
                        </div>
                    </div>

                ))}

            </div>
                    
        </div>
    );
}
  
export default Options