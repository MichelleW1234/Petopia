import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import {useInventory} from "../../../../providers/InventoryProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { playSound, flagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, petSpeciesFishKey, inventoryItemTypeFloorDecorationKey, inventoryItemImageKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeKey, soundNavButtonPressKey, inventoryItemTypePotionKey, soundRestartGameKey, inventoryItemTypeWallDecorationKey } from "../../../../constants/Constants.js";



function Restart({setRestartOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Inventory, setInventory} = useInventory();
    const {Room, setRoom} = useRoom();

    
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
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKL4vZWyVa2l6-eZsM9bFtWiaSJXesFfb2BwEc6vedw&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: "https://cdn.creativefabrica.com/2022/07/04/Round-bath-rug-Cartoon-mat-icon-Weavin-Graphics-33565311-1.png", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: "https://i.etsystatic.com/35169377/r/il/901776/6313728576/il_570xN.6313728576_9y2n.jpg", [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                        {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: "https://img.itch.zone/aW1nLzExMTQ1ODI5LnBuZw==/original/x%2BGumF.png", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
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