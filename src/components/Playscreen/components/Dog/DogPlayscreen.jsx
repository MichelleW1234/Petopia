import { Link } from 'react-router-dom';

import "./DogPlayscreen.css";

function DogPlayscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the playing screen of your selected pet.      
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogPlayscreen;