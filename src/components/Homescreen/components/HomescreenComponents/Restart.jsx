import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds } from "../../../../helpers/Helpers.js";
import { usePetList } from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";
import { useAchievements } from "../../../../providers/AchievementsProvider.jsx";
import { useNotifications } from "../../../../providers/NotificationsProvider.jsx";

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

import { audioRestartGameKey, inventoryItemNameKey, inventoryItemImageKey, inventoryItemSpeciesAcceptedKey, inventoryItemOwnerKey, inventoryItemTypeKey, inventoryItemTypeRoomDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypePotionKey, inventoryItemTypeFloorDecorationKey, petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey, achievementDescriptionKey, achievementStatusKey} from "../../../../constants/Constants.js";



function Restart({set_Restart_OpenFlag, restart_MinPetsAdopted, restart_InventoryMissingItems, restart_InventoryContainsOwners, restart_AchievementsUnlocked, restart_NotificationsUncleared}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Inventory, setInventory} = useInventory();
    const {Achievements, setAchievements} = useAchievements();
    const {Notifications, setNotifications} = useNotifications();


    useKeyboardShortcut("escape", () => {

        helpers_Closer_Flags(set_Restart_OpenFlag);

    },
        ".No"
    );

    useKeyboardShortcut("Enter", () => {

        restart_GameRestarter();

    },
        ".Yes"
    );



    const restart_GameRestarter = () => {

        helpers_Player_UIIndicatorSounds(audioRestartGameKey);

        if (restart_MinPetsAdopted){

            setPetList({});
            setPetTimeStamps({});
            setRoom(["", "", ""]);

        }

        if (restart_InventoryMissingItems || restart_InventoryContainsOwners){

            setInventory([
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: ChandelierOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: ChandelierTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: ChandelierThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: PaintingOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: PaintingTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: PaintingThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]:  "Castle", [inventoryItemImageKey]: Castle, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]:  "Kelp", [inventoryItemImageKey]: Kelp, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Coat Stand", [inventoryItemImageKey]: CoatStand, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Tree", [inventoryItemImageKey]: Tree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Lamp", [inventoryItemImageKey]: Lamp, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Shell", [inventoryItemImageKey]: Shell, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Pearl", [inventoryItemImageKey]: Pearl, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Starfish", [inventoryItemImageKey]: Starfish, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: RugOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: RugTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: RugThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""}
                    ]);

        }

        if (restart_AchievementsUnlocked){

            setAchievements([
                            {[achievementDescriptionKey]: "Evolve a fish to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve a cat to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve a dog to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve all three pet species to their final stages", [achievementStatusKey]: false}
                        ]);

        }
        
        if (restart_NotificationsUncleared){

            setNotifications([]);

        }

        helpers_Closer_Flags(set_Restart_OpenFlag);

    }

    
    return (
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline">Restart Petopia:</h1>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Yes" onClick = {() => restart_GameRestarter()}> Yes <br/> [return]</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation No" onClick = {() => helpers_Closer_Flags(set_Restart_OpenFlag)}> No <br/> [esc]</button>
            </div>

        </div>
    );
}
  
export default Restart;