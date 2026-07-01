/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const RoomContext = createContext();

export function RoomProvider({ children }) {

    const [Room, setRoom] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("Room"));
            return stored !== null ? stored : [null, null, null];
        } catch {
            return [null, null, null];
        }
    });

    useEffect(() => {
        localStorage.setItem("Room", JSON.stringify(Room));
    }, [Room]);

    return (
        <RoomContext.Provider value={{ Room, setRoom}}>
        {children}
        </RoomContext.Provider>
    );
}

export function useRoom() {
  return useContext(RoomContext);
}

