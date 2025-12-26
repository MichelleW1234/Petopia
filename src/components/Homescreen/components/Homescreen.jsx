import { Link } from 'react-router-dom';
import {useState} from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../providers/ActivePetNumberProvider.jsx";

import PetSelector from "./HomescreenComponents/PetSelector.jsx";

import "./Homescreen.css";

function Homescreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const allowMorePets = PetList.every(item => item.length > 0);

    const [petSelectorFlag, setPetSelectorFlag] = useState(false);



    const viewPetOptions = () => {

        setPetSelectorFlag(true);

    }
    
    const restartGame = () => {

        setPetList([[], [], []]);
        setPetTimeStamps([[], [], []]);

    }

    const getPet = (index) => {

        setActivePetNumber(index);
        
    }




    return (

        <>
            {petSelectorFlag && 
            <PetSelector
                setPetSelectorFlag = {setPetSelectorFlag}
            />}

            <div className="NavBarContainer">
                <button className="NavBarButton" onClick = {() => restartGame()}> Restart </button>

                {allowMorePets ? (

                    <button className="NavBarButtonPlaceHolder"> Choose a Pet </button>

                ) : (

                    <button className="NavBarButton" onClick = {() => viewPetOptions()}> Choose a Pet </button>

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

                        ) : (

                            <div key = {index} className="HomescreenPetSlotInnerContainer">
                                <div className = "HomescreenPetSlot"> 
                                    <img  src = {"https://vetmed.illinois.edu/wp-content/uploads/2021/04/pc-keller-hedgehog.jpg"} /*src = {pet[1]}*//>
                                    <p>Species: {pet[0]}</p>
                                    <p>Stage: {pet[2]}</p>
                                    <p>Health: {pet[3]}</p>
                                </div>

                                <Link to = {`/${pet[0]}pet`} className = "GeneralNavButton" onClick = {() => getPet(index)}> Visit </Link>
                            </div>

                        )

                    ))}
                </div>
            </div>
        </>

    );

}


export default Homescreen;