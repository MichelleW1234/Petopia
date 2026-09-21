import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import inventoryItemLock from "../../../images/inventoryItemLock.png";
import PetUnwantedActivity from "../../../images/PetUnwantedActivity.png";

import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/helpers.js";
import { petActivityTimeStampLastPerformedKey, petSpeciesCatKey, petActivityTimeStampCleaningKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petSpeciesHealthCapList, petHealthKey, petActivityTimeStampPlayingKey, petSpeciesImagePortraitList, audioScreenButtonPressKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, petSpeciesKey, petStageKey, audioAddedDecorationsKey, audioRevivePetKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementStatusKey, achievementDescriptionKey } from "../../../constants/Constants.js";


import "../../../App.css";
import "./Inventory.css";


function Inventory({set_Inventory_OpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {Achievements, setAchievements} = useAchievements();

    useKeyboardShortcut("Enter", (e) => {
        
        helpers_Closer_Flags(set_Inventory_OpenFlag);

    },
        ".Done"
    );


    
    const inventory_EntryOwnerSelector = (inventory_EntryOwnerSelector_EntryIndex, inventory_EntryOwnerSelector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioAddedDecorationsKey);
        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        setInventory(prev => {

            const inventory_EntryOwnerSelector_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            const oldItem = inventory_EntryOwnerSelector_CurrCopy.find(curItem => curItem[inventoryItemOwnerKey] === inventory_EntryOwnerSelector_UserSelection && curItem[inventoryItemTypeKey] === inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_EntryIndex][inventoryItemTypeKey]);

            if (oldItem !== undefined) {

                oldItem[inventoryItemOwnerKey] = "";

            }

            inventory_EntryOwnerSelector_CurrCopy[inventory_EntryOwnerSelector_EntryIndex][inventoryItemOwnerKey] = inventory_EntryOwnerSelector_UserSelection;

            return inventory_EntryOwnerSelector_CurrCopy;

        });

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

        <div className="UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Select a Pet for Each Item:</h1>
                
                {Inventory.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentFrame-Template--Global Inventory_ComponentContainer-Structure--Item">

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">{item[inventoryItemNameKey]}:</h1>

                        <div className="Inventory_ComponentContainer-Structure--ItemDescription">

                            <div className="Inventory_ComponentContainer-Structure--ItemDescriptionImage">
                                <img src = {item[inventoryItemImageKey]}/>
                            </div>
                            <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContent">
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                    <h2>Type:</h2>
                                    <p>{item[inventoryItemTypeKey]}</p>
                                </div>
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                    <h2> 
                                        For your:                           
                                    </h2>
                                    <p>
                                        {item[inventoryItemSpeciesAcceptedKey].map((item, index) => (
                                            <span key={index} style={{ display: "block" }}>
                                                &gt; {item}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>

                        </div>


                        {item[inventoryItemTypeKey] === inventoryItemTypeCeilingDecorationKey && Achievements[0][achievementStatusKey] === false ? (

                            <>
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                    <h2>Achievement to Unlock:</h2>
                                    <p>{Achievements[0][achievementDescriptionKey]}</p>
                                </div>

                                <div className="Inventory_ComponentImage-Structure--ItemLockContainer">
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                </div>
                            
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeWallDecorationKey && Achievements[1][achievementStatusKey] === false ? (

                            <>
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                    <h2>Achievement to Unlock:</h2>
                                    <p>{Achievements[1][achievementDescriptionKey]}</p>
                                </div>


                                <div className="Inventory_ComponentImage-Structure--ItemLockContainer">
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                </div>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeRoomDecorationKey && Achievements[2][achievementStatusKey] === false ? (

                            <>
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                    <h2>Achievement to Unlock:</h2>
                                    <p>{Achievements[2][achievementDescriptionKey]}</p>
                                </div>

                                <div className="Inventory_ComponentImage-Structure--ItemLockContainer">
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                </div>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeFloorDecorationKey && Achievements[3][achievementStatusKey] === false ? (

                            <>
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                    <h2>Achievement to Unlock:</h2>
                                    <p>{Achievements[3][achievementDescriptionKey]}</p>
                                </div>

                                <div className="Inventory_ComponentImage-Structure--ItemLockContainer">
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                    <img className = "Inventory_ComponentImage-Structure--ItemLock" src = {inventoryItemLock}/>
                                </div>
                            </>

                        ) : (

                            <>

                                <h2>This Item Currently Belongs to:</h2>

                                {Object.values(PetList).some(pet => item[inventoryItemSpeciesAcceptedKey].includes(pet[petSpeciesKey])) ? (
                                 
                                    <div className="Inventory_ComponentContainer-Structure--PossiblePetOwners">

                                        {Room.map((inventory_EntryOwnerSelector_UserSelection, indexInner) => (

                                            inventory_EntryOwnerSelector_UserSelection === "" ? (

                                                null

                                            ) : (

                                                item[inventoryItemOwnerKey] === inventory_EntryOwnerSelector_UserSelection ? (

                                                    <div className="Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                                        <button key = {indexInner} className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--GlobalSelected Inventory_ComponentButton-Structure--PossiblePetOwner" onClick = {() => inventory_EntryOwnerDeselector(index)}> 
                                                            <img src = {petSpeciesImagePortraitList[PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]][PetList[inventory_EntryOwnerSelector_UserSelection][petStageKey]]}/>
                                                        </button>
                                                        <h2 className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">{inventory_EntryOwnerSelector_UserSelection}</h2>
                                                    </div>

                                                ) : item[inventoryItemSpeciesAcceptedKey].includes(PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]) ? (

                                                    <div className="Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                                        <button key = {indexInner} className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Global Inventory_ComponentButton-Structure--PossiblePetOwner" onClick = {() => inventory_EntryOwnerSelector(index, inventory_EntryOwnerSelector_UserSelection)}> 
                                                            <img src = {petSpeciesImagePortraitList[PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]][PetList[inventory_EntryOwnerSelector_UserSelection][petStageKey]]}/>
                                                        </button>
                                                        <h2 className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">{inventory_EntryOwnerSelector_UserSelection}</h2>
                                                    </div>

                                                ) : (

                                                    null

                                                )

                                            )

                                        ))}

                                    </div>

                                ) : (

                                    <div className="Inventory_ComponentContainer-Structure--ItemNoPetOwners">
                                        <img className = "Inventory_ComponentImage-Structure--ItemNoPetOwners" src = {PetUnwantedActivity}/>
                                        <img className = "Inventory_ComponentImage-Structure--ItemNoPetOwners" src = {PetUnwantedActivity}/>
                                        <img className = "Inventory_ComponentImage-Structure--ItemNoPetOwners" src = {PetUnwantedActivity}/>
                                    </div>
                    
                                )}

                            </>

                        )}  

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Template--GlobalClick Done" onClick = {() => helpers_Closer_Flags(set_Inventory_OpenFlag)}> Done <br/> [return]</button>
        </div>
    );
}
  
export default Inventory;