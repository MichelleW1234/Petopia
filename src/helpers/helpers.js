import { soundNavButtonPressKey, soundSelectionButtonPressKey, soundAdoptionConfirmationErrorKey, soundStartActivityKey, soundActivitySuccessKey, soundActivityFailKey, soundScreenButtonPressKey, soundAdoptionSuccessKey, soundClearPetsKey, soundRestartGameKey, soundQuitActivityKey, soundAddedDecorationsKey, soundRevivedPetKey} from "../constants/Constants.js";

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
import AddedDecorations from "../Music/UIIndicatorSounds/AddedDecorations.mp3";
import RevivedPet from "../Music/UIIndicatorSounds/RevivedPet.mp3";



export const playSound = (soundEffect) => {

    const buttonAudioKey = "audio";
    const buttonVolumeKey = "volume";

    const soundDictionary = {

        [soundNavButtonPressKey] : {[buttonAudioKey]: NavButtonPress, [buttonVolumeKey]: 1},
        [soundSelectionButtonPressKey] : {[buttonAudioKey]: SelectionButtonPress, [buttonVolumeKey]: 0.75},
        [soundScreenButtonPressKey] : {[buttonAudioKey]: ScreenButtonPress, [buttonVolumeKey]: 0.5},
        [soundAdoptionConfirmationErrorKey] : {[buttonAudioKey]: AdoptionConfirmationError, [buttonVolumeKey]: 0.5},
        [soundStartActivityKey] : {[buttonAudioKey]: StartActivity, [buttonVolumeKey]: 0.5},
        [soundActivitySuccessKey] : {[buttonAudioKey]: ActivitySuccess, [buttonVolumeKey]: 0.5},
        [soundActivityFailKey] : {[buttonAudioKey]: ActivityFail, [buttonVolumeKey]: 0.5},
        [soundAdoptionSuccessKey] : {[buttonAudioKey]: AdoptionSuccess, [buttonVolumeKey]: 0.5},
        [soundClearPetsKey] : {[buttonAudioKey]: ClearPets, [buttonVolumeKey]: 0.5},
        [soundRestartGameKey] : {[buttonAudioKey]: RestartGame, [buttonVolumeKey]: 0.5},
        [soundQuitActivityKey] : {[buttonAudioKey]: QuitActivity, [buttonVolumeKey]: 0.75},
        [soundAddedDecorationsKey] : {[buttonAudioKey]: AddedDecorations, [buttonVolumeKey]: 0.75},
        [soundRevivedPetKey] : {[buttonAudioKey]: RevivedPet, [buttonVolumeKey]: 0.75}

    };

    const audio = new Audio(soundDictionary[soundEffect][buttonAudioKey]);
    audio.volume = soundDictionary[soundEffect][buttonVolumeKey];
    audio.play();

}


export const flagOpener = (setFlagToOpen, flagType) => {

    if (flagType === 0){

        playSound(soundNavButtonPressKey);

    } else {

        playSound(soundScreenButtonPressKey);

    }

    setFlagToOpen(true);

}



export const flagCloser = (setFlagToClose) => {
    
    playSound(soundScreenButtonPressKey);
    setFlagToClose(false);

}
