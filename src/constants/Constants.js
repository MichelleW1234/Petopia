export const feedingKey = "feeding";
export const cleaningKey = "cleaning";
export const playingKey = "playing";

export const speciesKey = "species";
export const stageKey = "stage";
export const healthKey = "health";
export const birthDateKey = "birthDate";
export const medicineKey = "medicine";

export const dogSpecies = "dog";                // ? 
export const catSpecies = "cat";                // ? 
export const fishSpecies = "fish";              // ? 

export const dogHealthCap = 15;                 // ? 
export const catHealthCap = 20;                 // ? 
export const fishHealthCap = 5;                 // ? 


//[eat 2 times a day, bath 1 time a day, play 2 times a day]
export const dogTimeLimits =                    // ? 
    {
        [feedingKey]: 43200000,
        [cleaningKey]: 86400000,
        [playingKey]: 43200000

    }
//[180000, 300000, 180000]; //for testing purposes

//[eat 3 times a day, doesn't need baths, play 1 time a day]
export const catTimeLimits =                    // ? 
    {
        [feedingKey]: 28800000,
        [playingKey]: 86400000

    }
//[180000, 180000]; //for testing purposes

//[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]
export const fishTimeLimits =                   // ? 
    {
        [feedingKey]: 86400000, 
        [cleaningKey]: 86400000, 
    }
// [180000, 300000]; //for testing purposes

export const medicineDoseTimeGap = 86400000;



export const menuOptions = {

    [dogSpecies] : ["beef", "Turkey", "lamb"],
    [catSpecies] : ["tuna", "chicken", "salmon"],
    [fishSpecies] : ["shrimp", "worms", "algae"]

}

export const cleaningOptions = {

    [dogSpecies] : ["soap", "brush"],
    [fishSpecies] : ["sponge", "cloth"]

}

export const gameOptions = {

    [dogSpecies] : ["tuna", "chicken", "salmon"], // CHANGE THIS LATER!!!!!!!!!
    [catSpecies] : ["tuna", "chicken", "salmon"] // CHANGE THIS LATER!!!!!!!!! 

}