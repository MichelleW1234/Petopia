/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const activeCheckoutRoom_Context = createContext();

export function ActiveCheckoutRoomProvider({ children }) {

    const [ActiveCheckoutRoom, setActiveCheckoutRoom] = useState(() => {
        try {
            const bound_Number_ActiveCheckoutRoomStored = JSON.parse(sessionStorage.getItem("ActiveCheckoutRoom"));
            return bound_Number_ActiveCheckoutRoomStored !== null ? bound_Number_ActiveCheckoutRoomStored : -1;
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

