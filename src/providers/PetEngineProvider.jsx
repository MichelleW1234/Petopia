import {useEffect, useRef } from "react";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";

import { dogTimeLimits, catTimeLimits, fishTimeLimits, healthKey, stageKey, birthDateKey, speciesKey, feedingKey, bathingKey, playingKey, catSpecies, dogSpecies, fishSpecies} from "../constants/Constants.js";


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

        const runPetChecks = () => {

            console.log("checking");

            const updatedPetTimeStamps = structuredClone(PetTimeStampsRef.current);
            const updatedPetList = structuredClone(PetListRef.current);
            
            // Loop for updating pet health:
            for (const curPetKey in updatedPetTimeStamps){

                // Checking for if pet is alive (not already dead and waiting to be cleared):
                if (updatedPetList[curPetKey][healthKey] > 0) {

                    const healthAffected = damageCheck(updatedPetTimeStamps[curPetKey]);
                    updatedPetList[curPetKey][healthKey] = Math.max(updatedPetList[curPetKey][healthKey] - healthAffected, 0);

                }

            };

            // Loop for updating pet stage:
            for (const curPetKey in updatedPetList){

                // Check pet growth stage if pet is still alive after health update:
                if (updatedPetList[curPetKey][healthKey] > 0){

                    const currentStage = petAgeCheck(updatedPetList[curPetKey]);

                    if (currentStage !== updatedPetList[curPetKey][stageKey]){

                        updatedPetList[curPetKey][stageKey] = currentStage;                             

                    }

                }

            }
    
            setPetTimeStamps(updatedPetTimeStamps);
            setPetList(updatedPetList);

        };

        runPetChecks();

        const interval = setInterval(runPetChecks, millisInOneMinute);

        return () => clearInterval(interval);

    }, []);




    const damageCheck = (currPetTimeStamps) => {

        let petTimeLimits = {};

        if (feedingKey in currPetTimeStamps && bathingKey in currPetTimeStamps && playingKey in currPetTimeStamps){

            petTimeLimits = dogTimeLimits;

        } else if (playingKey in currPetTimeStamps){

            petTimeLimits = catTimeLimits;

        } else if (bathingKey in currPetTimeStamps){

            petTimeLimits = fishTimeLimits;
        
        }

        const damage = 
            {
                [feedingKey]: 4, 
                [bathingKey]: 1, 
                [playingKey]: 2
            };
        let healthAffected = 0;

        // Iterate through every activity of this pet to see how much health damage there is:
        for (const curActivityKey in petTimeLimits){

            // Either last damage update or last activity update (whichever was most recent) used for determining if there should be another damage update:
            let subtrahend = Math.max(currPetTimeStamps[curActivityKey][0], currPetTimeStamps[curActivityKey][1]); 

            const {addedHealthDamage, newPetTimeStamp} = calculatingNewTimes(subtrahend, petTimeLimits[curActivityKey], damage[curActivityKey]);
            currPetTimeStamps[curActivityKey][1] = newPetTimeStamp;
            healthAffected += addedHealthDamage;

        }

        return healthAffected;

    }


    const calculatingNewTimes = (subtrahend, limit, damage) => {

        let addedHealthDamage = 0;
        let intervalsPassed = 0;
        let newPetTimeStamp = subtrahend;

        intervalsPassed = Math.floor((Date.now() - subtrahend) / limit);
        // Calculating the number of times the limit has been passed since last check

        if (intervalsPassed > 0){
        // The time between the last time this activity's damage was updated and the current time is long enough for another damaage and tiemstamp update:

            addedHealthDamage = damage*intervalsPassed; 
            // Amount of damage for current activity * intervals passed
            newPetTimeStamp = subtrahend + intervalsPassed*limit; 
            // Last health timestamp + number of intervals accounted for in new damage update

        }

        return { addedHealthDamage, newPetTimeStamp };

    }


    const petAgeCheck = (pet) => {

        const difference = Date.now() - pet[birthDateKey];

        if(pet[speciesKey] === dogSpecies){
        // Grows every 5 days

            if (difference > 864000000){

                return 3;

            } else if (difference > 432000000){

                return 2;

            } else {

                return 1;

            }

        } else if (pet[speciesKey] === catSpecies){
        // Grows every week

            if (difference > 1209600000){

                return 3;

            } else if (difference > 604800000){

                return 2;

            } else {

                return 1;

            }

        } else if (pet[speciesKey] === fishSpecies){
        // Grows every 3 days

            if (difference > 518400000){

                return 3;

            } else if (difference > 259200000){

                return 2;

            } else {

                return 1;

            }

        }

    }


    return children;

}

