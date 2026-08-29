/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const activePetName_Context = createContext();

export function ActivePetNameProvider({ children }) {

    const [ActivePetName, setActivePetName] = useState(() => {
        try {
            const activePetName_CurrValue = JSON.parse(sessionStorage.getItem("ActivePetName"));
            return activePetName_CurrValue !== null ? String(activePetName_CurrValue) : "";
        } catch {
            return "";
        }
    });

    useEffect(() => {
        sessionStorage.setItem("ActivePetName", JSON.stringify(ActivePetName));
    }, [ActivePetName]);

    return (
        <activePetName_Context.Provider value={{ ActivePetName, setActivePetName}}>
        {children}
        </activePetName_Context.Provider>
    );
}

export function useActivePetName() {
  return useContext(activePetName_Context);
}

