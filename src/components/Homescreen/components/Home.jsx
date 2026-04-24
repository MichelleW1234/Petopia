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

            <div className = "BackgroundScreen_Layout Home_BackgroundScreen_Color">  

                <div className="Navbar_Container">

                    {Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0 ? (

                        <>
                            <button className="ReusableComponentButtonPill_Structure Navbar_ReusableComponentButtonPill_Color" onClick = {() => setHomeOpenRestartFlag(true)}> Restart Game </button>
                            <button className="ReusableComponentButtonPill_Structure Navbar_ReusableComponentButtonPill_Color" onClick = {() => setHomeOpenClearPetsFlag(true)}> Clear Pets </button>
                        </>

                    ) : (

                        <>
                            <button className="ReusableComponentButtonPill_PlaceholderStructure Navbar_ReusableComponentButtonPill_PlaceholderColor" > Restart Game </button>
                            <button className="ReusableComponentButtonPill_PlaceholderStructure Navbar_ReusableComponentButtonPill_PlaceholderColor"> Clear Pets </button>
                        </>

                    )}

                    {Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3 ? (

                        <button className="ReusableComponentButtonPill_PlaceholderStructure Navbar_ReusableComponentButtonPill_PlaceholderColor"> Add Pets </button>

                    ) : (

                        <Link to ="/adopt" className="ReusableComponentButtonPill_Structure Navbar_ReusableComponentButtonPill_Color"> Add Pets </Link>

                    )}
                    
                </div>

                <div className = "Screen_ComponentsContainer">
                    <h1> Your Pets: </h1>
                    <div className="Universal_RowContainer">

                        {Object.keys(PetList).length === 0 && Object.keys(PetTimeStamps).length === 0 ? (

                            <h2 className = "ReusableComponentContainer_WindowBorderStructure Screen_ReusableComponentContainer_Color"> Your pet(s) will appear here when added. </h2>

                        ) : (

                            Object.keys(PetList).map((key) => {

                                const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]]) * 100)));

                                return (

                                    <div key = {key} className="ReusableComponentContainer_ButtonBorderStructure Screen_ReusableComponentContainer_Color">
                                        <div className = "Home_PetSlotAlertContainer">
                                            
                                            {currPetHealth >= 75 ? (

                                                <>
                                                    <div className="Home_PetSlotAlertGood"></div>
                                                    <div className="Home_PetSlotAlertGood"></div>
                                                    <div className="Home_PetSlotAlertGood"></div>
                                                </>
                                            
                                            ) : currPetHealth >= 50 ? (

                                                <>
                                                    <div className="Home_PetSlotAlertOkay"></div>
                                                    <div className="Home_PetSlotAlertOkay"></div>
                                                    <div className="Home_PetSlotAlertOkay"></div>
                                                </>

                                            ) : currPetHealth >= 25 ? (

                                                <>
                                                    <div className="Home_PetSlotAlertBad"></div>
                                                    <div className="Home_PetSlotAlertBad"></div>
                                                    <div className="Home_PetSlotAlertBad"></div>
                                                </>

                                            ) : currPetHealth > 0 ? (

                                                <>
                                                    <div className="Home_PetSlotAlertVeryBad"></div>
                                                    <div className="Home_PetSlotAlertVeryBad"></div>
                                                    <div className="Home_PetSlotAlertVeryBad"></div>
                                                </>

                                            ) : (

                                                <>
                                                    <div className="Home_PetSlotAlertDead"></div>
                                                    <div className="Home_PetSlotAlertDead"></div>
                                                    <div className="Home_PetSlotAlertDead"></div>
                                                </>

                                            )}

                                        </div>
                                        <Link
                                            to = {`/${PetList[key][speciesKey]}`}
                                            className="ReusableComponentButtonCircle_Structure Screen_ReusableComponentButtonCircle_Color"
                                            onClick = {() => getPet(key)}
                                        >
                                            <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                        </Link>
                                        <h2>{key}</h2>
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