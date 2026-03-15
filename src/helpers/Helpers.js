import { bathingKey, feedingKey, healthKey, playingKey } from "../constants/Constants";

export const CheckPetHealth = (PetTimeStamps, setPetTimeStamps, setPetList, ActivePetName, minimum, activity) => {

    const now = Date.now();

    if (now - PetTimeStamps[ActivePetName][activity][0] < minimum){
    //Too much

        if (activity === feedingKey){

            setPetList(prev => ({

                ...prev,

                [ActivePetName]: {

                    ...prev[ActivePetName],
                    [healthKey]: Math.max(prev[ActivePetName][healthKey] - 3, 0)

                }

            }));


        } else if (activity === bathingKey) {


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

    }


    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [activity]: [now, prev[ActivePetName][activity][1]]
            
        }

    }));

}