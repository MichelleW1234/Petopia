/*
    0 -> pet species info
    1 -> species variant (appearance)
*/

import { createContext, useContext, useState, useEffect } from "react";

const FinalPetSelectionContext = createContext();

export function FinalPetSelectionProvider({ children }) {

  const [FinalPetSelection, setFinalPetSelection] = useState(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("FinalPetSelection"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
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

