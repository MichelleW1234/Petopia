/*
    For each pet list element: 
    - 0 -> feeding timestamps: [lastfed, lastfeddamageupdate];
    - 1 -> bathing timestamps: [lastbathed, lastbatheddamagepdate];
    - 2 -> playoing timestamps: [lastplayed, lastplayeddamagepdate];
*/

import { createContext, useContext, useState, useEffect } from "react";

const PetTimeStampsContext = createContext();

export function  PetTimeStampsProvider({ children }) {

  const [PetTimeStamps, setPetTimeStamps] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("PetTimeStamps"));
      return Array.isArray(stored) ? stored : [[], [], []];
    } catch {
      return [[], [], []];
    }
  });

  useEffect(() => {
    localStorage.setItem("PetTimeStamps", JSON.stringify(PetTimeStamps));
  }, [PetTimeStamps]);

  return (
    <PetTimeStampsContext.Provider value={{ PetTimeStamps, setPetTimeStamps}}>
      {children}
    </PetTimeStampsContext.Provider>
  );
}

export function usePetTimeStamps() {
  return useContext(PetTimeStampsContext);
}

