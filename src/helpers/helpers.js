import { audioPillButtonPressKey, audioCircleButtonPressKey, audioAdoptionConfirmationErrorKey, audioStartActivityKey, audioActivitySuccessKey, audioActivityFailKey, audioRectangleButtonPressKey, audioAdoptionSuccessKey, audioClearPetsKey, audioQuitActivityKey, audioAddedDecorationsKey, audioRevivePetKey, audioSwapPetSpaceKey, audioRestartGameKey, audioConfirmedKey} from "../constants/Constants.js";

import PillButtonPress from "../Music/UIIndicatorSounds/PillButtonPress.mp3";
import CircleButtonPress from "../Music/UIIndicatorSounds/CircleButtonPress.mp3";
import RectangleButtonPress from "../Music/UIIndicatorSounds/RectangleButtonPress.mp3";
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
import Confirmed from "../Music/UIIndicatorSounds/Confirmed.mp3";




export const helpers_Player_UIIndicatorSounds = (parameter_Key_SoundToPlay) => {

    const bound_Sequence_SoundDictionary = {

        [audioPillButtonPressKey] : PillButtonPress,
        [audioCircleButtonPressKey] : CircleButtonPress,
        [audioRectangleButtonPressKey] : RectangleButtonPress,
        [audioRestartGameKey] : RestartGame,
        [audioAdoptionConfirmationErrorKey] : AdoptionConfirmationError,
        [audioStartActivityKey] : StartActivity,
        [audioActivitySuccessKey] : ActivitySuccess,
        [audioActivityFailKey] : ActivityFail,
        [audioAdoptionSuccessKey] : AdoptionSuccess,
        [audioClearPetsKey] : ClearPets,
        [audioQuitActivityKey] : QuitActivity,
        [audioAddedDecorationsKey] : AddedDecorations,
        [audioRevivePetKey] : RevivedPet,
        [audioSwapPetSpaceKey] : SwapPetSpace,
        [audioConfirmedKey] : Confirmed

    };

    const bound_Audio_SoundDictionaryEntry = new Audio(bound_Sequence_SoundDictionary[parameter_Key_SoundToPlay]);
    bound_Audio_SoundDictionaryEntry.volume = 0.5;
    bound_Audio_SoundDictionaryEntry.play();

}


export const helpers_Opener_Flags = (set_parameter_Boolean_OpenFlag, parameter_Number_FlagToOpenType) => {

    helpers_Player_UIIndicatorSounds(audioRectangleButtonPressKey);

    set_parameter_Boolean_OpenFlag(true);

}



export const helpers_Closer_Flags = (set_parameter_Boolean_OpenFlag) => {
    
    helpers_Player_UIIndicatorSounds(audioPillButtonPressKey);
    set_parameter_Boolean_OpenFlag(false);

}



export const helpers_Quit = (set_parameter_Boolean_OpenFlag) => {

    helpers_Player_UIIndicatorSounds(audioQuitActivityKey);
    helpers_Closer_Flags(set_parameter_Boolean_OpenFlag);

}