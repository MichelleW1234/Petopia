import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import inventoryItemLock from "../../../images/inventoryItemLock.png";

import { helpers_FlagCloser, helpers_PlaySound } from "../../../helpers/Helpers.js";
import { petActivityTimeStampLastPerformedKey, petSpeciesCatKey, petActivityTimeStampCleaningKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petSpeciesHealthCapList, petHealthKey, petActivityTimeStampPlayingKey, petSpeciesImagePortraitList, inventoryItemTypePotionKey, soundScreenButtonPressKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, petSpeciesKey, petStageKey, soundAddedDecorationsKey, soundRevivedPetKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementStatusKey, achievementDescriptionKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({set_Inventory_OpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {Achievements, setAchievements} = useAchievements();

    useKeyboardShortcut("Enter", () => {
    
        helpers_FlagCloser(set_Inventory_OpenFlag);

    },
        ".Close"
    );


    
    const inventory_SelectPet = (inventory_SelectPet_SelectedIndex, inventory_SelectPet_PetName) => {

        helpers_PlaySound(soundScreenButtonPressKey);

        if (Inventory[inventory_SelectPet_SelectedIndex][inventoryItemTypeKey] === inventoryItemTypePotionKey){
        
            helpers_PlaySound(soundRevivedPetKey);
            setPetList(prev => {

                const inventory_SelectPet_Copy = structuredClone(prev);

                if (inventory_SelectPet_Copy[inventory_SelectPet_PetName][petSpeciesKey] === petSpeciesDogKey){

                    inventory_SelectPet_Copy[inventory_SelectPet_PetName][petHealthKey] = petSpeciesHealthCapList[petSpeciesDogKey][0];

                } else if (inventory_SelectPet_Copy[inventory_SelectPet_PetName][petSpeciesKey] === petSpeciesCatKey){

                    inventory_SelectPet_Copy[inventory_SelectPet_PetName][petHealthKey] = petSpeciesHealthCapList[petSpeciesCatKey][0];

                } else {

                    inventory_SelectPet_Copy[inventory_SelectPet_PetName][petHealthKey] = petSpeciesHealthCapList[petSpeciesFishKey][0];

                }

                return inventory_SelectPet_Copy;

            });

            setPetTimeStamps(prev => {

                const inventory_SelectPet_Copy = structuredClone(prev);

                if (petActivityTimeStampFeedingKey in inventory_SelectPet_Copy[inventory_SelectPet_PetName]){

                    inventory_SelectPet_Copy[inventory_SelectPet_PetName][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }
                
                if (petActivityTimeStampCleaningKey in inventory_SelectPet_Copy[inventory_SelectPet_PetName]){

                    inventory_SelectPet_Copy[inventory_SelectPet_PetName][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                if (petActivityTimeStampPlayingKey in inventory_SelectPet_Copy[inventory_SelectPet_PetName]){

                    inventory_SelectPet_Copy[inventory_SelectPet_PetName][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                return inventory_SelectPet_Copy;

            });

            setInventory(prev => {

                const inventory_SelectPet_Copy = prev.map(inner =>
                    structuredClone(inner)
                );

                inventory_SelectPet_Copy.splice(inventory_SelectPet_SelectedIndex, 1);

                return inventory_SelectPet_Copy;

            });

        } else {

            helpers_PlaySound(soundAddedDecorationsKey);
            setInventory(prev => {

                const inventory_SelectPet_Copy = prev.map(inner =>
                    structuredClone(inner)
                );

                inventory_SelectPet_Copy[inventory_SelectPet_SelectedIndex][inventoryItemOwnerKey] = inventory_SelectPet_PetName;

                return inventory_SelectPet_Copy;

            });

        }

    }

    const inventory_DeselectPet = (inventory_DeselectPet_DeselectedIndex) => {

        helpers_PlaySound(soundScreenButtonPressKey);
        setInventory(prev => {

            const inventory_DeselectPet_Copy = prev.map(inner =>
                structuredClone(inner)
            );

            inventory_DeselectPet_Copy[inventory_DeselectPet_DeselectedIndex][inventoryItemOwnerKey] = null;

            return iinventory_DeselectPet_Copy;

        });

    }


    

    return (

        <div className="UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Distribute items to your pets:</h1>
                
                {Inventory.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Inventory_ComponentContainer-Structure--Item">

                        <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                            <h2>{item[inventoryItemNameKey]}</h2>
                        </div>

                        <div className="Inventory_ComponentContainer-Structure--ItemContent">
                            <img src = {item[inventoryItemImageKey]}/>
                            <div className="Inventory_ComponentContainer-Structure--ItemDetails">
                                <h2>Type: {item[inventoryItemTypeKey]}</h2>
                                <h2> 
                                    For your:                           
                                    {item[inventoryItemSpeciesAcceptedKey].map((item, index) => (
                                        <div key={index}>&gt; {item}</div>
                                    ))}
                                </h2>
                            </div>

                        </div>


                        {item[inventoryItemTypeKey] === inventoryItemTypeCeilingDecorationKey && Achievements[0][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[0][achievementDescriptionKey]} </h2>
                                <img className="Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeWallDecorationKey && Achievements[1][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[1][achievementDescriptionKey]} </h2>
                                <img className="Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeRoomDecorationKey && Achievements[2][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[2][achievementDescriptionKey]} </h2>
                                <img className="Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeFloorDecorationKey && Achievements[3][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[3][achievementDescriptionKey]} </h2>
                                <img className="Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                            </>

                        ) : (

                            <>

                                <h2>Give This Item to:</h2>
                                <div className="Inventory_ComponentContainer-Structure--ItemPetSelection">

                                    {Room.length === 0 ? (

                                        <h2> Your pets will appear here </h2>

                                    ) : (

                                        Room.map((inventory_SelectPet_PetName, indexInner) => (

                                            inventory_SelectPet_PetName === null ? (

                                                null

                                            ) : (

                                                item[inventoryItemTypeKey] === inventoryItemTypePotionKey ? (

                                                    PetList[inventory_SelectPet_PetName][petHealthKey] === 0 ? (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => inventory_SelectPet(index, inventory_SelectPet_PetName)}> {inventory_SelectPet_PetName} </button>

                                                    ) : (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> {inventory_SelectPet_PetName} </button>

                                                    )

                                                ) : (

                                                    item[inventoryItemOwnerKey] === inventory_SelectPet_PetName ? (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Selected" onClick = {() => inventory_DeselectPet(index)}> {inventory_SelectPet_PetName} </button>

                                                    ) : item[inventoryItemSpeciesAcceptedKey].includes(PetList[inventory_SelectPet_PetName][petSpeciesKey]) && !Inventory.some(curItem => curItem[inventoryItemOwnerKey] === inventory_SelectPet_PetName && curItem[inventoryItemTypeKey] === item[inventoryItemTypeKey]) ? (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => inventory_SelectPet(index, inventory_SelectPet_PetName)}> {inventory_SelectPet_PetName} </button>

                                                    ) : (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> {inventory_SelectPet_PetName} </button>

                                                    )

                                                )

                                            )

                                        ))

                                    )}

                                </div>

                            </>

                        )}  

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_FlagCloser(set_Inventory_OpenFlag)}> Close <br/> [return]</button>
        </div>
    );
}
  
export default Inventory;