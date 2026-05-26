import "./Options.css";

import unwanted from "../../../../../../images/PetUnwanted.png";
import heart from "../../../../../../images/placeholderheart.png";
import bubble from "../../../../../../images/placeholderthoughtbubble.png";

import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { buttonPressSoundKey, portraitPetImages, speciesKey, stageKey } from "../../../../../../constants/Constants.js";
import { playSound } from "../../../../../../helpers/helpers.js";



function Options({optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {


    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const judgeSelection = (chosenOption) => {

        playSound(buttonPressSoundKey);

        if (chosenOption !== optionsDesiredOption) {

            setOptionsTotal(prev => prev*2);

        }

        setOptionsSelection(chosenOption);

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

            <div className="Options_ComponentContainer-Structure--PetThought"> 

                <img className = "Options_ComponentImage-Template--PetThoughtPet" src = {portraitPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]]} />

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">

                    <img src = {bubble} className=" Options_ComponentImage-Template--PetThoughtDesiredOptionBubble"/>

                    {optionsDesiredOption === -1 ? (

                        <img src = {unwanted} className=" Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                    ) : (

                        <img src = {optionsList[optionsDesiredOption][1]} className=" Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                    )}
                </div>

            </div>
            <div className= "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">  

                {optionsList.map((option, index) => (

                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionButtonSlot">
                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagStation" onClick = {() => judgeSelection(index)}>
                            <img src = {option[1]}/>
                        </button>

                        <h2>{option[0]}</h2>
                    </div>

                ))}

            </div>
                    
        </div>
    );
}
  
export default Options