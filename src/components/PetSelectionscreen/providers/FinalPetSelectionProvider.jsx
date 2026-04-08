/*
  Keeps track of which species the user selected
*/

import { createContext, useContext, useState, useEffect } from "react";

const FinalPetSelectionContext = createContext();

export function FinalPetSelectionProvider({ children }) {

  const [FinalPetSelection, setFinalPetSelection] = useState(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("FinalPetSelection"));
      return typeof stored === "number" ? stored : -1;
    } catch {
      return -1;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("FinalPetSelection", JSON.stringify(FinalPetSelection));
  }, [FinalPetSelection]);

  return (
    <FinalPetSelectionContext.Provider value={{ FinalPetSelection, setFinalPetSelection}}>
      {children}
    </FinalPetSelectionContext.Provider>
  );
}

export function useFinalPetSelection() {
  return useContext(FinalPetSelectionContext);
}

