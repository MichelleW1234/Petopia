import { activityDamage, buttonSoundKey, cleaningKey, failSoundKey, feedingKey, gameButtonSoundKey, healthKey, playingKey, startSoundKey, successSoundKey } from "../../../constants/Constants.js";
import { flagCloser, playSound } from "../../../helpers/helpers.js";


export const manageHealth = (GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, setDesiredOption, selection, setSuccess) => {

    if (desiredOption === -1){
    //Too much (unwilling)

        playSound(failSoundKey);

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - activityDamage[key], 0)
            }

        }));

    } else if (desiredOption !== selection && desiredOption !== -1){
    // not desired option (willing)

        playSound(failSoundKey);

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - 1, 0)
            }

        }));

    } else {

        playSound(successSoundKey);

        setSuccess(true);

    }

    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [key]: [GlobalTimer, prev[ActivePetName][key][1]]
            
        }

    }));

    setDesiredOption(-1);

}


export const pauseAudio = (audio) => {

    audio.pause();
    audio.currentTime = 0;

}


export const home = (setActivePetName) => {

    playSound(buttonSoundKey);
    setActivePetName("");

}

export const quitActivity = (audioRef, setFlagToClose) => {

    pauseAudio(audioRef.current);
    flagCloser(setFlagToClose);

}


export const startActivity = (setStart) => {

    playSound(gameButtonSoundKey);
    playSound(startSoundKey);
    setStart(true);

}
