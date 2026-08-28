import { soundNavButtonPressKey, soundSelectionButtonPressKey, soundAdoptionConfirmationErrorKey, soundStartActivityKey, soundActivitySuccessKey, soundActivityFailKey, soundScreenButtonPressKey, soundAdoptionSuccessKey, soundClearPetsKey, soundQuitActivityKey, soundAddedDecorationsKey, soundRevivedPetKey, soundSwapPetSpaceKey, soundRestartGameKey} from "../constants/Constants.js";

import NavButtonPress from "../Music/UIIndicatorSounds/NavButtonPress.mp3";
import SelectionButtonPress from "../Music/UIIndicatorSounds/SelectionButtonPress.mp3";
import ScreenButtonPress from "../Music/UIIndicatorSounds/ScreenButtonPress.mp3";
import RestartGame from "../Music/UIIndicatorSounds/RestartGame.mp3";
import AdoptionConfirmationError from "../Music/UIIndicatorSounds/AdoptionConfirmationError.mp3";
import StartActivity from "../Music/UIIndicatorSounds/StartActivity.mp3";
import ActivitySuccess from "../Music/UIIndicatorSounds/ActivitySuccess.mp3";
import ActivityFail from "../Music/UIIndicatorSounds/ActivityFail.mp3";
import AdoptionSuccess from "../Music/UIIndicatorSounds/AdoptionSuccess.mp3";
import ClearPets from "../Music/UIIndicatorSounds/ClearPets.mp3";
import QuitActivity from "../Music/UIIndicatorSounds/QuitActivity.mp3";
import AddedDecorations from "../Music/UIIndicatorSounds/AddedDecorations.mp3";
import RevivedPet from "../Music/UIIndicatorSounds/RevivedPet.mp3";
import SwapPetSpace from "../Music/UIIndicatorSounds/SwapPetSpace.mp3";




export const helpersPlaySound = (helpersPlaySoundSoundEffect) => {

    const helpersPlaySoundButtonAudioKey = "helpersPlaySoundAudio";
    const helpersPlaySoundButtonVolumeKey = "volume";

    const helpersPlaySoundSoundDictionary = {

        [soundNavButtonPressKey] : {[helpersPlaySoundButtonAudioKey]: NavButtonPress, [helpersPlaySoundButtonVolumeKey]: 1},
        [soundSelectionButtonPressKey] : {[helpersPlaySoundButtonAudioKey]: SelectionButtonPress, [helpersPlaySoundButtonVolumeKey]: 0.75},
        [soundScreenButtonPressKey] : {[helpersPlaySoundButtonAudioKey]: ScreenButtonPress, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundRestartGameKey] : {[helpersPlaySoundButtonAudioKey] : RestartGame, [helpersPlaySoundButtonVolumeKey] : 0.25},
        [soundAdoptionConfirmationErrorKey] : {[helpersPlaySoundButtonAudioKey]: AdoptionConfirmationError, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundStartActivityKey] : {[helpersPlaySoundButtonAudioKey]: StartActivity, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundActivitySuccessKey] : {[helpersPlaySoundButtonAudioKey]: ActivitySuccess, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundActivityFailKey] : {[helpersPlaySoundButtonAudioKey]: ActivityFail, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundAdoptionSuccessKey] : {[helpersPlaySoundButtonAudioKey]: AdoptionSuccess, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundClearPetsKey] : {[helpersPlaySoundButtonAudioKey]: ClearPets, [helpersPlaySoundButtonVolumeKey]: 0.5},
        [soundQuitActivityKey] : {[helpersPlaySoundButtonAudioKey]: QuitActivity, [helpersPlaySoundButtonVolumeKey]: 0.75},
        [soundAddedDecorationsKey] : {[helpersPlaySoundButtonAudioKey]: AddedDecorations, [helpersPlaySoundButtonVolumeKey]: 0.75},
        [soundRevivedPetKey] : {[helpersPlaySoundButtonAudioKey]: RevivedPet, [helpersPlaySoundButtonVolumeKey]: 0.75},
        [soundSwapPetSpaceKey] : {[helpersPlaySoundButtonAudioKey]: SwapPetSpace, [helpersPlaySoundButtonVolumeKey] : 0.75}

    };

    const helpersPlaySoundAudio = new Audio(helpersPlaySoundSoundDictionary[helpersPlaySoundSoundEffect][helpersPlaySoundButtonAudioKey]);
    helpersPlaySoundAudio.volume = helpersPlaySoundSoundDictionary[helpersPlaySoundSoundEffect][helpersPlaySoundButtonVolumeKey];
    helpersPlaySoundAudio.play();

}


export const helpersFlagOpener = (setHelpersFlagOpenerFlagToOpen, helpersFlagOpenerFlagType) => {

    if (helpersFlagOpenerFlagType === 0){

        helpersPlaySound(soundNavButtonPressKey);

    } else {

        helpersPlaySound(soundScreenButtonPressKey);

    }

    setHelpersFlagOpenerFlagToOpen(true);

}



export const helpersFlagCloser = (setHelpersFlagCloserFlagToClose) => {
    
    helpersPlaySound(soundScreenButtonPressKey);
    setHelpersFlagCloserFlagToClose(false);

}
