export const WashPet = (PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetNumber, minimum) => {

    const updatedPetTimeStamps = PetTimeStamps.map(pet =>
                                    pet.map(group =>
                                        [...group]
                                    )
                                );
    const updatedPetList = PetList.map(inner => [...inner]);

    const now = Date.now();

    if (now - updatedPetTimeStamps[ActivePetNumber][1][0] < minimum){
    //Over fed

        updatedPetList[ActivePetNumber][3] = Math.max(updatedPetList[ActivePetNumber][3] - 1, 0);

    }

    updatedPetTimeStamps[ActivePetNumber][1][0] = now;

    setPetTimeStamps(updatedPetTimeStamps);
    setPetList(updatedPetList);
        
}
