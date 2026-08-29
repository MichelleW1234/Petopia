import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { audioSelectionButtonPressKey, audioClearPetsKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey } from "../../../../constants/Constants.js";
import { helpers_AudioPlayer, helpers_FlagCloser } from "../../../../helpers/Helpers.js";




function ClearPets({set_ClearPets_OpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Inventory, setInventory} = useInventory();

    const [clearPets_CurrSelectedEntries, set_ClearPets_CurrSelectedPets] = useState([]);



    useKeyboardShortcut("Enter", () => {
        
        if (clearPets_CurrSelectedEntries.length > 0){

            clearPets_SelectedEntriesManager();

        }

    },
        ".RemoveSelectedPets"
    );


    useKeyboardShortcut("Escape", () => {
        
        helpers_FlagCloser(set_ClearPets_OpenFlag);

    },
        ".Quit"
    );
    




    const clearPets_EntrySelector = (clearPets_EntrySelector_UserSelection) => {

        helpers_AudioPlayer(audioSelectionButtonPressKey);
        set_ClearPets_CurrSelectedPets(prev => [...prev, clearPets_EntrySelector_UserSelection]);

    }


    const clearPets_EntryDeselector = (clearPets_EntryDeselector_UserSelection) => {

        helpers_AudioPlayer(audioSelectionButtonPressKey);
        set_ClearPets_CurrSelectedPets(prev => prev.filter(pet => pet !== clearPets_EntryDeselector_UserSelection));
        
    }


    const clearPets_SelectedEntriesManager = () => {

        helpers_AudioPlayer(audioClearPetsKey);

        setPetTimeStamps(prev => {

            let clearPets_SelectedEntriesManager_CurrCopy = { ...prev };

            clearPets_CurrSelectedEntries.forEach(petToRemove => {
                const { [petToRemove]: _, ...clearPets_SelectedEntriesManager_CurrRemainder } = clearPets_SelectedEntriesManager_CurrCopy;
                clearPets_SelectedEntriesManager_CurrCopy = clearPets_SelectedEntriesManager_CurrRemainder;
            });

            return clearPets_SelectedEntriesManager_CurrCopy;

        });

        setPetList(prev => {

            let clearPets_SelectedEntriesManager_CurrCopy = { ...prev };

            clearPets_CurrSelectedEntries.forEach(petToRemove => {
                const { [petToRemove]: _, ...clearPets_SelectedEntriesManager_CurrRemainder } = clearPets_SelectedEntriesManager_CurrCopy;
                clearPets_SelectedEntriesManager_CurrCopy = clearPets_SelectedEntriesManager_CurrRemainder;
            });

            return clearPets_SelectedEntriesManager_CurrCopy;

        });

        setInventory(prev => {

            const clearPets_SelectedEntriesManager_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            clearPets_CurrSelectedEntries.forEach(petToRemove => {

                clearPets_SelectedEntriesManager_CurrCopy.forEach(item => {
                    if (item[inventoryItemOwnerKey] === petToRemove) {
                        item[inventoryItemOwnerKey] = null;
                    }
                });
            
            });

            return clearPets_SelectedEntriesManager_CurrCopy;

        });

        setRoom(prev => {

            let clearPets_SelectedEntriesManager_CurrCopy = [...prev];

            clearPets_CurrSelectedEntries.forEach(petToRemove => {
                const clearPets_SelectedEntriesManager_CurrPetRoom = clearPets_SelectedEntriesManager_CurrCopy.findIndex(room => room === petToRemove);
                clearPets_SelectedEntriesManager_CurrCopy[clearPets_SelectedEntriesManager_CurrPetRoom] = null;
            });

            return clearPets_SelectedEntriesManager_CurrCopy;

        });

        helpers_FlagCloser(set_ClearPets_OpenFlag);

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

                                {clearPets_CurrSelectedEntries.includes(petName) ? (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => clearPets_EntryDeselector(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                ) : (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => clearPets_EntrySelector(petName)}> 
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

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Quit" onClick={() => helpers_FlagCloser(set_ClearPets_OpenFlag)}>Quit <br/> [esc]</button>

                {clearPets_CurrSelectedEntries.length === 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation">Remove Selected Pets <br/> [return]</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation RemoveSelectedPets" onClick={() => clearPets_SelectedEntriesManager()}>Remove Selected Pets <br/> [return]</button>

                )}

            </div>

        </div>
        
    );
}
  
export default ClearPets;