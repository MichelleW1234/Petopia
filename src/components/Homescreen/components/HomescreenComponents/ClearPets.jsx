import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { soundSelectionButtonPressKey, soundClearPetsKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey } from "../../../../constants/Constants.js";
import { playSound, flagCloser } from "../../../../helpers/Helpers.js";




function ClearPets({setClearPetsOpenClearPetsFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Inventory, setInventory} = useInventory();

    const [deletionSelectedPets, setClearPetsSelectedPets] = useState([]);


    
    useKeyboardShortcut("Enter", () => {
        
        if (deletionSelectedPets.length > 0){

            clearPets();

        }

    },
        ".RemoveSelectedPets"
    );


    useKeyboardShortcut("Escape", () => {
        
        flagCloser(setClearPetsOpenClearPetsFlag);

    },
        ".Quit"
    );
    




    const addPet = (PetToAdd) => {

        playSound(soundSelectionButtonPressKey);
        setClearPetsSelectedPets(prev => [...prev, PetToAdd]);

    }


    const removePet = (PetToRemove) => {

        playSound(soundSelectionButtonPressKey);
        setClearPetsSelectedPets(prev => prev.filter(pet => pet !== PetToRemove));
        
    }


    const clearPets = () => {

        playSound(soundClearPetsKey);

        setPetTimeStamps(prev => {

            let updatedList = { ...prev };

            deletionSelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...rest } = updatedList;
                updatedList = rest;
            });

            return updatedList;

        });

        setPetList(prev => {

            let updatedList = { ...prev };

            deletionSelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...rest } = updatedList;
                updatedList = rest;
            });

            return updatedList;

        });

        //CHECK!!!!!!
        setInventory(prev => {

            const copy = prev.map(inner =>
                structuredClone(inner)
            );

            deletionSelectedPets.forEach(petToRemove => {

                copy.forEach(item => {
                    if (item[inventoryItemOwnerKey] === petToRemove) {
                        item[inventoryItemOwnerKey] = null;
                    }
                });
            
            });

            return copy;

        });

        setRoom(prev => {

            let updated = [...prev];

            deletionSelectedPets.forEach(petToRemove => {
                const petRoom = updated.findIndex(room => room === petToRemove);
                updated[petRoom] = null;
            });

            return updated;

        });

        flagCloser(setClearPetsOpenClearPetsFlag);

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

                                {deletionSelectedPets.includes(petName) ? (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => removePet(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                ) : (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => addPet(petName)}> 
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

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Quit" onClick={() => flagCloser(setClearPetsOpenClearPetsFlag)}>Quit <br/> [esc]</button>

                {deletionSelectedPets.length === 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation">Remove Selected Pets <br/> [return]</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation RemoveSelectedPets" onClick={() => clearPets()}>Remove Selected Pets <br/> [return]</button>

                )}

            </div>

        </div>
        
    );
}
  
export default ClearPets;