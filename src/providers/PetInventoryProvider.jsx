/*
  For each REUSABLE item (not including potions or single use items):
    - index of item in shop list
    - pet that owns it -> default is null
*/

import { createContext, useContext, useState, useEffect } from "react";

const PetInventoryContext = createContext();

export function PetInventoryProvider({ children }) {

  const [PetInventory, setPetInventory] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("PetInventory"));
      return stored ? stored : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("PetInventory", JSON.stringify(PetInventory));
  }, [PetInventory]);

  return (
    <PetInventoryContext.Provider value={{ PetInventory, setPetInventory }}>
      {children}
    </PetInventoryContext.Provider>
  );
  
}

export function usePetInventory() {
  return useContext(PetInventoryContext);
}

