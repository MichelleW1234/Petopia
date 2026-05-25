import catStageOne from "../images/Cat/Main/Awake/s1.svg";
import catStageTwo from "../images/Cat/Main/Awake/s2.svg";
import catStageThree from "../images/Cat/Main/Awake/s3.svg";

import dogStageOne from "../images/Dog/Main/Awake/s1.svg";
import dogStageTwo from "../images/Dog/Main/Awake/s2.svg";
import dogStageThree from "../images/Dog/Main/Awake/s3.svg";

import fishStageOne from "../images/Fish/Main/Awake/s1.svg";
import fishStageTwo from "../images/Fish/Main/Awake/s2.svg";
import fishStageThree from "../images/Fish/Main/Awake/s3.svg";


import s1CatHappy from "../images/Cat/Mood/s1Happy.png";
import s1CatSad from "../images/Cat/Mood/s1Sad.png";
import s2CatHappy from "../images/Cat/Mood/s2Happy.png";
import s2CatSad from "../images/Cat/Mood/s2Sad.png";
import s3CatHappy from "../images/Cat/Mood/s3Happy.png";
import s3CatSad from "../images/Cat/Mood/s3Sad.png";

import s1DogHappy from "../images/Dog/Mood/s1Happy.png";
import s1DogSad from "../images/Dog/Mood/s1Sad.png";
import s2DogHappy from "../images/Dog/Mood/s2Happy.png";
import s2DogSad from "../images/Dog/Mood/s2Sad.png";
import s3DogHappy from "../images/Dog/Mood/s3Happy.png";
import s3DogSad from "../images/Dog/Mood/s3Sad.png";

import s1FishHappy from "../images/Fish/Mood/s1Happy.png";
import s1FishSad from "../images/Fish/Mood/s1Sad.png";
import s2FishHappy from "../images/Fish/Mood/s1Happy.png";
import s2FishSad from "../images/Fish/Mood/s1Sad.png";
import s3FishHappy from "../images/Fish/Mood/s1Happy.png";
import s3FishSad from "../images/Fish/Mood/s1Sad.png";





export const buttonSoundKey = "button_click";


export const feedingKey = "feeding";
export const cleaningKey = "cleaning";
export const playingKey = "playing";

export const speciesKey = "species";
export const stageKey = "stage";
export const healthKey = "health";
export const birthDateKey = "birthDate";
export const genderKey = "gender"
export const medicineKey = "medicine";

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