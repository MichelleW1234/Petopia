import{useState} from "react";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { useVolume } from "../../../providers/VolumeProvider.jsx";

import { helpersFlagCloser, helpersPlaySound } from "../../../helpers/Helpers.js";

import VolumeSpeaker from "../../../images/VolumeSpeaker.png";

import "./MusicVolume.css";



function MusicVolume({setMusicVolumeOpenFlag}) {

    const {Volume, setVolume} = useVolume();


    useKeyboardShortcut("Enter", () => {
    
        helpersFlagCloser(setMusicVolumeOpenFlag);

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





    const musicVolumeVolumeJump = (musicVolumeVolumeJumpE) => {

        const musicVolumeVolumeJumpValue = Number(Number(musicVolumeVolumeJumpE.target.value).toFixed(2));
        setVolume(musicVolumeVolumeJumpValue);

    }


    

    return (

        <div className="UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Music Volume:</h1>
                <div className="MusicVolume_ComponentContainer-Structure--Widget">
                    <img src = {VolumeSpeaker}/>
                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation MusicVolume_ComponentContainer-Structure--Slider">
                        <h2>[&#x2B05;] [&#x2B95;]</h2>
                        <input
                            className="Slider"
                            type="range"
                            min="0"
                            max="1"
                            step = "0.01"
                            value={Volume}
                            onChange={musicVolumeVolumeJump}
                        />
                    </div>
                </div>

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpersFlagCloser(setMusicVolumeOpenFlag)}> Close <br/> [return]</button>
        </div>
    );
}
  
export default MusicVolume;