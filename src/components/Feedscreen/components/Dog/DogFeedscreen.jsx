import { Link } from 'react-router-dom';

import "./DogFeedscreen.css";

function DogFeedscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the feeding screen of your selected pet.      
            </div>
            <Link to = "/dogpet" className = "GeneralNavButton"> Back </Link> 
        </div>

    );

}


export default DogFeedscreen;