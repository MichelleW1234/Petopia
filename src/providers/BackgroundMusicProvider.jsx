import { createContext, useContext, useRef, useEffect, useState } from 'react';
import soundtrack from "../Music/PetopiaSoundTrack.mp3";
import {useVolume} from "./VolumeProvider.jsx";

export const BackgroundMusicContext = createContext();

export function BackgroundMusicProvider({ children }) {

    const {Volume} = useVolume();

    const audioRef = useRef(new Audio(soundtrack));




    useEffect(() => {
        audioRef.current.volume = Volume;
    }, [Volume]);

    useEffect(() => {

        const audio = audioRef.current;
        audio.loop = true;

        audio.play().catch((err) => {
            console.warn('Autoplay failed:', err);
        });

        return () => {
            audio.pause(); // Stop the audio when the component is unmounted
            audio.currentTime = 0;
            audio.loop = false;
        };

    }, []);



    return (
        <BackgroundMusicContext.Provider value={{audioRef}}>
            {children}
        </BackgroundMusicContext.Provider>
    );
}

export function useBackgroundMusic() {
    return useContext(BackgroundMusicContext);
}