/*
    Keeps track of the last time user visited homepage (to avoid repeated damage checks)
*/

import { createContext, useContext, useState, useEffect } from "react";

const LastCheckedContext = createContext();

export function LastCheckedProvider({ children }) {

    const [LastChecked, setLastChecked] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("LastChecked"));
            return stored !== null ? stored : Date.now(); 
        } catch {
            return Date.now();
        }
    });

    useEffect(() => {
        localStorage.setItem("LastChecked", JSON.stringify(LastChecked));
    }, [LastChecked]);

    return (
        <LastCheckedContext.Provider value={{ LastChecked, setLastChecked}}>
        {children}
        </LastCheckedContext.Provider>
    );
}

export function useLastChecked() {
  return useContext(LastCheckedContext);
}

