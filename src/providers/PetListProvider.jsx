/*
  For each pet list element:
  - 0 -> name
  - 1 -> species
  - 2 -> pet image
  - 3 -> stage of growth
  - 4 -> health
  - 5 -> birth date (milliseconds)
  - 6 -> last dose of medicine (milliseconds)
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

