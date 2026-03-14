export const CheckPetHealth = (PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, minimum, activity) => {

    const now = Date.now();

    if (now - PetTimeStamps[ActivePetNumber][activity][0] < minimum){
    //Too much

        if (activity === "feeding"){

            setPetList(prev => ({

                ...prev,

                [ActivePetNumber]: {

                    ...prev[ActivePetNumber],
                    "health": Math.max(prev[ActivePetNumber]["health"] - 3, 0)

                }

            }));


        } else if (activity === "bathing") {


            setPetList(prev => ({

                ...prev,
                
                [ActivePetNumber]: {

                    ...prev[ActivePetNumber],
                    "health": Math.max(prev[ActivePetNumber]["health"] - 1, 0)

                }

            }));


        } else if (activity === "playing"){


            setPetList(prev => ({

                ...prev,
                
                [ActivePetNumber]: {

                    ...prev[ActivePetNumber],
                    "health": Math.max(prev[ActivePetNumber]["health"] - 2, 0)

                }

            }));


        }

    }


    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetNumber]: {
            
            ...prev[ActivePetNumber],
            [activity]: [now, prev[ActivePetNumber][activity][1]]
            
        }

    }));

}