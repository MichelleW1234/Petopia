import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { BackgroundMusicContext } from '../../../providers/BackgroundMusicProvider.jsx';

import MusicVolume from "../../GlobalComponents/MusicVolume.jsx";
import Deletion from "./HomescreenComponents/Deletion.jsx";
import Restart from "./HomescreenComponents/Restart.jsx";
import PetCareGuide from "./HomescreenComponents/PetCareGuide.jsx";

import { healthCapList, portraitPetImages, healthKey, speciesKey, stageKey, buttonSoundKey, buttonPressSoundKey } from "../../../constants/Constants.js";
import { flagOpener, playSound } from "../../../helpers/helpers.js";

import red from "../../../images/red.png";
import orange from "../../../images/orange.png";
import yellow from "../../../images/yellow.png";
import green from "../../../images/green.png";
import gray from "../../../images/gray.png";

import "./Home.css";



function Home (){

    const { audioRef } = useContext(BackgroundMusicContext);

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [homeMusicVolumeOpenFlag, setHomeMusicVolumeOpenFlag] = useState(false);
    const [homeDeletionOpenClearPetsFlag, setHomeDeletionOpenClearPetsFlag] = useState(false);
    const [homeRestartOpenFlag, setHomeRestartOpenFlag] = useState(false);
    const [homePetCareGuideOpenFlag, setHomePetCareGuideOpenFlag] = useState(false);

    const homeMinPetsAdopted = Object.keys(PetList).length > 0 && Object.keys(PetTimeStamps).length > 0;
    const homeMaxPetsAdopted = Object.keys(PetList).length === 3 && Object.keys(PetTimeStamps).length === 3;



    const navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homePetCareGuideOpenFlag && !homeMusicVolumeOpenFlag){

            flagOpener(setHomeMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("1", () => {

        if (homeMinPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homePetCareGuideOpenFlag && !homeMusicVolumeOpenFlag){

            flagOpener(setHomeRestartOpenFlag, 0);

        }

    },
        ".RestartGame"
    );


    useKeyboardShortcut("2", () => {

        if (homeMinPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homePetCareGuideOpenFlag && !homeMusicVolumeOpenFlag){

            flagOpener(setHomeDeletionOpenClearPetsFlag, 0);

        }

    },
        ".ClearPets"
    );



    useKeyboardShortcut("3", () => {

        if (!homeMaxPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homePetCareGuideOpenFlag && !homeMusicVolumeOpenFlag) {

            playSound(buttonSoundKey);
            navigate("/adopt");

        }

    },
        ".AdoptPets"
    );

    
    useKeyboardShortcut("4", () => {

        if (!homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homePetCareGuideOpenFlag && !homeMusicVolumeOpenFlag){

            flagOpener(setHomePetCareGuideOpenFlag, 0);

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

            {homeMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setHomeMusicVolumeOpenFlag}
            />}

            {homeRestartOpenFlag &&
            <Restart
                setRestartOpenFlag={setHomeRestartOpenFlag}
            />}

            {homeDeletionOpenClearPetsFlag &&
            <Deletion
                setDeletionOpenClearPetsFlag={setHomeDeletionOpenClearPetsFlag}
            />}

            {homePetCareGuideOpenFlag &&
            <PetCareGuide
                setPetCareGuideOpenFlag={setHomePetCareGuideOpenFlag}
            />}

            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {homeMinPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar RestartGame" onClick = {() => flagOpener(setHomeRestartOpenFlag, 0)}> Restart Game <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ClearPets" onClick = {() => flagOpener(setHomeDeletionOpenClearPetsFlag, 0)}> Clear Pets <br/> [2]</button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar" > Restart Game <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets <br/> [2]</button>
                        </>

                    )}

                    {!homeMaxPetsAdopted ? (

                        <Link to ="/adopt" className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar AddPets" onClick = {() => playSound(buttonSoundKey)}> Adopt Pets <br/> [3]</Link>

                    ) : (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Adopt Pets <br/> [3] </button>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar PetCareGuide" onClick = {() => flagOpener(setHomePetCareGuideOpenFlag, 0)}> Pet Care Guide <br/> [4]</button>
                    
                </div>


                {!homeMinPetsAdopted ? (

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
                                            
                                        <div className = "Home_ComponentContainer-Structure--PetAlert">
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery"src = {currPetHealth >= 75 ? 
                                                        green
                                                        : currPetHealth >= 50 ?
                                                        yellow
                                                        : currPetHealth >= 25 ?
                                                        orange
                                                        : currPetHealth > 0 ?
                                                        red :
                                                        gray
                                                    }
                                            />
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {currPetHealth >= 75 ? 
                                                        green
                                                        : currPetHealth >= 50 ?
                                                        yellow
                                                        : currPetHealth >= 25 ?
                                                        orange
                                                        : currPetHealth > 0 ?
                                                        red :
                                                        gray
                                                    }
                                            />
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {currPetHealth >= 75 ? 
                                                        green
                                                        : currPetHealth >= 50 ?
                                                        yellow
                                                        : currPetHealth >= 25 ?
                                                        orange
                                                        : currPetHealth > 0 ?
                                                        red :
                                                        gray
                                                    }
                                            />
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

                            })}
                        </div>

                    </div>

                )}

            </div>

            <button 
                className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen MiscellaneousElements_ComponentButton-Position--ScreenToggle Volume" 
                onClick = {() => flagOpener(setHomeMusicVolumeOpenFlag, 1)}>
                Volume <br/> [v]
            </button>

        </>

    );

}


export default Home;