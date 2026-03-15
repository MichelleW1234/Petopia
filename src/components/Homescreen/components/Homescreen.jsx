import { Link } from "react-router-dom";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";

import { petImages } from "../../../constants/HomePetImages.js";

import "./Homescreen.css";
import { birthDateKey, healthKey, speciesKey, stageKey } from "../../../constants/Constants.js";



function Homescreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const noMorePets = Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3 ? true
                        : false;

    
    const restartGame = () => {

        setPetList({});
        setPetTimeStamps({});

    }

    const getPet = (petToGet) => {

        setActivePetName(petToGet);
        
    }

    const clearPet = (petToRemove) => {

        setPetTimeStamps(prev => {

            const { [petToRemove]: _, ...rest } = prev;
            return rest;

        });

        setPetList(prev => {

            const { [petToRemove]: _, ...rest } = prev;
            return rest;

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

                    {Object.keys(PetList).length === 0 && Object.keys(PetTimeStamps).length === 0 ? (

                        <div className="HomescreenPetSlotInnerContainer">
                            <div className = "HomescreenPetSlot"> You currently have no pets. </div>
                        </div>

                    ) : (

                        Object.keys(PetList).map((key) => (

                            PetList[key][healthKey] > 0 ? (

                                <div key = {key} className="HomescreenPetSlotInnerContainer">
                                    <div className = "HomescreenPetSlot"> 
                                        <img src = {petImages[PetList[key][speciesKey]][PetList[key][stageKey]-1]}/>
                                        <p>{key}</p>
                                        <p>Stage: {PetList[key][stageKey]}</p>
                                        <p>Health: {PetList[key][healthKey]}</p>
                                    </div>

                                    <Link to = {`/${PetList[key][speciesKey]}pet`} className = "GeneralNavButton" onClick = {() => getPet(key)}> Visit </Link>
                                </div>

                            ) : (
 
                                <div key = {key} className="HomescreenPetSlotInnerContainer">
                                    <div className = "HomescreenPetSlot"> 
                                        <img src = {petImages[PetList[key][speciesKey]][PetList[key][stageKey]-1]}/>
                                        <p> {key}</p>
                                        <p>Stage: -- </p>
                                        <p>Health: -- </p>
                                    </div>

                                    <button className = "GeneralNavButton" onClick = {() => clearPet(key)}> Clear </button>
                                </div>

                            )

                        ))

                    )}
                        
                </div>
            </div>
        </>

    );

}


export default Homescreen;