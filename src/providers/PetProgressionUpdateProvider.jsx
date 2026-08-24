import { useEffect, useRef } from "react";

import { useGlobalTimer } from "./GlobalTimerProvider.jsx";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";

import {petHealthKey, petStageKey, petBirthDateKey, petSpeciesKey, petActivityTimeStampFeedingKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey, petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesActivityTimeStampTimeLimitList, petActivityTimeStampDamageList, petSpeciesHealthCapList, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey} from "../constants/Constants.js";


export function PetProgressionUpdateProvider({ children }) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const { GlobalTimer } = useGlobalTimer();

    const PetTimeStampsRef = useRef(PetTimeStamps);
    const PetListRef = useRef(PetList);



    useEffect(() => {
        PetTimeStampsRef.current = PetTimeStamps;
    }, [PetTimeStamps]);

    useEffect(() => {
        PetListRef.current = PetList;
    }, [PetList]);

    useEffect(() => {

        const currDate = GlobalTimer;
        allPetChecks(currDate);

    }, [Math.floor(GlobalTimer / 60000)]);




    const allPetChecks = (currDate) => {

        console.log("checking");

        const updatedPetTimeStamps = structuredClone(PetTimeStampsRef.current);
        const updatedPetList = structuredClone(PetListRef.current);
        
        // Loop for updating pet health:
        for (const curPetKey in updatedPetTimeStamps){

            // Checking for if pet is alive (not already dead and waiting to be cleared):
            if (updatedPetList[curPetKey][petHealthKey] > 0) {

                const healthAffected = damageCheck(currDate, updatedPetTimeStamps[curPetKey]);
                updatedPetList[curPetKey][petHealthKey] = Math.max(updatedPetList[curPetKey][petHealthKey] - healthAffected, 0);

            }

        };

        // Loop for updating pet stage:
        for (const curPetKey in updatedPetList){

            // Check pet growth stage if pet is still alive after health update:
            if (updatedPetList[curPetKey][petHealthKey] > 0){

                const currentStage = petAgeCheck(currDate, updatedPetList[curPetKey]);

                if (currentStage !== updatedPetList[curPetKey][petStageKey]){
   
                    updatedPetList[curPetKey][petHealthKey] += (petSpeciesHealthCapList[updatedPetList[curPetKey][petSpeciesKey]][currentStage] - petSpeciesHealthCapList[updatedPetList[curPetKey][petSpeciesKey]][updatedPetList[curPetKey][petStageKey]]);
                    updatedPetList[curPetKey][petStageKey] = currentStage; 

                }

            }

        }

        setPetTimeStamps(updatedPetTimeStamps);
        setPetList(updatedPetList);

    };


    const damageCheck = (currDate, currPetTimeStamps) => {

        let petTimeLimits = {};

        if (petActivityTimeStampFeedingKey in currPetTimeStamps && petActivityTimeStampCleaningKey in currPetTimeStamps && petActivityTimeStampPlayingKey in currPetTimeStamps){

            petTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey];

        } else if (petActivityTimeStampPlayingKey in currPetTimeStamps){

            petTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey];

        } else if (petActivityTimeStampCleaningKey in currPetTimeStamps){

            petTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey];
        
        }

        let healthAffected = 0;

        // Iterate through every activity of this pet to see how much health damage there is:
        for (const curActivityKey in petTimeLimits){

            // Either last damage update or last activity update (whichever was most recent) used for determining if there should be another damage update:
            let subtrahend = Math.max(currPetTimeStamps[curActivityKey][petActivityTimeStampLastPerformedKey], currPetTimeStamps[curActivityKey][petActivityTimeStampLastDamagedKey]); 

            const {addedHealthDamage, newPetTimeStamp} = calculatingNewTimes(currDate, subtrahend, petTimeLimits[curActivityKey], petActivityTimeStampDamageList[curActivityKey]);
            currPetTimeStamps[curActivityKey][petActivityTimeStampLastDamagedKey] = newPetTimeStamp;
            healthAffected += addedHealthDamage;

        }

        return healthAffected;

    }


    const calculatingNewTimes = (currDate, subtrahend, limit, damage) => {

        let addedHealthDamage = 0;
        let intervalsPassed = 0;
        let newPetTimeStamp = subtrahend;

        intervalsPassed = Math.floor((currDate - subtrahend) / limit);
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


    const petAgeCheck = (currDate, pet) => {

        const difference = currDate - pet[petBirthDateKey];

        if(pet[petSpeciesKey] === petSpeciesDogKey){
        // Grows every 5 days

            if (difference > 900000){

                return 2;

            } else if (difference > 432000000){

                return 1;

            } else {

                return 0;

            }

        } else if (pet[petSpeciesKey] === petSpeciesCatKey){
        // Grows every week

            if (difference > 600000){

                return 2;

            } else if (difference > 604800000){

                return 1;

            } else {

                return 0;

            }

        } else if (pet[petSpeciesKey] === petSpeciesFishKey){
        // Grows every 3 days

            if (difference > 300000){

                return 2;

            } else if (difference > 259200000){

                return 1;

            } else {

                return 0;

            }

        }

    }

    return children;

}

