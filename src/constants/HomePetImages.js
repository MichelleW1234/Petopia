import catStageOne from "../images/placeholderstage1.jpeg";
import catStageTwo from "../images/placeholderstage2.jpg";
import catStageThree from "../images/placeholderstage3.jpg";

import dogStageOne from "../images/placeholderstage1.jpeg";
import dogStageTwo from "../images/placeholderstage2.jpg";
import dogStageThree from "../images/placeholderstage3.jpg";

import fishStageOne from "../images/placeholderstage1.jpeg";
import fishStageTwo from "../images/placeholderstage2.jpg";
import fishStageThree from "../images/placeholderstage3.jpg";
import { catSpecies, dogSpecies, fishSpecies } from "./Constants";


export const petImages = {
    [dogSpecies]: [dogStageOne, dogStageTwo, dogStageThree],
    [catSpecies]: [catStageOne, catStageTwo, catStageThree],
    [fishSpecies]: [fishStageOne, fishStageTwo, fishStageThree]
}