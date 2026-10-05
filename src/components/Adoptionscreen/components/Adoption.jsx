import { useNavigate, Link } from "react-router-dom";
import {useState, useRef} from "react";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import {useActiveCheckoutRoom} from "../../../providers/ActiveCheckoutRoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import SpeciesCareGuideComponent from "./AdoptionscreenComponents/SpeciesCareGuide.jsx";
import MusicVolumeComponent from "../../GlobalComponents/components/MusicVolume.jsx";
import InventoryComponent from "../../GlobalComponents/components/Inventory.jsx";
import NotificationsComponent from "../../GlobalComponents/components/Notifications.jsx";

import { petSpeciesImagePortraitList, petActivityTimeStampCleaningKey, petBirthDateKey, petSpeciesCatKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petHealthKey, petMedicineKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, petGenderKey, petGenderMaleKey, petGenderFemaleKey, petSpeciesHealthCapList, audioCircleButtonPressKey, audioPillButtonPressKey, audioAdoptionSuccessKey, audioRectangleButtonPressKey, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey, audioAdoptionConfirmationErrorKey, audioQuitActivityKey, audioConfirmedKey } from "../../../constants/Constants.js";
import { helpers_Opener_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/helpers.js";

import "../../../App.css";
import "./Adoption.css";
import { useNotifications } from "../../../providers/NotificationsProvider.jsx";




function Adoption () {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();
    const {Notifications, setNotifications} = useNotifications();

    const [adoption_MusicVolumeOpenFlag, set_Adoption_MusicVolumeOpenFlag] = useState(false);
    const [adoption_InventoryOpenFlag, set_Adoption_InventoryOpenFlag] = useState(false);
    const [adoption_SpeciesCareGuideOpenFlag, set_Adoption_SpeciesCareGuideOpenFlag] = useState(false);
    const [adoption_UserSelection, set_Adoption_UserSelection] = useState("");
    const [adoption_PetGender, set_Adoption_PetGender] = useState("");
    const [adoption_CurrErrorMessage, set_Adoption_CurrErrorMessage] = useState("");
    const [adoption_UserInput, set_Adoption_UserInput] = useState("");

    const adoption_TimeoutRef= useRef(null);

    const adoption_Navigate = useNavigate();



    useKeyboardShortcut("v", () => {
    
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_Opener_Flags(set_Adoption_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    
    useKeyboardShortcut("i", () => {
    
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_Opener_Flags(set_Adoption_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {
        
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_HomeNavigator();
            adoption_Navigate("/home");

        }

    },
        ".Home"
    );

    
    useKeyboardShortcut("2", () => {
        
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_Opener_Flags(set_Adoption_SpeciesCareGuideOpenFlag, 0);

        }

    },
        ".SpeciesCareGuide"
    );



    useKeyboardShortcut("Enter", (e) => {
        
        if (adoption_UserSelection !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            if (adoption_PetGender === ""){

                adoption_PetGenderGenerator();

            } else {

                adoption_NameManager(e);

            }

        }

    },
        ".Confirm"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoption_PetGender !== "" && adoption_UserSelection !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_SpeciesDeselector();

        }

    },
        ".Quit"
    );


    const adoption_HomeNavigator = () => {

        helpers_Player_UIIndicatorSounds(audioPillButtonPressKey);
        setActiveCheckoutRoom(-1);

    }


    const adoption_PetGenderGenerator = () => {

        helpers_Player_UIIndicatorSounds(audioConfirmedKey);
        helpers_Player_UIIndicatorSounds(audioPillButtonPressKey);
        
        const adoption_PetGenderGenerator_CurrGenderNumber = Math.floor(Math.random() * 2);
        
        if (adoption_PetGenderGenerator_CurrGenderNumber === 0){

            set_Adoption_PetGender(petGenderMaleKey);

        } else {

            set_Adoption_PetGender(petGenderFemaleKey);

        }

    }


    const adoption_NameManager = (adoption_NameManager_E) => {

        const adoption_NameManager_CurrPetName = adoption_UserInput.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        set_Adoption_UserInput(adoption_NameManager_CurrPetName);

        if (adoption_NameManager_CurrPetName === "") {

            adoption_CurrErrorMessageTimer("A name is missing.");

        } else if (/[^a-zA-Z]/.test(adoption_NameManager_CurrPetName)) {

            adoption_CurrErrorMessageTimer("A name can only include letters.");

        } else if (adoption_NameManager_CurrPetName.length > 14){

            adoption_CurrErrorMessageTimer("A name must be under 15 characters.");

        } else if (adoption_NameManager_CurrPetName in PetList && adoption_NameManager_CurrPetName in PetTimeStamps) {

            adoption_CurrErrorMessageTimer("This name already exists.");

        } else {

            helpers_Player_UIIndicatorSounds(audioConfirmedKey);
            helpers_Player_UIIndicatorSounds(audioAdoptionSuccessKey);

            const adoption_NameManager_CurrDate = GlobalTimer;

            if (adoption_UserSelection === petSpeciesDogKey){

                setPetList(prev => ({
                    ...prev,
                    [adoption_NameManager_CurrPetName]: 
                        { 
                            [petSpeciesKey]: petSpeciesDogKey, 
                            [petStageKey]: 0,
                            [petHealthKey]: petSpeciesHealthCapList[petSpeciesDogKey][0],
                            [petBirthDateKey]: adoption_NameManager_CurrDate,
                            [petGenderKey]: adoption_PetGender,
                            [petMedicineKey]: 0
                        }
                }));

                setPetTimeStamps(prev => ({
                    ...prev,
                    [adoption_NameManager_CurrPetName]:
                        {
                            [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate},
                            [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate},
                            [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate}
                        }
                }));

            } else if (adoption_UserSelection === petSpeciesCatKey){

                setPetList(prev => ({
                    ...prev,
                    [adoption_NameManager_CurrPetName]: 
                        { 
                            [petSpeciesKey]: petSpeciesCatKey, 
                            [petStageKey]: 0,
                            [petHealthKey]: petSpeciesHealthCapList[petSpeciesCatKey][0],
                            [petBirthDateKey]: adoption_NameManager_CurrDate,
                            [petGenderKey]: adoption_PetGender,
                            [petMedicineKey]: 0
                        }
                }));

                setPetTimeStamps(prev => ({
                    ...prev,
                    [adoption_NameManager_CurrPetName]:
                        {
                            [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate},
                            [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate}
                        }
                }));

            } else if (adoption_UserSelection === petSpeciesFishKey){

                setPetList(prev => ({
                    ...prev,
                    [adoption_NameManager_CurrPetName]: 
                        { 
                            [petSpeciesKey]: petSpeciesFishKey, 
                            [petStageKey]: 0,
                            [petHealthKey]: petSpeciesHealthCapList[petSpeciesFishKey][0],
                            [petBirthDateKey]: adoption_NameManager_CurrDate,
                            [petGenderKey]: adoption_PetGender,
                            [petMedicineKey]: 0
                        }
                }));

                setPetTimeStamps(prev => ({
                    ...prev,
                    [adoption_NameManager_CurrPetName]:
                        {
                            [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate},
                            [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : adoption_NameManager_CurrDate, [petActivityTimeStampLastDamagedKey] : adoption_NameManager_CurrDate},
                        }
                }));

            }

            setRoom(prev => {

                let adoption_NameManager_CurrCopy = [...prev];
                adoption_NameManager_CurrCopy[ActiveCheckoutRoom] = adoption_NameManager_CurrPetName;
                return adoption_NameManager_CurrCopy;
                
            });

            setActiveCheckoutRoom(-1);

            adoption_Navigate("/home");

        }

        helpers_Player_UIIndicatorSounds(audioPillButtonPressKey);

    }


    const adoption_SpeciesDeselector = () => {

        helpers_Player_UIIndicatorSounds(audioQuitActivityKey);
        helpers_Player_UIIndicatorSounds(audioPillButtonPressKey);

        set_Adoption_UserSelection("");
        set_Adoption_PetGender("");

        if (adoption_CurrErrorMessage !== ""){

            set_Adoption_CurrErrorMessage("");

        }

        if (adoption_UserInput !== ""){
 
            set_Adoption_UserInput("");

        }

    }
    

    const adoption_SpeciesSelector = (adoption_SpeciesSelector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);
        set_Adoption_UserSelection(adoption_SpeciesSelector_UserSelection);

    }


    const adoption_CurrErrorMessageTimer = (adoption_CurrErrorMessageTimer_Message) => {
    
        helpers_Player_UIIndicatorSounds(audioAdoptionConfirmationErrorKey);
    
        set_Adoption_CurrErrorMessage(adoption_CurrErrorMessageTimer_Message);
    
        if (adoption_TimeoutRef.current) {
            clearTimeout(adoption_TimeoutRef.current);
        }
    
        adoption_TimeoutRef.current = setTimeout(() => {
            set_Adoption_CurrErrorMessage("");
            adoption_TimeoutRef.current = null;
        }, 5000); 
    
    }
    



    

    return (

        <>

            {adoption_MusicVolumeOpenFlag && 
            <MusicVolumeComponent
                set_MusicVolume_OpenFlag={set_Adoption_MusicVolumeOpenFlag}
            />}

            {adoption_InventoryOpenFlag && 
            <InventoryComponent
                set_Inventory_OpenFlag={set_Adoption_InventoryOpenFlag}
            />}

            {adoption_SpeciesCareGuideOpenFlag &&
            <SpeciesCareGuideComponent
                set_SpeciesCareGuide_OpenFlag = {set_Adoption_SpeciesCareGuideOpenFlag}
            />}
            
            
            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons--ScreenMenu">
                <Link to = "/home" className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Home" onClick = {() => adoption_HomeNavigator()}> 
                    <div>
                        Home <br/> [1]
                    </div>
                </Link>
                <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton SpeciesCareGuide" onClick = {() => helpers_Opener_Flags(set_Adoption_SpeciesCareGuideOpenFlag, 0)}> 
                    <div>
                        Species Care Guide <br/> [2]
                    </div>
                </button>
            </div>
            
            {Notifications.length > 0 ? (

                <NotificationsComponent/>

            ) : (

                null

            )}  


            <div className="UIStapleElements_Background-Template--Screen">

                <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                    {adoption_PetGender === "" ? (
                            
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">
            
                            {Object.keys(petSpeciesImagePortraitList).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoption_UserSelection ? (
            
                                        <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => adoption_SpeciesSelector("")}>
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => adoption_SpeciesSelector(key)}>
                                            <div>
                                                Select
                                            </div>
                                        </button>
            
                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                        <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        <h1>{key}</h1>
                                    </div>
                                    
                                </div>
            
                            ))}
            
                        </div>

                    ) : (

                        <div className="UIStapleElements_ComponentFrame-Template--Global Adoption_ComponentContainer-Template--Form"> 

                            <div className="adoptioncontent">
                                <h2>Introduction:</h2>

                                <div className="adoptionStuff">
                                    <p>Congratulations! You are about to welcome</p>
                                    <input 
                                        className="Adoption_ComponentContainer-Template--FormContentInput"
                                        type="text"
                                        value={adoption_UserInput}
                                        onChange={(e) => {set_Adoption_UserInput(e.target.value)}}
                                        placeholder="&lt;Name&gt;"
                                    />
                                    <p> the {adoption_PetGender} {adoption_UserSelection === petSpeciesDogKey ? "puppy" : adoption_UserSelection === petSpeciesCatKey ? "kitten" : "fry"} into your family! </p>
                                </div>
                            </div>

                        </div>

                    )} 

                  

                </div>

                {adoption_PetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                        
                        <button className = "UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                            <div>
                                Quit Species<br/> [esc]
                            </div>
                        </button>

                        {adoption_UserSelection === "" ? (

                            <button className = "UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton"> 
                                <div>
                                    Confirm Species <br/> [return]
                                </div>
                            </button>

                        ) : (

                            <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Confirm" onClick = {() => adoption_PetGenderGenerator()}> 
                                <div>
                                    Confirm Species<br/> [return]
                                </div>
                            </button>

                        )}
                        
                    </div>
    
                ) : (
    
                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                        <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Quit" onClick = {() => adoption_SpeciesDeselector()}> 
                            <div>
                                Quit Species<br/> [esc]
                            </div>
                        </button>
                        <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Confirm" onClick = {(e) => adoption_NameManager(e)}> 
                            <div>
                                Confirm Adoption <br/> [return]
                            </div>
                        </button>
                    </div>
    
                )} 
        
            </div>

            
            
            {adoption_CurrErrorMessage === "" ? (

                null

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags--Alerts">
                    <div className="UIStapleElements_ComponentFrame-Template--Global notificationsFrame">
                        <div className="notificationsFrameContent">
                            <h2>Name Alert:</h2>
                            <p>{adoption_CurrErrorMessage}</p>
                        </div>
                    </div>
                </div>

            )}
            

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons MiscellaneousElements_ComponentContainer-Structure--ScreenFixedButtons--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Volume" 
                    onClick = {() => helpers_Opener_Flags(set_Adoption_MusicVolumeOpenFlag, 1)}>
                    <div>
                        Volume <br/> [v]
                    </div>
                </button>

                <button 
                    className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Inventory" 
                    onClick = {() => helpers_Opener_Flags(set_Adoption_InventoryOpenFlag, 1)}>
                    <div>
                        Inventory <br/> [I]
                    </div>
                </button>

            </div>

        </>
    
    );

};

export default Adoption;