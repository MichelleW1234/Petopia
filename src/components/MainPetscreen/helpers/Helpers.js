import { CheckPetHealth } from "../../../helpers/Helpers";

export const initiateFeeding = (isHungry, setChosenFeedingOption, setOpenFeedingFlag, menuList) => {

    if (isHungry){

        setChosenFeedingOption(Math.floor(Math.random() * menuList.length));

    }

    setOpenFeedingFlag(true);

}


export const initiateCleaning = (isDirty, setChosenCleaningOption, setOpenCleaningFlag, toolsList) => {

    if (isDirty){

        setChosenCleaningOption(Math.floor(Math.random() * toolsList.length));

    }

    setOpenCleaningFlag(true);

}


export const initiatePlaying = (isRestless, setChosenPlayingOption, setOpenPlayingFlag, gamesList) => {

    if (isRestless){

        setChosenPlayingOption(Math.floor(Math.random() * gamesList.length));

    }

    setOpenPlayingFlag(true);

}


export const judgeSelection = (chosenOption, desiredOption, newNumber, setNumberTillDone, setSelection) => {

    if (chosenOption !== desiredOption) {

        setNumberTillDone(newNumber);

    } 

    setSelection(chosenOption);

}



export const manageHealth = (setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, setDesiredOption, selection, setOpenFlag) => {

    CheckPetHealth(setPetTimeStamps, setPetList, ActivePetName, key, desiredOption, selection);

    setDesiredOption(-1);
    setOpenFlag(false);

}
