export const healPet = (setPetList, ActivePetNumber, currentPetHealthCap) => {

    setPetList(prev => {

        const updatedPetList = prev.map(inner => [...inner]);

        const currentHour = new Date().getHours();
        if (currentHour <= 6 || currentHour >= 20){

            updatedPetList[ActivePetNumber][4] = Math.min(updatedPetList[ActivePetNumber][4] + 4, currentPetHealthCap);

        } else {

            updatedPetList[ActivePetNumber][4] = Math.min(updatedPetList[ActivePetNumber][4] + 2, currentPetHealthCap);

        }

        updatedPetList[ActivePetNumber][6] = Date.now();

        return updatedPetList;

    }); 

}