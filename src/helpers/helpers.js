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




export const helpers_PlaySound = (helpers_PlaySound_SoundEffect) => {

    const helpers_PlaySound_ButtonAudioKey = "helpers_PlaySound_Audio";
    const helpers_PlaySound_ButtonVolumeKey = "volume";

    const helpers_PlaySound_SoundDictionary = {

        [soundNavButtonPressKey] : {[helpers_PlaySound_ButtonAudioKey]: NavButtonPress, [helpers_PlaySound_ButtonVolumeKey]: 1},
        [soundSelectionButtonPressKey] : {[helpers_PlaySound_ButtonAudioKey]: SelectionButtonPress, [helpers_PlaySound_ButtonVolumeKey]: 0.75},
        [soundScreenButtonPressKey] : {[helpers_PlaySound_ButtonAudioKey]: ScreenButtonPress, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundRestartGameKey] : {[helpers_PlaySound_ButtonAudioKey] : RestartGame, [helpers_PlaySound_ButtonVolumeKey] : 0.25},
        [soundAdoptionConfirmationErrorKey] : {[helpers_PlaySound_ButtonAudioKey]: AdoptionConfirmationError, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundStartActivityKey] : {[helpers_PlaySound_ButtonAudioKey]: StartActivity, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundActivitySuccessKey] : {[helpers_PlaySound_ButtonAudioKey]: ActivitySuccess, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundActivityFailKey] : {[helpers_PlaySound_ButtonAudioKey]: ActivityFail, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundAdoptionSuccessKey] : {[helpers_PlaySound_ButtonAudioKey]: AdoptionSuccess, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundClearPetsKey] : {[helpers_PlaySound_ButtonAudioKey]: ClearPets, [helpers_PlaySound_ButtonVolumeKey]: 0.5},
        [soundQuitActivityKey] : {[helpers_PlaySound_ButtonAudioKey]: QuitActivity, [helpers_PlaySound_ButtonVolumeKey]: 0.75},
        [soundAddedDecorationsKey] : {[helpers_PlaySound_ButtonAudioKey]: AddedDecorations, [helpers_PlaySound_ButtonVolumeKey]: 0.75},
        [soundRevivedPetKey] : {[helpers_PlaySound_ButtonAudioKey]: RevivedPet, [helpers_PlaySound_ButtonVolumeKey]: 0.75},
        [soundSwapPetSpaceKey] : {[helpers_PlaySound_ButtonAudioKey]: SwapPetSpace, [helpers_PlaySound_ButtonVolumeKey] : 0.75}

    };

    const helpers_PlaySound_Audio = new Audio(helpers_PlaySound_SoundDictionary[helpers_PlaySound_SoundEffect][helpers_PlaySound_ButtonAudioKey]);
    helpers_PlaySound_Audio.volume = helpers_PlaySound_SoundDictionary[helpers_PlaySound_SoundEffect][helpers_PlaySound_ButtonVolumeKey];
    helpers_PlaySound_Audio.play();

}


export const helpers_FlagOpener = (set_Helpers_FlagOpener_FlagToOpen, helpers_FlagOpener_FlagType) => {

    if (helpers_FlagOpener_FlagType === 0){

        helpers_PlaySound(soundNavButtonPressKey);

    } else {

        helpers_PlaySound(soundScreenButtonPressKey);

    }

    set_Helpers_FlagOpener_FlagToOpen(true);

}



export const helpers_FlagCloser = (set_Helpers_FlagCloser_FlagToClose) => {
    
    helpers_PlaySound(soundScreenButtonPressKey);
    set_Helpers_FlagCloser_FlagToClose(false);

}
