

/*
  For each pet list element: 
    - feeding: [lastfed, lastfeddamageupdate];
    - cleaning: [lastcleaned, lastcleaneddamagepdate];
    - playing: [lastplayed, lastplayeddamagepdate];
*/


import { createContext, useContext, useState, useEffect } from "react";

const PetTimeStampsContext = createContext();

export function PetTimeStampsProvider({ children }) {

  const [PetTimeStamps, setPetTimeStamps] = useState(() => {
    try {
      const petTimeStampsStored = JSON.parse(localStorage.getItem("PetTimeStamps"));
      return petTimeStampsStored && typeof petTimeStampsStored === "object" ? petTimeStampsStored : {};
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

