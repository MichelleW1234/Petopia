export const feedingKey = "feeding";
export const cleaningKey = "cleaning";
export const playingKey = "playing";

export const speciesKey = "species";
export const stageKey = "stage";
export const healthKey = "health";
export const birthDateKey = "birthDate";
export const medicineKey = "medicine";

export const dogSpecies = "dog"; 
export const catSpecies = "cat"; 
export const fishSpecies = "fish"; 

export const healthCapList = {

    [dogSpecies] : 15,
    [catSpecies] : 20,
    [fishSpecies] : 5

}

export const timeLimitList = {

    [dogSpecies] :
    {
        [feedingKey]: 43200000,
        [cleaningKey]: 86400000,
        [playingKey]: 43200000

    },
    //[180000, 300000, 180000]; //for testing purposes
    //[eat 2 times a day, bath 1 time a day, play 2 times a day]

    [catSpecies] : 
    {
        [feedingKey]: 28800000,
        [playingKey]: 86400000

    },
    //[180000, 180000]; //for testing purposes
    //[eat 3 times a day, doesn't need baths, play 1 time a day]

    [fishSpecies] : 
    {
        [feedingKey]: 86400000, 
        [cleaningKey]: 86400000, 
    }
    // [180000, 300000]; //for testing purposes
    //[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]

}

export const medicineDoseTimeGap = 86400000;