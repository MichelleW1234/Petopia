import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import { useActiveCheckoutRoom } from "../../../providers/ActiveCheckoutRoomProvider.jsx";
import { useInventory } from "../../../providers/InventoryProvider.jsx";
import { useAchievements } from "../../../providers/AchievementsProvider.jsx";
import { useNotifications } from "../../../providers/NotificationsProvider.jsx";
import { useRevivers } from "../../../providers/ReviversProvider.jsx";
import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";
import { backgroundMusic_Context } from '../../../providers/BackgroundMusicProvider.jsx';

import MusicVolumeComponent from "../../GlobalComponents/components/MusicVolume.jsx";
import InventoryComponent from "../../GlobalComponents/components/Inventory.jsx";
import RestartComponent from "./HomescreenComponents/Restart.jsx";
import ClearPetsComponent from "./HomescreenComponents/ClearPets.jsx";
import RearrangePetsComponent from "./HomescreenComponents/RearrangePets.jsx";
import ReadMeComponent from "./HomescreenComponents/ReadMe.jsx";
import NotificationsComponent from "../../GlobalComponents/components/Notifications.jsx";
import ReviveAPetComponent from "./HomescreenComponents/RevivePets.jsx";


import { petSpeciesHealthCapList, petSpeciesImagePortraitList, petHealthKey, petSpeciesKey, petStageKey, audioPillButtonPressKey, audioCircleButtonPressKey, inventoryItemTypeKey, inventoryItemOwnerKey, achievementStatusKey, audioRectangleButtonPressKey, inventoryItemImageKey, audioConfirmedKey } from "../../../constants/Constants.js";
import { helpers_Opener_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/helpers.js";

import NoPetPortrait from "../../../images/NoPetPortrait.png";


import "../../../App.css";




function Home (){

    const { audioRef } = useContext(backgroundMusic_Context);

    const {GlobalTimer} = useGlobalTimer();
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
    const [home_ReviveAPetOpenFlag, set_Home_RevivePetsOpenFlag] = useState(false);
    const [home_ReadMeOpenFlag, set_Home_ReadMeOpenFlag] = useState(false);
    const [home_UserSelection, set_Home_UserSelection] = useState(-1);
    const [home_Greeting, set_Home_Greeting] = useState("");

    const home_MinPetsAdopted = Room.filter(x => x === "").length < 3;
    const home_RestartInventoryContainsOwners = Inventory.some(item => item[inventoryItemOwnerKey] !== "");
    const home_RestartAchievementsUnlocked = Achievements.some(achievement => achievement[achievementStatusKey] === true);
    const home_RestartNotificationsUncleared = Notifications.length > 0;
    const home_ReviversUsed = Revivers.length < 3;
    const home_CanRestart = home_MinPetsAdopted || home_RestartInventoryContainsOwners || home_RestartAchievementsUnlocked || home_RestartNotificationsUncleared || home_ReviversUsed
                            ? true
                            : false;

    const home_TimeoutRef= useRef(null);
    const home_Navigate = useNavigate();



    useKeyboardShortcut("v", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("i", () => {
        
        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("Enter", () => {

        if (home_UserSelection !== -1 && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            GoToSelection();

        }

    },
        ".ConfirmRoom"
    );



    useKeyboardShortcut("1", () => {

        if (home_CanRestart && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_RestartOpenFlag, 0);

        }

    },
        ".Restart"
    );



    useKeyboardShortcut("2", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_RearrangePetsOpenFlag, 0);

        }

    },
        ".RearrangePets"
    );


    useKeyboardShortcut("3", () => {

        if (home_MinPetsAdopted && !home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_ClearPetsOpenFlag, 0);

        }

    },
        ".ClearPets"
    );

    useKeyboardShortcut("4", () => {

        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            if (Revivers > 0) {

                helpers_Opener_Flags(set_Home_RevivePetsOpenFlag, 0);

            }

        }

    },
        ".ReviveAPet"
    );


    
    useKeyboardShortcut("5", () => {

        if (!home_RestartOpenFlag && !home_ClearPetsOpenFlag && !home_RearrangePetsOpenFlag && !home_ReviveAPetOpenFlag && !home_ReadMeOpenFlag && !home_MusicVolumeOpenFlag && !home_InventoryOpenFlag){

            helpers_Opener_Flags(set_Home_ReadMeOpenFlag, 0);

        }

    },
        ".ReadMe"
    );


    useEffect(() =>  {

        const homeScreenNotes = ["Have a paw-some day!",
                                "Pawsome job!",
                                "Keep those tails wagging!",
                                "Happy pets, happy home!",
                                "Purr-sue your goals!",
                                "Fintastic things ahead!",
                                "Just keep swimming!",
                                "You're doing dog-gone great!",
                                "Seas the day!",
                                "Keep fetching those goals!",
                                "Don't flounder!",
                                "Purr-sistence pays off!",
                                "You're one cool cat!"
        ];

        set_Home_Greeting(homeScreenNotes[Math.floor(Math.random() * homeScreenNotes.length)]);
    
        home_TimeoutRef.current = setTimeout(() => {
            set_Home_Greeting("");
            home_TimeoutRef.current = null;
        }, 3000);

    }, []);


    const GoToSelection = () => {

        helpers_Player_UIIndicatorSounds(audioConfirmedKey);
        helpers_Player_UIIndicatorSounds(audioPillButtonPressKey);

        if (Room[home_UserSelection] === ""){

            setActiveCheckoutRoom(home_UserSelection);
            home_Navigate("/adopt");

        } else {

            setActivePetName(Room[home_UserSelection]);
            home_Navigate(`/${PetList[Room[home_UserSelection]][petSpeciesKey]}`);

        }

    }
    
    

    const home_Selection = (home_PetNavigator_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);

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

            {home_ReviveAPetOpenFlag &&
            <ReviveAPetComponent
                set_RevivePets_OpenFlag={set_Home_RevivePetsOpenFlag}
            />}

            {home_ReadMeOpenFlag &&
            <ReadMeComponent
                set_ReadMe_OpenFlag={set_Home_ReadMeOpenFlag}
            />}

            {Notifications.length > 0 ? (

                <NotificationsComponent/>

            ) : (

                null

            )}


            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons--ScreenMenu">

                {home_CanRestart ? (

                    <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Restart" onClick = {() => helpers_Opener_Flags(set_Home_RestartOpenFlag, 0)}> 
                        <div className="MiscellaneousElements_ComponentText-Template--GlobalButtonWords">
                            Restart <br/> [1]
                        </div>
                    </button>

                ) : (

                    <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                        <div>
                            Restart <br/> [1]
                        </div>
                    </button>

                )}
                

                {home_MinPetsAdopted ? (

                    <>
                        <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton RearrangePets" onClick = {() => helpers_Opener_Flags(set_Home_RearrangePetsOpenFlag, 0)}> 
                            <div>
                                Rearrange Pets <br/> [2]
                            </div>
                        </button>
                        <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton ClearPets" onClick = {() => helpers_Opener_Flags(set_Home_ClearPetsOpenFlag, 0)}> 
                            <div>
                                Clear Pets <br/> [3]
                            </div>
                        </button>

                        {Revivers > 0 ? (

                            <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton ReviveAPet" onClick = {() => helpers_Opener_Flags(set_Home_RevivePetsOpenFlag, 0)}> 
                                <div>
                                    Revive A Pet <br/> [4]
                                </div>
                            </button>

                        ) : (

                            <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                                <div>
                                    Revive A Pet <br/> [4]
                                </div>
                            </button>

                        )}

                    </>

                ) : (

                    <>
                        <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                            <div>
                                Rearrange Pets <br/> [2]
                            </div>
                        </button>
                        <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                            <div>
                                Clear Pets <br/> [3]
                            </div>
                        </button>
                        <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                            <div>
                                Revive A Pet <br/> [4]
                            </div>
                        </button>
                    </>

                )}

                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton ReadMe" onClick = {() => helpers_Opener_Flags(set_Home_ReadMeOpenFlag, 0)}> 
                    <div>
                        Read Me <br/> [5]
                    </div>
                </button>
                
            </div>


            <div className = "UIStapleElements_Background-Template--Screen">  

                <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                        {Room.map((petName, index) => (

                            petName === "" ? (

                                <div key = {index} className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    
                                    {home_UserSelection === index ? (

                                        <button
                                            className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    ) : (

                                        <button
                                            className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                        <img src = {NoPetPortrait}/>
                                        <h1>&lt;Name&gt;</h1>
                                    </div>

                                </div>

                            ) : (
                
                                <div key = {index} className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">  
                                    
                                    {home_UserSelection === index ? (

                                        <button
                                            className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    ) : (

                                        <button 
                                            className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton"
                                            onClick = {() => home_Selection(index)}
                                        >
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                        <h1>{petName}</h1>
                                    </div>
                                    
                                </div>

                            )

                        ))}

                    </div>

                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                    {home_UserSelection === -1 ? (

                        <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton">
                            <div>
                                Confirm Room <br/> [return]
                            </div>
                        </button>

                    ) : (

                        <button
                            className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton ConfirmRoom" 
                            onClick = {() => GoToSelection()}>
                            <div>
                                Confirm Room <br/> [return]
                            </div>
                        </button>

                    )}

                </div>

            </div>


           {home_Greeting !== "" ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags--Alerts">
                    <div className="UIStapleElements_ComponentFrame-Template--Global notificationsFrame">
                        <div className="notificationsFrameContent">
                            <h2>Positive Message:</h2>
                            <p>{home_Greeting}</p>
                        </div>
                    </div>
                </div>
                
            ) : (

                null

           )}


            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons--ScreenToggle">
                
                <button 
                    className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Volume" 
                    onClick = {() => helpers_Opener_Flags(set_Home_MusicVolumeOpenFlag, 1)}>
                    <div>
                        Volume <br/> [v]
                    </div>
                </button>

                <button 
                    className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Inventory" 
                    onClick = {() => helpers_Opener_Flags(set_Home_InventoryOpenFlag, 1)}>
                    <div>
                        Inventory <br/> [I]
                    </div>
                </button>
               
            </div>

        </>

    );

}


export default Home;