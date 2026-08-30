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




export const helpers_Player_UIIndicatorSounds = (parameter_Key_SoundToPlay) => {

    const AudioFileKey = "file";
    const AudioVolumeKey = "volume";

    const bound_Sequence_SoundDictionary = {

        [audioNavButtonPressKey] : {[AudioFileKey]: NavButtonPress, [AudioVolumeKey]: 1},
        [audioSelectionButtonPressKey] : {[AudioFileKey]: SelectionButtonPress, [AudioVolumeKey]: 0.75},
        [audioScreenButtonPressKey] : {[AudioFileKey]: ScreenButtonPress, [AudioVolumeKey]: 0.5},
        [audioRestartGameKey] : {[AudioFileKey] : RestartGame, [AudioVolumeKey] : 0.25},
        [audioAdoptionConfirmationErrorKey] : {[AudioFileKey]: AdoptionConfirmationError, [AudioVolumeKey]: 0.5},
        [audioStartActivityKey] : {[AudioFileKey]: StartActivity, [AudioVolumeKey]: 0.5},
        [audioActivitySuccessKey] : {[AudioFileKey]: ActivitySuccess, [AudioVolumeKey]: 0.5},
        [audioActivityFailKey] : {[AudioFileKey]: ActivityFail, [AudioVolumeKey]: 0.5},
        [audioAdoptionSuccessKey] : {[AudioFileKey]: AdoptionSuccess, [AudioVolumeKey]: 0.5},
        [audioClearPetsKey] : {[AudioFileKey]: ClearPets, [AudioVolumeKey]: 0.5},
        [audioQuitActivityKey] : {[AudioFileKey]: QuitActivity, [AudioVolumeKey]: 0.75},
        [audioAddedDecorationsKey] : {[AudioFileKey]: AddedDecorations, [AudioVolumeKey]: 0.75},
        [audioRevivedPetKey] : {[AudioFileKey]: RevivedPet, [AudioVolumeKey]: 0.75},
        [audioSwapPetSpaceKey] : {[AudioFileKey]: SwapPetSpace, [AudioVolumeKey] : 0.75}

    };

    const bound_Audio_SoundDictionaryEntry = new Audio(bound_Sequence_SoundDictionary[parameter_Key_SoundToPlay][AudioFileKey]);
    bound_Audio_SoundDictionaryEntry.volume = bound_Sequence_SoundDictionary[parameter_Key_SoundToPlay][AudioVolumeKey];
    bound_Audio_SoundDictionaryEntry.play();

}


export const helpers_Opener_Flags = (set_parameter_Boolean_OpenFlag, parameter_Number_FlagToOpenType) => {

    if (parameter_Number_FlagToOpenType === 0){

        helpers_Player_UIIndicatorSounds(audioNavButtonPressKey);

    } else {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

    }

    set_parameter_Boolean_OpenFlag(true);

}



export const helpers_Closer_Flags = (set_parameter_Boolean_OpenFlag) => {
    
    helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);
    set_parameter_Boolean_OpenFlag(false);

}
