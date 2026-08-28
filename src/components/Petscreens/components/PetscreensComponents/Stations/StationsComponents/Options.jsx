import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { soundSelectionButtonPressKey, petActivityOptionImageKey, petActivityOptionNameKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey } from "../../../../../../constants/Constants.js";
import { helpersPlaySound } from "../../../../../../helpers/Helpers.js";

import PetUnwantedActivity from "../../../../../../images/PetUnwantedActivity.png";
import PetThoughtBubble from "../../../../../../images/PetThoughtBubble.png";

import "./Options.css";




function Options({optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {


    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const optionsJudgeSelection = (optionsJudgeSelectionChosenOption) => {

        helpersPlaySound(soundSelectionButtonPressKey);

        if (optionsJudgeSelectionChosenOption !== optionsDesiredOption) {

            setOptionsTotal(prev => prev*2);

        }

        setOptionsSelection(optionsJudgeSelectionChosenOption);

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

            <div className="Options_ComponentContainer-Structure--PetThought"> 

                <img src = {petSpeciesImagePortraitList[PetList[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]} className = "Options_ComponentImage-Template--PetThoughtPet" />

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">

                    <img src = {PetThoughtBubble} className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase Options_ComponentImage-Template--PetThoughtDesiredOptionBubble"/>
                    <img src = {optionsDesiredOption === -1 ? PetUnwantedActivity : optionsList[optionsDesiredOption][petActivityOptionImageKey]} className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer  Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                </div>

            </div>
            <div className= "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">  

                {optionsList.map((option, index) => (

                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagStation" onClick = {() => optionsJudgeSelection(index)}>
                            <img src = {option[petActivityOptionImageKey]}/>
                        </button>

                        <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                            <h2>{option[petActivityOptionNameKey]}</h2>
                        </div>
                    </div>

                ))}

            </div>
                    
        </div>
    );
}
  
export default Options