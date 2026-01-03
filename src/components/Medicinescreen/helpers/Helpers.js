export const healPet = (setPetList, ActivePetNumber, currentPetHealthCap) => {

    setPetList(prev => {

        const updatedPetList = prev.map(inner => [...inner]);

        const currentHour = new Date().getHours();
        if (currentHour <= 6 || currentHour >= 20){

            updatedPetList[ActivePetNumber][3] = Math.min(updatedPetList[ActivePetNumber][3] + 4, currentPetHealthCap);

        } else {

            updatedPetList[ActivePetNumber][3] = Math.min(updatedPetList[ActivePetNumber][3] + 2, currentPetHealthCap);

        }

        updatedPetList[ActivePetNumber][5] = Date.now();

        return updatedPetList;

    }); 

}