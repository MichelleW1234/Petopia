/*
  For each item:
    - name 
    - image src
    - pets allowed to recieve it
    - type -> potion/floor/wall/ceiling
    - owner -> (either null or one of the pets)
*/

import { createContext, useContext, useState, useEffect } from "react";
import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, petSpeciesFishKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypePotionKey, inventoryItemImageKey, inventoryItemTypeKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeWallDecorationKey, inventoryItemNameKey, inventoryItemOwnerKey } from "../constants/Constants";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {

  const [Inventory, setInventory] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Inventory"));
      return stored ? stored : [
                                  {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKL4vZWyVa2l6-eZsM9bFtWiaSJXesFfb2BwEc6vedw&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: "https://cdn.creativefabrica.com/2022/07/04/Round-bath-rug-Cartoon-mat-icon-Weavin-Graphics-33565311-1.png", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: "https://i.etsystatic.com/35169377/r/il/901776/6313728576/il_570xN.6313728576_9y2n.jpg", [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: "https://img.itch.zone/aW1nLzExMTQ1ODI5LnBuZw==/original/x%2BGumF.png", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                                ];
    } catch {
      return  [
                {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKL4vZWyVa2l6-eZsM9bFtWiaSJXesFfb2BwEc6vedw&s=10", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: "https://cdn.creativefabrica.com/2022/07/04/Round-bath-rug-Cartoon-mat-icon-Weavin-Graphics-33565311-1.png", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: "https://i.etsystatic.com/35169377/r/il/901776/6313728576/il_570xN.6313728576_9y2n.jpg", [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: "https://img.itch.zone/aW1nLzExMTQ1ODI5LnBuZw==/original/x%2BGumF.png", [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
              ];
    }
  });

  useEffect(() => {
    localStorage.setItem("Inventory", JSON.stringify(Inventory));
  }, [Inventory]);

  return (
    <InventoryContext.Provider value={{ Inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
  
}

export function useInventory() {
  return useContext(InventoryContext);
}

