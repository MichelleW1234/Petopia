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

import { petSpeciesImagePortraitList, petActivityTimeStampCleaningKey, petBirthDateKey, petSpeciesCatKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petHealthKey, petMedicineKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, petGenderKey, petGenderMaleKey, petGenderFemaleKey, petSpeciesHealthCapList, audioSelectionButtonPressKey, audioNavButtonPressKey, audioAdoptionSuccessKey, audioScreenButtonPressKey, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey, audioAdoptionConfirmationErrorKey } from "../../../constants/Constants.js";
import { helpers_Opener_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers.js";

import "./Adoption.css";




function Adoption () {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();

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
        ".QuitAndGoHome"
    );

    
    useKeyboardShortcut("2", () => {
        
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_Opener_Flags(set_Adoption_SpeciesCareGuideOpenFlag, 0);

        }

    },
        ".SpeciesCareGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (adoption_PetGender === "" && adoption_UserSelection !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_PetGenderGenerator();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoption_PetGender !== "" && adoption_UserSelection !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_SpeciesDeselector();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (adoption_PetGender !== "" && adoption_UserSelection !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_NameManager(e);

        }

    },
        ".ConfirmAdoption"
    );



    const adoption_HomeNavigator = () => {

        helpers_Player_UIIndicatorSounds(audioNavButtonPressKey);
        setActiveCheckoutRoom(-1);

    }


    const adoption_PetGenderGenerator = () => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);
        
        const adoption_PetGenderGenerator_CurrGenderNumber = Math.floor(Math.random() * 2);
        
        if (adoption_PetGenderGenerator_CurrGenderNumber === 0){

            set_Adoption_PetGender(petGenderMaleKey);

        } else {

            set_Adoption_PetGender(petGenderFemaleKey);

        }

    }


    const adoption_NameManager = (adoption_NameManager_E) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        const adoption_NameManager_CurrPetName = adoption_UserInput.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        set_Adoption_UserInput(adoption_NameManager_CurrPetName);

        if (adoption_NameManager_CurrPetName === "") {

            adoption_NameManager_E.preventDefault();
            adoption_CurrErrorMessageTimer("Enter a name for your pet.");


        } else if (/[^\p{L}\p{N} .'-]/u.test(adoption_NameManager_CurrPetName)) {

            adoption_NameManager_E.preventDefault();
            adoption_CurrErrorMessageTimer("Please enter a name that doesn't contain symbol excluding periods, dashes, and single quotes.");

        } else if (adoption_NameManager_CurrPetName.length > 20){

            adoption_NameManager_E.preventDefault();
            adoption_CurrErrorMessageTimer("Shorten the name to 20 characters max.");

        } else if (adoption_NameManager_CurrPetName in PetList && adoption_NameManager_CurrPetName in PetTimeStamps) {

            adoption_NameManager_E.preventDefault();
            adoption_CurrErrorMessageTimer("This name already exists.");

        } else {

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

    }


    const adoption_SpeciesDeselector = () => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

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

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);
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
            />
            }

            <div className="UIStapleElements_Background-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenMenuButtonRow">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenMenu QuitAndGoHome" onClick = {() => adoption_HomeNavigator()}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenMenu SpeciesCareGuide" onClick = {() => helpers_Opener_Flags(set_Adoption_SpeciesCareGuideOpenFlag, 0)}> Species Care Guide <br/> [2]</button>
                </div>

                {adoption_PetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Select a species: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">
            
                            {Object.keys(petSpeciesImagePortraitList).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoption_UserSelection ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => adoption_SpeciesSelector("")}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => adoption_SpeciesSelector(key)}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>
            
                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                                        <h2>{key}</h2>
                                    </div>
                                    
                                </div>
            
                            ))}
            
                        </div>
                    
                        {adoption_UserSelection === "" ? (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation <br/> [return]</button>
            
                        ) : (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen GoToConfirmation" onClick = {() => adoption_PetGenderGenerator()}> Go to Confirmation <br/> [return]</button>
            
                        )}  

                    </div>

                ) : (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Fill Out the Adoption Form: </h1> 

                        <div className="UIStapleElements_ComponentFrameTransparent-Template--Global"> 
                
                            <div className = "MiscellaneousElements_ComponentContainer-Template--GlobalWrittenContent Adoption_ComponentContainer-Structure--FormBody">
                                <p>Hello, my name is </p>

                                <div className="Adoption_ComponentContainer-Template--FormBodyNameRow">
                                    <div className="Adoption_ComponentContainer-Template--FormBodyNameRowPetImage">
                                        <img src = {petSpeciesImagePortraitList[adoption_UserSelection][0]}/>
                                    </div>
                                    <div className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--Screen Adoption_ComponentContainer-Template--FormBodyNameRowName">
                                        <input 
                                            type="text"
                                            value={adoption_UserInput}
                                            onChange={(e) => {set_Adoption_UserInput(e.target.value)}}
                                            placeholder="Name your pet..."
                                        />
                                    </div>
                                </div>

                                <p> and I am a {adoption_PetGender} {adoption_UserSelection}. Thank you for adopting me!</p>
                            </div>

                        </div>

                        <div className = "Adoption_ComponentContainer-Structure--Confirmation">
                            <p className = "Adoption_ComponentContainer-Template--ConfirmationError">{adoption_CurrErrorMessage}</p>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalNavigationButtonRow">
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen UndoSelection" onClick = {() => adoption_SpeciesDeselector()}> Undo Selection <br/> [esc]</button>
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ConfirmAdoption" onClick = {(e) => adoption_NameManager(e)}> Confirm Adoption <br/> [return]</button>
                            </div>
                        </div>

                    </div>

                )}
        
            </div>

            <NotificationsComponent/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_Opener_Flags(set_Adoption_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_Opener_Flags(set_Adoption_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>

            </div>

        </>
    
    );

};

export default Adoption;