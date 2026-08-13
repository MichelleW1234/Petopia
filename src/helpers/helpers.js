import { navButtonPressSoundKey, selectionButtonPressSoundKey, confirmationErrorSoundKey, startActivitySoundKey, activitySuccessSoundKey, activityFailSoundKey, screenButtonPressSoundKey, adoptionSuccessSoundKey, clearPetsSoundKey, restartGameSoundKey, quitActivitySoundKey} from "../constants/Constants.js";

import NavButtonPress from "../Music/UIIndicatorSounds/NavButtonPress.mp3";
import SelectionButtonPress from "../Music/UIIndicatorSounds/SelectionButtonPress.mp3";
import ScreenButtonPress from "../Music/UIIndicatorSounds/ScreenButtonPress.mp3";
import AdoptionConfirmationError from "../Music/UIIndicatorSounds/AdoptionConfirmationError.mp3";
import StartActivity from "../Music/UIIndicatorSounds/StartActivity.mp3";
import ActivitySuccess from "../Music/UIIndicatorSounds/ActivitySuccess.mp3";
import ActivityFail from "../Music/UIIndicatorSounds/ActivityFail.mp3";
import AdoptionSuccess from "../Music/UIIndicatorSounds/AdoptionSuccess.mp3";
import ClearPets from "../Music/UIIndicatorSounds/ClearPets.mp3";
import RestartGame from "../Music/UIIndicatorSounds/RestartGame.mp3";
import QuitActivity from "../Music/UIIndicatorSounds/QuitActivity.mp3";



export const playSound = (soundEffect) => {

    const buttonAudioKey = "audio";
    const buttonVolumeKey = "volume";

    const soundDictionary = {

        [navButtonPressSoundKey] : {[buttonAudioKey]: NavButtonPress, [buttonVolumeKey]: 1},
        [selectionButtonPressSoundKey] : {[buttonAudioKey]: SelectionButtonPress, [buttonVolumeKey]: 0.75},
        [screenButtonPressSoundKey] : {[buttonAudioKey]: ScreenButtonPress, [buttonVolumeKey]: 0.5},
        [confirmationErrorSoundKey] : {[buttonAudioKey]: AdoptionConfirmationError, [buttonVolumeKey]: 0.5},
        [startActivitySoundKey] : {[buttonAudioKey]: StartActivity, [buttonVolumeKey]: 0.5},
        [activitySuccessSoundKey] : {[buttonAudioKey]: ActivitySuccess, [buttonVolumeKey]: 0.5},
        [activityFailSoundKey] : {[buttonAudioKey]: ActivityFail, [buttonVolumeKey]: 0.5},
        [adoptionSuccessSoundKey] : {[buttonAudioKey]: AdoptionSuccess, [buttonVolumeKey]: 0.5},
        [clearPetsSoundKey] : {[buttonAudioKey]: ClearPets, [buttonVolumeKey]: 0.5},
        [restartGameSoundKey] : {[buttonAudioKey]: RestartGame, [buttonVolumeKey]: 0.5},
        [quitActivitySoundKey] : {[buttonAudioKey]: QuitActivity, [buttonVolumeKey]: 0.75}

    };

    const audio = new Audio(soundDictionary[soundEffect][buttonAudioKey]);
    audio.volume = soundDictionary[soundEffect][buttonVolumeKey];
    audio.play();

}


export const flagOpener = (setFlagToOpen, flagType) => {

    if (flagType === 0){

        playSound(navButtonPressSoundKey);

    } else {

        playSound(screenButtonPressSoundKey);

    }

    setFlagToOpen(true);

}



export const flagCloser = (setFlagToClose) => {
    
    playSound(screenButtonPressSoundKey);
    setFlagToClose(false);

}


export const errorMessageTimer = (message, setErrorMessage, confirmationTimeoutRef) => {

    playSound(confirmationErrorSoundKey);

    setErrorMessage(message);

    if (confirmationTimeoutRef.current) {
        clearTimeout(confirmationTimeoutRef.current);
    }

    confirmationTimeoutRef.current = setTimeout(() => {
        setErrorMessage("");
        confirmationTimeoutRef.current = null;
    }, 5000); 

}

