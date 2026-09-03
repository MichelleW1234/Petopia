import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import { useActiveCheckoutRoom } from "../../../providers/ActiveCheckoutRoomProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";
import { useNotifications } from "../../../providers/NotificationsProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { backgroundMusic_Context } from '../../../providers/BackgroundMusicProvider.jsx';

import MusicVolumeComponent from "../../GlobalComponents/components/MusicVolume.jsx";
import InventoryComponent from "../../GlobalComponents/components/Inventory.jsx";
import RestartComponent from "./HomescreenComponents/Restart.jsx";
import ClearPetsComponent from "./HomescreenComponents/ClearPets.jsx";
import RearrangePetsComponent from "./HomescreenComponents/RearrangePets.jsx";
import ReadMeComponent from "./HomescreenComponents/ReadMe.jsx";
import NotificationsComponent from "../../GlobalComponents/components/Notifications.jsx";


import { petSpeciesHealthCapList, petSpeciesImagePortraitList, petHealthKey, petSpeciesKey, petStageKey, audioNavButtonPressKey, audioSelectionButtonPressKey, inventoryItemTypePotionKey, inventoryItemTypeKey, inventoryItemOwnerKey, achievementStatusKey } from "../../../constants/Constants.js";
import { helpers_Opener_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers.js";

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
    const {Inventory, setInventory} = useInventory();
    const {Achievements, setAchievements} = useAchievements();
    const {Notifications, setNotifications} = useNotifications();

    const [home_RestartOpenFlag, set_Home_RestartOpenFlag] = useState(false);
    const [home_MusicVolumeOpenFlag, set_Home_MusicVolumeOpenFlag] = useState(false);
    const [home_InventoryOpenFlag, set_Home_InventoryOpenFlag] = useState(false);
    const [home_ClearPetsOpenFlag, set_Home_ClearPetsOpenFlag] = useState(false);
    const [home_RearrangePetsOpenFlag, set_Home_RearrangePetsOpenFlag] = useState(false);
    const [home_ReadMeOpenFlag, set_Home_ReadMeOpenFlag] = useState(false);

    const home_MinPetsAdopted = Room.filter(x => x === "").length < 3;
    const home_RestartInventoryMissingItems = Inventory.filter(item => item[inventoryItemTypeKey] === inventoryItemTypePotionKey).length < 3;
    const home_RestartInventoryContainsOwners = Inventory.some(item => item[inventoryItemOwnerKey] !== "");
    const home_RestartAchievementsUnlocked = Achievements.some(achievement => achievement[achievementStatusKey] === true);
    const home_RestartNotificationsUncleared = Notifications.length > 0;
    const home_CanRestart = home_MinPetsAdopted || home_RestartInventoryMissingItems || home_RestartInventoryContainsOwners || home_RestartAchievementsUnlocked || home_RestartNotificationsUncleared
                            ? true
                            : false;

    const home_Navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );



    useKeyboardShortcut("1", () => {

        if (home_CanRestart && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_RestartOpenFlag, 0);

        }

    },
        ".Restart"
    );




    useKeyboardShortcut("2", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_RearrangePetsOpenFlag, 0);

        }

    },
        ".RearrangePets"
    );


    useKeyboardShortcut("3", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_ClearPetsOpenFlag, 0);

        }

    },
        ".ClearPets"
    );

    
    useKeyboardShortcut("4", () => {

        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_ReadMeOpenFlag, 0);

        }

    },
        ".ReadMe"
    );



    
    

    const home_PetNavigator = (home_PetNavigator_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);
        setActivePetName(home_PetNavigator_UserSelection);
        
    }


    const home_AdoptionNavigator = (home_AdoptionNavigator_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);
        setActiveCheckoutRoom(home_AdoptionNavigator_UserSelection);

    }



    return (

        <>

            {home_MusicVolumeOpenFlag && 
            <MusicVolumeComponent
                set_MusicVolume_OpenFlag={set_Home_MusicVolumeOpenFlag}
            />}

            {home_InventoryOpenFlag && 
            <InventoryComponent
                set_Inventory_OpenFlag={set_Home_InventoryOpenFlag}
            />}

            {home_RestartOpenFlag && 
            <RestartComponent
                set_Restart_OpenFlag={set_Home_RestartOpenFlag}
                restart_MinPetsAdopted={home_MinPetsAdopted}
                restart_InventoryMissingItems={home_RestartInventoryMissingItems}
                restart_InventoryContainsOwners={home_RestartInventoryContainsOwners}
                restart_AchievementsUnlocked={home_RestartAchievementsUnlocked}
                restart_NotificationsUncleared={home_RestartNotificationsUncleared}
            />}

            {home_RearrangePetsOpenFlag &&
            <RearrangePetsComponent
                set_RearrangePets_OpenFlag={set_Home_RearrangePetsOpenFlag}
            />}

            {home_ClearPetsOpenFlag &&
            <ClearPetsComponent
                set_ClearPets_OpenFlag={set_Home_ClearPetsOpenFlag}
            />}

            {home_ReadMeOpenFlag &&
            <ReadMeComponent
                set_ReadMe_OpenFlag={set_Home_ReadMeOpenFlag}
            />}


            <div className = "UIStapleElements_Background-Template--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenMenuButtonRow">

                    {home_CanRestart ? (

                        <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu Restart" onClick = {() => helpers_Opener_Flags(set_Home_RestartOpenFlag, 0)}> Restart <br/> [1]</button>

                    ) : (

                        <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Restart <br/> [1]</button>

                    )}
                    

                    {home_MinPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu RearrangePets" onClick = {() => helpers_Opener_Flags(set_Home_RearrangePetsOpenFlag, 0)}> Rearrange Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu ClearPets" onClick = {() => helpers_Opener_Flags(set_Home_ClearPetsOpenFlag, 0)}> Clear Pets <br/> [3]</button>
                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Rearrange Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalNonclick UIStapleElements_ComponentButtonPillColored-Color--GlobalNonclick--ScreenMenu"> Clear Pets <br/> [3]</button>
                        </>

                    )}

                    <button className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--ScreenMenu ReadMe" onClick = {() => helpers_Opener_Flags(set_Home_ReadMeOpenFlag, 0)}> Read Me <br/> [4]</button>
                    
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                    {home_CanRestart ? (

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Your Pets: </h1>

                    ) : (

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Welcome! Adopt up to 3 pets to get started. </h1>

                    )}

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                        {Room.map((petName, index) => (

                            petName === "" ? (

                                <div key = {index} className="UIStapleElements_ComponentContainerColored-Structure--Global UIStapleElements_ComponentContainerColored-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                                    <div className = "Home_ComponentContainer-Structure--PetAlert">
                                        <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {GrayPetBattery}/>
                                        <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {GrayPetBattery}/>
                                        <img className="Home_ComponentContainer-Template--PetAlertBattery" src = {GrayPetBattery}/>
                                    </div>
                                    
                                    <Link
                                        to = {"/adopt"}
                                        className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen"
                                        onClick = {() => home_AdoptionNavigator(index)}
                                    >
                                        <img src = {AddNewPet}/>
                                    </Link>

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                        <h2>[ Name ]</h2>
                                    </div>

                                </div>

                            ) : (

                                <div key = {index} className="UIStapleElements_ComponentContainerColored-Structure--Global UIStapleElements_ComponentContainerColored-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                        
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
                                        onClick = {() => home_PetNavigator(petName)}
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

            <NotificationsComponent/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                
                <button 
                    className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_Opener_Flags(set_Home_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_Opener_Flags(set_Home_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
               
            </div>

        </>

    );

}


export default Home;