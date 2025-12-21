import { Link } from 'react-router-dom';

import "./DogWashscreen.css";

function DogWashscreen (){

    return (

        <div className = "ScreenContainer">
            <div className = "header">  
                This is the washing screen of your selected pet.      
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogWashscreen;