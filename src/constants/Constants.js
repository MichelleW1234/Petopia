export const dogHealthCap = 15;
export const catHealthCap = 20;
export const fishHealthCap = 5;


//[eat 2 times a day, bath 1 time a day, play 2 times a day]
export const dogTimeLimits = [43200000, 86400000, 43200000];
//[180000, 300000, 180000]; //for testing purposes

//[eat 3 times a day, doesn't need baths, play 1 time a day]
export const catTimeLimits = [28800000, 0, 86400000];
//[180000, 0, 180000]; //for testing purposes

//[eat 1 time a day, clean fish tank 1 time a day, doesn't need to play]
export const fishTimeLimits = [86400000, 86400000, 0];
// [180000, 300000, 0]; //for testing purposes


export const medicineDoseTimeGap = 86400000;