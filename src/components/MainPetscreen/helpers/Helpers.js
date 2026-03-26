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