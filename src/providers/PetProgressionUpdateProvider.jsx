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
        
        // Loop for updating pet health:
        for (const petProgressionUpdate_AllPetChecks_CurrPetKey in petProgressionUpdate_AllPetChecks_UpdatedPetTimeStamps){

            // Checking for if pet is alive (not already dead):
            if (petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] > 0) {

                const petProgressionUpdate_AllPetChecks_HealthAffected = petProgressionUpdate_DamageCheck(petProgressionUpdate_AllPetChecks_CurrDate, petProgressionUpdate_AllPetChecks_UpdatedPetTimeStamps[petProgressionUpdate_AllPetChecks_CurrPetKey]);
                
                //!!!!!!Try to edit this in damage check function so that both timestamps and petlist are edited together:
                petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] = Math.max(petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] - petProgressionUpdate_AllPetChecks_HealthAffected, 0);

            }

        };

        // Loop for updating pet stage:
        for (const petProgressionUpdate_AllPetChecks_CurrPetKey in petProgressionUpdate_AllPetChecks_UpdatedPetList){

            // Check pet growth stage if pet is still alive after health update:
            if (petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] > 0){

                const petProgressionUpdate_AllPetChecks_CurrentStage = petProgressionUpdate_PetAgeCheck(petProgressionUpdate_AllPetChecks_CurrDate, petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey]);

                //!!!!!!!! try to move all of this in to petagecheck
                if (petProgressionUpdate_AllPetChecks_CurrentStage !== petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petStageKey]){
   
                    petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petHealthKey] += (petSpeciesHealthCapList[petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petSpeciesKey]][petProgressionUpdate_AllPetChecks_CurrentStage] - petSpeciesHealthCapList[petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petSpeciesKey]][petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petStageKey]]);
                    petProgressionUpdate_AllPetChecks_UpdatedPetList[petProgressionUpdate_AllPetChecks_CurrPetKey][petStageKey] = petProgressionUpdate_AllPetChecks_CurrentStage; 

                }

            }

        }

        setPetTimeStamps(petProgressionUpdate_AllPetChecks_UpdatedPetTimeStamps);
        setPetList(petProgressionUpdate_AllPetChecks_UpdatedPetList);

    };


    const petProgressionUpdate_DamageCheck = (petProgressionUpdate_DamageCheck_CurrDate, petProgressionUpdate_DamageCheck_CurrPetTimeStamps) => {

        let petProgressionUpdate_DamageCheck_PetTimeLimits = {};

        if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampCleaningKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampPlayingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps){

            petProgressionUpdate_DamageCheck_PetTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey];

        } else if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampPlayingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps){

            petProgressionUpdate_DamageCheck_PetTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey];

        } else if (petActivityTimeStampFeedingKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps && petActivityTimeStampCleaningKey in petProgressionUpdate_DamageCheck_CurrPetTimeStamps){

            petProgressionUpdate_DamageCheck_PetTimeLimits = petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey];
        
        }

        let petProgressionUpdate_DamageCheck_HealthAffected = 0;

        // Iterate through every activity of this pet to see how much health petProgressionUpdateDamage there is:
        for (const petProgressionUpdate_DamageCheck_CurrActivityKey in petProgressionUpdate_DamageCheck_PetTimeLimits){

            // Either last damage update or last activity update (whichever was most recent) used for determining if there should be another petProgressionUpdateDamage update:
            let petProgressionUpdate_DamageCheck_Subtrahend = Math.max(petProgressionUpdate_DamageCheck_CurrPetTimeStamps[petProgressionUpdate_DamageCheck_CurrActivityKey][petActivityTimeStampLastPerformedKey], petProgressionUpdate_DamageCheck_CurrPetTimeStamps[petProgressionUpdate_DamageCheck_CurrActivityKey][petActivityTimeStampLastDamagedKey]); 

            const {petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage : petProgressionUpdate_DamageCheck_AddedHealthDamage , petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp : petProgressionUpdate_DamageCheck_NewPetTimeStamp } = petProgressionUpdate_CalculatingNewTimes(petProgressionUpdate_DamageCheck_CurrDate, petProgressionUpdate_DamageCheck_Subtrahend, petProgressionUpdate_DamageCheck_PetTimeLimits[petProgressionUpdate_DamageCheck_CurrActivityKey], petActivityTimeStampDamageList[petProgressionUpdate_DamageCheck_CurrActivityKey]);

            petProgressionUpdate_DamageCheck_CurrPetTimeStamps[petProgressionUpdate_DamageCheck_CurrActivityKey][petActivityTimeStampLastDamagedKey] = petProgressionUpdate_DamageCheck_NewPetTimeStamp;
            petProgressionUpdate_DamageCheck_HealthAffected += petProgressionUpdate_DamageCheck_AddedHealthDamage;

        }

        return petProgressionUpdate_DamageCheck_HealthAffected;

    }

    const petProgressionUpdate_CalculatingNewTimes = (petProgressionUpdate_CalculatingNewTimes_CurrDate, petProgressionUpdate_CalculatingNewTimes_Subtrahend, petProgressionUpdate_CalculatingNewTimes_Limit, petProgressionUpdate_CalculatingNewTimes_Damage) => {

        let petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage = 0;
        let petProgressionUpdate_CalculatingNewTimes_IntervalsPassed = 0;
        let petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp = petProgressionUpdate_CalculatingNewTimes_Subtrahend;

        petProgressionUpdate_CalculatingNewTimes_IntervalsPassed = Math.floor((petProgressionUpdate_CalculatingNewTimes_CurrDate - petProgressionUpdate_CalculatingNewTimes_Subtrahend) / petProgressionUpdate_CalculatingNewTimes_Limit);
        // Calculating the number of times the limit has been passed since last check

        if (petProgressionUpdate_CalculatingNewTimes_IntervalsPassed > 0){
        // The time between the last time this activity's damage was updated and the current time is long enough for another damaage and tiemstamp update:

            petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage = petProgressionUpdate_CalculatingNewTimes_Damage*petProgressionUpdate_CalculatingNewTimes_IntervalsPassed; 
            // Amount of damage for current activity * intervals passed
            petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp = petProgressionUpdate_CalculatingNewTimes_Subtrahend + petProgressionUpdate_CalculatingNewTimes_IntervalsPassed*petProgressionUpdate_CalculatingNewTimes_Limit; 
            // Last health timestamp + number of intervals accounted for in new petProgressionUpdate_CalculatingNewTimes_Damage update

        }

        return { petProgressionUpdate_CalculatingNewTimes_AddedHealthDamage, petProgressionUpdate_CalculatingNewTimes_NewPetTimeStamp };

    }


    const petProgressionUpdate_PetAgeCheck = (petProgressionUpdate_PetAgeCheck_CurrDate, petProgressionUpdate_PetAgeCheck_UpdatePet) => {

        const petProgressionUpdate_PetAgeCheck_Difference = petProgressionUpdate_PetAgeCheck_CurrDate - petProgressionUpdate_PetAgeCheck_UpdatePet[petBirthDateKey];

        if(petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey] === petSpeciesDogKey){
        // Grows every 5 days

            if (petProgressionUpdate_PetAgeCheck_Difference > 864000000){

                return 2;

            } else if (petProgressionUpdate_PetAgeCheck_Difference > 432000000){

                return 1;

            } else {

                return 0;

            }

        } else if (petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey] === petSpeciesCatKey){
        // Grows every week

            if (petProgressionUpdate_PetAgeCheck_Difference > 1209600000){

                return 2;

            } else if (petProgressionUpdate_PetAgeCheck_Difference > 604800000){

                return 1;

            } else {

                return 0;

            }

        } else if (petProgressionUpdate_PetAgeCheck_UpdatePet[petSpeciesKey] === petSpeciesFishKey){
        // Grows every 3 days

            if (petProgressionUpdate_PetAgeCheck_Difference > 518400000){

                return 2;

            } else if (petProgressionUpdate_PetAgeCheck_Difference > 259200000){

                return 1;

            } else {

                return 0;

            }

        }

    }

    return children;

}

