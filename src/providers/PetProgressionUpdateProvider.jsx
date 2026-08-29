import { useEffect, useRef } from "react";

import { useGlobalTimer } from "./GlobalTimerProvider.jsx";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";

import {petHealthKey, petStageKey, petBirthDateKey, petSpeciesKey, petActivityTimeStampFeedingKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey, petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesActivityTimeStampTimeLimitList, petActivityTimeStampDamageList, petSpeciesHealthCapList, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey} from "../constants/Constants.js";


export function PetProgressionUpdateProvider({ children }) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const { GlobalTimer } = useGlobalTimer();

    const petProgressionUpdate_PetTimeStampsRef = useRef(PetTimeStamps);
    const petProgressionUpdate_PetListRef = useRef(PetList);



    useEffect(() => {
        petProgressionUpdate_PetTimeStampsRef.current = PetTimeStamps;
    }, [PetTimeStamps]);

    useEffect(() => {
        petProgressionUpdate_PetListRef.current = PetList;
    }, [PetList]);

    useEffect(() => {

        const petProgressionUpdate_CurrDate = GlobalTimer;
        petProgressionUpdate_PetChecker(petProgressionUpdate_CurrDate);

    }, [Math.floor(GlobalTimer / 60000)]);




    const petProgressionUpdate_PetChecker = (petProgressionUpdate_PetChecker_CurrDate) => {

        console.log("checking");

        const petProgressionUpdate_PetChecker_CurrPetTimeStampsCopy = structuredClone(petProgressionUpdate_PetTimeStampsRef.current);
        const petProgressionUpdate_PetChecker_CurrPetListCopy = structuredClone(petProgressionUpdate_PetListRef.current);

        for (const petProgressionUpdate_PetChecker_CurrPetKey in petProgressionUpdate_PetChecker_CurrPetListCopy){

            // Checking for if pet is alive:
            if (petProgressionUpdate_PetChecker_CurrPetListCopy[petProgressionUpdate_PetChecker_CurrPetKey][petHealthKey] > 0) {

                petProgressionUpdate_DamageChecker(petProgressionUpdate_PetChecker_CurrPetListCopy[petProgressionUpdate_PetChecker_CurrPetKey], petProgressionUpdate_PetChecker_CurrDate, petProgressionUpdate_PetChecker_CurrPetTimeStampsCopy[petProgressionUpdate_PetChecker_CurrPetKey]);
                
                // Check pet growth stage if pet is still alive after health update:
                if (petProgressionUpdate_PetChecker_CurrPetListCopy[petProgressionUpdate_PetChecker_CurrPetKey][petHealthKey] === 0){

                    petProgressionUpdate_PetStageChecker(petProgressionUpdate_PetChecker_CurrDate, petProgressionUpdate_PetChecker_CurrPetListCopy[petProgressionUpdate_PetChecker_CurrPetKey]);

                }

            }

        }

        setPetTimeStamps(petProgressionUpdate_PetChecker_CurrPetTimeStampsCopy);
        setPetList(petProgressionUpdate_PetChecker_CurrPetListCopy);

    };


    const petProgressionUpdate_DamageChecker = (petProgressionUpdate_DamageChecker_CurrPet, petProgressionUpdate_DamageChecker_CurrDate, petProgressionUpdate_DamageChecker_CurrPetTimeStamps) => {

        let petProgressionUpdate_DamageChecker_CurrSpeciesTimeLimits;

        if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageChecker_CurrPetTimeStamps && petActivityTimeStampCleaningKey in petProgressionUpdate_DamageChecker_CurrPetTimeStamps && petActivityTimeStampPlayingKey in petProgressionUpdate_DamageChecker_CurrPetTimeStamps){

            petProgressionUpdate_DamageChecker_CurrSpeciesTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey];

        } else if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageChecker_CurrPetTimeStamps && petActivityTimeStampPlayingKey in petProgressionUpdate_DamageChecker_CurrPetTimeStamps){

            petProgressionUpdate_DamageChecker_CurrSpeciesTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey];

        } else {

            petProgressionUpdate_DamageChecker_CurrSpeciesTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey];
        
        }

        let petProgressionUpdate_DamageChecker_CurrTotalHealthDamage = 0;

        // Iterate through every activity of this pet to see how much health petProgressionUpdateDamage there is:
        for (const petProgressionUpdate_DamageChecker_CurrActivityKey in petProgressionUpdate_DamageChecker_CurrSpeciesTimeLimits){

            // Either last damage update or last activity update (whichever was most recent) used for determining if there should be another petProgressionUpdateDamage update:
            const petProgressionUpdate_DamageChecker_CurrSubtrahend = Math.max(petProgressionUpdate_DamageChecker_CurrPetTimeStamps[petProgressionUpdate_DamageChecker_CurrActivityKey][petActivityTimeStampLastPerformedKey], petProgressionUpdate_DamageChecker_CurrPetTimeStamps[petProgressionUpdate_DamageChecker_CurrActivityKey][petActivityTimeStampLastDamagedKey]); 

            const {petProgressionUpdate_CurrActivityDamageChecker_CurrHealthDamage : petProgressionUpdate_DamageChecker_CurrActivityHealthDamage, petProgressionUpdate_CurrActivityDamageChecker_CurrDamageTimeStamp : petProgressionUpdate_DamageChecker_CurrDamageTimeStamp } = petProgressionUpdate_CurrActivityDamageChecker(petProgressionUpdate_DamageChecker_CurrDate, petProgressionUpdate_DamageChecker_CurrSubtrahend, petProgressionUpdate_DamageChecker_CurrSpeciesTimeLimits[petProgressionUpdate_DamageChecker_CurrActivityKey], petActivityTimeStampDamageList[petProgressionUpdate_DamageChecker_CurrActivityKey]);

            if (petProgressionUpdate_DamageChecker_CurrDamageTimeStamp > petProgressionUpdate_DamageChecker_CurrSubtrahend && petProgressionUpdate_DamageChecker_CurrActivityHealthDamage > 0) {

                petProgressionUpdate_DamageChecker_CurrPetTimeStamps[petProgressionUpdate_DamageChecker_CurrActivityKey][petActivityTimeStampLastDamagedKey] = petProgressionUpdate_DamageChecker_CurrDamageTimeStamp;
                petProgressionUpdate_DamageChecker_CurrTotalHealthDamage += petProgressionUpdate_DamageChecker_CurrActivityHealthDamage;

            }

        }

        // Update health key with any new damage updates:
        if (petProgressionUpdate_DamageChecker_CurrTotalHealthDamage > 0){

            petProgressionUpdate_DamageChecker_CurrPet[petHealthKey] = Math.max(petProgressionUpdate_DamageChecker_CurrPet[petHealthKey] - petProgressionUpdate_DamageChecker_CurrTotalHealthDamage, 0);

        }

    }


    const petProgressionUpdate_CurrActivityDamageChecker = (petProgressionUpdate_CurrActivityDamageChecker_CurrDate, petProgressionUpdate_CurrActivityDamageChecker_CurrSubtrahend, petProgressionUpdate_CurrActivityDamageChecker_CurrActivityTimeLimit, petProgressionUpdate_CurrActivityDamageChecker_CurrActivityDamageValue) => {

        // Calculating the number of times the limit has been passed since last check
        const petProgressionUpdate_CurrActivityDamageChecker_CurrIntervalsPassed = Math.floor((petProgressionUpdate_CurrActivityDamageChecker_CurrDate - petProgressionUpdate_CurrActivityDamageChecker_CurrSubtrahend) / petProgressionUpdate_CurrActivityDamageChecker_CurrActivityTimeLimit);

        // Amount of damage for current activity * intervals passed
        const petProgressionUpdate_CurrActivityDamageChecker_CurrHealthDamage = petProgressionUpdate_CurrActivityDamageChecker_CurrActivityDamageValue*petProgressionUpdate_CurrActivityDamageChecker_CurrIntervalsPassed; 

        // Last health timestamp + number of intervals accounted for in new petProgressionUpdate_CurrActivityDamageChecker_CurrActivityDamageValue update
        const petProgressionUpdate_CurrActivityDamageChecker_CurrDamageTimeStamp = petProgressionUpdate_CurrActivityDamageChecker_CurrSubtrahend + petProgressionUpdate_CurrActivityDamageChecker_CurrIntervalsPassed*petProgressionUpdate_CurrActivityDamageChecker_CurrActivityTimeLimit; 

        return { petProgressionUpdate_CurrActivityDamageChecker_CurrHealthDamage, petProgressionUpdate_CurrActivityDamageChecker_CurrDamageTimeStamp };

    }


    const petProgressionUpdate_PetStageChecker = (petProgressionUpdate_PetStageChecker_CurrDate, petProgressionUpdate_PetStageChecker_CurrPet) => {

        let petProgressionUpdate_PetStageChecker_CurrSpeciesGrowthRate;

        if(petProgressionUpdate_PetStageChecker_CurrPet[petSpeciesKey] === petSpeciesDogKey){
        // Grows every 5 days

            petProgressionUpdate_PetStageChecker_CurrSpeciesGrowthRate = 432000000;

        } else if (petProgressionUpdate_PetStageChecker_CurrPet[petSpeciesKey] === petSpeciesCatKey){
        // Grows every week

            petProgressionUpdate_PetStageChecker_CurrSpeciesGrowthRate = 604800000;

        } else {
        // Grows every 3 days

            petProgressionUpdate_PetStageChecker_CurrSpeciesGrowthRate = 259200000;

        }

        const petProgressionUpdate_PetStageChecker_CurrStage = Math.min(Math.floor((petProgressionUpdate_PetStageChecker_CurrDate - petProgressionUpdate_PetStageChecker_CurrPet[petBirthDateKey]) / petProgressionUpdate_PetStageChecker_CurrSpeciesGrowthRate), 2);
        if (petProgressionUpdate_PetStageChecker_CurrStage > petProgressionUpdate_PetStageChecker_CurrPet[petStageKey]){

            petProgressionUpdate_PetStageChecker_CurrPet[petHealthKey] += (petSpeciesHealthCapList[petProgressionUpdate_PetStageChecker_CurrPet[petSpeciesKey]][petProgressionUpdate_PetStageChecker_CurrStage] - petSpeciesHealthCapList[petProgressionUpdate_PetStageChecker_CurrPet[petSpeciesKey]][petProgressionUpdate_PetStageChecker_CurrPet[petStageKey]]);
            petProgressionUpdate_PetStageChecker_CurrPet[petStageKey] = petProgressionUpdate_PetStageChecker_CurrStage; 

        }

    }

    return children;

}

