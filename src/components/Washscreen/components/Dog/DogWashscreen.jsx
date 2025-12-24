import { Link } from 'react-router-dom';

import "./DogWashscreen.css";

function DogWashscreen (){

    return (

        <div className = "ScreenContainer">
            <div className = "header">  
                This is the washing screen of your selected pet. 

                Things to remember here: 
                - DEAL WITH OVERCLEANING BY COMPARING TIME NOW TO LAST TIME CLEANED
                - RESET SET CLEAN TIME IN PETLIST       
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogWashscreen;