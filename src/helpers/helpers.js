import { audioNavButtonPressKey, audioSelectionButtonPressKey, audioAdoptionConfirmationErrorKey, audioStartActivityKey, audioActivitySuccessKey, audioActivityFailKey, audioScreenButtonPressKey, audioAdoptionSuccessKey, audioClearPetsKey, audioQuitActivityKey, audioAddedDecorationsKey, audioRevivedPetKey, audioSwapPetSpaceKey, audioRestartGameKey} from "../constants/Constants.js";

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




export const helpers_AudioPlayer = (helpers_AudioPlayer_CurrAudioKey) => {

    const helpers_AudioPlayer_AudioFileKey = "helpers_AudioPlayer_CurrAudio";
    const helpers_AudioPlayer_AudioVolumeKey = "volume";

    const helpers_AudioPlayer_AudioDictionary = {

        [audioNavButtonPressKey] : {[helpers_AudioPlayer_AudioFileKey]: NavButtonPress, [helpers_AudioPlayer_AudioVolumeKey]: 1},
        [audioSelectionButtonPressKey] : {[helpers_AudioPlayer_AudioFileKey]: SelectionButtonPress, [helpers_AudioPlayer_AudioVolumeKey]: 0.75},
        [audioScreenButtonPressKey] : {[helpers_AudioPlayer_AudioFileKey]: ScreenButtonPress, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioRestartGameKey] : {[helpers_AudioPlayer_AudioFileKey] : RestartGame, [helpers_AudioPlayer_AudioVolumeKey] : 0.25},
        [audioAdoptionConfirmationErrorKey] : {[helpers_AudioPlayer_AudioFileKey]: AdoptionConfirmationError, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioStartActivityKey] : {[helpers_AudioPlayer_AudioFileKey]: StartActivity, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioActivitySuccessKey] : {[helpers_AudioPlayer_AudioFileKey]: ActivitySuccess, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioActivityFailKey] : {[helpers_AudioPlayer_AudioFileKey]: ActivityFail, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioAdoptionSuccessKey] : {[helpers_AudioPlayer_AudioFileKey]: AdoptionSuccess, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioClearPetsKey] : {[helpers_AudioPlayer_AudioFileKey]: ClearPets, [helpers_AudioPlayer_AudioVolumeKey]: 0.5},
        [audioQuitActivityKey] : {[helpers_AudioPlayer_AudioFileKey]: QuitActivity, [helpers_AudioPlayer_AudioVolumeKey]: 0.75},
        [audioAddedDecorationsKey] : {[helpers_AudioPlayer_AudioFileKey]: AddedDecorations, [helpers_AudioPlayer_AudioVolumeKey]: 0.75},
        [audioRevivedPetKey] : {[helpers_AudioPlayer_AudioFileKey]: RevivedPet, [helpers_AudioPlayer_AudioVolumeKey]: 0.75},
        [audioSwapPetSpaceKey] : {[helpers_AudioPlayer_AudioFileKey]: SwapPetSpace, [helpers_AudioPlayer_AudioVolumeKey] : 0.75}

    };

    const helpers_AudioPlayer_CurrAudio = new Audio(helpers_AudioPlayer_AudioDictionary[helpers_AudioPlayer_CurrAudioKey][helpers_AudioPlayer_AudioFileKey]);
    helpers_AudioPlayer_CurrAudio.volume = helpers_AudioPlayer_AudioDictionary[helpers_AudioPlayer_CurrAudioKey][helpers_AudioPlayer_AudioVolumeKey];
    helpers_AudioPlayer_CurrAudio.play();

}


export const helpers_FlagOpener = (set_Helpers_FlagOpener_CurrFlag, helpers_FlagOpener_CurrFlagType) => {

    if (helpers_FlagOpener_CurrFlagType === 0){

        helpers_AudioPlayer(audioNavButtonPressKey);

    } else {

        helpers_AudioPlayer(audioScreenButtonPressKey);

    }

    set_Helpers_FlagOpener_CurrFlag(true);

}



export const helpers_FlagCloser = (set_Helpers_FlagCloser_CurrFlag) => {
    
    helpers_AudioPlayer(audioScreenButtonPressKey);
    set_Helpers_FlagCloser_CurrFlag(false);

}
