import { petActivityTimeStampDamageList, petActivityTimeStampLastDamagedKey, petActivityTimeStampLastPerformedKey, soundNavButtonPressKey, petActivityTimeStampCleaningKey, soundActivityFailKey, petActivityTimeStampFeedingKey, soundScreenButtonPressKey, petHealthKey, petActivityTimeStampPlayingKey, soundQuitActivityKey, soundStartActivityKey, soundActivitySuccessKey } from "../../../constants/Constants.js";
import { helpers_FlagCloser, helpers_PlaySound } from "../../../helpers/Helpers.js";


export const petScreensHelpers_ManageHealth = (petScreensHelpers_ManageHealth_GlobalTimer, set_PetScreensHelpers_ManageHealth_PetTimeStamps, set_PetScreensHelpers_ManageHealth_PetList, petScreensHelpers_ManageHealth_ActivePetName, petScreensHelpers_ManageHealth_Key, petScreensHelpers_ManageHealth_DesiredOption, set_PetScreensHelpers_ManageHealth_DesiredOption, set_PetScreensHelpers_ManageHealth_Selection, set_PetScreensHelpers_ManageHealth_Success) => {

    if (petScreensHelpers_ManageHealth_DesiredOption === -1){
    //Too much (unwilling)

        helpers_PlaySound(soundActivityFailKey);

        set_PetScreensHelpers_ManageHealth_PetList(prev => ({

            ...prev,

            [petScreensHelpers_ManageHealth_ActivePetName]: {

                ...prev[petScreensHelpers_ManageHealth_ActivePetName],
                [petHealthKey]: Math.max(prev[petScreensHelpers_ManageHealth_ActivePetName][petHealthKey] - petActivityTimeStampDamageList[petScreensHelpers_ManageHealth_Key], 0)
            }

        }));

    } else if (petScreensHelpers_ManageHealth_DesiredOption !== set_PetScreensHelpers_ManageHealth_Selection && petScreensHelpers_ManageHealth_DesiredOption !== -1){
    // not desired option (willing)

        helpers_PlaySound(soundActivityFailKey);

        set_PetScreensHelpers_ManageHealth_PetList(prev => ({

            ...prev,

            [petScreensHelpers_ManageHealth_ActivePetName]: {

                ...prev[petScreensHelpers_ManageHealth_ActivePetName],
                [petHealthKey]: Math.max(prev[petScreensHelpers_ManageHealth_ActivePetName][petHealthKey] - 1, 0)
            }

        }));

    } else {

        helpers_PlaySound(soundActivitySuccessKey);
        set_PetScreensHelpers_ManageHealth_Success(true);

    }

    set_PetScreensHelpers_ManageHealth_PetTimeStamps(prev => ({

        ...prev,

        [petScreensHelpers_ManageHealth_ActivePetName]: {
            
            ...prev[petScreensHelpers_ManageHealth_ActivePetName],
            [petScreensHelpers_ManageHealth_Key]: {
                ...prev[petScreensHelpers_ManageHealth_ActivePetName][petScreensHelpers_ManageHealth_Key],
                [petActivityTimeStampLastPerformedKey]: petScreensHelpers_ManageHealth_GlobalTimer         //THIS!!!!
            }
            
        }

    }));


    set_PetScreensHelpers_ManageHealth_DesiredOption(-1);

}


export const petScreensHelpers_PauseAudio = (petScreensHelpers_PauseAudio_Audio) => {

    petScreensHelpers_PauseAudio_Audio.pause();
    petScreensHelpers_PauseAudio_Audio.currentTime = 0;

}


export const petScreensHelpers_Home = (set_PetScreensHelpers_Home_ActivePetName) => {

    helpers_PlaySound(soundNavButtonPressKey);
    set_PetScreensHelpers_Home_ActivePetName("");

}

export const petScreensHelpers_QuitActivity = (petScreensHelpers_QuitActivity_AudioRef, set_PetScreensHelpers_QuitActivity_FlagToClose) => {

    helpers_PlaySound(soundQuitActivityKey);
    petScreensHelpers_PauseAudio(petScreensHelpers_QuitActivity_AudioRef.current);
    helpers_FlagCloser(set_PetScreensHelpers_QuitActivity_FlagToClose);

}


export const petScreensHelpers_StartActivity = (set_PetScreensHelpers_StartActivity_Start) => {

    helpers_PlaySound(soundScreenButtonPressKey);
    helpers_PlaySound(soundStartActivityKey);
    set_PetScreensHelpers_StartActivity_Start(true);

}
