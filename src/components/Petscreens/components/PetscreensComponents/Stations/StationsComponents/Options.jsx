import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { selectionButtonPressSoundKey, optionImageKey, optionNameKey, portraitPetImages, speciesKey, stageKey } from "../../../../../../constants/Constants.js";
import { playSound } from "../../../../../../helpers/helpers.js";

import PetUnwantedActivity from "../../../../../../images/PetUnwantedActivity.png";
import PetThoughtBubble from "../../../../../../images/PetThoughtBubble.png";

import "./Options.css";




function Options({optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {


    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const judgeSelection = (chosenOption) => {

        playSound(selectionButtonPressSoundKey);

        if (chosenOption !== optionsDesiredOption) {

            setOptionsTotal(prev => prev*2);

        }

        setOptionsSelection(chosenOption);

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

            <div className="Options_ComponentContainer-Structure--PetThought"> 

                <img src = {portraitPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]]} className = "Options_ComponentImage-Template--PetThoughtPet" />

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">

                    <img src = {PetThoughtBubble} className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase Options_ComponentImage-Template--PetThoughtDesiredOptionBubble"/>
                    <img src = {optionsDesiredOption === -1 ? PetUnwantedActivity : optionsList[optionsDesiredOption][optionImageKey]} className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer  Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                </div>

            </div>
            <div className= "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">  

                {optionsList.map((option, index) => (

                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagStation" onClick = {() => judgeSelection(index)}>
                            <img src = {option[optionImageKey]}/>
                        </button>

                        <h2>{option[optionNameKey]}</h2>
                    </div>

                ))}

            </div>
                    
        </div>
    );
}
  
export default Options