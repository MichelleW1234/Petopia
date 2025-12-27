export const CheckPetHealth = (PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, minimum, activity) => {

    const updatedPetTimeStamps = PetTimeStamps.map(pet =>
                                    pet.map(group =>
                                        [...group]
                                    )
                                );
    const updatedPetList = PetList.map(inner => [...inner]);

    const now = Date.now();

    if (now - updatedPetTimeStamps[ActivePetNumber][activity][0] < minimum){
    //Over fed

        if (activity === 0){

            updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 3, 0);

        } else if (activity === 1){

            updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 1, 0);

        } else if (activity === 2){

            updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 2, 0);

        }
       
    }

    updatedPetTimeStamps[ActivePetNumber][activity][0] = now;

    setPetTimeStamps(updatedPetTimeStamps);
    setPetList(updatedPetList);
        
}
