import catStageOne from "../images/placeholderstage1.jpeg";
import catStageTwo from "../images/placeholderstage2.jpg";
import catStageThree from "../images/placeholderstage3.jpg";

import dogStageOne from "../images/placeholderstage1.jpeg";
import dogStageTwo from "../images/placeholderstage2.jpg";
import dogStageThree from "../images/placeholderstage3.jpg";

import fishStageOne from "../images/placeholderstage1.jpeg";
import fishStageTwo from "../images/placeholderstage2.jpg";
import fishStageThree from "../images/placeholderstage3.jpg";


import s1CatHappy from "../images/placeholderstage1.jpeg";
import s1CatSad from "../images/placeholderstage1.jpeg";
import s2CatHappy from "../images/placeholderstage2.jpg";
import s2CatSad from "../images/placeholderstage2.jpg";
import s3CatHappy from "../images/placeholderstage3.jpg";
import s3CatSad from "../images/placeholderstage3.jpg";

import s1DogHappy from "../images/placeholderstage1.jpeg";
import s1DogSad from "../images/placeholderstage1.jpeg";
import s2DogHappy from "../images/placeholderstage2.jpg";
import s2DogSad from "../images/placeholderstage2.jpg";
import s3DogHappy from "../images/placeholderstage3.jpg";
import s3DogSad from "../images/placeholderstage3.jpg";

import s1FishHappy from "../images/placeholderstage1.jpeg";
import s1FishSad from "../images/placeholderstage1.jpeg";
import s2FishHappy from "../images/placeholderstage2.jpg";
import s2FishSad from "../images/placeholderstage2.jpg";
import s3FishHappy from "../images/placeholderstage3.jpg";
import s3FishSad from "../images/placeholderstage3.jpg";





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


export const portraitPetImages = {
    [dogSpecies]: [dogStageOne, dogStageTwo, dogStageThree],
    [catSpecies]: [catStageOne, catStageTwo, catStageThree],
    [fishSpecies]: [fishStageOne, fishStageTwo, fishStageThree]
}


export const moodPetImages = {

    [dogSpecies]: [[s1DogHappy, s1DogSad], 
                    [s2DogHappy, s2DogSad], 
                    [s3DogHappy, s3DogSad]],
    [catSpecies]: [[s1CatHappy, s1CatSad], 
                    [s2CatHappy, s2CatSad], 
                    [s3CatHappy, s3CatSad]],
    [fishSpecies]: [[s1FishHappy, s1FishSad], 
                    [s2FishHappy, s2FishSad],
                    [s3FishHappy, s3FishSad]]

}