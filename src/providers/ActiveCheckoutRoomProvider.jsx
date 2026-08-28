/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const ActiveCheckoutRoomContext = createContext();

export function ActiveCheckoutRoomProvider({ children }) {

    const [ActiveCheckoutRoom, setActiveCheckoutRoom] = useState(() => {
        try {
            const activeCheckoutRoomStored = JSON.parse(sessionStorage.getItem("ActiveCheckoutRoom"));
            return activeCheckoutRoomStored !== null ? activeCheckoutRoomStored : -1;
        } catch {
            return -1;
        }
    });

    useEffect(() => {
        sessionStorage.setItem("ActiveCheckoutRoom", JSON.stringify(ActiveCheckoutRoom));
    }, [ActiveCheckoutRoom]);

    return (
        <ActiveCheckoutRoomContext.Provider value={{ ActiveCheckoutRoom, setActiveCheckoutRoom}}>
        {children}
        </ActiveCheckoutRoomContext.Provider>
    );
}

export function useActiveCheckoutRoom() {
  return useContext(ActiveCheckoutRoomContext);
}

