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
            <div className = "screenLayout">  
                <h1 className="header"> Your Pets: </h1>
                <div className="HomePetSlotContainer">

                    {Object.keys(PetList).length === 0 && Object.keys(PetTimeStamps).length === 0 ? (

                        <h2 className = "HomeNoPets"> Your pet(s) will appear here when added. </h2>

                    ) : (

                        Object.keys(PetList).map((key) => {

                            const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]]) * 100)));

                            return (

                                <div className="screenGeneralContainerTemplate HomePetSlot">

                                    <Link 
                                        key = {key}
                                        to = {`/${PetList[key][speciesKey]}`}
                                        className="radialGradientButtonStructure screenOptionButtonColor"
                                        onClick = {() => getPet(key)}
                                    >
                                        <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                    </Link>
                                    <h2 className = "HomePetSlotPetName">{key}</h2>
                                    <div className = "HomePetSlotHealthBarContainer">

                                        {currPetHealth > 75 ? (

                                            Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                                                <div key = {num} className = {num <= currPetHealth ? 
                                                                                    "HomePetSlotHealthBarCellDoneGood"
                                                                                : "HomePetSlotHealthBarCellLeft"
                                                                            }>
                                                </div>

                                            ))

                                        ) : currPetHealth > 50 ? (

                                            Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                                                <div key = {num} className = {num <= currPetHealth ? 
                                                                                    "HomePetSlotHealthBarCellDoneOkay"
                                                                                : "HomePetSlotHealthBarCellLeft"
                                                                            }>
                                                </div>

                                            ))

                                        ) : currPetHealth > 25 ? (

                                            Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                                                <div key = {num} className = {num <= currPetHealth ? 
                                                                                    "HomePetSlotHealthBarCellDoneBad"
                                                                                : "HomePetSlotHealthBarCellLeft"
                                                                            }>
                                                </div>

                                            ))

                                        ) : currPetHealth > 0 ? (

                                            Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                                                <div key = {num} className = {num <= currPetHealth ? 
                                                                                    "HomePetSlotHealthBarCellDoneVeryBad"
                                                                                : "HomePetSlotHealthBarCellLeft"
                                                                            }>
                                                </div>

                                            ))

                                        ) : (

                                            Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                                                <div key = {num} className = "HomePetSlotHealthBarCellDead"></div>

                                            ))

                                        )}
                                        
                                    </div>

                                </div>

                            )

                        })

                    )}
                        
                </div>
            </div>
        </>

    );

}


export default Home;