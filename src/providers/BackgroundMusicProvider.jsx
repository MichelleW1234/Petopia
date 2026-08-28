import { createContext, useContext, useRef, useEffect, useState } from 'react';
import soundtrack from "../Music/PetopiaSoundTrack.mp3";
import {useVolume} from "./VolumeProvider.jsx";

export const BackgroundMusicContext = createContext();

export function BackgroundMusicProvider({ children }) {

    const {Volume} = useVolume();

    const backgroundMusicAudioRef = useRef(new Audio(soundtrack));


    useEffect(() => {
        backgroundMusicAudioRef.current.volume = Volume;
    }, [Volume]);

    useEffect(() => {

        const backgroundMusicAudio = backgroundMusicAudioRef.current;
        backgroundMusicAudio.loop = true;

        backgroundMusicAudio.play().catch((err) => {
            console.warn('Autoplay failed:', err);
        });

        return () => {
            backgroundMusicAudio.pause(); // Stop the backgroundMusicAudio when the component is unmounted
            backgroundMusicAudio.currentTime = 0;
            backgroundMusicAudio.loop = false;
        };

    }, []);



    return (
        <BackgroundMusicContext.Provider value={{backgroundMusicAudioRef}}>
            {children}
        </BackgroundMusicContext.Provider>
    );
}

export function useBackgroundMusic() {
    return useContext(BackgroundMusicContext);
}