/*
  For each item:
    - name 
    - image src
    - pets allowed to recieve it
    - type -> potion/floor/wall/ceiling
    - owner -> (either null or one of the pets)
*/

import { createContext, useContext, useState, useEffect } from "react";

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


import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, petSpeciesFishKey, inventoryItemTypeFloorDecorationKey, inventoryItemImageKey, inventoryItemTypeKey, inventoryItemSpeciesAcceptedKey, inventoryItemTypeWallDecorationKey, inventoryItemNameKey, inventoryItemOwnerKey, inventoryItemTypeRoomDecorationKey, inventoryItemDescriptionKey } from "../constants/Constants.js";

const inventory_Context = createContext();

export function InventoryProvider({ children }) {

  const [Inventory, setInventory] = useState(() => {
    try {
      const bound_Sequence_InventoryStored = JSON.parse(localStorage.getItem("Inventory"));
      return bound_Sequence_InventoryStored ? bound_Sequence_InventoryStored : [
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
                                ];
    } catch {
      return  [
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
                ];
    }
  });

  useEffect(() => {
    localStorage.setItem("Inventory", JSON.stringify(Inventory));
  }, [Inventory]);

  return (
    <inventory_Context.Provider value={{ Inventory, setInventory }}>
      {children}
    </inventory_Context.Provider>
  );
  
}

export function useInventory() {
  return useContext(inventory_Context);
}

