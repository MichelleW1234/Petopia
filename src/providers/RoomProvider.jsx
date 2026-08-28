/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const RoomContext = createContext();

export function RoomProvider({ children }) {

    const [Room, setRoom] = useState(() => {
        try {
            const roomStored = JSON.parse(localStorage.getItem("Room"));
            return roomStored !== null ? roomStored : [null, null, null];
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

