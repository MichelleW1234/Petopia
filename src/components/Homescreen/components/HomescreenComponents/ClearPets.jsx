import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { soundSelectionButtonPressKey, soundClearPetsKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey } from "../../../../constants/Constants.js";
import { helpersPlaySound, helpersFlagCloser } from "../../../../helpers/Helpers.js";




function ClearPets({setClearPetsOpenClearPetsFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Inventory, setInventory} = useInventory();

    const [clearPetsSelectedPets, setClearPetsSelectedPets] = useState([]);


    
    useKeyboardShortcut("Enter", () => {
        
        if (clearPetsSelectedPets.length > 0){

            clearPetsClearPets();

        }

    },
        ".RemoveSelectedPets"
    );


    useKeyboardShortcut("Escape", () => {
        
        helpersFlagCloser(setClearPetsOpenClearPetsFlag);

    },
        ".Quit"
    );
    




    const clearPetsAddPet = (clearPetsAddPetPetToAdd) => {

        helpersPlaySound(soundSelectionButtonPressKey);
        setClearPetsSelectedPets(prev => [...prev, clearPetsAddPetPetToAdd]);

    }


    const clearPetsRemovePet = (clearPetsRemovePetPetToRemove) => {

        helpersPlaySound(soundSelectionButtonPressKey);
        setClearPetsSelectedPets(prev => prev.filter(pet => pet !== clearPetsRemovePetPetToRemove));
        
    }


    const clearPetsClearPets = () => {

        helpersPlaySound(soundClearPetsKey);

        setPetTimeStamps(prev => {

            let clearPetsClearPetsCopy = { ...prev };

            clearPetsSelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...clearPetsClearPetsRest } = clearPetsClearPetsCopy;
                clearPetsClearPetsCopy = clearPetsClearPetsRest;
            });

            return clearPetsClearPetsCopy;

        });

        setPetList(prev => {

            let clearPetsClearPetsCopy = { ...prev };

            clearPetsSelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...clearPetsClearPetsRest } = clearPetsClearPetsCopy;
                clearPetsClearPetsCopy = clearPetsClearPetsRest;
            });

            return clearPetsClearPetsCopy;

        });

        setInventory(prev => {

            const clearPetsClearPetsCopy = prev.map(inner =>
                structuredClone(inner)
            );

            clearPetsSelectedPets.forEach(petToRemove => {

                clearPetsClearPetsCopy.forEach(item => {
                    if (item[inventoryItemOwnerKey] === petToRemove) {
                        item[inventoryItemOwnerKey] = null;
                    }
                });
            
            });

            return clearPetsClearPetsCopy;

        });

        setRoom(prev => {

            let clearPetsClearPetsUpdated = [...prev];

            clearPetsSelectedPets.forEach(petToRemove => {
                const clearPetsClearPetsPetRoom = clearPetsClearPetsUpdated.findIndex(room => room === petToRemove);
                clearPetsClearPetsUpdated[clearPetsClearPetsPetRoom] = null;
            });

            return clearPetsClearPetsUpdated;

        });

        helpersFlagCloser(setClearPetsOpenClearPetsFlag);

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

                                {clearPetsSelectedPets.includes(petName) ? (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => clearPetsRemovePet(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                ) : (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => clearPetsAddPet(petName)}> 
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

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Quit" onClick={() => helpersFlagCloser(setClearPetsOpenClearPetsFlag)}>Quit <br/> [esc]</button>

                {clearPetsSelectedPets.length === 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation">Remove Selected Pets <br/> [return]</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation RemoveSelectedPets" onClick={() => clearPetsClearPets()}>Remove Selected Pets <br/> [return]</button>

                )}

            </div>

        </div>
        
    );
}
  
export default ClearPets;