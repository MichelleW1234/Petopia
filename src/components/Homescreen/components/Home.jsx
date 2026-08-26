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
import ClearPets from "./HomescreenComponents/ClearPets.jsx";
import RearrangePets from "./HomescreenComponents/RearrangePets.jsx";
import ReadMe from "./HomescreenComponents/ReadMe.jsx";
import Notifications from "./HomescreenComponents/Notifications.jsx";

import { petSpeciesHealthCapList, petSpeciesImagePortraitList, petHealthKey, petSpeciesKey, petStageKey, soundNavButtonPressKey, soundSelectionButtonPressKey } from "../../../constants/Constants.js";
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
    const [homeClearPetsOpenClearPetsFlag, setHomeClearPetsOpenClearPetsFlag] = useState(false);
    const [homeRearrangePetsOpenFlag, setHomeRearrangePetsOpenFlag] = useState(false);
    const [homeReadMeOpenFlag, setHomeReadMeOpenFlag] = useState(false);

    const homeMinPetsAdopted = Room.filter(x => x === null).length < 3;



    const navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!homeClearPetsOpenClearPetsFlag && !homeRearrangePetsOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
        
        if (homeMinPetsAdopted && !homeClearPetsOpenClearPetsFlag && !homeRearrangePetsOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeInventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {

        if (homeMinPetsAdopted && !homeClearPetsOpenClearPetsFlag && !homeRearrangePetsOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeRearrangePetsOpenFlag, 0);

        }

    },
        ".RearrangePets"
    );


    useKeyboardShortcut("2", () => {

        if (homeMinPetsAdopted && !homeClearPetsOpenClearPetsFlag && !homeRearrangePetsOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeClearPetsOpenClearPetsFlag, 0);

        }

    },
        ".ClearPets"
    );

    
    useKeyboardShortcut("3", () => {

        if (!homeClearPetsOpenClearPetsFlag && !homeRearrangePetsOpenFlag && !homeReadMeOpenFlag && !homeMusicVolumeOpenFlag && !homeInventoryOpenFlag){

            flagOpener(setHomeReadMeOpenFlag, 0);

        }

    },
        ".ReadMe"
    );



    
    

    const getPet = (petToGet) => {

        playSound(soundSelectionButtonPressKey);
        setActivePetName(petToGet);
        
    }


    const checkoutRoom = (roomNumber) => {

        playSound(soundSelectionButtonPressKey);
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

            {homeRearrangePetsOpenFlag &&
            <RearrangePets
                setRearrangePetsOpenFlag={setHomeRearrangePetsOpenFlag}
            />}

            {homeClearPetsOpenClearPetsFlag &&
            <ClearPets
                setClearPetsOpenClearPetsFlag={setHomeClearPetsOpenClearPetsFlag}
            />}

            {homeReadMeOpenFlag &&
            <ReadMe
                setReadMeOpenFlag={setHomeReadMeOpenFlag}
            />}


            <div className = "UIStapleElements_Background-Template--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {homeMinPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar RearrangePets" onClick = {() => flagOpener(setHomeRearrangePetsOpenFlag, 0)}> Rearrange Pets <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ClearPets" onClick = {() => flagOpener(setHomeClearPetsOpenClearPetsFlag, 0)}> Clear Pets <br/> [2]</button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Rearrange Pets <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets <br/> [2]</button>
                        </>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ReadMe" onClick = {() => flagOpener(setHomeReadMeOpenFlag, 0)}> Read Me <br/> [3]</button>
                    
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                    {homeMinPetsAdopted ? (

                        <h1 className="MiscellaneousElements_ComponentText-Template--MainTitle"> Your Pets: </h1>

                    ) : (

                        <h1 className="MiscellaneousElements_ComponentText-Template--MainTitle"> Welcome! Adopt up to 3 pets to get started. </h1>

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

                                    <div className="MiscellaneousElements_ComponentText-Template--EntryTitle">
                                        <h2>[ Name ]</h2>
                                    </div>

                                </div>

                            ) : (

                                <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                        
                                    <div className = "Home_ComponentContainer-Structure--PetAlert">
                                        <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 75 ? 
                                                    GreenPetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 50 ?
                                                    YellowPetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 25 ?
                                                    OrangePetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) > 0 ?
                                                    RedPetBattery :
                                                    GrayPetBattery
                                                }
                                        />
                                        <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 75 ? 
                                                    GreenPetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 50 ?
                                                    YellowPetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 25 ?
                                                    OrangePetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) > 0 ?
                                                    RedPetBattery :
                                                    GrayPetBattery
                                                }
                                        />
                                        <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 75 ? 
                                                    GreenPetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 50 ?
                                                    YellowPetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) >= 25 ?
                                                    OrangePetBattery
                                                    : Math.min(100, Math.max(0, Math.floor(((PetList[petName][petHealthKey])/petSpeciesHealthCapList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]) * 100))) > 0 ?
                                                    RedPetBattery :
                                                    GrayPetBattery
                                                }
                                        />
                                    </div>

                                    <Link
                                        to = {`/${PetList[petName][petSpeciesKey]}`}
                                        className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen"
                                        onClick = {() => getPet(petName)}
                                    >
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </Link>

                                    <div className="MiscellaneousElements_ComponentText-Template--EntryTitle">
                                        <h2>{petName}</h2>
                                    </div>
                                    
                                </div>

                            )

                        ))}

                    </div>

                </div>

            </div>

            <Notifications/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => flagOpener(setHomeMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => flagOpener(setHomeInventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
               
            </div>

        </>

    );

}


export default Home;