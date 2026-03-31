import { cleaningKey, feedingKey, healthKey, playingKey } from "../../../constants/Constants";

export const initiateActivity = (wantsTo, setDesiredOption, setOpenFlag, options) => {

    if (wantsTo){

        setDesiredOption(Math.floor(Math.random() * options.length));

    }

    setOpenFlag(true);

}



export const judgeSelection = (chosenOption, desiredOption, newNumber, setNumberTillDone, setSelection) => {

    if (chosenOption !== desiredOption) {

        setNumberTillDone(newNumber);

    } 

    setSelection(chosenOption);

}



export const manageHealth = (GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, setDesiredOption, selection) => {

    if (desiredOption === -1){
    //Too much (unwilling)

        const damageAmounts = {

            [feedingKey] : 3,
            [cleaningKey] : 1,
            [playingKey] : 2

        }

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - damageAmounts[key], 0)
            }

        }));

    } else if (desiredOption !== selection && desiredOption !== -1){
    // not desired option (willing)

        setPetList(prev => ({

            ...prev,

            [ActivePetName]: {

                ...prev[ActivePetName],
                [healthKey]: Math.max(prev[ActivePetName][healthKey] - 1, 0)
            }

        }));

    }

    setPetTimeStamps(prev => ({

        ...prev,

        [ActivePetName]: {
            
            ...prev[ActivePetName],
            [key]: [GlobalTimer, prev[ActivePetName][key][1]]
            
        }

    }));

    setDesiredOption(-1);

    console.log("done!");

}

