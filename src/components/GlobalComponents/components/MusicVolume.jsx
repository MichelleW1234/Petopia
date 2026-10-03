import{useState} from "react";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { useVolume } from "../../../providers/VolumeProvider.jsx";

import { helpers_Closer_Flags} from "../../../helpers/helpers.js";

import VolumeSpeaker from "../../../images/VolumeSpeaker.png";
import VolumeMusicNote from "../../../images/VolumeMusicNote.png";

import "../../../App.css";
import "./MusicVolume.css";



function MusicVolume({set_MusicVolume_OpenFlag}) {

    const {Volume, setVolume} = useVolume();


    useKeyboardShortcut("Enter", () => {

        helpers_Closer_Flags(set_MusicVolume_OpenFlag);

    },
        ".Done"
    );




    const musicVolume_VolumeShifter = (musicVolume_VolumeShifter_E) => {

        const musicVolume_VolumeShifter_CurrVolume = Number(Number(musicVolume_VolumeShifter_E.target.value).toFixed(2));
        setVolume(musicVolume_VolumeShifter_CurrVolume);

    }


    

    return (

        <div className="UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">
                <div className="UIStapleElements_ComponentFrame-Template--Global MusicVolume_ComponentContainer-Structure--Widget">
                    <div className="MusicVolume_ComponentContainer-Structure--Content">
                        <img className="MusicVolume_ComponentContainer-Structure--WidgetImage" src = {VolumeSpeaker}/>
                        <input
                            className="MusicVolume_ComponentContainer-Structure--Slider"
                            type="range"
                            min="0"
                            max="1"
                            step = "0.05"
                            value={Volume}
                            onChange={musicVolume_VolumeShifter}
                        />
                    </div>
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Done" onClick = {() => helpers_Closer_Flags(set_MusicVolume_OpenFlag)}> 
                    <div>
                        Done <br/> [return]
                    </div>
                </button>
                    
            </div>

        </div>
    );
}
  
export default MusicVolume;