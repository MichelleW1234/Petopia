import { Link } from "react-router-dom";

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { fishHealthCap, fishTimeLimits } from "../../../../constants/Constants.js";


function FishMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const now = Date.now();
    const hungry = ActivePetNumber !== "" ?  (now - PetTimeStamps[ActivePetNumber]["feeding"][0]) >= fishTimeLimits["feeding"]/2 ? true 
                        : false
                    : false;
    const dirty = ActivePetNumber !== "" ?  (now - PetTimeStamps[ActivePetNumber]["bathing"][0]) >= fishTimeLimits["bathing"]/2 ? true 
                        : false
                    : false;

    const mood = ActivePetNumber !== "" ? PetList[ActivePetNumber]["health"]/fishHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetNumber]["health"]/fishHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetNumber]["health"]/fishHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;


    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetNumber("")}> Back to Home </Link>
                <Link to = "/fishfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Fish </Link>
                <Link to = "/fishwash" className={dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Clean Fish Tank </Link>
                <Link to = "/fishmeds" className="NavBarButton"> Give Fish Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {400}
                    mood = {mood}
                />
            </div>
        </>

    );

}


export default FishMainPetscreen;