import {useState} from "react";

import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";

import { catTimeLimits, feedingKey, healthKey } from "../../../../../constants/Constants.js";

import { CheckPetHealth } from "../../../../../helpers/Helpers.js";

import "./CatFeedscreenWindow.css";


function CatFeedscreenWindow (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [selectionMade, setSelectionMade] = useState(false);

    return (

        PetList[ActivePetName][healthKey] === 0 ? (

            <div className= "MainPetWindowGrid MainPetWindowGrid-tomb"></div>

        ) : !selectionMade ? (

            <div className="CatFeedscreenWindowSelectionMode">

                <div className = "filler"></div>
                
            </div>

        ) : (

            <div className = "CatFeedscreenWindowAnimationMode">

                <div className = "filler"></div>
                
            </div>

        )
        
    );

}


export default CatFeedscreenWindow;