export const healPet = (setPetList, ActivePetNumber, currentPetHealthCap) => {

    const currentHour = new Date().getHours();

    if (currentHour <= 6 || currentHour >= 20){

        setPetList(prev => ({

            ...prev,
            
            [ActivePetNumber]: {

                ...prev[ActivePetNumber],
                "health": Math.min(prev[ActivePetNumber]["health"] + 4, currentPetHealthCap),
                "medicine": Date.now()

            }

        })); 

    } else {

        setPetList(prev => ({

            ...prev,

            [ActivePetNumber]: {

                ...prev[ActivePetNumber],
                "health": Math.min(prev[ActivePetNumber]["health"] + 2, currentPetHealthCap),
                "medicine": Date.now()

            }

        })); 

    }
   

}