import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import {useInventory} from "../../../../providers/InventoryProvider.jsx";
import { useAchievements } from "../../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import Reviver from "../../../../images/Inventory/Reviver.png";
import Painting from "../../../../images/Inventory/Painting.png";
import Chandelier from "../../../../images/Inventory/Chandelier.png";
import Statue from "../../../../images/Inventory/Statue.png";
import Rug from "../../../../images/Inventory/Rug.png";

import { playSound, flagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, petSpeciesFishKey, inventoryItemTypeFloorDecorationKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, soundNavButtonPressKey, inventoryItemTypePotionKey, soundRestartGameKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey, achievementDescriptionKey, achievementStatusKey } from "../../../../constants/Constants.js";



function Restart({setRestartOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {Room, setRoom} = useRoom();
    const {Achievements, setAchievements} = useAchievements();

    
    useKeyboardShortcut("Enter", () => {
    
        restartGame();

    },
        ".Yes"
    );
    
        
    useKeyboardShortcut("Escape", () => {
    
        flagCloser(setRestartOpenFlag);

    },
        ".No"
    );
    


    const restartGame = () => {

        playSound(soundRestartGameKey);
        setPetList({});
        setPetTimeStamps({});
        setRoom([null, null, null]);
        setInventory([
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: Chandelier, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: Chandelier, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: Chandelier, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: Painting, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: Painting, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: Painting, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Cave", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Kelp", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Coat Stand", [inventoryItemImageKey]: "https://static.vecteezy.com/system/resources/previews/057/969/459/non_2x/pixel-art-coat-rack-with-colorful-jackets-in-retro-style-vector.jpg", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Tree", [inventoryItemImageKey]: "https://static.vecteezy.com/system/resources/previews/057/969/459/non_2x/pixel-art-coat-rack-with-colorful-jackets-in-retro-style-vector.jpg", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Lamp", [inventoryItemImageKey]: "https://static.vecteezy.com/system/resources/previews/057/969/459/non_2x/pixel-art-coat-rack-with-colorful-jackets-in-retro-style-vector.jpg", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Shell", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwYvAOv9ckdIRbbyPg2lxI6vpIHUNWnoBYS72vcqTWx9mfUsHlT4kew8V&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Coral Reef", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwYvAOv9ckdIRbbyPg2lxI6vpIHUNWnoBYS72vcqTWx9mfUsHlT4kew8V&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Starfish", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwYvAOv9ckdIRbbyPg2lxI6vpIHUNWnoBYS72vcqTWx9mfUsHlT4kew8V&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: Rug, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: Rug, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: Rug, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null}
                    ]);
        setAchievements([
                            {[achievementDescriptionKey]: "Evolve a fish to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve a cat to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve a dog to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve all three pet species to their final stages", [achievementStatusKey]: false}
                        ]);


        flagCloser(setRestartOpenFlag);

    }


    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1>Are you sure you want to restart the game? </h1>
            </div>
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Yes" onClick = {() => restartGame()}>Yes <br/> [return]</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation No" onClick = {() => flagCloser(setRestartOpenFlag)}>No <br/> [esc]</button>
            </div>
        </div>
    );
}
  
export default Restart;