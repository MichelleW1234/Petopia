import { Link } from 'react-router-dom';

import "./FishFeedscreen.css";

function FishFeedscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the feeding screen of your selected pet.      
            </div>
            <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default FishFeedscreen;