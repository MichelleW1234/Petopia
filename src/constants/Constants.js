import varOneDogOne from "../images/placeholderstage1.jpeg";
import varOneDogTwo from "../images/placeholderstage2.jpg";
import varOneDogThree from "../images/placeholderstage3.jpg";

import varOneCatOne from "../images/placeholderstage1.jpeg";
import varOneCatTwo from "../images/placeholderstage2.jpg";
import varOneCatThree from "../images/placeholderstage3.jpg";

import varOneFishOne from "../images/placeholderstage1.jpeg";
import varOneFishTwo from "../images/placeholderstage2.jpg";
import varOneFishThree from "../images/placeholderstage3.jpg";

import varTwoDogOne from "../images/placeholderstage1.jpeg";
import varTwoDogTwo from "../images/placeholderstage2.jpg";
import varTwoDogThree from "../images/placeholderstage3.jpg";

import varTwoCatOne from "../images/placeholderstage1.jpeg";
import varTwoCatTwo from "../images/placeholderstage2.jpg";
import varTwoCatThree from "../images/placeholderstage3.jpg";

import varTwoFishOne from "../images/placeholderstage1.jpeg";
import varTwoFishTwo from "../images/placeholderstage2.jpg";
import varTwoFishThree from "../images/placeholderstage3.jpg";

import varThreeDogOne from "../images/placeholderstage1.jpeg";
import varThreeDogTwo from "../images/placeholderstage2.jpg";
import varThreeDogThree from "../images/placeholderstage3.jpg";

import varThreeCatOne from "../images/placeholderstage1.jpeg";
import varThreeCatTwo from "../images/placeholderstage2.jpg";
import varThreeCatThree from "../images/placeholderstage3.jpg";

import varThreeFishOne from "../images/placeholderstage1.jpeg";
import varThreeFishTwo from "../images/placeholderstage2.jpg";
import varThreeFishThree from "../images/placeholderstage3.jpg";


export const petImages = {

    "dog": [[varOneDogOne, varOneDogTwo, varOneDogThree],
            [varTwoDogOne, varTwoDogTwo, varTwoDogThree],
            [varThreeDogOne, varThreeDogTwo, varThreeDogThree]],

    "cat": [[varOneCatOne, varOneCatTwo, varOneCatThree],
            [varTwoCatOne, varTwoCatTwo, varTwoCatThree],
            [varThreeCatOne, varThreeCatTwo, varThreeCatThree]],

    "fish": [[varOneFishOne, varOneFishTwo, varOneFishThree],
            [varTwoFishOne, varTwoFishTwo, varTwoFishThree],
            [varThreeFishOne, varThreeFishTwo, varThreeFishThree]]

}


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