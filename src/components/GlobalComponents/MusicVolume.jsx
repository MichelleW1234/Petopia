import{useState, useEffect} from "react";

import useKeyboardShortcut from "../../hooks/useKeyboardShortcut.js";
import { useVolume } from "../../providers/VolumeProvider.jsx";

import { flagCloser, playSound } from "../../helpers/helpers.js";

import speaker from "../../images/speaker.png";

import "./MusicVolume.css";



function MusicVolume({setMusicVolumeOpenFlag}) {

    const {Volume, setVolume} = useVolume();
    



    useKeyboardShortcut("v", () => {
    
        flagCloser(setMusicVolumeOpenFlag);

    },
        ".Close"
    );


    useKeyboardShortcut("ArrowLeft", (e) => {
    
        e.preventDefault();

        setVolume(prev => {

            return Number(Math.max(0, prev - 0.01).toFixed(2));

        })


    },
        ".Slider"
    );

    
    useKeyboardShortcut("ArrowRight", (e) => {
    
        e.preventDefault();

        setVolume(prev => {

            return Number(Math.min(1, prev + 0.01).toFixed(2));

        })


    },
        ".Slider"
    );

    


    // For preloading images:
    useEffect(() => {

        const preloadImages = [speaker];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, []);





    const volumeJump = (e) => {

        const value = Number(Number(e.target.value).toFixed(2));
        setVolume(value);

    }


    

    return (

        <div className="UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1> Music Volume:</h1>
                <div className="MusicVolume_ComponentContainer-Structure--Widget">
                    <img className = "test" src = {speaker}/>
                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation MusicVolume_ComponentContainer-Structure--Slider">
                        <h2>[&#x2B05;] [&#x2B95;]</h2>
                        <input
                            className="Slider"
                            type="range"
                            min="0"
                            max="1"
                            step = "0.01"
                            value={Volume}
                            onChange={volumeJump}
                        />
                    </div>
                </div>

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setMusicVolumeOpenFlag)}> Close <br/> [v]</button>
        </div>
    );
}
  
export default MusicVolume;