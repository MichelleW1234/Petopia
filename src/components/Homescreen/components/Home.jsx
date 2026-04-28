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

            <div className = "ReusableMultitags_BackgroundScreen-Structure--Screens_ ReusableMultitags_BackgroundScreen-Color--Home_">  

                <div className="Screens_ComponentContainer-Structure--Navbar">

                    {Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0 ? (

                        <>
                            <button className="ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarNormal" onClick = {() => setHomeOpenRestartFlag(true)}> Restart Game </button>
                            <button className="ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarNormal" onClick = {() => setHomeOpenClearPetsFlag(true)}> Clear Pets </button>
                        </>

                    ) : (

                        <>
                            <button className="ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarUnclickable" > Restart Game </button>
                            <button className="ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarUnclickable"> Clear Pets </button>
                        </>

                    )}

                    {Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3 ? (

                        <button className="ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarUnclickable"> Add Pets </button>

                    ) : (

                        <Link to ="/adopt" className="ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarNormal"> Add Pets </Link>

                    )}
                    
                </div>

                <div className = "Screens_ComponentContainer-Structure--Components">
                    <h1> Your Pets: </h1>
                    <div className="ComponentContainer-Structure--Row">

                        {Object.keys(PetList).length === 0 && Object.keys(PetTimeStamps).length === 0 ? (

                            <h2 className = "ReusableMultitags_ComponentContainer-Structure--Window ReusableMultitags_ComponentContainer-Color--Screens_"> Your pet(s) will appear here when added. </h2>

                        ) : (

                            Object.keys(PetList).map((key) => {

                                const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]]) * 100)));

                                return (

                                    <div key = {key} className="ReusableMultitags_ComponentContainer-Structure--Button ReusableMultitags_ComponentContainer-Color--Screens_">
                                        <div className = "Home_ComponentContainer-Structure--PetAlert">
                                            
                                            {/* MAYBE REPLACE THESE WITH PAW PRINTS????????????*/}
                                            {currPetHealth >= 75 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertGood"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertGood"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertGood"></div>
                                                </>
                                            
                                            ) : currPetHealth >= 50 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertOkay"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertOkay"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertOkay"></div>
                                                </>

                                            ) : currPetHealth >= 25 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBad"></div>
                                                </>

                                            ) : currPetHealth > 0 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertVeryBad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertVeryBad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertVeryBad"></div>
                                                </>

                                            ) : (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertDead"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertDead"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertDead"></div>
                                                </>

                                            )}

                                        </div>
                                        <Link
                                            to = {`/${PetList[key][speciesKey]}`}
                                            className="ReusableMultitags_ComponentButtonCircle-Structure--Normal ReusableMultitags_ComponentButtonCircle-Color--Screens_Normal"
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