import { createContext, useContext, useRef, useEffect, useState } from 'react';
import soundtrack from "../Music/PetopiaSoundTrack.mp3";
import {useVolume} from "./VolumeProvider.jsx";

export const backgroundMusic_Context = createContext();

export function BackgroundMusicProvider({ children }) {

    const {Volume} = useVolume();

    const backgroundMusic_AudioRef = useRef(new Audio(soundtrack));


    useEffect(() => {
        backgroundMusic_AudioRef.current.volume = Volume;
    }, [Volume]);

    useEffect(() => {

        const backgroundMusic_Audio = backgroundMusic_AudioRef.current;
        backgroundMusic_Audio.loop = true;

        backgroundMusic_Audio.play().catch((err) => {
            console.warn('Autoplay failed:', err);
        });

        return () => {
            backgroundMusic_Audio.pause(); // Stop the backgroundMusic_Audio when the component is unmounted
            backgroundMusic_Audio.currentTime = 0;
            backgroundMusic_Audio.loop = false;
        };

    }, []);



    return (
        <backgroundMusic_Context.Provider value={{backgroundMusic_AudioRef}}>
            {children}
        </backgroundMusic_Context.Provider>
    );
}

export function useBackgroundMusic() {
    return useContext(backgroundMusic_Context);
}