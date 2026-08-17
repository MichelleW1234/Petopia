import{useState} from "react";

import { GlobalTimerProvider, useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom} from "../../../providers/RoomProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import { flagCloser, playSound } from "../../../helpers/Helpers.js";
import { petActivityTimeStampLastPerformedKey, petSpeciesCatKey, petActivityTimeStampCleaningKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petSpeciesHealthCapList, petHealthKey, petActivityTimeStampPlayingKey, petSpeciesImagePortraitList, inventoryItemTypePotionKey, soundScreenButtonPressKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, petSpeciesKey, petStageKey, soundAddedDecorationsKey, soundRevivedPetKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementStatusKey, achievementDescriptionKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({setInventoryOpenFlag}) {

    const {Room, setRoom} = useRoom();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {Achievements, setAchievements} = useAchievements();

    useKeyboardShortcut("i", () => {
    
        flagCloser(setInventoryOpenFlag);

    },
        ".Close"
    );


    
    const selectPet = (selectedIndex, petName) => {

        playSound(soundScreenButtonPressKey);

        if (Inventory[selectedIndex][inventoryItemTypeKey] === inventoryItemTypePotionKey){
        
            playSound(soundRevivedPetKey);
            setPetList(prev => {

                const copy = structuredClone(prev);

                if (copy[petName][petSpeciesKey] === petSpeciesDogKey){

                    copy[petName][petHealthKey] = petSpeciesHealthCapList[petSpeciesDogKey][0];

                } else if (copy[petName][petSpeciesKey] === petSpeciesCatKey){

                    copy[petName][petHealthKey] = petSpeciesHealthCapList[petSpeciesCatKey][0];

                } else {

                    copy[petName][petHealthKey] = petSpeciesHealthCapList[petSpeciesFishKey][0];

                }

                return copy;

            });

            setPetTimeStamps(prev => {

                const copy = structuredClone(prev);

                if (petActivityTimeStampFeedingKey in copy[petName]){

                    copy[petName][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }
                
                if (petActivityTimeStampCleaningKey in copy[petName]){

                    copy[petName][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

                }

                if (petActivityTimeStampPlayingKey in copy[petName]){

                    copy[petName][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

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

            playSound(soundAddedDecorationsKey);
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

        playSound(soundScreenButtonPressKey);
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
                                    {item[inventoryItemSpeciesAcceptedKey].map((item, index) => (
                                        <div key={index}>&gt; {item}</div>
                                    ))}
                                </h2>
                            </div>

                        </div>


                        {item[inventoryItemTypeKey] === inventoryItemTypeCeilingDecorationKey && Achievements[0][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement: <br/> {Achievements[0][achievementDescriptionKey]} </h2>
                                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpLmpX9JcVtv3p2v_j06qZItOEP7g3t3-CrtXAJfDXA&s=10"/>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeWallDecorationKey && Achievements[1][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement: <br/> {Achievements[1][achievementDescriptionKey]} </h2>
                                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpLmpX9JcVtv3p2v_j06qZItOEP7g3t3-CrtXAJfDXA&s=10"/>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeRoomDecorationKey && Achievements[2][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement: <br/> {Achievements[2][achievementDescriptionKey]} </h2>
                                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpLmpX9JcVtv3p2v_j06qZItOEP7g3t3-CrtXAJfDXA&s=10"/>
                            </>

                        ) : item[inventoryItemTypeKey] === inventoryItemTypeFloorDecorationKey && Achievements[3][achievementStatusKey] === false ? (

                            <>
                                <h2>Achievement: <br/> {Achievements[3][achievementDescriptionKey]} </h2>
                                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpLmpX9JcVtv3p2v_j06qZItOEP7g3t3-CrtXAJfDXA&s=10"/>
                            </>

                        ) : (

                            <>

                                <h2>Give to:</h2>
                                <div className="Inventory_ComponentContainer-Structure--ItemPetSelection">

                                    {Room.map((petName, indexInner) => (

                                        petName === null ? (

                                            null

                                        ) : (

                                            item[inventoryItemTypeKey] === inventoryItemTypePotionKey ? (

                                                PetList[petName][petHealthKey] === 0 ? (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonClick" onClick = {() => selectPet(index, petName)}> {petName} </button>

                                                ) : (

                                                    <button  key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonNonclick"> {petName} </button>

                                                )

                                            ) : (

                                                item[inventoryItemOwnerKey] === petName ? (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonSelected" onClick = {() => deselectPet(index)}> {petName} </button>

                                                ) : item[inventoryItemSpeciesAcceptedKey].includes(PetList[petName][petSpeciesKey]) && !Inventory.some(curItem => curItem[inventoryItemOwnerKey] === petName && curItem[inventoryItemTypeKey] === item[inventoryItemTypeKey]) ? (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonClick" onClick = {() => selectPet(index, petName)}> {petName} </button>

                                                ) : (

                                                    <button key = {indexInner} className="Inventory_ComponentButton-Template--ItemPetSelectionButtonNonclick"> {petName} </button>

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

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setInventoryOpenFlag)}> Close <br/> [I]</button>
        </div>
    );
}
  
export default Inventory;