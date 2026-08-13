/*
  For each REUSABLE item (not including potions or single use items):
    - name 
    - cost
    - pets allowed to recieve it
    - type -> disposable/floor/wall/ceilingfloor/wall/ceiling
*/

import { createContext, useContext, useState, useEffect } from "react";
import { catSpecies, ceilingTypeKey, dogSpecies, fishSpecies, floorTypeKey, potionTypeKey, shopItemCostKey, shopItemImageKey, shopItemTypeKey, shopItemSpeciesKey, wallTypeKey, shopItemNameKey } from "../constants/Constants";

const ShopItemsContext = createContext();

export function ShopItemsProvider({ children }) {

  const [ShopItems, setShopItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("ShopItems"));
      return stored ? stored : [
                                  {[shopItemNameKey]: "Reviver", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [shopItemCostKey]: 10, [shopItemSpeciesKey]: [dogSpecies, catSpecies, fishSpecies], [shopItemTypeKey]: potionTypeKey},
                                  {[shopItemNameKey]: "Painting", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKL4vZWyVa2l6-eZsM9bFtWiaSJXesFfb2BwEc6vedw&s=10", [shopItemCostKey]: 15, [shopItemSpeciesKey]: [dogSpecies, catSpecies], [shopItemTypeKey]: wallTypeKey},
                                  {[shopItemNameKey]: "Rug", [shopItemImageKey]: "https://cdn.creativefabrica.com/2022/07/04/Round-bath-rug-Cartoon-mat-icon-Weavin-Graphics-33565311-1.png", [shopItemCostKey]: 15, [shopItemSpeciesKey]: [dogSpecies, catSpecies], [shopItemTypeKey]: floorTypeKey},
                                  {[shopItemNameKey]:  "Statue", [shopItemImageKey]: "https://i.etsystatic.com/35169377/r/il/901776/6313728576/il_570xN.6313728576_9y2n.jpg", [shopItemCostKey]: 10, [shopItemSpeciesKey]: [fishSpecies], [shopItemTypeKey]: floorTypeKey},
                                  {[shopItemNameKey]:  "Chandelier", [shopItemImageKey]: "https://img.itch.zone/aW1nLzExMTQ1ODI5LnBuZw==/original/x%2BGumF.png", [shopItemCostKey]: 20, [shopItemSpeciesKey]: [dogSpecies, catSpecies], [shopItemTypeKey]: ceilingTypeKey},
                                ];
    } catch {
      return  [
                {[shopItemNameKey]: "Reviver", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL8KDTH3di9zyztqIV4ipLNNB4bWDS_Nrq30WRmEDHA&s=10", [shopItemCostKey]: 10, [shopItemSpeciesKey]: [dogSpecies, catSpecies, fishSpecies], [shopItemTypeKey]: potionTypeKey},
                {[shopItemNameKey]: "Painting", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKL4vZWyVa2l6-eZsM9bFtWiaSJXesFfb2BwEc6vedw&s=10", [shopItemCostKey]: 15, [shopItemSpeciesKey]: [dogSpecies, catSpecies], [shopItemTypeKey]: wallTypeKey},
                {[shopItemNameKey]: "Rug", [shopItemImageKey]: "https://cdn.creativefabrica.com/2022/07/04/Round-bath-rug-Cartoon-mat-icon-Weavin-Graphics-33565311-1.png", [shopItemCostKey]: 15, [shopItemSpeciesKey]: [dogSpecies, catSpecies], [shopItemTypeKey]: floorTypeKey},
                {[shopItemNameKey]:  "Statue", [shopItemImageKey]: "https://i.etsystatic.com/35169377/r/il/901776/6313728576/il_570xN.6313728576_9y2n.jpg", [shopItemCostKey]: 10, [shopItemSpeciesKey]: [fishSpecies], [shopItemTypeKey]: floorTypeKey},
                {[shopItemNameKey]:  "Chandelier", [shopItemImageKey]: "https://img.itch.zone/aW1nLzExMTQ1ODI5LnBuZw==/original/x%2BGumF.png", [shopItemCostKey]: 20, [shopItemSpeciesKey]: [dogSpecies, catSpecies], [shopItemTypeKey]: ceilingTypeKey},
              ];
    }
  });

  useEffect(() => {
    localStorage.setItem("ShopItems", JSON.stringify(ShopItems));
  }, [ShopItems]);

  return (
    <ShopItemsContext.Provider value={{ ShopItems, setShopItems }}>
      {children}
    </ShopItemsContext.Provider>
  );
  
}

export function useShopItems() {
  return useContext(ShopItemsContext);
}

