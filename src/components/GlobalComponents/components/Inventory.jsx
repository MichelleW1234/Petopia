import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import inventoryItemLock from "../../../images/inventoryItemLock.png";

import { helpersFlagCloser, helpersPlaySound } from "../../../helpers/Helpers.js";
import { petActivityTimeStampLastPerformedKey, petSpeciesCatKey, petActivityTimeStampCleaningKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petSpeciesHealthCapList, petHealthKey, petActivityTimeStampPlayingKey, petSpeciesImagePortraitList, inventoryItemTypePotionKey, soundScreenButtonPressKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, petSpeciesKey, petStageKey, soundAddedDecorationsKey, soundRevivedPetKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementStatusKey, achievementDescriptionKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({setInventoryOpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {Achievements, setAchievements} = useAchievements();

    useKeyboardShortcut("Enter", () => {
    
        helpersFlagCloser(setInventoryOpenFlag);

    },
        ".Close"
    );


    
    const inventorySelectPet = (inventorySelectPetSelectedIndex, inventorySelectPetPetName) => {

        helpersPlaySound(soundScreenButtonPressKey);

        if (Inventory[inventorySelectPetSelectedIndex][inventoryItemTypeKey] === inventoryItemTypePotionKey){
        
            helpersPlaySound(soundRevivedPetKey);
            setPetList(prev => {

                const inventorySelectPetCopy = structuredClone(prev);

                if (inventorySelectPetCopy[inventorySelectPetPetName][petSpeciesKey] === petSpeciesDogKey){

                    inventorySelectPetCopy[inventorySelectPetPetName][petHealthKey] = petSpeciesHealthCapList[petSpeciesDogKey][0];

                } else if (inventorySelectPetCopy[inventorySelectPetPetName][petSpeciesKey] === petSpeciesCatKey){

                    inventorySelectPetCopy[inventorySelectPetPetName][petHealthKey] = petSpeciesHealthCapList[petSpeciesCatKey][0];

                } else {

                    inventorySelectPetCopy[inventorySelectPetPetName][petHealthKey] = petSpeciesHealthCapList[petSpeciesFishKey][0];

                }

                return inventorySelectPetCopy;

            });

            setPetTimeStamps(prev => {

                const inventorySelectPetCopy = structuredClone(prev);

                if (petActivityTimeStampFeedingKey in inventorySelectPetCopy[inventorySelectPetPetName]){

                    inventorySelectPetCopy[inventorySelectPetPetName][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }
                
                if (petActivityTimeStampCleaningKey in inventorySelectPetCopy[inventorySelectPetPetName]){

                    inventorySelectPetCopy[inventorySelectPetPetName][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                if (petActivityTimeStampPlayingKey in inventorySelectPetCopy[inventorySelectPetPetName]){

                    inventorySelectPetCopy[inventorySelectPetPetName][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                return inventorySelectPetCopy;

            });

            setInventory(prev => {

                const inventorySelectPetCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                inventorySelectPetCopy.splice(inventorySelectPetSelectedIndex, 1);

                return inventorySelectPetCopy;

            });

        } else {

            helpersPlaySound(soundAddedDecorationsKey);
            setInventory(prev => {

                const inventorySelectPetCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                inventorySelectPetCopy[inventorySelectPetSelectedIndex][inventoryItemOwnerKey] = inventorySelectPetPetName;

                return inventorySelectPetCopy;

            });

        }

    }

    const inventoryDeselectPet = (inventoryDeselectPetDeselectedIndex) => {

        helpersPlaySound(soundScreenButtonPressKey);
        setInventory(prev => {

            const inventoryDeselectPetCopy = prev.map(inner =>
                structuredClone(inner)
            );

            inventoryDeselectPetCopy[inventoryDeselectPetDeselectedIndex][inventoryItemOwnerKey] = null;

            return iinventoryDeselectPetCopy;

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

                                        Room.map((inventorySelectPetPetName, indexInner) => (

                                            inventorySelectPetPetName === null ? (

                                                null

                                            ) : (

                                                item[inventoryItemTypeKey] === inventoryItemTypePotionKey ? (

                                                    PetList[inventorySelectPetPetName][petHealthKey] === 0 ? (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => inventorySelectPet(index, inventorySelectPetPetName)}> {inventorySelectPetPetName} </button>

                                                    ) : (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> {inventorySelectPetPetName} </button>

                                                    )

                                                ) : (

                                                    item[inventoryItemOwnerKey] === inventorySelectPetPetName ? (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Selected" onClick = {() => inventoryDeselectPet(index)}> {inventorySelectPetPetName} </button>

                                                    ) : item[inventoryItemSpeciesAcceptedKey].includes(PetList[inventorySelectPetPetName][petSpeciesKey]) && !Inventory.some(curItem => curItem[inventoryItemOwnerKey] === inventorySelectPetPetName && curItem[inventoryItemTypeKey] === item[inventoryItemTypeKey]) ? (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => inventorySelectPet(index, inventorySelectPetPetName)}> {inventorySelectPetPetName} </button>

                                                    ) : (

                                                        <button key = {indexInner} className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> {inventorySelectPetPetName} </button>

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

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpersFlagCloser(setInventoryOpenFlag)}> Close <br/> [return]</button>
        </div>
    );
}
  
export default Inventory;