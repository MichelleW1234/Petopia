import { healthKey, medicineKey } from "../../../constants/Constants";

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