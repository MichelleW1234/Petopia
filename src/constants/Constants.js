import CatStageOne from "../images/Cat/Portrait/StageOne.png";
import CatStageTwo from "../images/Cat/Portrait/StageTwo.png";
import CatStageThree from "../images/Cat/Portrait/StageThree.png";

import DogStageOne from "../images/Dog/Portrait/StageOne.png";
import DogStageTwo from "../images/Dog/Portrait/StageTwo.png";
import DogStageThree from "../images/Dog/Portrait/StageThree.png";

import FishStageOne from "../images/Fish/Portrait/StageOne.png";
import FishStageTwo from "../images/Fish/Portrait/StageTwo.png";
import FishStageThree from "../images/Fish/Portrait/StageThree.png";





export const navButtonPressSoundKey = "NavButtonPress";
export const selectionButtonPressSoundKey = "SelectionButtonPress";
export const screenButtonPressSoundKey = "ScreenButtonPress"
export const adoptionConfirmationErrorSoundKey = "error";
export const startActivitySoundKey = "start";
export const activitySuccessSoundKey = "success";
export const activityFailSoundKey = "fail";
export const adoptionSuccessSoundKey = "confirmed";
export const clearPetsSoundKey = "cleared";
export const restartGameSoundKey = "restart";
export const quitActivitySoundKey = "quit";



export const optionImageKey = "image";
export const optionNameKey = "name";
export const optionCursorKey = "cursor";
export const optionGameKey = "game";



export const sleepAudioKey = "sleep";
export const happyAudioKey = "happy";
export const sadAudioKey = "sad";



export const feedingKey = "feeding";
export const cleaningKey = "cleaning";
export const playingKey = "playing";



export const speciesKey = "species";
export const stageKey = "stage";
export const healthKey = "health";
export const birthDateKey = "birthDate";
export const genderKey = "gender"
export const medicineKey = "medicine";

export const activityLastPerformedKey = "performed";
export const activityLastDamageKey = "damaged";



export const maleGender = "male";
export const femaleGender = "female";



export const dogSpecies = "dog"; 
export const catSpecies = "cat"; 
export const fishSpecies = "fish"; 




export const healthCapList = {

    [dogSpecies] : [9, 12, 15],
    [catSpecies] : [12, 16, 20],
    [fishSpecies] : [3, 4, 5]

}


export const timeLimitList = {

    [dogSpecies] :
    {
        [feedingKey]: 28800000,
        [cleaningKey]: 86400000,
        [playingKey]: 43200000

    },
    //[180000, 300000, 180000]; //for testing purposes
    //[eat 3 times a day, bath 1 time a day, play 2 times a day]

    [catSpecies] : 
    {
        [feedingKey]: 43200000,
        [playingKey]: 86400000

    },
    //[180000, 180000]; //for testing purposes
    //[eat 2 times a day, doesn't need baths, play 1 time a day]

    [fishSpecies] : 
    {
        [feedingKey]: 86400000, 
        [cleaningKey]: 86400000
    }
    // [180000, 300000]; //for testing purposes
    //[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]

}

export const medicineDoseTimeGap = 86400000;

export const activityDamage = {

    [feedingKey]: 3,
    [cleaningKey]: 1,
    [playingKey]: 2
    
};



/* images */

export const portraitPetImages = {
    [dogSpecies]: [DogStageOne, DogStageTwo, DogStageThree],
    [catSpecies]: [CatStageOne, CatStageTwo, CatStageThree],
    [fishSpecies]: [FishStageOne, FishStageTwo, FishStageThree]
}
