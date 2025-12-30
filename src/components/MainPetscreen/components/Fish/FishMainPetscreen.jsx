import { Link } from 'react-router-dom';

import MainPetWindow from "../MainPetscreenComponents/MainPetWindow.jsx";

import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import { fishHealthCap, fishTimeLimits } from '../../../../constants/Constants.js';

import { resetActivePet } from '../../helpers/Helpers.js';


function FishMainPetscreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const now = Date.now();
    const hungry = ActivePetNumber !== -1 ?  (now - PetTimeStamps[ActivePetNumber][0][0]) >= fishTimeLimits[0]/2 ? true 
                        : false
                    : false;
    const dirty = ActivePetNumber !== -1 ?  (now - PetTimeStamps[ActivePetNumber][1][0]) >= fishTimeLimits[1]/2 ? true 
                        : false
                    : false;
    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][3]/fishHealthCap >= 0.75 ? 0
                                    : PetList[ActivePetNumber][3]/fishHealthCap >= 0.5 ? 1
                                    : PetList[ActivePetNumber][3]/fishHealthCap >= 0.25 ? 2
                                    : 3
                                : -1;


    return (

        <>
            <div className="NavBarContainer">
                <Link to = "/fishfeed" className={hungry ? "NavBarButtonUrgent" : "NavBarButton"}> Feed Fish </Link>
                <Link to = "/fishwash" className={dirty ? "NavBarButtonUrgent" : "NavBarButton"}> Clean Fish Tank </Link>
                <Link to = "/fishmeds" className="NavBarButton"> Give Fish Medicine </Link>
            </div>
            <div className = "ScreenContainer">
                <MainPetWindow
                    petEnergy = {500}
                    mood = {mood}
                />
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default FishMainPetscreen;