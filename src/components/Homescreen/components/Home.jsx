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
import RevivePetsComponent from "./HomescreenComponents/RevivePets.jsx";


import { petSpeciesHealthCapList, petSpeciesImagePortraitList, petHealthKey, petSpeciesKey, petStageKey, audioNavButtonPressKey, audioSelectionButtonPressKey, inventoryItemTypeKey, inventoryItemOwnerKey, achievementStatusKey, audioScreenButtonPressKey, inventoryItemImageKey } from "../../../constants/Constants.js";
import { helpers_Opener_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers.js";

import NoPetPortraitHome from "../../../images/NoPetPortraitHome.png";


import "../../../App.css";
import "./Home.css";
import { useRevivers } from "../../../providers/ReviversProvider.jsx";



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
    const {Revivers, setRevivers} = useRevivers();

    const [home_RestartOpenFlag, set_Home_RestartOpenFlag] = useState(false);
    const [home_MusicVolumeOpenFlag, set_Home_MusicVolumeOpenFlag] = useState(false);
    const [home_InventoryOpenFlag, set_Home_InventoryOpenFlag] = useState(false);
    const [home_ClearPetsOpenFlag, set_Home_ClearPetsOpenFlag] = useState(false);
    const [home_RearrangePetsOpenFlag, set_Home_RearrangePetsOpenFlag] = useState(false);
    const [home_RevivePetsOpenFlag, set_Home_RevivePetsOpenFlag] = useState(false);
    const [home_ReadMeOpenFlag, set_Home_ReadMeOpenFlag] = useState(false);
    const [home_UserSelection, set_Home_UserSelection] = useState(-1);

    const home_MinPetsAdopted = Room.filter(x => x === "").length < 3;
    const home_RestartInventoryContainsOwners = Inventory.some(item => item[inventoryItemOwnerKey] !== "");
    const home_RestartAchievementsUnlocked = Achievements.some(achievement => achievement[achievementStatusKey] === true);
    const home_RestartNotificationsUncleared = Notifications.length > 0;
    const home_ReviversUsed = Revivers.length < 3;
    const home_CanRestart = home_MinPetsAdopted || home_RestartInventoryContainsOwners || home_RestartAchievementsUnlocked || home_RestartNotificationsUncleared || home_ReviversUsed
                            ? true
                            : false;

    const home_Navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("Enter", () => {

        if (home_UserSelection !== -1 && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            GoToSelection();

        }

    },
        ".Confirm"
    );



    useKeyboardShortcut("1", () => {

        if (home_CanRestart && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_RestartOpenFlag, 0);

        }

    },
        ".Restart"
    );



    useKeyboardShortcut("2", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_RearrangePetsOpenFlag, 0);

        }

    },
        ".RearrangePets"
    );


    useKeyboardShortcut("3", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_ClearPetsOpenFlag, 0);

        }

    },
        ".ClearPets"
    );

    useKeyboardShortcut("4", () => {

        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            if (Revivers > 0 && Object.values(PetList).some(pet => pet[petHealthKey] === 0)) {

                helpers_Opener_Flags(set_Home_RevivePetsOpenFlag, 0);

            }

        }

    },
        ".RevivePets"
    );


    
    useKeyboardShortcut("5", () => {

        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_RevivePetsOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_ReadMeOpenFlag, 0);

        }

    },
        ".ReadMe"
    );



    const GoToSelection = () => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        if (Room[home_UserSelection] === ""){

            setActiveCheckoutRoom(home_UserSelection);
            home_Navigate("/adopt");

        } else {

            setActivePetName(Room[home_UserSelection]);
            home_Navigate(`/${PetList[Room[home_UserSelection]][petSpeciesKey]}`);

        }

    }
    
    

    const home_Selection = (home_PetNavigator_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);

        if (home_PetNavigator_UserSelection === home_UserSelection) {

            set_Home_UserSelection(-1);

        } else {

            set_Home_UserSelection(home_PetNavigator_UserSelection);

        }
        
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
                restart_InventoryContainsOwners={home_RestartInventoryContainsOwners}
                restart_AchievementsUnlocked={home_RestartAchievementsUnlocked}
                restart_NotificationsUncleared={home_RestartNotificationsUncleared}
                restart_ReviversUsed = {home_ReviversUsed}
            />}

            {home_RearrangePetsOpenFlag &&
            <RearrangePetsComponent
                set_RearrangePets_OpenFlag={set_Home_RearrangePetsOpenFlag}
            />}

            {home_ClearPetsOpenFlag &&
            <ClearPetsComponent
                set_ClearPets_OpenFlag={set_Home_ClearPetsOpenFlag}
            />}

            {home_RevivePetsOpenFlag &&
            <RevivePetsComponent
                set_RevivePets_OpenFlag={set_Home_RevivePetsOpenFlag}
            />}

            {home_ReadMeOpenFlag &&
            <ReadMeComponent
                set_ReadMe_OpenFlag={set_Home_ReadMeOpenFlag}
            />}


            <div className = "UIStapleElements_Background-Template--Screen">  

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenMenuButtonRow">

                    {home_CanRestart ? (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Restart" onClick = {() => helpers_Opener_Flags(set_Home_RestartOpenFlag, 0)}> Restart <br/> [1]</button>

                    ) : (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Restart <br/> [1]</button>

                    )}
                    

                    {home_MinPetsAdopted ? (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen RearrangePets" onClick = {() => helpers_Opener_Flags(set_Home_RearrangePetsOpenFlag, 0)}> Rearrange Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ClearPets" onClick = {() => helpers_Opener_Flags(set_Home_ClearPetsOpenFlag, 0)}> Clear Pets <br/> [3]</button>

                            {Revivers > 0 && Object.values(PetList).some(pet => pet[petHealthKey] === 0) ? (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen RevivePets" onClick = {() => helpers_Opener_Flags(set_Home_RevivePetsOpenFlag, 0)}> Revive Pets <br/> [4]</button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Revive Pets <br/> [4]</button>

                            )}

                        </>

                    ) : (

                        <>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Rearrange Pets <br/> [2]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Clear Pets <br/> [3]</button>
                            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Revive Pets <br/> [4]</button>
                        </>

                    )}

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ReadMe" onClick = {() => helpers_Opener_Flags(set_Home_ReadMeOpenFlag, 0)}> Read Me <br/> [5]</button>
                    
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                    {home_CanRestart ? (

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Select a Room: </h1>

                    ) : (

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Welcome! Select a Room to Get Started: </h1>

                    )}

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                        {Room.map((petName, index) => (

                            petName === "" ? (

                                <div key = {index} className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    
                                    {home_UserSelection === index ? (

                                        <button
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected homePetButton MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <img src = {NoPetPortraitHome}/>
                                        </button>

                                    ) : (

                                        <button
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen homePetButton MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <img src = {NoPetPortraitHome}/>
                                        </button>

                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                                        <h2>&lt;Pet Name&gt;</h2>
                                    </div>

                                </div>

                            ) : (

                
                                <div key = {index} className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">  
                                    
                                    {home_UserSelection === index ? (

                                        <button
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                        </button>

                                    ) : (

                                        <button 
                                            className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                        </button>

                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                                        <h2>{petName}</h2>
                                    </div>
                                    
                                </div>

                            )

                        ))}

                    </div>

                    {home_UserSelection === -1 ? (

                        <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen">
                            Confirm <br/> [return]
                        </button>

                    ) : (

                        <button
                            className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Confirm" 
                            onClick = {() => GoToSelection()}>
                            Confirm <br/> [return]
                        </button>

                    )}

                </div>

            </div>

            {Notifications.length > 0 ? (

                <NotificationsComponent/>

            ) : (

                null

            )}

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_Opener_Flags(set_Home_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_Opener_Flags(set_Home_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>
               
            </div>

        </>

    );

}


export default Home;