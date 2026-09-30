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

                type !== null ? (

                    <div key = {index} className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                        <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntryContent">
                        <h2>Pet Activity Alert:</h2>
                        <div className="Warning_image">
                            <img className="Warning_ComponentImage-Template--PetThoughtPet" src = {petSpeciesImagePortraitList[PetList[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]}/>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Warning_ComponentContainer-Structure--PetThoughtDesiredOption">
                                <img className="Warning_ComponentImage-Template--PetThoughtDesiredOptionBubble" src = {PetThoughtBubble}/>
                                <img className = "MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer Warning_ComponentImage-Template--PetThoughtDesiredOptionObject" src = {warning_types[index]} /> 
                            </div>
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