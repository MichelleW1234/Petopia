import { Link } from 'react-router-dom';

import "./CatWashscreen.css";

function CatWashscreen (){

    return (

        <div className = "ScreenContainer">
            <div className = "header">  
                This is the washing screen of your selected pet.      
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default CatWashscreen;