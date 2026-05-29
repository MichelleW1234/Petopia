import { createContext, useRef, useEffect } from 'react';
import soundtrack from "../Music/PetopiaSoundTrack.mp3";

export const BackgroundMusicContext = createContext();

export function BackgroundMusicProvider({ children }) {

    const audioRef = useRef(new Audio(soundtrack));

    useEffect(() => {

        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = 0.2;

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
        <BackgroundMusicContext.Provider value={audioRef}>
            {children}
        </BackgroundMusicContext.Provider>
    );
}