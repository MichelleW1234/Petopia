import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import inventoryItemLock from "../../../images/inventoryItemLock.png";
import PetUnwantedActivity from "../../../images/NoPetPortrait.png";

import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/helpers.js";
import { petActivityTimeStampLastPerformedKey, petSpeciesCatKey, petActivityTimeStampCleaningKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petSpeciesHealthCapList, petHealthKey, petActivityTimeStampPlayingKey, petSpeciesImagePortraitList, audioRectangleButtonPressKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, petSpeciesKey, petStageKey, audioAddedDecorationsKey, audioRevivePetKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementStatusKey, achievementDescriptionKey, audioCircleButtonPressKey, inventoryItemDescriptionKey } from "../../../constants/Constants.js";


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
        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);

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

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);
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

                {Inventory.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentFrame-Template--Global Inventory_ComponentContainer-Structure--Item">

                        <div className="inventoryContent">

                            <div className="Inventory_ComponentContainer-Structure--ItemDescription">

                                <img className="Inventory_ComponentContainer-Structure--ItemDescriptionImage" src = {item[inventoryItemImageKey]}/>
                                <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContent">
                                    <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                        <h2>Item Name:</h2>
                                        <p>{item[inventoryItemNameKey]}</p>
                                    </div>
                                    <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                        <h2>Item Type:</h2>
                                        <p>{item[inventoryItemTypeKey]}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="Inventory_ComponentContainer-Structure--ItemDescriptionContentField">
                                <h2> 
                                    Item Description:                           
                                </h2>
                                <p>
                                    {item[inventoryItemDescriptionKey]}
                                </p>
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

                                null

                            )}

                        </div>

                        {item[inventoryItemTypeKey] === inventoryItemTypeCeilingDecorationKey && Achievements[0][achievementStatusKey] === true ||
                        item[inventoryItemTypeKey] === inventoryItemTypeWallDecorationKey && Achievements[1][achievementStatusKey] === true ||
                        item[inventoryItemTypeKey] === inventoryItemTypeRoomDecorationKey && Achievements[2][achievementStatusKey] === true ||
                        item[inventoryItemTypeKey] === inventoryItemTypeFloorDecorationKey && Achievements[3][achievementStatusKey] === true ? (

                            Object.values(PetList).some(pet => item[inventoryItemSpeciesAcceptedKey].includes(pet[petSpeciesKey])) ? (

                                <>

                                    <div  className="Inventory_ComponentContainer-Structure--ItemPetOwnerName">
                                        <h2>Item Owner:</h2>
                                    </div>

                                    <div className="Inventory_ComponentContainer-Structure--PossiblePetOwners">

                                        {Room.map((inventory_EntryOwnerSelector_UserSelection, indexInner) => (

                                            inventory_EntryOwnerSelector_UserSelection === "" ? (

                                                null

                                            ) : (

                                                item[inventoryItemOwnerKey] === inventory_EntryOwnerSelector_UserSelection ? (

                                                    <div key = {indexInner} className="Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                                        <button  className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected Inventory_ComponentButton-Structure--PossiblePetOwner" onClick = {() => inventory_EntryOwnerDeselector(index)}> 
                                                            <img src = {petSpeciesImagePortraitList[PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]][PetList[inventory_EntryOwnerSelector_UserSelection][petStageKey]]}/>
                                                        </button>
                                                        <p className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">{inventory_EntryOwnerSelector_UserSelection}</p>
                                                    </div>

                                                ) : item[inventoryItemSpeciesAcceptedKey].includes(PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]) ? (

                                                    <div key = {indexInner} className="Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                                        <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected Inventory_ComponentButton-Structure--PossiblePetOwner" onClick = {() => inventory_EntryOwnerSelector(index, inventory_EntryOwnerSelector_UserSelection)}> 
                                                            <img src = {petSpeciesImagePortraitList[PetList[inventory_EntryOwnerSelector_UserSelection][petSpeciesKey]][PetList[inventory_EntryOwnerSelector_UserSelection][petStageKey]]}/>
                                                        </button>
                                                        <p className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">{inventory_EntryOwnerSelector_UserSelection}</p>
                                                    </div>

                                                ) : (

                                                    null

                                                )

                                            )

                                        ))}

                                    </div>

                                </>

                            ) : (
                                
                                <>
                                
                                    <div  className="Inventory_ComponentContainer-Structure--ItemPetOwnerName">
                                        <h2>Item Owner:</h2>
                                    </div>

                                    <div className="Inventory_ComponentContainer-Structure--PossiblePetOwners">
                                        <div className = "Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                            <div className="Inventory_ComponentImage-Structure--ItemNoPetOwner">
                                                <img src = {PetUnwantedActivity}/>
                                            </div>
                                            <p className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">&lt;Pet Name&gt;</p>
                                        </div>
                                        <div className = "Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                            <div className="Inventory_ComponentImage-Structure--ItemNoPetOwner">
                                                <img src = {PetUnwantedActivity}/>
                                            </div>
                                            <p className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">&lt;Pet Name&gt;</p>
                                        </div>
                                        <div className = "Inventory_ComponentContainer-Structure--PossiblePetOwner">
                                            <div className="Inventory_ComponentImage-Structure--ItemNoPetOwner">
                                                <img src = {PetUnwantedActivity}/>
                                            </div>
                                            <p className="Inventory_ComponentContainer-Structure--PossiblePetOwnerName">&lt;Pet Name&gt;</p>
                                        </div>
                                    </div>

                                </>

                            )

                        ) : (

                            null
            
                        )}

                    </div>

                ))}

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Done" onClick = {() => helpers_Closer_Flags(set_Inventory_OpenFlag)}> 
                    <div>
                        Done <br/> [return]
                    </div>
                </button>

            </div>
            
        </div>
    );
}
  
export default Inventory;