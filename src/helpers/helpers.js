import button_click from "../Music/UIIndicatorSounds/button_click.mp3";
import button_press from "../Music/UIIndicatorSounds/button_press.mp3";
import gameButton_click from "../Music/UIIndicatorSounds/gameButton_click.mp3";
import error from "../Music/UIIndicatorSounds/error.mp3";
import start from "../Music/UIIndicatorSounds/start.mp3";
import success from "../Music/UIIndicatorSounds/success.mp3";
import fail from "../Music/UIIndicatorSounds/fail.mp3";
import confirmed from "../Music/UIIndicatorSounds/confirmed.mp3";
import cleared from "../Music/UIIndicatorSounds/cleared.mp3";
import restart from "../Music/UIIndicatorSounds/restart.mp3";


import { buttonSoundKey, buttonPressSoundKey, errorSoundKey, startSoundKey, successSoundKey, failSoundKey, gameButtonSoundKey, confirmedSoundKey, clearedSoundKey, restartSoundKey } from "../constants/Constants";


export const playSound = (soundEffect) => {

    const soundDictionary = {

        [buttonSoundKey] : [button_click, 0.5],
        [buttonPressSoundKey] : [button_press, 0.5],
        [gameButtonSoundKey] : [gameButton_click, 0.5],
        [errorSoundKey] : [error, 0.5],
        [startSoundKey] : [start, 0.5],
        [successSoundKey] : [success, 0.5],
        [failSoundKey] : [fail, 0.5],
        [confirmedSoundKey] : [confirmed, 0.5],
        [clearedSoundKey] : [cleared, 0.5],
        [restartSoundKey] : [restart, 0.5]

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

export const screenFlagOpener = (setFlagToOpen) => {

    playSound(gameButtonSoundKey);
    setFlagToOpen(true);

}


export const flagCloser = (setFlagToClose) => {
    
    playSound(buttonSoundKey);
    setFlagToClose(false);

}


export const screenFlagCloser = (setFlagToClose) => {
    
    playSound(gameButtonSoundKey);
    setFlagToClose(false);

}


