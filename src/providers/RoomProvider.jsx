/*
    Keeps track of which pet in the pet list is currently being visited (if any)
*/

import { createContext, useContext, useState, useEffect } from "react";

const room_Context = createContext();

export function RoomProvider({ children }) {

    const [Room, setRoom] = useState(() => {
        try {
            const room_CurrValue = JSON.parse(localStorage.getItem("Room"));
            return room_CurrValue !== null ? room_CurrValue : [null, null, null];
        } catch {
            return [null, null, null];
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

