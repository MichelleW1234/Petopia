import{useState} from "react";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { useVolume } from "../../../providers/VolumeProvider.jsx";

import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers.js";

import VolumeSpeaker from "../../../images/VolumeSpeaker.png";

import "./MusicVolume.css";



function MusicVolume({set_MusicVolume_OpenFlag}) {

    const {Volume, setVolume} = useVolume();


    useKeyboardShortcut("Enter", () => {
    
        helpers_Closer_Flags(set_MusicVolume_OpenFlag);

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





    const musicVolume_VolumeShifter = (musicVolume_VolumeShifter_E) => {

        const musicVolume_VolumeShifter_CurrVolume = Number(Number(musicVolume_VolumeShifter_E.target.value).toFixed(2));
        setVolume(musicVolume_VolumeShifter_CurrVolume);

    }


    

    return (

        <div className="UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Music Volume:</h1>
                <div className="MusicVolume_ComponentContainer-Structure--Widget">
                    <img src = {VolumeSpeaker}/>
                    <div className="UIStapleElements_ComponentContainerColored-Structure--Global UIStapleElements_ComponentContainerColored-Color--Global--FloatingFlagNonstation MusicVolume_ComponentContainer-Structure--Slider">
                        <h2>[&#x2B05;] [&#x2B95;]</h2>
                        <input
                            className="Slider"
                            type="range"
                            min="0"
                            max="1"
                            step = "0.01"
                            value={Volume}
                            onChange={musicVolume_VolumeShifter}
                        />
                    </div>
                </div>

            </div>

            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_Closer_Flags(set_MusicVolume_OpenFlag)}> Close <br/> [return]</button>
        </div>
    );
}
  
export default MusicVolume;