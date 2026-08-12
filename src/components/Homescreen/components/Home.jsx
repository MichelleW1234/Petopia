import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import { useActiveCheckoutRoom } from "../../../providers/ActiveCheckoutRoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { BackgroundMusicContext } from '../../../providers/BackgroundMusicProvider.jsx';

import MusicVolume from "../../GlobalComponents/components/MusicVolume.jsx";
import Inventory from "../../GlobalComponents/components/Inventory.jsx";
import Deletion from "./HomescreenComponents/Deletion.jsx";
import Restart from "./HomescreenComponents/Restart.jsx";
import ReadMe from "./HomescreenComponents/ReadMe.jsx";
import Shop from "./HomescreenComponents/Shop.jsx";

import { healthCapList, portraitPetImages, healthKey, speciesKey, stageKey, navButtonPressSoundKey, selectionButtonPressSoundKey } from "../../../constants/Constants.js";
import { flagOpener, playSound } from "../../../helpers/Helpers.js";

import RedPetBattery from "../../../images/RedPetBattery.png";
import OrangePetBattery from "../../../images/OrangePetBattery.png";
import YellowPetBattery from "../../../images/YellowPetBattery.png";
import GreenPetBattery from "../../../images/GreenPetBattery.png";
import GrayPetBattery from "../../../images/GrayPetBattery.png";
import AddNewPet from "../../../images/AddNewPet.png";

import "./Home.css";



function Home (){

    const { audioRef } = useContext(BackgroundMusicContext);

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();

    const [homeMusicVolumeOpenFlag, setHomeMusicVolumeOpenFlag] = useState(false);
    const [homeInventoryOpenFlag, setHomeInventoryOpenFlag] = useState(false);
    const [homeDeletionOpenClearPetsFlag, setHomeDeletionOpenClearPetsFlag] = useState(false);
    const [homeRestartOpenFlag, setHomeRestartOpenFlag] = useState(false);
    const [homeReadMeOpenFlag, setHomeReadMeOpenFlag] = useState(false);
    const [homeShopOpenFlag, setHomeShopOpenFlag] = useState(false);

    const homeMinPetsAdopted = Room.filter(x => x === null).length < 3;



    const navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeShopOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
        
        if (homeMinPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeShopOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeInventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {

        if (homeMinPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeShopOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeRestartOpenFlag, 0);

        }

    },
        ".RestartGame"
    );


    useKeyboardShortcut("2", () => {

        if (homeMinPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeShopOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeDeletionOpenClearPetsFlag, 0);

        }

    },
        ".ClearPets"
    );

    
    useKeyboardShortcut("3", () => {

        if (homeMinPetsAdopted && !homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeShopOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeShopOpenFlag, 0);

        }

    },
        ".BuyShopItems"
    );

    
    useKeyboardShortcut("4", () => {

        if (!homeDeletionOpenClearPetsFlag && !homeRestartOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeShopOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeReadMeOpenFlag, 0);

        }

    },
        ".ReadMe"
    );



    
    

    const getPet = (petToGet) => {

        playSound(selectionButtonPressSoundKey);
        setActivePetName(petToGet);
        
    }


    const checkoutRoom = (roomNumber) => {

        playSound(navButtonPressSoundKey);
        setActiveCheckoutRoom(roomNumber);

    }



    return (

        <>

            {homeMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setHomeMusicVolumeOpenFlag}
            />}

            {homeInventoryOpenFlag && 
            <Inventory
                setInventoryOpenFlag={setHomeInventoryOpenFlag}
            />}

            {homeRestartOpenFlag &&
            <Restart
                setRestartOpenFlag={setHomeRestartOpenFlag}
            />}

            {homeDeletionOpenClearPetsFlag &&
            <Deletion
                setDeletionOpenClearPetsFlag={setHomeDeletionOpenClearPetsFlag}
            />}

            {homeReadMeOpenFlag &&
            <ReadMe
                setReadMeOpenFlag={setHomeReadMeOpenFlag}
            />}


            {homeShopOpenFlag &&
            <Shop
                setShopOpenFlag={setHomeShopOpenFlag}
            />
            }


            <div className = "UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Template--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {homeMinPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar RestartGame" onClick = {() => flagOpener(setHomeRestartOpenFlag, 0)}> Restart Game <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ClearPets" onClick = {() => flagOpener(setHomeDeletionOpenClearPetsFlag, 0)}> Clear Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar BuyShopItems" onClick = {() => flagOpener(setHomeShopOpenFlag, 0)}> Buy Shop Items <br/> [3]</button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Restart Game <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Buy Shop Items <br/> [3]</button>
                        </>

                    )}


                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ReadMe" onClick = {() => flagOpener(setHomeReadMeOpenFlag, 0)}> Read Me <br/> [4]</button>
                    
                </div>

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        {homeMinPetsAdopted ? (

                            <h1> Your Pets: </h1>

                        ) : (

                            <h1> Welcome! Adopt up to 3 pets to get started. </h1>

                        )}

                        <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                            {Room.map((petName, index) => (

                                petName === null ? (

                                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                                        <div className = "Home_ComponentContainer-Structure--PetAlert">
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {GrayPetBattery}/>
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {GrayPetBattery}/>
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {GrayPetBattery}/>
                                        </div>
                                        
                                        <Link
                                            to = {"/adopt"}
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen"
                                            onClick = {() => checkoutRoom(index)}
                                        >
                                            <img src = {AddNewPet}/>
                                        </Link>

                                        <h2>__________</h2>

                                    </div>

                                ) : (

                                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                            
                                        <div className = "Home_ComponentContainer-Structure--PetAlert">
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 75 ? 
                                                        GreenPetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 50 ?
                                                        YellowPetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 25 ?
                                                        OrangePetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) > 0 ?
                                                        RedPetBattery :
                                                        GrayPetBattery
                                                    }
                                            />
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 75 ? 
                                                        GreenPetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 50 ?
                                                        YellowPetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 25 ?
                                                        OrangePetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) > 0 ?
                                                        RedPetBattery :
                                                        GrayPetBattery
                                                    }
                                            />
                                            <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 75 ? 
                                                        GreenPetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 50 ?
                                                        YellowPetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) >= 25 ?
                                                        OrangePetBattery
                                                        : Math.min(100, Math.max(0, Math.floor(((PetList[petName][healthKey])/healthCapList[PetList[petName][speciesKey]][PetList[petName][stageKey]]) * 100))) > 0 ?
                                                        RedPetBattery :
                                                        GrayPetBattery
                                                    }
                                            />
                                        </div>

                                        <Link
                                            to = {`/${PetList[petName][speciesKey]}`}
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen"
                                            onClick = {() => getPet(petName)}
                                        >
                                            <img src = {portraitPetImages[PetList[petName][speciesKey]][PetList[petName][stageKey]]}/>
                                        </Link>
                                        <h2>{petName}</h2>
                                        
                                    </div>

                                )

                            ))}

                        </div>

                    </div>


            </div>

            <div className="MiscellaneousElements_ComponentButton-Position--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => flagOpener(setHomeMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                {homeMinPetsAdopted ? (

                    <button 
                        className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                        onClick = {() => flagOpener(setHomeInventoryOpenFlag, 1)}>
                        Inventory <br/> [I]
                    </button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen">
                        Inventory <br/> [I]
                    </button>

                )}
               
            </div>

        </>

    );

}


export default Home;