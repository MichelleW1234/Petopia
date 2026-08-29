import { petActivityTimeStampDamageList, petActivityTimeStampLastDamagedKey, petActivityTimeStampLastPerformedKey, audioNavButtonPressKey, petActivityTimeStampCleaningKey, audioActivityFailKey, petActivityTimeStampFeedingKey, audioScreenButtonPressKey, petHealthKey, petActivityTimeStampPlayingKey, audioQuitActivityKey, audioStartActivityKey, audioActivitySuccessKey } from "../../../constants/Constants.js";
import { helpers_FlagCloser, helpers_AudioPlayer } from "../../../helpers/Helpers.js";


export const petScreensHelpers_HealthManager = (petScreensHelpers_HealthManager_CurrDate, set_PetScreensHelpers_HealthManager_PetTimeStamps, set_PetScreensHelpers_HealthManager_PetList, petScreensHelpers_HealthManager_CurrActivePetName, petScreensHelpers_HealthManager_CurrActivityKey, petScreensHelpers_HealthManager_CurrDesiredOption, set_PetScreensHelpers_HealthManager_CurrDesiredOption, set_PetScreensHelpers_HealthManager_UserSelection, set_PetScreensHelpers_HealthManager_Success) => {

    if (petScreensHelpers_HealthManager_CurrDesiredOption === -1){
    //Too much (unwilling)

        helpers_AudioPlayer(audioActivityFailKey);

        set_PetScreensHelpers_HealthManager_PetList(prev => ({

            ...prev,

            [petScreensHelpers_HealthManager_CurrActivePetName]: {

                ...prev[petScreensHelpers_HealthManager_CurrActivePetName],
                [petHealthKey]: Math.max(prev[petScreensHelpers_HealthManager_CurrActivePetName][petHealthKey] - petActivityTimeStampDamageList[petScreensHelpers_HealthManager_CurrActivityKey], 0)
            }

        }));

    } else if (petScreensHelpers_HealthManager_CurrDesiredOption !== set_PetScreensHelpers_HealthManager_UserSelection && petScreensHelpers_HealthManager_CurrDesiredOption !== -1){
    // not desired option (willing)

        helpers_AudioPlayer(audioActivityFailKey);

        set_PetScreensHelpers_HealthManager_PetList(prev => ({

            ...prev,

            [petScreensHelpers_HealthManager_CurrActivePetName]: {

                ...prev[petScreensHelpers_HealthManager_CurrActivePetName],
                [petHealthKey]: Math.max(prev[petScreensHelpers_HealthManager_CurrActivePetName][petHealthKey] - 1, 0)
            }

        }));

    } else {

        helpers_AudioPlayer(audioActivitySuccessKey);
        set_PetScreensHelpers_HealthManager_Success(true);

    }

    set_PetScreensHelpers_HealthManager_PetTimeStamps(prev => ({

        ...prev,

        [petScreensHelpers_HealthManager_CurrActivePetName]: {
            
            ...prev[petScreensHelpers_HealthManager_CurrActivePetName],
            [petScreensHelpers_HealthManager_CurrActivityKey]: {
                ...prev[petScreensHelpers_HealthManager_CurrActivePetName][petScreensHelpers_HealthManager_CurrActivityKey],
                [petActivityTimeStampLastPerformedKey]: petScreensHelpers_HealthManager_CurrDate         //THIS!!!!
            }
            
        }

    }));


    set_PetScreensHelpers_HealthManager_CurrDesiredOption(-1);

}


export const petScreensHelpers_AudioCanceller = (petScreensHelpers_AudioCanceller_CurrAudio) => {

    petScreensHelpers_AudioCanceller_CurrAudio.pause();
    petScreensHelpers_AudioCanceller_CurrAudio.currentTime = 0;

}


export const petScreensHelpers_HomeNavigator = (set_PetScreensHelpers_HomeNavigator_ActivePetName) => {

    helpers_AudioPlayer(audioNavButtonPressKey);
    set_PetScreensHelpers_HomeNavigator_ActivePetName("");

}

export const petScreensHelpers_ActivityCanceller = (petScreensHelpers_ActivityCanceller_CurrActivityAudioRef, set_PetScreensHelpers_ActivityQuitter_CurrFlag) => {

    helpers_AudioPlayer(audioQuitActivityKey);
    petScreensHelpers_AudioCanceller(petScreensHelpers_ActivityCanceller_CurrActivityAudioRef.current);
    helpers_FlagCloser(set_PetScreensHelpers_ActivityQuitter_CurrFlag);

}


export const petScreensHelpers_ActivityStarter = (set_PetScreensHelpers_ActivityStarter_Start) => {

    helpers_AudioPlayer(audioScreenButtonPressKey);
    helpers_AudioPlayer(audioStartActivityKey);
    set_PetScreensHelpers_ActivityStarter_Start(true);

}
