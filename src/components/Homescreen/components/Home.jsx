import { Link } from "react-router-dom";
import { useState } from "react";

import Deletion from "./HomescreenComponents/Deletion.jsx";
import Restart from "./HomescreenComponents/Restart.jsx";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";

import { healthCapList, portraitPetImages } from "../../../constants/Constants.js";
import { healthKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Home.css";



function Home (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [homeOpenClearPetsFlag, setHomeOpenClearPetsFlag] = useState(false);
    const [homeOpenRestartFlag, setHomeOpenRestartFlag] = useState(false);




    const getPet = (petToGet) => {

        setActivePetName(petToGet);
        
    }




    return (

        <>

            {homeOpenRestartFlag &&
            <Restart
                setRestartOpenFlag={setHomeOpenRestartFlag}
            />}

            {homeOpenClearPetsFlag &&
            <Deletion
                setDeletionOpenClearPetsFlag={setHomeOpenClearPetsFlag}
            />}

            <div className = "screenLayout Homescreen">  

                <div className="navbarContainer">

                    {Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0 ? (

                        <>
                            <button className="linearGradientButtonStructure navbarButtonColor" onClick = {() => setHomeOpenRestartFlag(true)}> Restart Game </button>
                            <button className="linearGradientButtonStructure navbarButtonColor" onClick = {() => setHomeOpenClearPetsFlag(true)}> Clear Pets </button>
                        </>

                    ) : (

                        <>
                            <button className="linearGradientButtonPlaceholderStructure navbarButtonPlaceholderColor" > Restart Game </button>
                            <button className="linearGradientButtonPlaceholderStructure navbarButtonPlaceholderColor"> Clear Pets </button>
                        </>

                    )}

                    {Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3 ? (

                    <button className="linearGradientButtonPlaceholderStructure navbarButtonPlaceholderColor"> Add Pets </button>

                    ) : (

                        <Link to ="/adopt" className="linearGradientButtonStructure navbarButtonColor"> Add Pets </Link>

                    )}
                    
                </div>

                <div className = "screenComponentsContainer">
                    <h1 className="header"> Your Pets: </h1>
                    <div className="HomePetSlotContainer">

                        {Object.keys(PetList).length === 0 && Object.keys(PetTimeStamps).length === 0 ? (

                            <h2 className = "HomeNoPets"> Your pet(s) will appear here when added. </h2>

                        ) : (

                            Object.keys(PetList).map((key) => {

                                const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]]) * 100)));

                                return (

                                    <div className="conicGradientContainerStructure screenGeneralContainerColor HomePetSlot">
                                        <div className = "HomePetSlotAlertContainer">
                                            
                                            {currPetHealth >= 75 ? (

                                                <>
                                                    <div className="HomePetSlotAlertGood"></div>
                                                    <div className="HomePetSlotAlertGood"></div>
                                                    <div className="HomePetSlotAlertGood"></div>
                                                </>
                                            
                                            ) : currPetHealth >= 50 ? (

                                                <>
                                                    <div className="HomePetSlotAlertOkay"></div>
                                                    <div className="HomePetSlotAlertOkay"></div>
                                                    <div className="HomePetSlotAlertOkay"></div>
                                                </>

                                            ) : currPetHealth >= 25 ? (

                                                <>
                                                    <div className="HomePetSlotAlertBad"></div>
                                                    <div className="HomePetSlotAlertBad"></div>
                                                    <div className="HomePetSlotAlertBad"></div>
                                                </>

                                            ) : currPetHealth > 0 ? (

                                                <>
                                                    <div className="HomePetSlotAlertVeryBad"></div>
                                                    <div className="HomePetSlotAlertVeryBad"></div>
                                                    <div className="HomePetSlotAlertVeryBad"></div>
                                                </>

                                            ) : (

                                                <>
                                                    <div className="HomePetSlotAlertDead"></div>
                                                    <div className="HomePetSlotAlertDead"></div>
                                                    <div className="HomePetSlotAlertDead"></div>
                                                </>

                                            )}
                                        </div>
                                        <Link 
                                            key = {key}
                                            to = {`/${PetList[key][speciesKey]}`}
                                            className="radialGradientButtonStructure screenOptionButtonColor"
                                            onClick = {() => getPet(key)}
                                        >
                                            <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                        </Link>
                                        <h2 className = "HomePetSlotPetName">{key}</h2>


                                    </div>

                                )

                            })

                        )}
                            
                    </div>
                </div>

            </div>

        </>

    );

}


export default Home;