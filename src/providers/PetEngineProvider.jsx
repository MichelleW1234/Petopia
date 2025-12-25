import { useEffect, useRef } from "react";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";

export function PetEngineProvider({ children }) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const millisInOneHour = 3600000; 

    useEffect(() => {

        const runCheck = () => {

            let newHealthArray = [];
    
            setPetTimeStamps(prev => {
                
                const updatedPetTimeStamps = prev.map(pet =>
                                                pet.map(group =>
                                                    [...group]
                                                )
                                            );
                
                
                for (let i = 0; i< updatedPetTimeStamps.length; i++){

                    if (updatedPetTimeStamps[i].length > 0) {

                        const { healthAffected, newPetTimeStamps } = damageCheck(updatedPetTimeStamps[i]);
                        updatedPetTimeStamps[i] = newPetTimeStamps;
                        newHealthArray.push(healthAffected);

                    } else {

                        newHealthArray[i] = -1;

                    }

                };

                return updatedPetTimeStamps;
            
            });


            setPetList(prev => {

                const petListCopy = prev.map(inner => [...inner]);

                for (let i = 0; i < newHealthArray.length; i++){

                    if (newHealthArray[i] !== -1){

                        petListCopy[i][3] = Math.max(petListCopy[i][3] - newHealthArray[i], 0);

                    }

                }

                return petListCopy;

            });

        };

        runCheck();

        const interval = setInterval(runCheck, millisInOneHour);

        return () => clearInterval(interval);

    }, []);




    const damageCheck = (petTimeStamps) => {

        const newPetTimeStamps = petTimeStamps.map(inner => [...inner]);
        const damage = [4, 1, 2];
        let healthAffected = 0;
        let petTimeLimits;

        if (!newPetTimeStamps.some(sub => sub.length === 1 && sub[0] === -1)){
        // There is no element [-1] (dog)

            petTimeLimits = [46800000, 90000000, 46800000];

        } else if (newPetTimeStamps[1].length === 1 && newPetTimeStamps[1][0] === -1){
        // There is an element [-1] at index 1 (cat)

            petTimeLimits = [46800000, 0, 46800000];

        } else if (newPetTimeStamps[2].length === 1 && newPetTimeStamps[2][0] === -1){
        // There is an element [-1] at index 2 (fish)

            petTimeLimits = [46800000, 90000000, 0];

        }

        // Iterate through every activity of this pet to see how much health damage there is:
        for (let i=0; i<petTimeLimits.length; i++){

            if (petTimeLimits[i] === 0){
            // [-1] so not applicable

                continue;

            }

            let subtrahend = Math.max(newPetTimeStamps[i][0], newPetTimeStamps[i][1]); 

            const {addedHealthDamage, newPetTimeStamp} = calculatingNewTimes(newPetTimeStamps[i][1], subtrahend, petTimeLimits[i], damage[i]);
            newPetTimeStamps[i][1] = newPetTimeStamp;
            healthAffected += addedHealthDamage;

        }

        return { healthAffected, newPetTimeStamps };

    }


    const calculatingNewTimes = (oldPetTimeStamp, subtrahend, limit, damage) => {

        let addedHealthDamage = 0;
        let intervalsPassed = 0;
        let newPetTimeStamp = oldPetTimeStamp; 
        const timeElapsed = Date.now() - subtrahend;

        if (timeElapsed > limit){
            intervalsPassed = Math.floor(timeElapsed / limit);
            addedHealthDamage = damage*intervalsPassed;
        }

        if (intervalsPassed > 0){
        //the time between the last time this activity's damage was updated and the current time is long enough for another update:

            newPetTimeStamp = subtrahend + intervalsPassed*limit;

        }

        return { addedHealthDamage, newPetTimeStamp };

    }


    return children;

}