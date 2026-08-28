/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const ActivePetNameContext = createContext();

export function ActivePetNameProvider({ children }) {

    const [ActivePetName, setActivePetName] = useState(() => {
        try {
            const activePetNameStored = JSON.parse(sessionStorage.getItem("ActivePetName"));
            return activePetNameStored !== null ? String(activePetNameStored) : "";
        } catch {
            return "";
        }
    });

    useEffect(() => {
        sessionStorage.setItem("ActivePetName", JSON.stringify(ActivePetName));
    }, [ActivePetName]);

    return (
        <ActivePetNameContext.Provider value={{ ActivePetName, setActivePetName}}>
        {children}
        </ActivePetNameContext.Provider>
    );
}

export function useActivePetName() {
  return useContext(ActivePetNameContext);
}

