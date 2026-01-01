export const CheckPetHealth = (PetTimeStamps, setPetTimeStamps, setPetList, ActivePetNumber, minimum, activity) => {

    const now = Date.now();

    setPetList(prev => {

        const updatedPetList = prev.map(inner => [...inner]);

        if (now - PetTimeStamps[ActivePetNumber][activity][0] < minimum){
        //Over fed

            if (activity === 0){

                updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 3, 0);

            } else if (activity === 1){

                updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 1, 0);

            } else if (activity === 2){

                updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 2, 0);

            }
        
        }

        return updatedPetList;

    });


    setPetTimeStamps(prev => {

        const updatedPetTimeStamps = prev.map(pet =>
                                pet.map(group =>
                                    [...group]
                                )
                            );

        updatedPetTimeStamps[ActivePetNumber][activity][0] = now;

        return updatedPetTimeStamps;

    });

}