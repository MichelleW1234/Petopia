import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds, helpers_Quit } from "../../../../helpers/helpers.js";
import { usePetList } from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";
import { useAchievements } from "../../../../providers/AchievementsProvider.jsx";
import { useNotifications } from "../../../../providers/NotificationsProvider.jsx";

import Reviver from "../../../../images/Reviver.png";
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

import { audioRestartGameKey, inventoryItemNameKey, inventoryItemImageKey, inventoryItemSpeciesAcceptedKey, inventoryItemOwnerKey, inventoryItemTypeKey, inventoryItemTypeRoomDecorationKey, inventoryItemTypeCeilingDecorationKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeFloorDecorationKey, petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey, achievementDescriptionKey, achievementStatusKey, audioQuitActivityKey, audioConfirmedKey, inventoryItemDescriptionKey} from "../../../../constants/Constants.js";

import "../../../../App.css";
import { useRevivers } from "../../../../providers/ReviversProvider.jsx";



function Restart({set_Restart_OpenFlag, restart_MinPetsAdopted, restart_InventoryContainsOwners, restart_AchievementsUnlocked, restart_NotificationsUncleared, restart_ReviversUsed}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Inventory, setInventory} = useInventory();
    const {Achievements, setAchievements} = useAchievements();
    const {Notifications, setNotifications} = useNotifications();
    const {Revivers, setRevivers} = useRevivers();


    useKeyboardShortcut("escape", () => {

        helpers_Quit(set_Restart_OpenFlag);

    },
        ".Quit"
    );

    useKeyboardShortcut("Enter", () => {

        restart_GameRestarter();

    },
        ".Confirm"
    );



    const restart_GameRestarter = () => {

        helpers_Player_UIIndicatorSounds(audioConfirmedKey);
        helpers_Player_UIIndicatorSounds(audioRestartGameKey);

        if (restart_MinPetsAdopted){

            setPetList({});
            setPetTimeStamps({});
            setRoom(["", "", ""]);

        }

        if (restart_InventoryContainsOwners){

            setInventory([
                            {[inventoryItemNameKey]:  "Chandelier", [inventoryItemDescriptionKey]: "Hang this dazzling golden chandelier from your pet’s ceiling to add sophistication and sparkle!", [inventoryItemImageKey]: ChandelierOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]:  "Chandelier", [inventoryItemDescriptionKey]: "Hang this charming brown chandelier from your pet’s ceiling to add warmth and coziness!", [inventoryItemImageKey]: ChandelierTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]:  "Chandelier", [inventoryItemDescriptionKey]: "Hang this charming brown chandelier from your pet’s ceiling to add timelessness and elegance!", [inventoryItemImageKey]: ChandelierThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Painting", [inventoryItemDescriptionKey]: "Hang this dreamy starry night scene in your pet’s room for a touch of magic and wonder!", [inventoryItemImageKey]: PaintingOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Painting", [inventoryItemDescriptionKey]: "Hang this peaceful mountain scene on your pet’s wall for a touch of serenity and adventure!", [inventoryItemImageKey]: PaintingTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Painting", [inventoryItemDescriptionKey]: "Hang this seaside sunset on your pet’s wall for a touch of tranquility and relaxation.", [inventoryItemImageKey]: PaintingThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]:  "Statue", [inventoryItemDescriptionKey]: "Stand this weathered shipwreck in your aquarium for mysterious underwater adventures!",  [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]:  "Castle", [inventoryItemDescriptionKey]: "Stand this charming underwater castle in your aquarium for a grand aquatic centerpiece!", [inventoryItemImageKey]: Castle, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]:  "Kelp", [inventoryItemDescriptionKey]: "Stand this swaying kelp forest in your aquarium for a peaceful underwater retreat!", [inventoryItemImageKey]: Kelp, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Coat Stand", [inventoryItemDescriptionKey]: "Stand this charming coat stand in your pet’s room for a cozy place to hang coats, hats, and accessories!", [inventoryItemImageKey]: CoatStand, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Tree", [inventoryItemDescriptionKey]: "Stand this leafy potted tree in your pet’s room for a fresh, natural atmosphere!", [inventoryItemImageKey]: Tree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Lamp", [inventoryItemDescriptionKey]: "Stand this charming lamp in your pet’s room for a soft, cozy glow!", [inventoryItemImageKey]: Lamp, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeRoomDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Shell", [inventoryItemDescriptionKey]: "Place this charming shell on your aquarium floor as a charming seaside ornament!", [inventoryItemImageKey]: Shell, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Pearl", [inventoryItemDescriptionKey]: "Place this beautiful pearl on your aquarium floor as a magical ocean gem!", [inventoryItemImageKey]: Pearl, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Starfish", [inventoryItemDescriptionKey]: "Place this cheerful starfish on your aquarium floor as a playful aquatic character!", [inventoryItemImageKey]: Starfish, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Rug", [inventoryItemDescriptionKey]: "Place this bright red rug in your pet’s room as a bold and vibrant floor accent!", [inventoryItemImageKey]: RugOne, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Rug", [inventoryItemDescriptionKey]: "Place this vibrant orange rug in your pet’s room as a fun and energetic play area!", [inventoryItemImageKey]: RugTwo, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""},
                            {[inventoryItemNameKey]: "Rug", [inventoryItemDescriptionKey]: "Place this cheerful yellow rug in your pet’s room as a sunny and bright relaxation spot!", [inventoryItemImageKey]: RugThree, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: ""}
                        ]);

        }

        if (restart_AchievementsUnlocked){

            setAchievements([
                            {[achievementDescriptionKey]: "Evolve a fish to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve a cat to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve a dog to its final stage", [achievementStatusKey]: false},
                            {[achievementDescriptionKey]: "Evolve all pet species to their final stages", [achievementStatusKey]: false}
                        ]);

        }
        
        if (restart_NotificationsUncleared){

            setNotifications([]);

        }

        if (restart_ReviversUsed){

            setRevivers(3);

        }

        helpers_Closer_Flags(set_Restart_OpenFlag);

    }

    
    return (
        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSign">
                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalSignContent">
                        <h1>Restart Game?</h1>
                    </div>
                </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Confirm" onClick = {() => restart_GameRestarter()}> Confirm <br/> [return]</button>
                <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Quit" onClick = {() => helpers_Quit(set_Restart_OpenFlag)}> Quit <br/> [esc]</button>
            </div>

        </div>
    );
}
  
export default Restart;