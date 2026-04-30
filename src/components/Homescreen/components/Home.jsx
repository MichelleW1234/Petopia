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

            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen--Nonstation">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0 ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setHomeOpenRestartFlag(true)}> Restart Game </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setHomeOpenClearPetsFlag(true)}> Clear Pets </button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar" > Restart Game </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets </button>
                        </>

                    )}

                    {Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3 ? (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Add Pets </button>

                    ) : (

                        <Link to ="/adopt" className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar"> Add Pets </Link>

                    )}
                    
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--ScreenContent">
                    <h1> Your Pets: </h1>
                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                        {Object.keys(PetList).length === 0 && Object.keys(PetTimeStamps).length === 0 ? (

                            <h2 className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalWindowEncapsulation"> Your pet(s) will appear here when added. </h2>

                        ) : (

                            Object.keys(PetList).map((key) => {

                                const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]]) * 100)));

                                return (

                                    <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalButtonEncapsulation">
                                        <div className = "Home_ComponentContainer-Structure--PetAlert">
                                            
                                            {/* MAYBE REPLACE THESE WITH PAW PRINTS????????????*/}
                                            {currPetHealth >= 75 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Good"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Good"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Good"></div>
                                                </>
                                            
                                            ) : currPetHealth >= 50 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Okay"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Okay"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Okay"></div>
                                                </>

                                            ) : currPetHealth >= 25 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Bad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Bad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Bad"></div>
                                                </>

                                            ) : currPetHealth > 0 ? (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--VeryBad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--VeryBad"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--VeryBad"></div>
                                                </>

                                            ) : (

                                                <>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Dead"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Dead"></div>
                                                    <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Dead"></div>
                                                </>

                                            )}

                                        </div>
                                        <Link
                                            to = {`/${PetList[key][speciesKey]}`}
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen"
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