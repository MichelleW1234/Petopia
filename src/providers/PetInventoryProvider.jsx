/*
  For each pet list element:
    - name 
    - cost 
    - pet that owns it -> default is null
    - one time use? -> true/false
*/

import { createContext, useContext, useState, useEffect } from "react";

const PetInventoryContext = createContext();

export function PetInventoryProvider({ children }) {

  const [PetInventory, setPetInventory] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("PetInventory"));
      return stored && typeof stored === "object" ? stored : {};
    } catch {
      return {};
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

