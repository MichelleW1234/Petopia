import { Link } from 'react-router-dom';

import "./DogPlayscreen.css";

function DogPlayscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the playing screen of your selected pet.    

                Things to remember here: 
                - DEAL WITH OVERPLAYING BY COMPARING TIME NOW TO LAST TIME PLAYED
                - RESET SET PLAY TIME IN PETLIST    
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogPlayscreen;