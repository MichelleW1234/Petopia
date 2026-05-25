import button_click from "../Music/button_click.mp3";

import { buttonSoundKey } from "../constants/Constants";


export const playSound = (soundEffect) => {

    const soundDictionary = {

        [buttonSoundKey] : [button_click, 0.5],

    };

    const entry = soundDictionary[soundEffect];
    const [soundFile, volume] = entry;
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();

}

