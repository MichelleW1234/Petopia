import { createContext, useContext, useEffect, useState } from 'react';

export const volume_Context = createContext();

export function VolumeProvider({ children }) {

    const [Volume, setVolume] = useState(() => {

    try {

        const volume_CurrValue = JSON.parse(localStorage.getItem("Volume"));
        
        if (volume_CurrValue === null){

            return 0.5;

        }

        const volume_Value = Number(volume_CurrValue);

        return Number.isFinite(volume_Value) ? volume_Value : 0.5;

    } catch {
        return 0.5;
    }
    });

    useEffect(() => {
        localStorage.setItem("Volume", Volume);
    }, [Volume]);

    return (
        <volume_Context.Provider value={{Volume, setVolume}}>
            {children}
        </volume_Context.Provider>
    );
}

export function useVolume() {
    return useContext(volume_Context);
}