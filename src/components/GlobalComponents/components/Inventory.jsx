import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import inventoryItemLock from "../../../images/inventoryItemLock.png";

import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers.js";
import { petActivityTimeStampLastPerformedKey, petSpeciesCatKey, petActivityTimeStampCleaningKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petSpeciesHealthCapList, petHealthKey, petActivityTimeStampPlayingKey, petSpeciesImagePortraitList, inventoryItemTypePotionKey, audioScreenButtonPressKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, petSpeciesKey, petStageKey, audioAddedDecorationsKey, audioRevivedPetKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementStatusKey, achievementDescriptionKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({set_Inventory_OpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {Achievements, setAchievements} = useAchievements();

    useKeyboardShortcut("Enter", () => {
    
        helpers_Closer_Flags(set_Inventory_OpenFlag);

    },
        ".Close"
    );


    
    const inventory_EntryOwnerSelector = (inventory_EntryOwnerSelector_EntryIndex, inventory_EntryOwnerSelector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        if (Inventory[inventory_EntryOwnerSelector_EntryIndex][inventoryItemTypeKey] === inventoryItemTypePotionKey){
        
            helpers_Player_UIIndicatorSounds(audioRevivedPetKey);
            setPetList(prev => {

                const inventory_EntryOwnerSelector_CurrCopy = structuredClone(prev);

                if (inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey] === petSpeciesDogKey){

                    inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petHealthKey] = petSpeciesHealthCapList[petSpeciesDogKey][0];

                } else if (inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey] === petSpeciesCatKey){

                    inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petHealthKey] = petSpeciesHealthCapList[petSpeciesCatKey][0];

                } else {

                    inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petHealthKey] = petSpeciesHealthCapList[petSpeciesFishKey][0];

                }

                return inventory_EntryOwnerSelector_CurrCopy;

            });

            setPetTimeStamps(prev => {

                const inventory_EntryOwnerSelector_CurrCopy = structuredClone(prev);

                if (petActivityTimeStampFeedingKey in inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection]){

                    inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }
                
                if (petActivityTimeStampCleaningKey in inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection]){

                    inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                if (petActivityTimeStampPlayingKey in inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection]){

                    inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_UserSelection][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                return inventory_EntryOwnerSelector_CurrCopy;

            });

            setInventory(prev => {

                const inventory_EntryOwnerSelector_CurrCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                inventory_EntryOwnerSelector_CurrCopy.splice(inventory_EntryOwnerSelector_EntryIndex, 1);

                return inventory_EntryOwnerSelector_CurrCopy;

            });

        } else {

            helpers_Player_UIIndicatorSounds(audioAddedDecorationsKey);
            setInventory(prev => {

                const inventory_EntryOwnerSelector_CurrCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_EntryIndex][inventoryItemOwnerKey] = inventory_EntryOwnerSelector_UserSelection;

                return inventory_EntryOwnerSelector_CurrCopy;

            });

        }

    }

    const inventory_EntryOwnerDeselector = (inventory_EntryOwnerDeselector_EntryIndex) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);
        setInventory(prev => {

            const inventory_EntryOwnerDeselector_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            inventory_EntryOwnerDeselector_CurrCopy[inventory_EntryOwnerDeselector_EntryIndex][inventoryItemOwnerKey] = "";

            return inventory_EntryOwnerDeselector_CurrCopy;

        });

    }


    

    return (

        <div className="UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Distribute items to your pets:</h1>
                
                {Inventory.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Inventory_ComponentContainer-Structure--Item">

                        <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                            <h1>{item[inventoryItemNameKey]}:</h1>
                        </div>

                        <div className="Inventory_ComponentContainer-Structure--ItemContent">

                            <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut Inventory_ComponentContainer-Structure--ItemContentImage">
                                <img src = {item[inventoryItemImageKey]}/>
                            </div>
                            <div className="Inventory_ComponentContainer-Structure--ItemContentDetails">
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

                                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut Inventory_ComponentImage-Structure--ItemLock">
                                    <img src = {inventoryItemLock}/>
                                </div>
                            
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeWallDecorationKey && Achievements[1][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[1][achievementDescriptionKey]} </h2>

                                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut Inventory_ComponentImage-Structure--ItemLock">
                                    <img src = {inventoryItemLock}/>
                                </div>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeRoomDecorationKey && Achievements[2][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[2][achievementDescriptionKey]} </h2>

                                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut Inventory_ComponentImage-Structure--ItemLock">
                                    <img src = {inventoryItemLock}/>
                                </div>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeFloorDecorationKey && Achievements[3][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement to Unlock: <br/> {Achievements[3][achievementDescriptionKey]} </h2>

                                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut Inventory_ComponentImage-Structure--ItemLock">
                                    <img src = {inventoryItemLock}/>
                                </div>
                            </>

                        ) : (

                            <>

                                <h2>This Item Currently Belongs to:</h2>
                                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                                    {Room.map((inventory_EntryOwnerSelector_UserSelection, indexInner) => (

                                        inventory_EntryOwnerSelector_UserSelection === "" ? (

                                            <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> [ Name ] </button>

                                        ) : (

                                            item[inventoryItemTypeKey] === inventoryItemTypePotionKey ? (

                                                PetList[inventory_EntryOwnerSelector_UserSelection][petHealthKey] === 0 ? (

                                                    <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => inventory_EntryOwnerSelector(index, inventory_EntryOwnerSelector_UserSelection)}> {inventory_EntryOwnerSelector_UserSelection} </button>

                                                ) : (

                                                    <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> {inventory_EntryOwnerSelector_UserSelection} </button>

                                                )

                                            ) : (

                                                item[inventoryItemOwnerKey] === inventory_EntryOwnerSelector_UserSelection ? (

                                                    <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Selected" onClick = {() => inventory_EntryOwnerDeselector(index)}> {inventory_EntryOwnerSelector_UserSelection} </button>

                                                ) : item[inventoryItemSpeciesAcceptedKey].includes(PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]) && !Inventory.some(curItem => curItem[inventoryItemOwnerKey] === inventory_EntryOwnerSelector_UserSelection && curItem[inventoryItemTypeKey] === item[inventoryItemTypeKey]) ? (

                                                    <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => inventory_EntryOwnerSelector(index, inventory_EntryOwnerSelector_UserSelection)}> {inventory_EntryOwnerSelector_UserSelection} </button>

                                                ) : (

                                                    <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> {inventory_EntryOwnerSelector_UserSelection} </button>

                                                )

                                            )

                                        )

                                    ))}

                                </div>

                            </>

                        )}  

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_Closer_Flags(set_Inventory_OpenFlag)}> Close <br/> [return]</button>
        </div>
    );
}
  
export default Inventory;