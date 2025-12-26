import {useEffect, useRef } from "react";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";


export function PetEngineProvider({ children }) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const millisInOneMinute = 60000; 

    const PetTimeStampsRef = useRef(PetTimeStamps);
    const PetListRef = useRef(PetList);

    useEffect(() => {
        PetTimeStampsRef.current = PetTimeStamps;
    }, [PetTimeStamps]);

    useEffect(() => {
        PetListRef.current = PetList;
    }, [PetList]);

    useEffect(() => {

        const runCheck = () => {

            const updatedPetTimeStamps = PetTimeStampsRef.current.map(pet =>
                                            pet.map(group =>
                                                [...group]
                                            )
                                        );
            const updatedPetList = PetListRef.current.map(inner => [...inner]);
            
            
            for (let i = 0; i<updatedPetTimeStamps.length; i++){

                if (updatedPetTimeStamps[i].length > 0 && updatedPetList[i].length > 0) {

                    const { healthAffected, newPetTimeStamps } = damageCheck(updatedPetTimeStamps[i]);
                    updatedPetTimeStamps[i] = newPetTimeStamps;
                    updatedPetList[i][3] = Math.max(updatedPetList[i][3] - healthAffected, 0);

                }

            };
    
            setPetTimeStamps(updatedPetTimeStamps);
            setPetList(updatedPetList);

        };

        runCheck();

        const interval = setInterval(runCheck, millisInOneMinute);

        return () => clearInterval(interval);

    }, []);




    const damageCheck = (oldPetTimeStamps) => {

        const newPetTimeStamps = oldPetTimeStamps.map(inner => [...inner]);
        const damage = [4, 1, 2];
        let healthAffected = 0;
        let petTimeLimits;

        if (!newPetTimeStamps.some(sub => sub.length === 1 && sub[0] === -1)){
        // There is no element [-1] (dog)
        //[eat 2 times a day, bath 1 time a day, play 2 times a day]

            petTimeLimits = [43200000, 86400000, 43200000];
            //petTimeLimits = [180000, 300000, 180000]; //for testing purposes

        } else if (newPetTimeStamps[1].length === 1 && newPetTimeStamps[1][0] === -1){
        // There is an element [-1] at index 1 (cat)
        //[eat 3 times a day, doesn't need baths, play 1 time a day]

            petTimeLimits = [28800000, 0, 86400000];
            //petTimeLimits = [180000, 0, 180000]; //for testing purposes

        } else if (newPetTimeStamps[2].length === 1 && newPetTimeStamps[2][0] === -1){
        // There is an element [-1] at index 2 (fish)
        //[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]

            petTimeLimits = [86400000, 86400000, 0];
            //petTimeLimits = [180000, 300000, 0]; //for testing purposes

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

        } else {

            newPetTimeStamp = subtrahend;

        }

        return { addedHealthDamage, newPetTimeStamp };

    }

    return children;

}