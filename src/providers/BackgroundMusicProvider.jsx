import { createContext, useContext, useRef, useEffect, useState } from 'react';

import {useVolume} from "./VolumeProvider.jsx";

import PetopiaSoundTrack from "../Music/PetopiaSoundTrack.mp3";


export const backgroundMusic_Context = createContext();

export function BackgroundMusicProvider({ children }) {

    const {Volume} = useVolume();

    const backgroundMusic_Ref_PetopiaSoundtrack = useRef(new Audio(PetopiaSoundTrack));


    useEffect(() => {
        backgroundMusic_Ref_PetopiaSoundtrack.current.volume = Volume;
    }, [Volume]);

    useEffect(() => {

        const bound_Audio_CurrPetopiaSoundtrack = backgroundMusic_Ref_PetopiaSoundtrack.current;
        bound_Audio_CurrPetopiaSoundtrack.loop = true;

        bound_Audio_CurrPetopiaSoundtrack.play().catch((err) => {
            console.warn('Autoplay failed:', err);
        });

        return () => {
            bound_Audio_CurrPetopiaSoundtrack.pause(); // Stop the bound_Audio_CurrPetopiaSoundtrack when the component is unmounted
            bound_Audio_CurrPetopiaSoundtrack.currentTime = 0;
            bound_Audio_CurrPetopiaSoundtrack.loop = false;
        };

    }, []);



    return (
        <backgroundMusic_Context.Provider value={{backgroundMusic_Ref_PetopiaSoundtrack}}>
            {children}
        </backgroundMusic_Context.Provider>
    );
}

export function useBackgroundMusic() {
    return useContext(backgroundMusic_Context);
}