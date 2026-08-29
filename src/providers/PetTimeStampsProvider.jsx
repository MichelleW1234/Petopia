

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
      const petTimeStamps_CurrValue = JSON.parse(localStorage.getItem("PetTimeStamps"));
      return petTimeStamps_CurrValue && typeof petTimeStamps_CurrValue === "object" ? petTimeStamps_CurrValue : {};
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

