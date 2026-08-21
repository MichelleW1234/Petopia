import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import {useInventory} from "../../../../providers/InventoryProvider.jsx";
import { useAchievements } from "../../../../providers/AchievementsProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import Reviver from "../../../../images/Inventory/Reviver.png";
import PaintingOne from "../../../../images/Inventory/PaintingOne.png";
import PaintingTwo from "../../../../images/Inventory/PaintingTwo.png";
import PaintingThree from "../../../../images/Inventory/PaintingThree.png";
import RugOne from "../../../../images/Inventory/RugOne.png";
import RugTwo from "../../../../images/Inventory/RugTwo.png";
import RugThree from "../../../../images/Inventory/RugThree.png";
import Shell from "../../../../images/Inventory/Shell.png";
import Pearl from "../../../../images/Inventory/Pearl.png";
import Starfish from "../../../../images/Inventory/Starfish.png";
import Statue from "../../../../images/Inventory/Statue.png";
import Castle from "../../../../images/Inventory/Castle.png";
import Kelp from "../../../../images/Inventory/Kelp.png";
import CoatStand from "../../../../images/Inventory/CoatStand.png";
import Tree from "../../../../images/Inventory/Tree.png";
import Lamp from "../../../../images/Inventory/Lamp.png";
import ChandelierOne from "../../../../images/Inventory/ChandelierOne.png";
import ChandelierTwo from "../../../../images/Inventory/ChandelierTwo.png";
import ChandelierThree from "../../../../images/Inventory/ChandelierThree.png";

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
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: ChandelierOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: ChandelierTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: ChandelierThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: PaintingOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: PaintingTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: PaintingThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Castle", [inventoryItemImageKey]: Castle, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Kelp", [inventoryItemImageKey]: Kelp, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Coat Stand", [inventoryItemImageKey]: CoatStand, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Tree", [inventoryItemImageKey]: Tree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Lamp", [inventoryItemImageKey]: Lamp, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Shell", [inventoryItemImageKey]: Shell, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Pearl", [inventoryItemImageKey]: Pearl, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Starfish", [inventoryItemImageKey]: Starfish, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: RugOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: RugTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: RugThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null}
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