import { bathingKey, feedingKey, healthKey, playingKey } from "../constants/Constants";

export const CheckPetHealth = (PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetName, minimum, activity, matchedSelection) => {

    const now = Date.now();
    const updatedPetList = structuredClone(PetList);

    if (now - PetTimeStamps[ActivePetName][activity][0] < minimum){
    //Too much

        if (activity === feedingKey){

            updatedPetList[ActivePetName][healthKey] = Math.max(updatedPetList[ActivePetName][healthKey] - 3, 0);

        } else if (activity === bathingKey) {

            updatedPetList[ActivePetName][healthKey] = Math.max(updatedPetList[ActivePetName][healthKey] - 1, 0);

        } else if (activity === playingKey){

            updatedPetList[ActivePetName][healthKey] = Math.max(updatedPetList[ActivePetName][healthKey] - 2, 0);

        }

    }

    if (matchedSelection === false){
    // not desired option

        updatedPetList[ActivePetName][healthKey] = Math.max(updatedPetList[ActivePetName][healthKey] - 1, 0);

    }


    setPetList(prev => ({

        ...prev,

        [ActivePetName]: {

            ...prev[ActivePetName],
            [healthKey]: updatedPetList[ActivePetName][healthKey]

        }

    }));

    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [activity]: [now, prev[ActivePetName][activity][1]]
            
        }

    }));

}