import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";

import Deletion from "./HomescreenComponents/Deletion.jsx";
import Restart from "./HomescreenComponents/Restart.jsx";
import PetCareGuide from "./HomescreenComponents/PetCareGuide.jsx";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";

import { healthCapList, portraitPetImages, healthKey, speciesKey, stageKey, buttonSoundKey, buttonPressSoundKey } from "../../../constants/Constants.js";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import { flagOpener, playSound } from "../../../helpers/helpers.js";

import { BackgroundMusicContext } from '../../../providers/BackgroundMusicProvider.jsx';

import "./Home.css";

import red from "../../../images/red.png";
import orange from "../../../images/orange.png";
import yellow from "../../../images/yellow.png";
import green from "../../../images/green.png";
import gray from "../../../images/gray.png";



function Home (){

    const { audioRef } = useContext(BackgroundMusicContext);

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [homeOpenClearPetsFlag, setHomeOpenClearPetsFlag] = useState(false);
    const [homeOpenRestartFlag, setHomeOpenRestartFlag] = useState(false);
    const [homeOpenPetCareGuideFlag, setHomeOpenPetCareGuideFlag] = useState(false);

    const minPetsAdopted = Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0;
    const maxPetsAdopted = Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3;

    const navigate = useNavigate();

    useKeyboardShortcut("1", () => {

        if (minPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag && !homeOpenPetCareGuideFlag){

            flagOpener(setHomeOpenRestartFlag);

        }

    },
        ".RestartGame"
    );


    useKeyboardShortcut("2", () => {

        if (minPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag && !homeOpenPetCareGuideFlag){

            flagOpener(setHomeOpenClearPetsFlag);

        }

    },
        ".ClearPets"
    );



    useKeyboardShortcut("3", () => {

        if (!maxPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag && !homeOpenPetCareGuideFlag) {

            playSound(buttonSoundKey);
            navigate("/adopt");

        }

    },
        ".AdoptPets"
    );

    
    useKeyboardShortcut("4", () => {

        if (minPetsAdopted && !homeOpenClearPetsFlag && !homeOpenRestartFlag && !homeOpenPetCareGuideFlag){

            flagOpener(setHomeOpenPetCareGuideFlag);

        }

    },
        ".PetCareGuide"
    );


    const getPet = (petToGet) => {

        playSound(buttonPressSoundKey);
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

            {homeOpenPetCareGuideFlag &&
            <PetCareGuide
                setPetCareGuideOpenFlag={setHomeOpenPetCareGuideFlag}
            />}

            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {minPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar RestartGame" onClick = {() => flagOpener(setHomeOpenRestartFlag)}> Restart Game <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ClearPets" onClick = {() => flagOpener(setHomeOpenClearPetsFlag)}> Clear Pets <br/> [2]</button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar" > Restart Game <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets <br/> [2]</button>
                        </>

                    )}

                    {maxPetsAdopted ? (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Adopt Pets <br/> [3] </button>

                    ) : (

                        <Link to ="/adopt" className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar AddPets" onClick = {() => playSound(buttonSoundKey)}> Adopt Pets <br/> [3]</Link>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar PetCareGuide" onClick = {() => flagOpener(setHomeOpenPetCareGuideFlag)}> Pet Care Guide <br/> [4]</button>
                    
                </div>


                    {!minPetsAdopted ? (

                        <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                            <div className = "Home_ComponentContainer-Template--Start">
                                <h1> Welcome.</h1>
                                <h1>Adopt up to 3 pets to get started. </h1>
                            </div>
                        </div>

                    ) : (

                        <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">
                            <h1> Your Pets: </h1>

                            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                {Object.keys(PetList).map((key) => {

                                    const currPetHealth = Math.min(100, Math.max(0, Math.floor(((PetList[key][healthKey])/healthCapList[PetList[key][speciesKey]][PetList[key][stageKey]]) * 100)));

                                    return (

                                        <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                                
                                            {currPetHealth >= 75 ? (
            
                                                <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                    <img src = {green}/>
                                                    <img src = {green}/>
                                                    <img src = {green}/>
                                                </div>
                                            
                                            ) : currPetHealth >= 50 ? (

                                                <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                    <img src = {yellow}/>
                                                    <img src = {yellow}/>
                                                    <img src = {yellow}/>
                                                </div>

                                            ) : currPetHealth >= 25 ? (

                                                <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                    <img src = {orange}/>
                                                    <img src = {orange}/>
                                                    <img src = {orange}/>
                                                </div>

                                            ) : currPetHealth > 0 ? (

                                                <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                    <img src = {red}/>
                                                    <img src = {red}/>
                                                    <img src = {red}/>
                                                </div>

                                            ) : (

                                                <div className = "Home_ComponentContainer-Structure--PetAlert">
                                                    <img src = {gray}/>
                                                    <img src = {gray}/>
                                                    <img src = {gray}/>
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
                                            
                                        </div>

                                    )

                                })}
                            </div>

                        </div>

                    )}

            </div>

        </>

    );

}


export default Home;