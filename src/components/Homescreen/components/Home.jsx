import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import Deletion from "./HomescreenComponents/Deletion.jsx";
import Restart from "./HomescreenComponents/Restart.jsx";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";

import { healthCapList, maleGender, portraitPetImages, healthKey, speciesKey, stageKey, genderKey } from "../../../constants/Constants.js";

import BoyBow from "../../../images/Boy.png";
import GirlBow from "../../../images/Girl.png";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import "./Home.css";



function Home (){

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [homeOpenClearPetsFlag, setHomeOpenClearPetsFlag] = useState(false);
    const [homeOpenRestartFlag, setHomeOpenRestartFlag] = useState(false);

    const minPetsAdopted = Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0;
    const maxPetsAdopted = Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3;

    const navigate = useNavigate();

    useKeyboardShortcut("1", () => {

        if (minPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag){

            setHomeOpenRestartFlag(true);

        }

    },
        ".RestartGame"
    );


    useKeyboardShortcut("2", () => {

        if (minPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag){

            setHomeOpenClearPetsFlag(true);

        }

    },
        ".ClearPets"
    );



    useKeyboardShortcut("3", () => {

        if (!maxPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag) {

            navigate("/adopt");

        }

    },
        ".AddPets"
    );




    const getPet = (petToGet) => {

        setActivePetName(petToGet);
        
    }




    return (

        <>

            {homeOpenRestartFlag &&
            <Restart
                restartOpenFlag = {homeOpenRestartFlag}
                setRestartOpenFlag={setHomeOpenRestartFlag}
            />}

            {homeOpenClearPetsFlag &&
            <Deletion
                deletionOpenClearPetsFlag = {homeOpenClearPetsFlag}
                setDeletionOpenClearPetsFlag={setHomeOpenClearPetsFlag}
            />}

            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen--Nonstation">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {minPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar RestartGame" onClick = {() => setHomeOpenRestartFlag(true)}> Restart Game </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ClearPets" onClick = {() => setHomeOpenClearPetsFlag(true)}> Clear Pets </button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar" > Restart Game </button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets </button>
                        </>

                    )}

                    {maxPetsAdopted ? (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Add Pets </button>

                    ) : (

                        <Link to ="/adopt" className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar AddPets"> Add Pets </Link>

                    )}
                    
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                    <h1> Your Pets: </h1>

                    {!minPetsAdopted ? (

                        <h2 className = "Home_ComponentContainer-Template--Start"> Your pet(s) will appear here when added. </h2>

                    ) : (

                        <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                            {Object.keys(PetList).map((key) => {

                                const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]][PetList[key][stageKey]]) * 100)));

                                return (

                                    <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionButtonSlot">
                                            
                                        {/* MAYBE REPLACE THESE WITH PAW PRINTS????????????*/}
                                        {currPetHealth >= 75 ? (

                                            <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Good"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Good"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Good"></div>
                                            </div>
                                        
                                        ) : currPetHealth >= 50 ? (

                                            <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Okay"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Okay"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Okay"></div>
                                            </div>

                                        ) : currPetHealth >= 25 ? (

                                            <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Bad"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Bad"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Bad"></div>
                                            </div>

                                        ) : currPetHealth > 0 ? (

                                            <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--VeryBad"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--VeryBad"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--VeryBad"></div>
                                            </div>

                                        ) : (

                                            <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Dead"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Dead"></div>
                                                <div className="Home_ComponentContainer-Template--PetAlertBubble Home_ComponentContainer-Color--PetAlertBubble--Dead"></div>
                                            </div>

                                        )}

                                        <Link
                                            to = {`/${PetList[key][speciesKey]}`}
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen"
                                            onClick = {() => getPet(key)}
                                        >
                                            <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                        </Link>
                                        <h2>{key}</h2>

                                        {PetList[key][genderKey] === maleGender ? (

                                            <img className = "Home_ComponentImage-Template--PetBow" src = {BoyBow}/>

                                        ) : (

                                            <img className = "Home_ComponentImage-Template--PetBow" src = {GirlBow}/>

                                        )}
                                        
                                    </div>

                                )

                            })}
                        </div>

                    )}
                            
                </div>

            </div>

        </>

    );

}


export default Home;