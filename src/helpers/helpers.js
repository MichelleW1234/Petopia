import { buttonSoundKey, buttonPressSoundKey, errorSoundKey, startSoundKey, successSoundKey, failSoundKey, gameButtonSoundKey, confirmedSoundKey, clearedSoundKey, restartSoundKey, quitSoundKey} from "../constants/Constants.js";

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
import quit from "../Music/UIIndicatorSounds/quit.mp3";



export const playSound = (soundEffect) => {

    const buttonAudioKey = "audio";
    const buttonVolumeKey = "volume";

    const soundDictionary = {

        [buttonSoundKey] : {[buttonAudioKey]: button_click, [buttonVolumeKey]: 1},
        [buttonPressSoundKey] : {[buttonAudioKey]: button_press, [buttonVolumeKey]: 0.75},
        [gameButtonSoundKey] : {[buttonAudioKey]: gameButton_click, [buttonVolumeKey]: 0.5},
        [errorSoundKey] : {[buttonAudioKey]: error, [buttonVolumeKey]: 0.5},
        [startSoundKey] : {[buttonAudioKey]: start, [buttonVolumeKey]: 0.5},
        [successSoundKey] : {[buttonAudioKey]: success, [buttonVolumeKey]: 0.5},
        [failSoundKey] : {[buttonAudioKey]: fail, [buttonVolumeKey]: 0.5},
        [confirmedSoundKey] : {[buttonAudioKey]: confirmed, [buttonVolumeKey]: 0.25},
        [clearedSoundKey] : {[buttonAudioKey]: cleared, [buttonVolumeKey]: 0.5},
        [restartSoundKey] : {[buttonAudioKey]: restart, [buttonVolumeKey]: 0.25},
        [quitSoundKey] : {[buttonAudioKey]: quit, [buttonVolumeKey]: 0.75}

    };

    const audio = new Audio(soundDictionary[soundEffect][buttonAudioKey]);
    audio.volume = soundDictionary[soundEffect][buttonVolumeKey];
    audio.play();

}


export const flagOpener = (setFlagToOpen, flagType) => {

    if (flagType === 0){

        playSound(buttonSoundKey);

    } else {

        playSound(gameButtonSoundKey);

    }

    setFlagToOpen(true);

}



export const flagCloser = (setFlagToClose) => {
    
    playSound(gameButtonSoundKey);
    setFlagToClose(false);

}


