import CatStageOne from "../images/Cat/Portrait/StageOne.png";
import CatStageTwo from "../images/Cat/Portrait/StageTwo.png";
import CatStageThree from "../images/Cat/Portrait/StageThree.png";

import DogStageOne from "../images/Dog/Portrait/StageOne.png";
import DogStageTwo from "../images/Dog/Portrait/StageTwo.png";
import DogStageThree from "../images/Dog/Portrait/StageThree.png";

import FishStageOne from "../images/Fish/Portrait/StageOne.png";
import FishStageTwo from "../images/Fish/Portrait/StageTwo.png";
import FishStageThree from "../images/Fish/Portrait/StageThree.png";




export const notificationsDescriptionKey = "description";
export const notificationsDateKey = "date";



export const achievementDescriptionKey = "name";
export const achievementStatusKey = "status";



export const inventoryItemNameKey = "name";
export const inventoryItemImageKey = "image";
export const inventoryItemSpeciesAcceptedKey = "species accepted";
export const inventoryItemTypeKey = "type";
export const inventoryItemOwnerKey = "owner";

export const inventoryItemTypePotionKey = "potion";
export const inventoryItemTypeFloorDecorationKey = "floor decoration";
export const inventoryItemTypeCeilingDecorationKey = "ceiling decoration";
export const inventoryItemTypeWallDecorationKey = "wall decoration";
export const inventoryItemTypeRoomDecorationKey = "room decoration";



export const soundNavButtonPressKey = "nav button press";
export const soundSelectionButtonPressKey = "selection button press";
export const soundScreenButtonPressKey = "screen button press"
export const soundAdoptionConfirmationErrorKey = "adoption confirmation error";
export const soundStartActivityKey = "start activity";
export const soundActivitySuccessKey = "activity success";
export const soundActivityFailKey = "activity fail";
export const soundAdoptionSuccessKey = "adoption success";
export const soundClearPetsKey = "clear pets";
export const soundRestartGameKey = "restart game";
export const soundQuitActivityKey = "quit activity";
export const soundAddedDecorationsKey = "added decorations";
export const soundRevivedPetKey = "revived pet";



export const petActivityOptionImageKey = "image";
export const petActivityOptionNameKey = "name";
export const petActivityOptionCursorKey = "cursor";
export const petActivityOptionGameKey = "game";



export const petSoundSleepKey = "sleep";
export const petSoundHappyKey = "happy";
export const petSoundSadKey = "sad";



export const petActivityTimeStampFeedingKey = "feeding";
export const petActivityTimeStampCleaningKey = "cleaning";
export const petActivityTimeStampPlayingKey = "playing";


export const petActivityTimeStampLastPerformedKey = "performed";
export const petActivityTimeStampLastDamagedKey = "damaged";



export const petSpeciesKey = "species";
export const petStageKey = "stage";
export const petHealthKey = "health";
export const petBirthDateKey = "birth date";
export const petGenderKey = "gender"
export const petMedicineKey = "medicine";



export const petGenderMaleKey = "male";
export const petGenderFemaleKey = "female";



export const petSpeciesDogKey = "dog"; 
export const petSpeciesCatKey = "cat"; 
export const petSpeciesFishKey = "fish"; 



export const petSpeciesHealthCapList = {

    [petSpeciesDogKey] : [9, 12, 15],
    [petSpeciesCatKey] : [12, 16, 20],
    [petSpeciesFishKey] : [3, 4, 5]

}


export const petSpeciesActivityTimeStampTimeLimitList = {

    [petSpeciesDogKey] :
    {
        [petActivityTimeStampFeedingKey]: 28800000,
        [petActivityTimeStampCleaningKey]: 86400000,
        [petActivityTimeStampPlayingKey]: 43200000

    },
    //[180000, 300000, 180000]; //for testing purposes
    //[eat 3 times a day, bath 1 time a day, play 2 times a day]

    [petSpeciesCatKey] : 
    {
        [petActivityTimeStampFeedingKey]: 43200000,
        [petActivityTimeStampPlayingKey]: 86400000

    },
    //[180000, 180000]; //for testing purposes
    //[eat 2 times a day, doesn't need baths, play 1 time a day]

    [petSpeciesFishKey] : 
    {
        [petActivityTimeStampFeedingKey]: 86400000, 
        [petActivityTimeStampCleaningKey]: 86400000
    }
    // [180000, 300000]; //for testing purposes
    //[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]

}

export const petActivityTimeStampMedicineDoseTimeGapKey = 86400000;

export const petActivityTimeStampDamageList = {

    [petActivityTimeStampFeedingKey]: 3,
    [petActivityTimeStampCleaningKey]: 1,
    [petActivityTimeStampPlayingKey]: 2
    
};


export const petSpeciesImagePortraitList = {
    [petSpeciesDogKey]: [DogStageOne, DogStageTwo, DogStageThree],
    [petSpeciesCatKey]: [CatStageOne, CatStageTwo, CatStageThree],
    [petSpeciesFishKey]: [FishStageOne, FishStageTwo, FishStageThree]
}
