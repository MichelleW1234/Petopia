import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { audioCircleButtonPressKey, audioClearPetsKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey, audioQuitActivityKey, audioConfirmedKey } from "../../../../constants/Constants.js";
import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags, helpers_Quit } from "../../../../helpers/helpers.js";

import "../../../../App.css";


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
        ".ConfirmClear"
    );


    useKeyboardShortcut("Escape", () => {
        
        helpers_Quit(set_ClearPets_OpenFlag);

    },
        ".QuitClear"
    );
    




    const clearPets_EntrySelector = (clearPets_EntrySelector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);
        set_ClearPets_CurrSelectedPets(prev => [...prev, clearPets_EntrySelector_UserSelection]);

    }


    const clearPets_EntryDeselector = (clearPets_EntryDeselector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);
        set_ClearPets_CurrSelectedPets(prev => prev.filter(pet => pet !== clearPets_EntryDeselector_UserSelection));
        
    }


    const clearPets_SelectedEntriesManager = () => {

        helpers_Player_UIIndicatorSounds(audioConfirmedKey);
        helpers_Player_UIIndicatorSounds(audioClearPetsKey);

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
                        item[inventoryItemOwnerKey] = "";
                    }
                });
            
            });

            return clearPets_SelectedEntriesManager_CurrCopy;

        });

        setRoom(prev => {

            let clearPets_SelectedEntriesManager_CurrCopy = [...prev];

            clearPets_CurrSelectedEntries.forEach(petToRemove => {
                const clearPets_SelectedEntriesManager_CurrPetRoom = clearPets_SelectedEntriesManager_CurrCopy.findIndex(room => room === petToRemove);
                clearPets_SelectedEntriesManager_CurrCopy[clearPets_SelectedEntriesManager_CurrPetRoom] = "";
            });

            return clearPets_SelectedEntriesManager_CurrCopy;

        });

        helpers_Closer_Flags(set_ClearPets_OpenFlag);

    }

    

    return (

        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                    {Room.map((petName, index) => (

                        petName === "" ? (

                            null

                        ) : (

                            <div key = {index} className = "UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                                {clearPets_CurrSelectedEntries.includes(petName) ? (

                                    <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => clearPets_EntryDeselector(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                ) : (

                                    <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => clearPets_EntrySelector(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                )}

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                    <h1>{petName}</h1>
                                </div>
                            </div>

                        )

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton QuitClear" onClick={() => helpers_Quit(set_ClearPets_OpenFlag)}>
                    <div>
                        Quit Clear<br/> [esc]
                    </div>
                </button>

                {clearPets_CurrSelectedEntries.length === 0 ? (

                    <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton">
                        <div>
                            Confirm Clear <br/> [return]
                        </div>
                    </button>

                ) : (

                    <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton ConfirmClear" onClick={() => clearPets_SelectedEntriesManager()}>
                        <div>
                            Confirm Clear<br/> [return]
                        </div>
                    </button>

                )}

            </div>

        </div>
        
    );
}
  
export default ClearPets;