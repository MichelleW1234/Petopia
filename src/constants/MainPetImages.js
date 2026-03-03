// Cat variant 1 images:

import s1CatLeftOne from "../images/CatMovement/1cat.svg";
import s1CatLeftTwo from "../images/CatMovement/1cat1.svg";
import s1CatRightOne from "../images/CatMovement/1cat2.svg";
import s1CatRightTwo from "../images/CatMovement/1cat3.svg";

import s2CatLeftOne from "../images/CatMovement/2cat.svg";
import s2CatLeftTwo from "../images/CatMovement/2cat1.svg";
import s2CatRightOne from "../images/CatMovement/2cat2.svg";
import s2CatRightTwo from "../images/CatMovement/2cat3.svg";

import s3CatLeftOne from "../images/CatMovement/3cat.svg";
import s3CatLeftTwo from "../images/CatMovement/3cat1.svg";
import s3CatRightOne from "../images/CatMovement/3cat2.svg";
import s3CatRightTwo from "../images/CatMovement/3cat3.svg";

// Dog variant 1 images:

import dogLeftOne from "../images/DogMovement/dog.svg";
import dogLeftTwo from "../images/DogMovement/dog1.svg";
import dogRightOne from "../images/DogMovement/dog2.svg";
import dogRightTwo from "../images/DogMovement/dog3.svg";

// Fish variant 1 images:

import fishLeftOne from "../images/FishMovement/fish.svg";
import fishLeftTwo from "../images/FishMovement/fish1.svg";
import fishRightOne from "../images/FishMovement/fish2.svg";
import fishRightTwo from "../images/FishMovement/fish3.svg";


export const petImages = {

    "dog": [[dogLeftOne, dogLeftTwo, dogRightOne, dogRightTwo],
            [dogLeftOne, dogLeftTwo, dogRightOne, dogRightTwo],
            [dogLeftOne, dogLeftTwo, dogRightOne, dogRightTwo]],

    "cat": [[s1CatLeftOne, s1CatLeftTwo, s1CatRightOne, s1CatRightTwo],
            [s2CatLeftOne, s2CatLeftTwo, s2CatRightOne, s2CatRightTwo],
            [s3CatLeftOne, s3CatLeftTwo, s3CatRightOne, s3CatRightTwo]],

    "fish": [[fishLeftOne, fishLeftTwo, fishRightOne, fishRightTwo],
            [fishLeftOne, fishLeftTwo, fishRightOne, fishRightTwo],
            [fishLeftOne, fishLeftTwo, fishRightOne, fishRightTwo]]

}