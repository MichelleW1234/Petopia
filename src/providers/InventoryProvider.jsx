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
import PaintingOne from "../images/Inventory/PaintingOne.png";
import PaintingTwo from "../images/Inventory/PaintingTwo.png";
import PaintingThree from "../images/Inventory/PaintingThree.png";
import RugOne from "../images/Inventory/RugOne.png";
import RugTwo from "../images/Inventory/RugTwo.png";
import RugThree from "../images/Inventory/RugThree.png";
import Shell from "../images/Inventory/Shell.png";
import Pearl from "../images/Inventory/Pearl.png";
import Starfish from "../images/Inventory/Starfish.png";
import Statue from "../images/Inventory/Statue.png";
import Castle from "../images/Inventory/Castle.png";
import Kelp from "../images/Inventory/Kelp.png";
import CoatStand from "../images/Inventory/CoatStand.png";
import Tree from "../images/Inventory/Tree.png";
import Lamp from "../images/Inventory/Lamp.png";
import ChandelierOne from "../images/Inventory/ChandelierOne.png";
import ChandelierTwo from "../images/Inventory/ChandelierTwo.png";
import ChandelierThree from "../images/Inventory/ChandelierThree.png";


import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, petSpeciesFishKey, inventoryItemTypeFloorDecorationKey, inventoryItemTypePotionKey, inventoryItemImageKey, inventoryItemTypeKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeWallDecorationKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemTypeRoomDecorationKey } from "../constants/Constants.js";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {

  const [Inventory, setInventory] = useState(() => {
    try {
      const inventoryStored = JSON.parse(localStorage.getItem("Inventory"));
      return inventoryStored ? inventoryStored : [
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
                                ];
    } catch {
      return  [
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

