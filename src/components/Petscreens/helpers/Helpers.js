import { activityDamage, activityLastDamageKey, activityLastPerformedKey, navButtonPressSoundKey, cleaningKey, activityFailSoundKey, feedingKey, screenButtonPressSoundKey, healthKey, playingKey, quitActivitySoundKey, startActivitySoundKey, activitySuccessSoundKey } from "../../../constants/Constants.js";
import { flagCloser, playSound } from "../../../helpers/Helpers.js";


export const manageHealth = (GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, setDesiredOption, selection, setSuccess) => {

    if (desiredOption === -1){
    //Too much (unwilling)

        playSound(activityFailSoundKey);

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - activityDamage[key], 0)
            }

        }));

    } else if (desiredOption !== selection && desiredOption !== -1){
    // not desired option (willing)

        playSound(activityFailSoundKey);

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - 1, 0)
            }

        }));

    } else {

        playSound(activitySuccessSoundKey);
        setSuccess(true);

    }

    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [key]: {
                ...prev[ActivePetName][key],
                [activityLastPerformedKey]: GlobalTimer         //THIS!!!!
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

    playSound(navButtonPressSoundKey);
    setActivePetName("");

}

export const quitActivity = (audioRef, setFlagToClose) => {

    playSound(quitActivitySoundKey);
    pauseAudio(audioRef.current);
    flagCloser(setFlagToClose);

}


export const startActivity = (setStart) => {

    playSound(screenButtonPressSoundKey);
    playSound(startActivitySoundKey);
    setStart(true);

}
