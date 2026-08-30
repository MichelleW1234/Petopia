

/*
  For each pet list element: 
    - feeding: [lastfed, lastfeddamageupdate];
    - cleaning: [lastcleaned, lastcleaneddamagepdate];
    - playing: [lastplayed, lastplayeddamagepdate];
*/


import { createContext, useContext, useState, useEffect } from "react";

const petTimeStamps_Context = createContext();

export function PetTimeStampsProvider({ children }) {

  const [PetTimeStamps, setPetTimeStamps] = useState(() => {
    try {
      const bound_Sequence_PetTimeStampsStored = JSON.parse(localStorage.getItem("PetTimeStamps"));
      return bound_Sequence_PetTimeStampsStored && typeof bound_Sequence_PetTimeStampsStored === "object" ? bound_Sequence_PetTimeStampsStored : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("PetTimeStamps", JSON.stringify(PetTimeStamps));
  }, [PetTimeStamps]);

  return (
    <petTimeStamps_Context.Provider value={{ PetTimeStamps, setPetTimeStamps }}>
      {children}
    </petTimeStamps_Context.Provider>
  );
}

export function usePetTimeStamps() {
  return useContext(petTimeStamps_Context);
}

