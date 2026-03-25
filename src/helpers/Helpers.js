import { cleaningKey, feedingKey, healthKey, playingKey, medicineKey } from "../constants/Constants";

export const CheckPetHealth = (setPetTimeStamps, setPetList, ActivePetName, activity, desiredOption, selection) => {

    const now = Date.now();

    if (desiredOption === -1){
    //Too much (unwilling)

        if (activity === feedingKey){

            setPetList(prev => ({

                ...prev,

                [ActivePetName]: {

                    ...prev[ActivePetName],
                    [healthKey]: Math.max(prev[ActivePetName][healthKey] - 3, 0)
                }

            }));

        } else if (activity === cleaningKey) {

            setPetList(prev => ({

                ...prev,

                [ActivePetName]: {

                    ...prev[ActivePetName],
                    [healthKey]: Math.max(prev[ActivePetName][healthKey] - 1, 0)

                }

            }));

        } else if (activity === playingKey){

            setPetList(prev => ({

                ...prev,

                [ActivePetName]: {

                    ...prev[ActivePetName],
                    [healthKey]: Math.max(prev[ActivePetName][healthKey] - 2, 0)

                }

            }));

        }

    } else if (desiredOption !== selection && desiredOption !== -1){
    // not desired option (willing)

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - 1, 0)
            }

        }));

    }

    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [activity]: [now, prev[ActivePetName][activity][1]]
            
        }

    }));

}


export const healPet = (setPetList, ActivePetName, currentPetHealthCap) => {

    const currentHour = new Date().getHours();

    if (currentHour <= 6 || currentHour >= 20){

        setPetList(prev => ({

            ...prev,
            
            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.min(prev[ActivePetName][healthKey] + 4, currentPetHealthCap),
                [medicineKey]: Date.now()

            }

        })); 

    } else {

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.min(prev[ActivePetName][healthKey] + 2, currentPetHealthCap),
                [medicineKey]: Date.now()

            }

        })); 

    }

}