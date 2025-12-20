import { Link } from 'react-router-dom';

import {usePetList} from "../../../providers/PetListProvider.jsx";

import "./Homescreen.css";

function Homescreen (){

    const {PetList, setPetList} = usePetList();

    return (

        <>
            <div className="NavBarContainer">
                <button className="NavBarButton"> Restart </button>
                <button className="NavBarButton"> Choose a Pet </button>
            </div>
            <div className = "ScreenContainer">  
                <h1 className="header"> Your Pets: </h1>
                <div className="PetSlotContainer">
                    {PetList.map((pet, index) => (

                        pet.length === 0 ? (

                            <div key = {index} className="PetSlotInnerContainer">
                                <div className="PetSlotInnerContainer">
                                    <div className = "PetSlot"> Empty Slot </div>
                                </div>
                                <Link to = "/pet" className = "GeneralNavButton"> Visit </Link>
                            </div>

                        ) : (

                            <div key = {index} className="PetSlotInnerContainer">
                                <div className = "PetSlot"> 
                                    <img src = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
                                    <p>Species: {pet[0]}</p>
                                    <p>Stage: {pet[1]}</p>
                                    <p>Health: {pet[2]}</p>
                                </div>
                                <Link to = "/pet" className = "GeneralNavButton"> Visit </Link>
                            </div>

                        )

                    ))}
                </div>
            </div>
        </>

    );

}


export default Homescreen;