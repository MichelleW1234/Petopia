/*
  For each pet list element:
  - 0 -> species: dog, cat, or fish
  - 1 -> stage of growth: 1-3
  - 2 -> Health (depends on feeding, bathing, and playing): 1-5
  - 3 -> ate today: true or false
  - 4 -> bathed today: true or false
  - 5 -> played/attention today: true or false
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

