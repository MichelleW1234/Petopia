import { petActivityTimeStampDamageList, petActivityTimeStampLastDamagedKey, petActivityTimeStampLastPerformedKey, soundNavButtonPressKey, petActivityTimeStampCleaningKey, soundActivityFailKey, petActivityTimeStampFeedingKey, soundScreenButtonPressKey, petHealthKey, petActivityTimeStampPlayingKey, soundQuitActivityKey, soundStartActivityKey, soundActivitySuccessKey } from "../../../constants/Constants.js";
import { helpersFlagCloser, helpersPlaySound } from "../../../helpers/Helpers.js";


export const petScreensHelpersManageHealth = (petScreensHelpersManageHealthGlobalTimer, setPetScreensHelpersManageHealthPetTimeStamps, setPetScreensHelpersManageHealthPetList, petScreensHelpersManageHealthActivePetName, petScreensHelpersManageHealthKey, petScreensHelpersManageHealthDesiredOption, setPetScreensHelpersManageHealthDesiredOption, setPetScreensHelpersManageHealthSelection, setPetScreensHelpersManageHealthSuccess) => {

    if (petScreensHelpersManageHealthDesiredOption === -1){
    //Too much (unwilling)

        helpersPlaySound(soundActivityFailKey);

        setPetScreensHelpersManageHealthPetList(prev => ({

            ...prev,

            [petScreensHelpersManageHealthActivePetName]: {

                ...prev[petScreensHelpersManageHealthActivePetName],
                [petHealthKey]: Math.max(prev[petScreensHelpersManageHealthActivePetName][petHealthKey] - petActivityTimeStampDamageList[petScreensHelpersManageHealthKey], 0)
            }

        }));

    } else if (petScreensHelpersManageHealthDesiredOption !== setPetScreensHelpersManageHealthSelection && petScreensHelpersManageHealthDesiredOption !== -1){
    // not desired option (willing)

        helpersPlaySound(soundActivityFailKey);

        setPetScreensHelpersManageHealthPetList(prev => ({

            ...prev,

            [petScreensHelpersManageHealthActivePetName]: {

                ...prev[petScreensHelpersManageHealthActivePetName],
                [petHealthKey]: Math.max(prev[petScreensHelpersManageHealthActivePetName][petHealthKey] - 1, 0)
            }

        }));

    } else {

        helpersPlaySound(soundActivitySuccessKey);
        setPetScreensHelpersManageHealthSuccess(true);

    }

    setPetScreensHelpersManageHealthPetTimeStamps(prev => ({

        ...prev,

        [petScreensHelpersManageHealthActivePetName]: {
            
            ...prev[petScreensHelpersManageHealthActivePetName],
            [petScreensHelpersManageHealthKey]: {
                ...prev[petScreensHelpersManageHealthActivePetName][petScreensHelpersManageHealthKey],
                [petActivityTimeStampLastPerformedKey]: petScreensHelpersManageHealthGlobalTimer         //THIS!!!!
            }
            
        }

    }));


    setPetScreensHelpersManageHealthDesiredOption(-1);

}


export const petScreensHelpersPauseAudio = (petScreensHelpersPauseAudioAudio) => {

    petScreensHelpersPauseAudioAudio.pause();
    petScreensHelpersPauseAudioAudio.currentTime = 0;

}


export const petScreensHelpersHome = (setPetScreensHelpersHomeActivePetName) => {

    helpersPlaySound(soundNavButtonPressKey);
    setPetScreensHelpersHomeActivePetName("");

}

export const petScreensHelpersQuitActivity = (petScreensHelpersQuitActivityAudioRef, setPetScreensHelpersQuitActivityFlagToClose) => {

    helpersPlaySound(soundQuitActivityKey);
    petScreensHelpersPauseAudio(petScreensHelpersQuitActivityAudioRef.current);
    helpersFlagCloser(setPetScreensHelpersQuitActivityFlagToClose);

}


export const petScreensHelpersStartActivity = (setPetScreensHelpersStartActivityStart) => {

    helpersPlaySound(soundScreenButtonPressKey);
    helpersPlaySound(soundStartActivityKey);
    setPetScreensHelpersStartActivityStart(true);

}
