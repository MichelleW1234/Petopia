import { Link } from 'react-router-dom';

import "./FishWashscreen.css";

function FishWashscreen (){

    return (

        <div className = "ScreenContainer">
            <div className = "header">  
                This is the washing screen of your selected pet.      
            </div>
            <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default FishWashscreen;