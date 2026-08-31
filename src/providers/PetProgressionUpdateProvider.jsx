import { useEffect, useRef } from "react";

import { useGlobalTimer } from "./GlobalTimerProvider.jsx";
import { usePetList } from "./PetListProvider.jsx";
import { usePetTimeStamps } from "./PetTimeStampsProvider.jsx";

import {petHealthKey, petStageKey, petBirthDateKey, petSpeciesKey, petActivityTimeStampFeedingKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey, petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesActivityTimeStampTimeLimitList, petActivityTimeStampDamageList, petSpeciesHealthCapList, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey} from "../constants/Constants.js";


export function PetProgressionUpdateProvider({ children }) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const { GlobalTimer } = useGlobalTimer();

    const petProgressionUpdate_Ref_PetTimeStamps = useRef(PetTimeStamps);
    const petProgressionUpdate_Ref_PetList = useRef(PetList);



    useEffect(() => {
        petProgressionUpdate_Ref_PetTimeStamps.current = PetTimeStamps;
    }, [PetTimeStamps]);

    useEffect(() => {
        petProgressionUpdate_Ref_PetList.current = PetList;
    }, [PetList]);

    useEffect(() => {

        const bound_Number_GlobalTimer = GlobalTimer;
        petProgressionUpdate_Checker_PetStatus(bound_Number_GlobalTimer);

    }, [Math.floor(GlobalTimer / 60000)]);




    const petProgressionUpdate_Checker_PetStatus = (parameter_Number_GlobalTimer) => {

        console.log("checking");

        const bound_Copy_CurrPetTimeStamps = structuredClone(petProgressionUpdate_Ref_PetTimeStamps.current);
        const bound_Copy_CurrPetList = structuredClone(petProgressionUpdate_Ref_PetList.current);

        for (const bound_Key_CurrPetList in bound_Copy_CurrPetList){

            // Checking for if pet is alive:
            if (bound_Copy_CurrPetList[bound_Key_CurrPetList][petHealthKey] > 0) {

                petProgressionUpdate_Checker_PetHealth(bound_Copy_CurrPetList[bound_Key_CurrPetList], parameter_Number_GlobalTimer, bound_Copy_CurrPetTimeStamps[bound_Key_CurrPetList]);
                
                // Check pet growth stage if pet is still alive after health update:
                if (bound_Copy_CurrPetList[bound_Key_CurrPetList][petHealthKey] > 0){

                    petProgressionUpdate_Checker_PetStage(parameter_Number_GlobalTimer, bound_Copy_CurrPetList[bound_Key_CurrPetList]);

                }

            }

        }

        setPetTimeStamps(bound_Copy_CurrPetTimeStamps);
        setPetList(bound_Copy_CurrPetList);

    };


    const petProgressionUpdate_Checker_PetHealth = (parameter_Entry_PetList, parameter_Number_GlobalTimer, parameter_Entry_PetTimeStamps) => {

        let bound_Entry_TimeLimitList;

        if (petActivityTimeStampFeedingKey in parameter_Entry_PetTimeStamps && petActivityTimeStampCleaningKey in parameter_Entry_PetTimeStamps && petActivityTimeStampPlayingKey in parameter_Entry_PetTimeStamps){

            bound_Entry_TimeLimitList = petSpeciesActivityTimeStampTimeLimitList[petSpeciesDogKey];

        } else if (petActivityTimeStampFeedingKey in parameter_Entry_PetTimeStamps && petActivityTimeStampPlayingKey in parameter_Entry_PetTimeStamps){

            bound_Entry_TimeLimitList = petSpeciesActivityTimeStampTimeLimitList[petSpeciesCatKey];

        } else {

            bound_Entry_TimeLimitList = petSpeciesActivityTimeStampTimeLimitList[petSpeciesFishKey];
        
        }

        let bound_Number_PetTotalHealthDamage = 0;

        // Iterate through every activity of this pet to see how much health petProgressionUpdateDamage there is:
        for (const bound_Key_TimeLimitList in bound_Entry_TimeLimitList){

            // Either last damage update or last activity update (whichever was most recent) used for determining if there should be another petProgressionUpdateDamage update:
            const bound_Number_CurrSubtrahend = Math.max(parameter_Entry_PetTimeStamps[bound_Key_TimeLimitList][petActivityTimeStampLastPerformedKey], parameter_Entry_PetTimeStamps[bound_Key_TimeLimitList][petActivityTimeStampLastDamagedKey]); 

            const { bound_Number_ActivityHealthDamage : bound_Number_CurrActivityHealthDamage, bound_Number_ActivityDamageNewTimeStamp : bound_Number_CurrActivityDamageNewTimeStamp } = petProgressionUpdate_Manager_ActivityDamage(parameter_Number_GlobalTimer, bound_Number_CurrSubtrahend, bound_Entry_TimeLimitList[bound_Key_TimeLimitList], petActivityTimeStampDamageList[bound_Key_TimeLimitList]);

            if (bound_Number_CurrActivityDamageNewTimeStamp > bound_Number_CurrSubtrahend && bound_Number_CurrActivityHealthDamage > 0) {

                parameter_Entry_PetTimeStamps[bound_Key_TimeLimitList][petActivityTimeStampLastDamagedKey] = bound_Number_CurrActivityDamageNewTimeStamp;
                bound_Number_PetTotalHealthDamage += bound_Number_CurrActivityHealthDamage;

            }

        }

        // Update health key with any new damage updates:
        if (bound_Number_PetTotalHealthDamage > 0){

            parameter_Entry_PetList[petHealthKey] = Math.max(parameter_Entry_PetList[petHealthKey] - bound_Number_PetTotalHealthDamage, 0);

        }

    }


    const petProgressionUpdate_Manager_ActivityDamage = (parameter_Number_GlobalTimer, parameter_Number_CurrSubtrahend, parameter_Entry_TimeLimitListSpecies, parameter_Entry_DamageList) => {

        // Calculating the number of times the limit has been passed since last check
        const bound_Number_IntervalsSinceLastUpdate = Math.floor((parameter_Number_GlobalTimer - parameter_Number_CurrSubtrahend) / parameter_Entry_TimeLimitListSpecies);

        // Amount of damage for current activity * intervals passed
        const bound_Number_ActivityHealthDamage = parameter_Entry_DamageList*bound_Number_IntervalsSinceLastUpdate; 

        // Last health timestamp + number of intervals accounted for in new parameter_Entry_DamageList update
        const bound_Number_ActivityDamageNewTimeStamp = parameter_Number_CurrSubtrahend + bound_Number_IntervalsSinceLastUpdate*parameter_Entry_TimeLimitListSpecies; 

        return { bound_Number_ActivityHealthDamage, bound_Number_ActivityDamageNewTimeStamp };

    }


    const petProgressionUpdate_Checker_PetStage = (parameter_Number_GlobalTimer, parameter_Entry_PetList) => {

        let bound_Number_SpeciesGrowthRate;

        if(parameter_Entry_PetList[petSpeciesKey] === petSpeciesDogKey){
        // Grows every 5 days

            bound_Number_SpeciesGrowthRate = 432000000;

        } else if (parameter_Entry_PetList[petSpeciesKey] === petSpeciesCatKey){
        // Grows every week

            bound_Number_SpeciesGrowthRate = 604800000;

        } else {
        // Grows every 3 days

            bound_Number_SpeciesGrowthRate = 259200000;

        }


        const bound_Number_PetNewStage = Math.min(Math.floor((parameter_Number_GlobalTimer - parameter_Entry_PetList[petBirthDateKey]) / bound_Number_SpeciesGrowthRate), 2);
        if (bound_Number_PetNewStage > parameter_Entry_PetList[petStageKey]){

            parameter_Entry_PetList[petHealthKey] += (petSpeciesHealthCapList[parameter_Entry_PetList[petSpeciesKey]][bound_Number_PetNewStage] - petSpeciesHealthCapList[parameter_Entry_PetList[petSpeciesKey]][parameter_Entry_PetList[petStageKey]]);
            parameter_Entry_PetList[petStageKey] = bound_Number_PetNewStage; 

        }

    }

    return children;

}

