/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const room_Context = createContext();

export function RoomProvider({ children }) {

    const [Room, setRoom] = useState(() => {
        try {
            const bound_Sequence_RoomStored = JSON.parse(localStorage.getItem("Room"));
            return bound_Sequence_RoomStored !== null ? bound_Sequence_RoomStored : ["", "", ""];
        } catch {
            return ["", "", ""];
        }
    });

    useEffect(() => {
        localStorage.setItem("Room", JSON.stringify(Room));
    }, [Room]);

    return (
        <room_Context.Provider value={{ Room, setRoom}}>
        {children}
        </room_Context.Provider>
    );
}

export function useRoom() {
  return useContext(room_Context);
}

