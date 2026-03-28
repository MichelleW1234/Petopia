/*
  For each pet list element:
    - species -> dog/cat/fish
    - stage -> 0-3
    - health -> dog=15/cat=20/fish=5
    - birthDate -> milliseconds
    - medicine -> milliseconds
*/

import { createContext, useContext, useState, useEffect } from "react";

const PetListContext = createContext();

export function PetListProvider({ children }) {

  const [PetList, setPetList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("PetList"));
      return stored && typeof stored === "object" ? stored : {};
    } catch {
      return {};
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

