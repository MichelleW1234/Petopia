/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const ActivePetNumberContext = createContext();

export function ActivePetNumberProvider({ children }) {

    const [ActivePetNumber, setActivePetNumber] = useState(() => {
        try {
            const stored = JSON.parse(sessionStorage.getItem("ActivePetNumber"));
            return stored !== null ? String(stored) : "";
        } catch {
            return "";
        }
    });

    useEffect(() => {
        sessionStorage.setItem("ActivePetNumber", JSON.stringify(ActivePetNumber));
    }, [ActivePetNumber]);

    return (
        <ActivePetNumberContext.Provider value={{ ActivePetNumber, setActivePetNumber}}>
        {children}
        </ActivePetNumberContext.Provider>
    );
}

export function useActivePetNumber() {
  return useContext(ActivePetNumberContext);
}

