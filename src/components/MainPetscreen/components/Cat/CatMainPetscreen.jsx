import { Link } from "react-router-dom";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { catHealthCap, catTimeLimits } from "../../../../constants/Constants.js";


function CatMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const now = Date.now();
    
    const hungry = ActivePetNumber !== "" ? (now - PetTimeStamps[ActivePetNumber]["feeding"][0]) >= catTimeLimits[0]/2 ? true 
                        : false
                    : false;
    const restless = ActivePetNumber !== "" ? (now - PetTimeStamps[ActivePetNumber]["playing"][0]) >= catTimeLimits[2]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== "" ? PetList[ActivePetNumber]["health"]/catHealthCap >= 0.75 ? 0
                                            : PetList[ActivePetNumber]["health"]/catHealthCap >= 0.5 ? 1
                                            : PetList[ActivePetNumber]["health"]/catHealthCap >= 0.25 ? 2
                                            : 3
                                        : -1;


    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetNumber("")}> Back to Home </Link>
                <Link to = "/catfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Cat </Link>
                <Link to = "/catplay" className={restless ? "NavBarButtonUrgent" : "NavBarButton"}> Play With Cat </Link>
                <Link to = "/catmeds" className="NavBarButton"> Give Cat Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {450}
                    mood = {mood}
                />
            </div>
        </>

    );

}


export default CatMainPetscreen;