/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const activeCheckoutRoom_Context = createContext();

export function ActiveCheckoutRoomProvider({ children }) {

    const [ActiveCheckoutRoom, setActiveCheckoutRoom] = useState(() => {
        try {
            const activeCheckoutRoom_CurrValue = JSON.parse(sessionStorage.getItem("ActiveCheckoutRoom"));
            return activeCheckoutRoom_CurrValue !== null ? activeCheckoutRoom_CurrValue : -1;
        } catch {
            return -1;
        }
    });

    useEffect(() => {
        sessionStorage.setItem("ActiveCheckoutRoom", JSON.stringify(ActiveCheckoutRoom));
    }, [ActiveCheckoutRoom]);

    return (
        <activeCheckoutRoom_Context.Provider value={{ ActiveCheckoutRoom, setActiveCheckoutRoom}}>
        {children}
        </activeCheckoutRoom_Context.Provider>
    );
}

export function useActiveCheckoutRoom() {
  return useContext(activeCheckoutRoom_Context);
}

