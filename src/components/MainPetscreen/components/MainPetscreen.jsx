import { Link } from 'react-router-dom';

import "./MainPetscreen.css";

function MainPetscreen (){

    return (

        <div className = "ScreenContainer">
            <div className="header">  
                This is the main screen of your selected pet. 
                You can check up on your pet's health and see how they are doing.
                From here is where you choose how to interact with them and tend to their needs.
            </div>
        </div>

    );

}


export default MainPetscreen;