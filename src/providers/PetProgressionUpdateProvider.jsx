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
        petProgressionUpdate_AllPetChecks(petProgressionUpdate_CurrDate);

    }, [Math.floor(GlobalTimer / 60000)]);




    const petProgressionUpdate_AllPetChecks = (petProgressionUpdate_AllPetChecks_CurrDate) => {

        console.log("checking");

        const petProgressionUpdate_AllPetChecks_UpdatedPetTimeStamps = structuredClone(petProgressionUpdate_PetTimeStampsRef.current);
        const petProgressionUpdate_AllPetChecks_UpdatedPetList = structuredClone(petProgressionUpdate_PetListRef.current);

        for (const petProgressionUpdate_AllPetChecks_CurrPetKey in petProgressionUpdate_AllPetChecks_UpdatedPetList){

            // Checking for if pet is alive:
            if (petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] > 0) {

                petProgressionUpdate_DamageCheck(petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey], petProgressionUpdate_AllPetChecks_CurrDate, petProgressionUpdate_AllPetChecks_UpdatedPetTimeStamps[petProgressionUpdate_AllPetChecks_CurrPetKey]);
                
                // Check pet growth stage if pet is still alive after health update:
                if (petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] === 0){

                    petProgressionUpdate_PetAgeCheck(petProgressionUpdate_AllPetChecks_CurrDate, petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey]);

                }

            }

        }

        setPetTimeStamps(petProgressionUpdate_AllPetChecks_UpdatedPetTimeStamps);
        setPetList(petProgressionUpdate_AllPetChecks_UpdatedPetList);

    };


    const petProgressionUpdate_DamageCheck = (petProgressionUpdate_DamageCheck_CurrPet, petProgressionUpdate_DamageCheck_CurrDate, petProgressionUpdate_DamageCheck_CurrPetTimeStamps) => {

        let petProgressionUpdate_DamageCheck_PetTimeLimits;

        if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampCleaningKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampPlayingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps){

            petProgressionUpdate_DamageCheck_PetTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey];

        } else if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampPlayingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps){

            petProgressionUpdate_DamageCheck_PetTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey];

        } else {

            petProgressionUpdate_DamageCheck_PetTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey];
        
        }

        let petProgressionUpdate_DamageCheck_HealthAffected = 0;

        // Iterate through every activity of this pet to see how much health petProgressionUpdateDamage there is:
        for (const petProgressionUpdate_DamageCheck_CurrActivityKey in petProgressionUpdate_DamageCheck_PetTimeLimits){

            // Either last damage update or last activity update (whichever was most recent) used for determining if there should be another petProgressionUpdateDamage update:
            const petProgressionUpdate_DamageCheck_Subtrahend = Math.max(petProgressionUpdate_DamageCheck_CurrPetTimeStamps[petProgressionUpdate_DamageCheck_CurrActivityKey][petActivityTimeStampLastPerformedKey], petProgressionUpdate_DamageCheck_CurrPetTimeStamps[petProgressionUpdate_DamageCheck_CurrActivityKey][petActivityTimeStampLastDamagedKey]); 

            const {petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage : petProgressionUpdate_DamageCheck_AddedHealthDamage, petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp : petProgressionUpdate_DamageCheck_NewPetTimeStamp } = petProgressionUpdate_CalculatingNewTimes(petProgressionUpdate_DamageCheck_CurrDate, petProgressionUpdate_DamageCheck_Subtrahend, petProgressionUpdate_DamageCheck_PetTimeLimits[petProgressionUpdate_DamageCheck_CurrActivityKey], petActivityTimeStampDamageList[petProgressionUpdate_DamageCheck_CurrActivityKey]);

            if (petProgressionUpdate_DamageCheck_NewPetTimeStamp > petProgressionUpdate_DamageCheck_Subtrahend && petProgressionUpdate_DamageCheck_AddedHealthDamage > 0) {

                petProgressionUpdate_DamageCheck_CurrPetTimeStamps[petProgressionUpdate_DamageCheck_CurrActivityKey][petActivityTimeStampLastDamagedKey] = petProgressionUpdate_DamageCheck_NewPetTimeStamp;
                petProgressionUpdate_DamageCheck_HealthAffected += petProgressionUpdate_DamageCheck_AddedHealthDamage;

            }

        }

        // Update health key with any new damage updates:
        if (petProgressionUpdate_DamageCheck_HealthAffected > 0){

            petProgressionUpdate_DamageCheck_CurrPet[petHealthKey] = Math.max(petProgressionUpdate_DamageCheck_CurrPet[petHealthKey] - petProgressionUpdate_DamageCheck_HealthAffected, 0);

        }

    }


    const petProgressionUpdate_CalculatingNewTimes = (petProgressionUpdate_CalculatingNewTimes_CurrDate, petProgressionUpdate_CalculatingNewTimes_Subtrahend, petProgressionUpdate_CalculatingNewTimes_Limit, petProgressionUpdate_CalculatingNewTimes_Damage) => {

        // Calculating the number of times the limit has been passed since last check
        const petProgressionUpdate_CalculatingNewTimes_IntervalsPassed = Math.floor((petProgressionUpdate_CalculatingNewTimes_CurrDate - petProgressionUpdate_CalculatingNewTimes_Subtrahend) / petProgressionUpdate_CalculatingNewTimes_Limit);

        // Amount of damage for current activity * intervals passed
        const petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage = petProgressionUpdate_CalculatingNewTimes_Damage*petProgressionUpdate_CalculatingNewTimes_IntervalsPassed; 

        // Last health timestamp + number of intervals accounted for in new petProgressionUpdate_CalculatingNewTimes_Damage update
        const petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp = petProgressionUpdate_CalculatingNewTimes_Subtrahend + petProgressionUpdate_CalculatingNewTimes_IntervalsPassed*petProgressionUpdate_CalculatingNewTimes_Limit; 

        return { petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage, petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp };

    }


    const petProgressionUpdate_PetAgeCheck = (petProgressionUpdate_PetAgeCheck_CurrDate, petProgressionUpdate_PetAgeCheck_UpdatePet) => {

        let petProgressionUpdate_PetAgeCheck_PetTimeCap;

        if(petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey] === petSpeciesDogKey){
        // Grows every 5 days

            petProgressionUpdate_PetAgeCheck_PetTimeCap = 432000000;

        } else if (petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey] === petSpeciesCatKey){
        // Grows every week

            petProgressionUpdate_PetAgeCheck_PetTimeCap = 604800000;

        } else {
        // Grows every 3 days

            petProgressionUpdate_PetAgeCheck_PetTimeCap = 259200000;

        }

        const petProgressionUpdate_PetAgeCheck_CheckingStage = Math.max(Math.floor((petProgressionUpdate_PetAgeCheck_CurrDate - petProgressionUpdate_PetAgeCheck_UpdatePet[petBirthDateKey]) / petProgressionUpdate_PetAgeCheck_PetTimeCap), 2);
        if (petProgressionUpdate_PetAgeCheck_CheckingStage !== petProgressionUpdate_PetAgeCheck_UpdatePet[petStageKey]){

            petProgressionUpdate_PetAgeCheck_UpdatePet[petHealthKey] += (petSpeciesHealthCapList[petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey]][petProgressionUpdate_PetAgeCheck_CheckingStage] - petSpeciesHealthCapList[petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey]][petProgressionUpdate_PetAgeCheck_UpdatePet[petStageKey]]);
            petProgressionUpdate_PetAgeCheck_UpdatePet[petStageKey] = petProgressionUpdate_PetAgeCheck_CheckingStage; 

        }

    }

    return children;

}

