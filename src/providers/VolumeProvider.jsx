import { createContext, useContext, useEffect, useState } from 'react';

export const VolumeContext = createContext();

export function VolumeProvider({ children }) {

    const [Volume, setVolume] = useState(() => {

    try {

        const volumeStored = JSON.parse(localStorage.getItem("Volume"));
        
        if (volumeStored === null){

            return 0.5;

        }

        const volumeValue = Number(volumeStored);

        return Number.isFinite(volumeValue) ? volumeValue : 0.5;

    } catch {
        return 0.5;
    }
    });

    useEffect(() => {
        localStorage.setItem("Volume", Volume);
    }, [Volume]);

    return (
        <VolumeContext.Provider value={{Volume, setVolume}}>
            {children}
        </VolumeContext.Provider>
    );
}

export function useVolume() {
    return useContext(VolumeContext);
}