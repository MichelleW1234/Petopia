import { Link } from 'react-router-dom';

import "./CatPlayscreen.css";

function CatPlayscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the playing screen of your selected pet.   

                Things to remember here: 
                - DEAL WITH OVERPLAYING BY COMPARING TIME NOW TO LAST TIME PLAYED
                - RESET SET PLAY TIME IN PETLIST  
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default CatPlayscreen;