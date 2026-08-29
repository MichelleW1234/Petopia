/*
  For each pet list element:
    - species -> dog/cat/fish
    - stage -> 0-2
    - health -> dog=15/cat=20/fish=5
    - birthDate -> milliseconds
    - medicine -> milliseconds
    - room number -> 0-2
*/

import { createContext, useContext, useState, useEffect } from "react";

const petList_Context = createContext();

export function PetListProvider({ children }) {

  const [PetList, setPetList] = useState(() => {
    try {
      const petList_CurrValue = JSON.parse(localStorage.getItem("PetList"));
      return petList_CurrValue && typeof petList_CurrValue === "object" ? petList_CurrValue : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("PetList", JSON.stringify(PetList));
  }, [PetList]);

  return (
    <petList_Context.Provider value={{ PetList, setPetList }}>
      {children}
    </petList_Context.Provider>
  );
  
}

export function usePetList() {
  return useContext(petList_Context);
}

