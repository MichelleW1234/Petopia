import { Link } from 'react-router-dom';

import "./CatFeedscreen.css";

function CatFeedscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the feeding screen of your selected pet.      
            </div>
            <Link to = "/catpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default CatFeedscreen;