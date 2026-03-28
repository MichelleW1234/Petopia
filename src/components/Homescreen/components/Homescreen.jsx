import { Link } from "react-router-dom";
import { useState } from "react";

import HomescreenClearPetsFlag from "./HomescreenComponents/HomescreenClearPetsFlag.jsx";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";

import { petImages } from "../../../constants/HomePetImages.js";

import "./Homescreen.css";
import { healthKey, speciesKey, stageKey } from "../../../constants/Constants.js";



function Homescreen (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const noMorePets = Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3 ? true
                        : false;


    const [openClearPetsFlag, setOpenClearPetsFlag] = useState(false);

    
    const restartGame = () => {

        setPetList({});
        setPetTimeStamps({});

    }

    const getPet = (petToGet) => {

        setActivePetName(petToGet);
        
    }




    return (

        <>

            {openClearPetsFlag &&
            <HomescreenClearPetsFlag
                setOpenClearPetsFlag={setOpenClearPetsFlag}
            />}

            <div className="NavBarContainer">
                <button className="NavBarButton" onClick = {() => restartGame()}> Restart Game </button>

                {Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0 ? (

                    <button className="NavBarButton" onClick = {() => setOpenClearPetsFlag(true)}> Clear Pets </button>

                ) : (

                    <button className="NavBarButtonPlaceHolder"> Clear Pets </button>

                )}

                {noMorePets ? (

                   <button className="NavBarButtonPlaceHolder"> Add Pets </button>

                ) : (

                    <Link to ="/select" className="NavBarButton"> Add Pets </Link>

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

                            <div key = {key} className="HomescreenPetSlotInnerContainer">

                                {PetList[key][healthKey] > 0 ? (

                                    <div className = "HomescreenPetSlot"> 
                                        <img src = {petImages[PetList[key][speciesKey]][PetList[key][stageKey]-1]}/>
                                        <p>{key}</p>
                                        <p>Stage: {PetList[key][stageKey]}</p>
                                        <p>Health: {PetList[key][healthKey]}</p>
                                    </div>

                                ) : (

                                    <div className = "HomescreenPetSlot"> 
                                        <img src = {petImages[PetList[key][speciesKey]][PetList[key][stageKey]-1]}/>
                                        <p> {key}</p>
                                        <p>Stage: -- </p>
                                        <p>Health: -- </p>
                                    </div>

                                )}

                                <Link to = {`/${PetList[key][speciesKey]}pet`} className = "GeneralNavButton" onClick = {() => getPet(key)}> Visit </Link>
                                
                            </div>

                        ))

                    )}
                        
                </div>
            </div>
        </>

    );

}


export default Homescreen;