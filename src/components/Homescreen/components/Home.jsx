import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import { useActiveCheckoutRoom } from "../../../providers/ActiveCheckoutRoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { backgroundMusic_Context } from '../../../providers/BackgroundMusicProvider.jsx';

import MusicVolume from "../../GlobalComponents/components/MusicVolume.jsx";
import Inventory from "../../GlobalComponents/components/Inventory.jsx";
import Restart from "./HomescreenComponents/Restart.jsx";
import ClearPets from "./HomescreenComponents/ClearPets.jsx";
import RearrangePets from "./HomescreenComponents/RearrangePets.jsx";
import ReadMe from "./HomescreenComponents/ReadMe.jsx";
import Notifications from "../../GlobalComponents/components/Notifications.jsx";

import { petSpeciesHealthCapList, petSpeciesImagePortraitList, petHealthKey, petSpeciesKey, petStageKey, soundNavButtonPressKey, soundSelectionButtonPressKey } from "../../../constants/Constants.js";
import { helpers_FlagOpener, helpers_PlaySound } from "../../../helpers/Helpers.js";

import RedPetBattery from "../../../images/RedPetBattery.png";
import OrangePetBattery from "../../../images/OrangePetBattery.png";
import YellowPetBattery from "../../../images/YellowPetBattery.png";
import GreenPetBattery from "../../../images/GreenPetBattery.png";
import GrayPetBattery from "../../../images/GrayPetBattery.png";
import AddNewPet from "../../../images/AddNewPet.png";

import "./Home.css";



function Home (){

    const { audioRef } = useContext(backgroundMusic_Context);

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();

    const [home_RestartOpenFlag, set_Home_RestartOpenFlag] = useState(false);
    const [home_MusicVolumeOpenFlag, set_Home_MusicVolumeOpenFlag] = useState(false);
    const [home_InventoryOpenFlag, set_Home_InventoryOpenFlag] = useState(false);
    const [home_ClearPetsOpenClearPetsFlag, set_Home_ClearPetsOpenClearPetsFlag] = useState(false);
    const [home_RearrangePetsOpenFlag, set_Home_RearrangePetsOpenFlag] = useState(false);
    const [home_ReadMeOpenFlag, set_Home_ReadMeOpenFlag] = useState(false);

    const home_MinPetsAdopted = Room.filter(x => x === null).length < 3;



    const home_Navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenClearPetsFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_FlagOpener(set_Home_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
        
        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenClearPetsFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_FlagOpener(set_Home_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );



    useKeyboardShortcut("1", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenClearPetsFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_FlagOpener(set_Home_RestartOpenFlag, 0);

        }

    },
        ".Restart"
    );




    useKeyboardShortcut("2", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenClearPetsFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_FlagOpener(set_Home_RearrangePetsOpenFlag, 0);

        }

    },
        ".RearrangePets"
    );


    useKeyboardShortcut("3", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenClearPetsFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_FlagOpener(set_Home_ClearPetsOpenClearPetsFlag, 0);

        }

    },
        ".ClearPets"
    );

    
    useKeyboardShortcut("4", () => {

        if (!home_ClearPetsOpenClearPetsFlag && !home_RestartOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_FlagOpener(set_Home_ReadMeOpenFlag, 0);

        }

    },
        ".ReadMe"
    );



    
    

    const home_GetPet = (home_GetPet_PetToGet) => {

        helpers_PlaySound(soundSelectionButtonPressKey);
        setActivePetName(home_GetPet_PetToGet);
        
    }


    const home_CheckoutRoom = (home_CheckoutRoom_RoomNumber) => {

        helpers_PlaySound(soundSelectionButtonPressKey);
        setActiveCheckoutRoom(home_CheckoutRoom_RoomNumber);

    }



    return (

        <>

            {home_MusicVolumeOpenFlag && 
            <MusicVolume
                set_MusicVolume_OpenFlag={set_Home_MusicVolumeOpenFlag}
            />}

            {home_InventoryOpenFlag && 
            <Inventory
                set_Inventory_OpenFlag={set_Home_InventoryOpenFlag}
            />}

            {home_RestartOpenFlag && 
            <Restart
                set_Restart_OpenFlag={set_Home_RestartOpenFlag}
            />}

            {home_RearrangePetsOpenFlag &&
            <RearrangePets
                set_RearrangePets_OpenFlag={set_Home_RearrangePetsOpenFlag}
            />}

            {home_ClearPetsOpenClearPetsFlag &&
            <ClearPets
                set_ClearPets_OpenClearPetsFlag={set_Home_ClearPetsOpenClearPetsFlag}
            />}

            {home_ReadMeOpenFlag &&
            <ReadMe
                set_ReadMe_OpenFlag={set_Home_ReadMeOpenFlag}
            />}


            <div className = "UIStapleElements_Background-Template--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">

                    {home_MinPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar Restart" onClick = {() => helpers_FlagOpener(set_Home_RestartOpenFlag, 0)}> Restart <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar RearrangePets" onClick = {() => helpers_FlagOpener(set_Home_RearrangePetsOpenFlag, 0)}> Rearrange Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ClearPets" onClick = {() => helpers_FlagOpener(set_Home_ClearPetsOpenClearPetsFlag, 0)}> Clear Pets <br/> [3]</button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Restart <br/> [1]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Rearrange Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--ScreenNavbar"> Clear Pets <br/> [3]</button>
                        </>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar ReadMe" onClick = {() => helpers_FlagOpener(set_Home_ReadMeOpenFlag, 0)}> Read Me <br/> [4]</button>
                    
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                    {home_MinPetsAdopted ? (

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Your Pets: </h1>

                    ) : (

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Welcome! Adopt up to 3 pets to get started. </h1>

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
                                        onClick = {() => home_CheckoutRoom(index)}
                                    >
                                        <img src = {AddNewPet}/>
                                    </Link>

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
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
                                        onClick = {() => home_GetPet(petName)}
                                    >
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </Link>

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
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
                    onClick = {() => helpers_FlagOpener(set_Home_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_FlagOpener(set_Home_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
               
            </div>

        </>

    );

}


export default Home;