import button_click from "../Music/button_click.mp3";
import button_press from "../Music/button_press.mp3";
import gameButton_click from "../Music/gameButton_click.mp3";
import error from "../Music/error.mp3";
import start from "../Music/start.mp3";
import success from "../Music/success.mp3";
import fail from "../Music/fail.mp3";


import { buttonSoundKey, buttonPressSoundKey, errorSoundKey, startSoundKey, successSoundKey, failSoundKey, gameButtonSoundKey } from "../constants/Constants";


export const playSound = (soundEffect) => {

    const soundDictionary = {

        [buttonSoundKey] : [button_click, 0.5],
        [buttonPressSoundKey] : [button_press, 0.5],
        [gameButtonSoundKey] : [gameButton_click, 0.3],
        [errorSoundKey] : [error, 1],
        [startSoundKey] : [start, 1],
        [successSoundKey] : [success, 1],
        [failSoundKey] : [fail, 1]

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