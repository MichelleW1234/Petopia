import { activityDamage, buttonSoundKey, cleaningKey, failSoundKey, feedingKey, gameButtonSoundKey, healthKey, playingKey, startSoundKey, successSoundKey } from "../../../constants/Constants";
import { flagCloser, playSound, screenFlagCloser } from "../../../helpers/helpers";


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


export const pauseAudios = (audioRefs) => {

    audioRefs.current.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

}


export const home = (setActivePetName) => {

    playSound(buttonSoundKey);
    setActivePetName("");

}

export const quit = (audioRef, setFlagToClose) => {

    pauseAudios(audioRef);
    screenFlagCloser(setFlagToClose);

}


export const starter = (setStart) => {

    playSound(gameButtonSoundKey);
    playSound(startSoundKey);
    setStart(true);

}
