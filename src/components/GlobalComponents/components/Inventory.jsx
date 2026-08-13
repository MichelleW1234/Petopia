import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useShopItems } from "../../../providers/ShopItemsProvider.jsx";
import {usePetInventory} from "../../../providers/PetInventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import { flagCloser, playSound } from "../../../helpers/Helpers.js";
import { activityLastPerformedKey, catSpecies, cleaningKey, dogSpecies, feedingKey, fishSpecies, healthCapList, healthKey, petInventoryItemIndexKey, petInventoryItemOwnerKey, playingKey, portraitPetImages, potionTypeKey, screenButtonPressSoundKey, shopItemImageKey, shopItemNameKey, shopItemSpeciesKey, shopItemTypeKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({setInventoryOpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ShopItems, setShopItems} = useShopItems();
    const {PetInventory, setPetInventory} = usePetInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();


    useKeyboardShortcut("i", () => {
    
        flagCloser(setInventoryOpenFlag);

    },
        ".Close"
    );


    
    const selectPet = (selectedItem, petName) => {

        playSound(screenButtonPressSoundKey);

        const index = PetInventory.findIndex(item => item === selectedItem);

        if (ShopItems[selectedItem[petInventoryItemIndexKey]][shopItemTypeKey] === potionTypeKey){
        
            setPetList(prev => {

                const copy = structuredClone(prev);

                if (copy[petName][speciesKey] === dogSpecies){

                    copy[petName][healthKey] = healthCapList[dogSpecies][0];

                } else if (copy[petName][speciesKey] === catSpecies){

                    copy[petName][healthKey] = healthCapList[catSpecies][0];

                } else {

                    copy[petName][healthKey] = healthCapList[fishSpecies][0];

                }

                return copy;

            });


            setPetTimeStamps(prev => {

                const copy = structuredClone(prev);

                if (feedingKey in copy[petName]){

                    copy[petName][feedingKey][activityLastPerformedKey] = GlobalTimer;

                }
                
                if (cleaningKey in copy[petName]){

                    copy[petName][cleaningKey][activityLastPerformedKey] = GlobalTimer;

                }

                if (playingKey in copy[petName]){

                    copy[petName][playingKey][activityLastPerformedKey] = GlobalTimer;

                }

                return copy;

            });

            setPetInventory(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                copy.splice(index, 1);

                return copy;

            });

        } else {

            setPetInventory(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                if (ShopItems[selectedItem[petInventoryItemIndexKey]][shopItemTypeKey] === potionTypeKey){

                    copy.splice(index, 1);

                } else {

                    copy[index][petInventoryItemOwnerKey] = petName;

                }

                return copy;

            });

        }

    }

    const deselectPet = (deselectedIndex) => {

        playSound(screenButtonPressSoundKey);
        setPetInventory(prev => {

            const copy = prev.map(inner =>
                structuredClone(inner)
            );

            copy[deselectedIndex][petInventoryItemOwnerKey] = null;

            return copy;

        });

    }


    

    return (

        <div className="UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                {PetInventory.length === 0 ? (

                    <h1> Buy items from the shop to add to your inventory. </h1>

                ) : (

                    <h1> Distribute items to your pets:</h1>

                )}
                
                {PetInventory.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Inventory_ComponentContainer-Structure--Item">

                        <div className="Inventory_ComponentContainer-Structure--ItemDescription">
                            <h2>{ShopItems[item[petInventoryItemIndexKey]][shopItemNameKey]}</h2>
                            <img src = {ShopItems[item[petInventoryItemIndexKey]][shopItemImageKey]}/>
                        </div>

                        <div className="Inventory_ComponentContainer-Structure--ItemDescription">
                            <h2>Give to:</h2>

                            <div className="Inventory_ComponentContainer-Structure--ItemPetButtons">

                                {Room.map((petName, indexInner) => (

                                    petName === null ? (

                                        null

                                    ) : (

                                        ShopItems[item[petInventoryItemIndexKey]][shopItemTypeKey] === potionTypeKey ? (

                                            PetList[petName][healthKey] === 0 ? (

                                                item[petInventoryItemOwnerKey] === petName ? (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetButtonSelected" onClick = {() => deselectPet(indexInner)}> {petName} </button>

                                                ) : (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetButtonClick" onClick = {() => selectPet(item, petName)}> {petName} </button>

                                                )

                                            ) : (

                                                <button  key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetButtonNonclick"> {petName} </button>

                                            )

                                        ) : (

                                            ShopItems[item[petInventoryItemIndexKey]][shopItemSpeciesKey].includes(PetList[petName][speciesKey]) ? (

                                                item[petInventoryItemOwnerKey] === petName ? (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetButtonSelected" onClick = {() => deselectPet(indexInner)}> {petName} </button>

                                                ) : (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetButtonClick" onClick = {() => selectPet(item, petName)}> {petName} </button>

                                                )

                                            ) : (

                                                <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetButtonNonclick"> {petName} </button>

                                            )

                                        )

                                    )

                                ))}

                            </div>
                            
                        </div>

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setInventoryOpenFlag)}> Close <br/> [I]</button>
        </div>
    );
}
  
export default Inventory;