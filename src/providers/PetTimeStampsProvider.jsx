

/*
  For each pet list element: 
    - feeding: [lastfed, lastfeddamageupdate];
    - bathing: [lastbathed, lastbatheddamagepdate];
    - playing: [lastplayed, lastplayeddamagepdate];
*/


import { createContext, useContext, useState, useEffect } from "react";

const PetTimeStampsContext = createContext();

export function PetTimeStampsProvider({ children }) {

  const [PetTimeStamps, setPetTimeStamps] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("PetTimeStamps"));
      return stored && typeof stored === "object" ? stored : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("PetTimeStamps", JSON.stringify(PetTimeStamps));
  }, [PetTimeStamps]);

  return (
    <PetTimeStampsContext.Provider value={{ PetTimeStamps, setPetTimeStamps }}>
      {children}
    </PetTimeStampsContext.Provider>
  );
}

export function usePetTimeStamps() {
  return useContext(PetTimeStampsContext);
}

