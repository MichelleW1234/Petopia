import { Link } from "react-router-dom";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../providers/ActivePetNumberProvider.jsx";

import { petImages } from "../../../constants/HomePetImages.js";

import "./Homescreen.css";



function Homescreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const noMorePets = PetList.every(item => item.length > 0);


    
    const restartGame = () => {

        setPetList([[], [], []]);
        setPetTimeStamps([[], [], []]);

    }

    const getPet = (index) => {

        setActivePetNumber(index);
        
    }

    const clearPet = (index) => {

        setPetTimeStamps(prev => {

            const updatedPetTimeStamps = [...prev];
            updatedPetTimeStamps[index] = [];
            return updatedPetTimeStamps;

        });

        setPetList(prev => {

            const updatedPetList = [...prev];
            updatedPetList[index] = [];
            return updatedPetList;

        });

    }




    return (

        <>

            <div className="NavBarContainer">
                <button className="NavBarButton" onClick = {() => restartGame()}> Restart </button>

                {noMorePets ? (

                   <button className="NavBarButtonPlaceHolder"> Choose a Pet </button>

                ) : (

                    <Link to ="/select" className="NavBarButton"> Choose a Pet </Link>

                )}
                
            </div>
            <div className = "ScreenContainer">  
                <h1 className="header"> Your Pets: </h1>
                <div className="HomescreenPetSlotContainer">
                    {PetList.map((pet, index) => (

                        pet.length === 0 ? (

                            <div key = {index} className="HomescreenPetSlotInnerContainer">
                                <div className = "HomescreenPetSlot"> Empty Slot </div>
                                <div className = "GeneralNavButtonPlaceHolder"> Visit </div>
                            </div>

                        ) : pet[4] > 0 ? (

                            <div key = {index} className="HomescreenPetSlotInnerContainer">
                                <div className = "HomescreenPetSlot"> 
                                    <img src = {petImages[pet[1]][pet[2]][pet[3]-1]}/>
                                    <p>{pet[0]}</p>
                                    <p>Stage: {pet[3]}</p>
                                    <p>Health: {pet[4]}</p>
                                </div>

                                <Link to = {`/${pet[1]}pet`} className = "GeneralNavButton" onClick = {() => getPet(index)}> Visit </Link>
                            </div>

                        ) : (

                            <div key = {index} className="HomescreenPetSlotInnerContainer">
                                <div className = "HomescreenPetSlot"> 
                                    <img  src = {petImages[pet[1]][pet[2]][pet[3]-1]}/>
                                    <p> {pet[0]}</p>
                                    <p>Stage: -- </p>
                                    <p>Health: -- </p>
                                </div>

                                <button className = "GeneralNavButton" onClick = {() => clearPet(index)}> Clear </button>
                            </div>

                        )

                    ))}
                </div>
            </div>
        </>

    );

}


export default Homescreen;