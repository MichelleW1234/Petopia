/*
  For each pet list element:
  - 0 -> general info: [species, pet image]
  - 1 -> health: [stage of growth, health]
  - 2 -> daily tasks: [ate?, bathed?, played?]
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

