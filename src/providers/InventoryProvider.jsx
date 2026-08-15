/*
  For each item:
    - name 
    - image src
    - pets allowed to recieve it
    - type -> potion/floor/wall/ceiling
    - owner -> (either null or one of the pets)
*/

import { createContext, useContext, useState, useEffect } from "react";

import Reviver from "../images/Inventory/Reviver.png";
import Painting from "../images/Inventory/Painting.png";
import Rug from "../images/Inventory/Rug.png";
import Statue from "../images/Inventory/Statue.png";
import Chandelier from "../images/Inventory/Chandelier.png";

import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, petSpeciesFishKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypePotionKey, inventoryItemImageKey, inventoryItemTypeKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeWallDecorationKey, inventoryItemNameKey, inventoryItemOwnerKey } from "../constants/Constants.js";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {

  const [Inventory, setInventory] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Inventory"));
      return stored ? stored : [
                                  {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: Painting, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: Chandelier, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                                  {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: Rug, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null}
                                ];
    } catch {
      return  [
                {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Reviver", [inventoryItemImageKey]: Reviver, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypePotionKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Painting", [inventoryItemImageKey]: Painting, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeWallDecorationKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]:  "Chandelier", [inventoryItemImageKey]: Chandelier, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeCeilingDecorationKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]:  "Statue", [inventoryItemImageKey]: Statue, [inventoryItemSpeciesAcceptedKey]: [petSpeciesFishKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null},
                {[inventoryItemNameKey]: "Rug", [inventoryItemImageKey]: Rug, [inventoryItemSpeciesAcceptedKey]: [petSpeciesDogKey, petSpeciesCatKey], [inventoryItemTypeKey]: inventoryItemTypeFloorDecorationKey, [inventoryItemOwnerKey]: null}
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

