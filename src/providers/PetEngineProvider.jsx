import {useEffect, useRef } from "react";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";

import { dogTimeLimits, catTimeLimits, fishTimeLimits} from "../constants/Constants.js";


export function PetEngineProvider({ children }) {

    /*
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

            console.log("checking");

            const updatedPetTimeStamps = PetTimeStampsRef.current.map(pet =>
                                            pet.map(group =>
                                                [...group]
                                            )
                                        );
            const updatedPetList = PetListRef.current.map(inner => [...inner]);
            
            
            for (let i = 0; i<updatedPetTimeStamps.length; i++){

                // Checking for existence of pet:
                if (updatedPetTimeStamps[i].length > 0 && updatedPetList[i].length > 0) {

                    // Checking for if pet is alive:
                    if (updatedPetList[i][4] > 0) {

                        const healthAffected = damageCheck(updatedPetTimeStamps[i]);
                        updatedPetList[i][4] = Math.max(updatedPetList[i][4] - healthAffected, 0);

                        // Update pet growth stage if pet is still alive:
                        if (updatedPetList[i][4] > 0){

                            const currentStage = petAgeCheck(updatedPetList[i]);

                            if (currentStage !== updatedPetList[i][3]){

                                updatedPetList[i][3] = currentStage;                             

                            }

                        }

                    }

                }

            };
    
            setPetTimeStamps(updatedPetTimeStamps);
            setPetList(updatedPetList);

        };

        runCheck();

        const interval = setInterval(runCheck, millisInOneMinute);

        return () => clearInterval(interval);

    }, []);




    const damageCheck = (currPetTimeStamps) => {

        let petTimeLimits;

        if (!currPetTimeStamps.some(sub => sub.length === 1 && sub[0] === -1)){
        // There is no element [-1] (dog)

            petTimeLimits = dogTimeLimits;

        } else if (currPetTimeStamps[1].length === 1 && currPetTimeStamps[1][0] === -1){
        // There is an element [-1] at index 1 (cat)

            petTimeLimits = catTimeLimits;

        } else if (currPetTimeStamps[2].length === 1 && currPetTimeStamps[2][0] === -1){
        // There is an element [-1] at index 2 (fish)

            petTimeLimits = fishTimeLimits;

        }

        const damage = [4, 1, 2];
        let healthAffected = 0;

        // Iterate through every activity of this pet to see how much health damage there is:
        for (let i=0; i<petTimeLimits.length; i++){

            if (petTimeLimits[i] === 0){
            // [-1] so not applicable

                continue;

            }

            let subtrahend = Math.max(currPetTimeStamps[i][0], currPetTimeStamps[i][1]); 

            const {addedHealthDamage, newPetTimeStamp} = calculatingNewTimes(subtrahend, petTimeLimits[i], damage[i]);
            currPetTimeStamps[i][1] = newPetTimeStamp;
            healthAffected += addedHealthDamage;

        }

        return healthAffected;

    }


    const calculatingNewTimes = (subtrahend, limit, damage) => {

        let addedHealthDamage = 0;
        let intervalsPassed = 0;
        let newPetTimeStamp = subtrahend; 
        const timeElapsed = Date.now() - subtrahend;

        if (timeElapsed > limit){

            intervalsPassed = Math.floor(timeElapsed / limit);

            if (intervalsPassed > 0){
            //the time between the last time this activity's damage was updated and the current time is long enough for another damaage and tiemstamp update:

                addedHealthDamage = damage*intervalsPassed;
                newPetTimeStamp = subtrahend + intervalsPassed*limit;

            }

        }

        return { addedHealthDamage, newPetTimeStamp };

    }


    const petAgeCheck = (pet) => {

        const dogAges = [432000000, 864000000];
        // Grows every 5 days

        const catAges = [604800000, 1209600000];
        // Grows every week

        const fishAges = [259200000, 518400000];
        // Grows every 3 days

        const difference = Date.now() - pet[5];

        if(pet[1] === "dog"){

            if (difference > dogAges[1]){

                return 3;

            } else if (difference > dogAges[0]){

                return 2;

            } else {

                return 1;

            }

        } else if (pet[1] === "cat"){

            if (difference > catAges[1]){

                return 3;

            } else if (difference > catAges[0]){

                return 2;

            } else {

                return 1;

            }

        } else if (pet[1] === "fish"){

            if (difference > fishAges[1]){

                return 3;

            } else if (difference > fishAges[0]){

                return 2;

            } else {

                return 1;

            }

        }

    }
    */

    return children;

}

