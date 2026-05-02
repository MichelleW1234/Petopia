import { activityDamage, cleaningKey, feedingKey, healthKey, playingKey } from "../../../constants/Constants";


export const manageHealth = (GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, setDesiredOption, selection, setSuccess) => {

    if (desiredOption === -1){
    //Too much (unwilling)

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - activityDamage[key], 0)
            }

        }));

    } else if (desiredOption !== selection && desiredOption !== -1){
    // not desired option (willing)

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - 1, 0)
            }

        }));

    } else {

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

