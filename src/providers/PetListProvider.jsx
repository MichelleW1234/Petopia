/*
  For each pet list element:
  - 0 -> species
  - 1 -> pet image
  - 2 -> stage of growth
  - 3 -> health
  - 4 -> birth date (milliseconds)
*/

import { createContext, useContext, useState, useEffect } from "react";

const PetListContext = createContext();

export function PetListProvider({ children }) {

  const [PetList, setPetList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("PetList"));
      return Array.isArray(stored) ? stored : [[], [], []];
    } catch {
      return [[], [], []];
    }
  });

  useEffect(() => {
    localStorage.setItem("PetList", JSON.stringify(PetList));
  }, [PetList]);

  return (
    <PetListContext.Provider value={{ PetList, setPetList }}>
      {children}
    </PetListContext.Provider>
  );
}

export function usePetList() {
  return useContext(PetListContext);
}

