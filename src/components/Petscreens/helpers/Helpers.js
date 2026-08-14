import { petActivityTimeStampDamageList, petActivityTimeStampLastDamagedKey, petActivityTimeStampLastPerformedKey, soundNavButtonPressKey, petActivityTimeStampCleaningKey, soundActivityFailKey, petActivityTimeStampFeedingKey, soundScreenButtonPressKey, petHealthKey, petActivityTimeStampPlayingKey, soundQuitActivityKey, soundStartActivityKey, soundActivitySuccessKey } from "../../../constants/Constants.js";
import { flagCloser, playSound } from "../../../helpers/Helpers.js";


export const manageHealth = (GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, setDesiredOption, selection, setSuccess) => {

    if (desiredOption === -1){
    //Too much (unwilling)

        playSound(soundActivityFailKey);

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [petHealthKey]: Math.max(prev[ActivePetName][petHealthKey] - petActivityTimeStampDamageList[key], 0)
            }

        }));

    } else if (desiredOption !== selection && desiredOption !== -1){
    // not desired option (willing)

        playSound(soundActivityFailKey);

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [petHealthKey]: Math.max(prev[ActivePetName][petHealthKey] - 1, 0)
            }

        }));

    } else {

        playSound(soundActivitySuccessKey);
        setSuccess(true);

    }

    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [key]: {
                ...prev[ActivePetName][key],
                [petActivityTimeStampLastPerformedKey]: GlobalTimer         //THIS!!!!
            }
            
        }

    }));


    setDesiredOption(-1);

}


export const pauseAudio = (audio) => {

    audio.pause();
    audio.currentTime = 0;

}


export const home = (setActivePetName) => {

    playSound(soundNavButtonPressKey);
    setActivePetName("");

}

export const quitActivity = (audioRef, setFlagToClose) => {

    playSound(soundQuitActivityKey);
    pauseAudio(audioRef.current);
    flagCloser(setFlagToClose);

}


export const startActivity = (setStart) => {

    playSound(soundScreenButtonPressKey);
    playSound(soundStartActivityKey);
    setStart(true);

}
