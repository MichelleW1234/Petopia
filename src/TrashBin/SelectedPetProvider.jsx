/*
  Keeps track of which species the user selected
*/

import { createContext, useContext, useState, useEffect } from "react";

const SelectedPetContext = createContext();

export function SelectedPetProvider({ children }) {

  const [SelectedPet, setSelectedPet] = useState(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("SelectedPet"));
      return stored !== null ? String(stored) : "";
    } catch {
        return "";
    }
  });

  useEffect(() => {
    sessionStorage.setItem("SelectedPet", JSON.stringify(SelectedPet));
  }, [SelectedPet]);

  return (
    <SelectedPetContext.Provider value={{ SelectedPet, setSelectedPet}}>
      {children}
    </SelectedPetContext.Provider>
  );
}

export function useSelectedPet() {
  return useContext(SelectedPetContext);
}

