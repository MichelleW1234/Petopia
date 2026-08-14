import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import { flagCloser, playSound } from "../../../helpers/Helpers.js";
import { activityLastPerformedKey, catSpecies, cleaningKey, dogSpecies, feedingKey, fishSpecies, healthCapList, healthKey, playingKey, portraitPetImages, potionTypeKey, screenButtonPressSoundKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesKey, inventoryItemTypeKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({setInventoryOpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();


    useKeyboardShortcut("i", () => {
    
        flagCloser(setInventoryOpenFlag);

    },
        ".Close"
    );


    
    const selectPet = (selectedIndex, petName) => {

        playSound(screenButtonPressSoundKey);

        if (Inventory[selectedIndex][inventoryItemTypeKey] === potionTypeKey){
        
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

            setInventory(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                copy.splice(selectedIndex, 1);

                return copy;

            });

        } else {

            setInventory(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                copy[selectedIndex][inventoryItemOwnerKey] = petName;

                return copy;

            });

        }

    }

    const deselectPet = (deselectedIndex) => {

        playSound(screenButtonPressSoundKey);
        setInventory(prev => {

            const copy = prev.map(inner =>
                structuredClone(inner)
            );

            copy[deselectedIndex][inventoryItemOwnerKey] = null;

            return copy;

        });

    }


    

    return (

        <div className="UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <h1> Distribute items to your pets:</h1>
                
                {Inventory.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Inventory_ComponentContainer-Structure--Item">

                        <h2>{item[inventoryItemNameKey]}</h2>

                        <div className="Inventory_ComponentContainer-Structure--ItemContent">
                            <img src = {item[inventoryItemImageKey]}/>
                            <div className="Inventory_ComponentContainer-Structure--ItemDetails">
                                <h2>Type: {item[inventoryItemTypeKey]}</h2>
                                <h2> 
                                    For your:                           
                                    {item[inventoryItemSpeciesKey].map((item, index) => (
                                        <div key={index}>&gt; {item}</div>
                                    ))}
                                </h2>
                            </div>

                        </div>

                        <h2>Give to:</h2>

                        <div className="Inventory_ComponentContainer-Structure--ItemPetSelection">

                            {Room.map((petName, indexInner) => (

                                petName === null ? (

                                    null

                                ) : (

                                    item[inventoryItemTypeKey] === potionTypeKey ? (

                                        PetList[petName][healthKey] === 0 ? (

                                            <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonClick" onClick = {() => selectPet(index, petName)}> {petName} </button>

                                        ) : (

                                            <button  key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonNonclick"> {petName} </button>

                                        )

                                    ) : (

                                        item[inventoryItemOwnerKey] === petName ? (

                                            <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonSelected" onClick = {() => deselectPet(index)}> {petName} </button>

                                        ) : item[inventoryItemSpeciesKey].includes(PetList[petName][speciesKey]) && !Inventory.some(curItem => curItem[inventoryItemOwnerKey] === petName && curItem[inventoryItemTypeKey] === item[inventoryItemTypeKey]) ? (

                                            <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonClick" onClick = {() => selectPet(index, petName)}> {petName} </button>

                                        ) : (

                                            <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonNonclick"> {petName} </button>

                                        )

                                    )

                                )

                            ))}

                        </div>
                            

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setInventoryOpenFlag)}> Close <br/> [I]</button>
        </div>
    );
}
  
export default Inventory;