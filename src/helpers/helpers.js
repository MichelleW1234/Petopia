import button_click from "../Music/button_click.mp3";
import button_press from "../Music/button_press.mp3";
import error from "../Music/error.mp3";

import { buttonSoundKey, buttonPressSoundKey, errorSoundKey } from "../constants/Constants";


export const playSound = (soundEffect) => {

    const soundDictionary = {

        [buttonSoundKey] : [button_click, 0.5],
        [buttonPressSoundKey] : [button_press, 0.5],
        [errorSoundKey] : [error, 1]

    };

    const entry = soundDictionary[soundEffect];
    const [soundFile, volume] = entry;
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();

}



export const flagOpener = (setFlagToOpen) => {

    playSound(buttonSoundKey);
    setFlagToOpen(true);

}


export const flagCloser = (setFlagToClose) => {

    playSound(buttonSoundKey);
    setFlagToClose(false);

}