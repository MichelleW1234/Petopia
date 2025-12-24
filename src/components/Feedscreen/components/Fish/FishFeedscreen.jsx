import { Link } from 'react-router-dom';

import "./FishFeedscreen.css";

function FishFeedscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the feeding screen of your selected pet.

                Things to remember here: 
                - DEAL WITH OVERFEEDING BY COMPARING TIME NOW TO LAST TIME FED
                - RESET SET FED TIME IN PETLIST

            </div>
            <Link to = "/fishpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default FishFeedscreen;