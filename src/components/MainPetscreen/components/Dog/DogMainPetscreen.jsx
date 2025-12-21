import { Link } from 'react-router-dom';

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

import { resetActivePet } from '../../helpers/Helpers.js';

import "./DogMainPetscreen.css";

function DogMainPetscreen (){

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    
    return (
        
        <>
            <div className="NavBarContainer">
                <Link to = "/dogfeed" className="NavBarButton"> Feed Dog </Link>
                <Link to = "/dogwash" className="NavBarButton"> Bathe Dog </Link>
                <Link to = "/dogplay" className="NavBarButton"> Play With Dog </Link>
            </div>
            <div className = "ScreenContainer">
                <div className="header">  
                    This is the main screen of your selected pet. 
                    You can check up on your pet's health and see how they are doing.
                    From here is where you choose how to interact with them and tend to their needs.
                </div>
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => resetActivePet(setActivePetNumber)}> Back to Home </Link>
            </div>
        </>

    );

}


export default DogMainPetscreen;