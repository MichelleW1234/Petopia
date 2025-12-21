import { Link } from 'react-router-dom';

import "./CatPlayscreen.css";

function CatPlayscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the playing screen of your selected pet.     
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default CatPlayscreen;