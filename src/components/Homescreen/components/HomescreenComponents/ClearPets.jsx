import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { soundSelectionButtonPressKey, soundClearPetsKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey } from "../../../../constants/Constants.js";
import { helpers_PlaySound, helpers_FlagCloser } from "../../../../helpers/Helpers.js";




function ClearPets({set_ClearPets_OpenClearPetsFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Inventory, setInventory} = useInventory();

    const [clearPets_SelectedPets, set_ClearPets_SelectedPets] = useState([]);


    
    useKeyboardShortcut("Enter", () => {
        
        if (clearPets_SelectedPets.length > 0){

            clearPets_ClearPets();

        }

    },
        ".RemoveSelectedPets"
    );


    useKeyboardShortcut("Escape", () => {
        
        helpers_FlagCloser(set_ClearPets_OpenClearPetsFlag);

    },
        ".Quit"
    );
    




    const clearPets_AddPet = (clearPets_AddPet_PetToAdd) => {

        helpers_PlaySound(soundSelectionButtonPressKey);
        set_ClearPets_SelectedPets(prev => [...prev, clearPets_AddPet_PetToAdd]);

    }


    const clearPets_RemovePet = (clearPets_RemovePet_PetToRemove) => {

        helpers_PlaySound(soundSelectionButtonPressKey);
        set_ClearPets_SelectedPets(prev => prev.filter(pet => pet !== clearPets_RemovePet_PetToRemove));
        
    }


    const clearPets_ClearPets = () => {

        helpers_PlaySound(soundClearPetsKey);

        setPetTimeStamps(prev => {

            let clearPets_ClearPets_Copy = { ...prev };

            clearPets_SelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...clearPets_ClearPets_Rest } = clearPets_ClearPets_Copy;
                clearPets_ClearPets_Copy = clearPets_ClearPets_Rest;
            });

            return clearPets_ClearPets_Copy;

        });

        setPetList(prev => {

            let clearPets_ClearPets_Copy = { ...prev };

            clearPets_SelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...clearPets_ClearPets_Rest } = clearPets_ClearPets_Copy;
                clearPets_ClearPets_Copy = clearPets_ClearPets_Rest;
            });

            return clearPets_ClearPets_Copy;

        });

        setInventory(prev => {

            const clearPets_ClearPets_Copy = prev.map(inner =>
                structuredClone(inner)
            );

            clearPets_SelectedPets.forEach(petToRemove => {

                clearPets_ClearPets_Copy.forEach(item => {
                    if (item[inventoryItemOwnerKey] === petToRemove) {
                        item[inventoryItemOwnerKey] = null;
                    }
                });
            
            });

            return clearPets_ClearPets_Copy;

        });

        setRoom(prev => {

            let clearPets_ClearPets_Copy = [...prev];

            clearPets_SelectedPets.forEach(petToRemove => {
                const clearPets_ClearPets_PetRoom = clearPets_ClearPets_Copy.findIndex(room => room === petToRemove);
                clearPets_ClearPets_Copy[clearPets_ClearPets_PetRoom] = null;
            });

            return clearPets_ClearPets_Copy;

        });

        helpers_FlagCloser(set_ClearPets_OpenClearPetsFlag);

    }

    

    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline">Select pet(s) to remove:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Room.map((petName, index) => (

                        petName === null ? (

                            null

                        ) : (

                            <div key = {index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                                {clearPets_SelectedPets.includes(petName) ? (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => clearPets_RemovePet(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                ) : (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => clearPets_AddPet(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                )}

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>{petName}</h2>
                                </div>
                            </div>

                        )

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Quit" onClick={() => helpers_FlagCloser(set_ClearPets_OpenClearPetsFlag)}>Quit <br/> [esc]</button>

                {clearPets_SelectedPets.length === 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation">Remove Selected Pets <br/> [return]</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation RemoveSelectedPets" onClick={() => clearPets_ClearPets()}>Remove Selected Pets <br/> [return]</button>

                )}

            </div>

        </div>
        
    );
}
  
export default ClearPets;