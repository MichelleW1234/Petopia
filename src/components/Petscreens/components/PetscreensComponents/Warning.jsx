import "../../../../App.css";
import "./Warning.css";

import PetThoughtBubble from "../../../../images/PetThoughtBubble.png";

import { usePetList } from "../../../../providers/PetListProvider";
import { useActivePetName } from "../../../../providers/ActivePetNameProvider";

import { petSpeciesImagePortraitList, petSpeciesKey, petStageKey } from "../../../../constants/Constants";


function Warning({warning_types}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags--Alerts">

            {warning_types.map((type, index) => (

                index === 0 && type !== null ? (

                    <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                        <h2>Pet Activity Alert:</h2>

                        <div className="Warning_image">
                            <img className="Options_ComponentImage-Template--PetThoughtPet" src = {petSpeciesImagePortraitList[PetList[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]}/>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">
                                <img className="Options_ComponentImage-Template--PetThoughtDesiredOptionBubble" src = {PetThoughtBubble}/>
                                <img className = "MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer Options_ComponentImage-Template--PetThoughtDesiredOptionObject" src = {warning_types[index]} /> 
                            </div>
                        </div>
                    </div>
                
                ) :  (

                    null

                )

            ))}

        </div>

    );
}
  
export default Warning;