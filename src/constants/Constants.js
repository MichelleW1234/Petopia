export const feedingKey = "feeding";
export const bathingKey = "bathing";
export const playingKey = "playing";

export const speciesKey = "species";
export const stageKey = "stage";
export const healthKey = "health";
export const birthDateKey = "birthDate";
export const medicine = "medicine";


export const dogHealthCap = 15;
export const catHealthCap = 20;
export const fishHealthCap = 5;


//[eat 2 times a day, bath 1 time a day, play 2 times a day]
export const dogTimeLimits = 
    {
        "feeding": 43200000,
        "bathing": 86400000,
        "playing": 43200000

    }
//[180000, 300000, 180000]; //for testing purposes

//[eat 3 times a day, doesn't need baths, play 1 time a day]
export const catTimeLimits = 
    {
        "feeding": 28800000,
        "playing": 86400000

    }
//[180000, 180000]; //for testing purposes

//[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]
export const fishTimeLimits = 
    {
        "feeding": 86400000, 
        "bathing": 86400000, 
    }
// [180000, 300000]; //for testing purposes


export const medicineDoseTimeGap = 86400000;