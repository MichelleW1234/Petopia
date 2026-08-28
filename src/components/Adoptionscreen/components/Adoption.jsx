import { useNavigate, Link } from "react-router-dom";
import {useState, useRef} from "react";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import {useActiveCheckoutRoom} from "../../../providers/ActiveCheckoutRoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import SpeciesCareGuide from "./AdoptionscreenComponents/SpeciesCareGuide.jsx";
import MusicVolume from "../../GlobalComponents/components/MusicVolume.jsx";
import Inventory from "../../GlobalComponents/components/Inventory.jsx";
import Notifications from "../../GlobalComponents/components/Notifications.jsx";

import { petSpeciesImagePortraitList, petActivityTimeStampCleaningKey, petBirthDateKey, petSpeciesCatKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petHealthKey, petMedicineKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, petGenderKey, petGenderMaleKey, petGenderFemaleKey, petSpeciesHealthCapList, soundSelectionButtonPressKey, soundNavButtonPressKey, soundAdoptionSuccessKey, soundScreenButtonPressKey, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey, soundAdoptionConfirmationErrorKey } from "../../../constants/Constants.js";
import { helpers_FlagOpener, helpers_PlaySound } from "../../../helpers/Helpers.js";

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
    const [adoption_SelectedPet, set_Adoption_SelectedPet] = useState("");
    const [adoption_PetGender, set_Adoption_PetGender] = useState("");
    const [adoption_ErrorMessage, set_Adoption_ErrorMessage] = useState("");
    const [adoption_ConfirmationPetName, set_Adoption_ConfirmationPetName] = useState("");

    const adoption_ConfirmationTimeoutRef = useRef(null);

    const adoption_Navigate = useNavigate();



    useKeyboardShortcut("v", () => {
    
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_FlagOpener(set_Adoption_MusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    
    useKeyboardShortcut("i", () => {
    
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_FlagOpener(set_Adoption_InventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {
        
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_Quit();
            adoption_Navigate("/home");

        }

    },
        ".QuitAndGoHome"
    );

    
    useKeyboardShortcut("2", () => {
        
        if (!adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            helpers_FlagOpener(set_Adoption_SpeciesCareGuideOpenFlag, 0);

        }

    },
        ".SpeciesCareGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (adoption_PetGender === "" && adoption_SelectedPet !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_PetSelecting();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoption_PetGender !== "" && adoption_SelectedPet !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_Undo();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (adoption_PetGender !== "" && adoption_SelectedPet !== "" && !adoption_SpeciesCareGuideOpenFlag && !adoption_MusicVolumeOpenFlag && !adoption_InventoryOpenFlag){

            adoption_NameChecking(e);

        }

    },
        ".ConfirmSelection"
    );



    const adoption_Quit = () => {

        helpers_PlaySound(soundNavButtonPressKey);
        setActiveCheckoutRoom(-1);

    }


    const adoption_PetSelecting = () => {

        helpers_PlaySound(soundScreenButtonPressKey);
        
        const adoption_PetSelecting_Gender = Math.floor(Math.random() * 2);
        
        if (adoption_PetSelecting_Gender === 0){

            set_Adoption_PetGender(petGenderMaleKey);

        } else {

            set_Adoption_PetGender(petGenderFemaleKey);

        }

    }


    const adoption_NameChecking = (e) => {

        helpers_PlaySound(soundScreenButtonPressKey);

        const adoption_NameChecking_ModifiedPetName = adoption_ConfirmationPetName.trim().toLowerCase();
        set_Adoption_ConfirmationPetName(adoption_NameChecking_ModifiedPetName);

        if (adoption_NameChecking_ModifiedPetName === "") {

            e.preventDefault();
            adoption_ErrorMessageTimer("Enter a name for your pet.");

        } else if (adoption_NameChecking_ModifiedPetName.length > 20){

            e.preventDefault();
            adoption_ErrorMessageTimer("Shorten the name to 20 characters max.");

        } else if (adoption_NameChecking_ModifiedPetName in PetList && adoption_NameChecking_ModifiedPetName in PetTimeStamps) {

            e.preventDefault();
            adoption_ErrorMessageTimer("This name already exists.");

        } else {

            adoption_AdoptPet(adoption_NameChecking_ModifiedPetName);
            adoption_Navigate("/home");

        }

    }


    const adoption_AdoptPet = (adoption_AdoptPet_FinalPetName) => {

        helpers_PlaySound(soundAdoptionSuccessKey);

        const adoption_AdoptPet_StartingTime = GlobalTimer;

        if (adoption_SelectedPet === petSpeciesDogKey){

            setPetList(prev => ({
                ...prev,
                [adoption_AdoptPet_FinalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesDogKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesDogKey][0],
                        [petBirthDateKey]: adoption_AdoptPet_StartingTime,
                        [petGenderKey]: adoption_PetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [adoption_AdoptPet_FinalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime},
                        [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime},
                        [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime}
                    }
            }));

        } else if (adoption_SelectedPet === petSpeciesCatKey){

            setPetList(prev => ({
                ...prev,
                [adoption_AdoptPet_FinalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesCatKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesCatKey][0],
                        [petBirthDateKey]: adoption_AdoptPet_StartingTime,
                        [petGenderKey]: adoption_PetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [adoption_AdoptPet_FinalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime},
                        [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime}
                    }
            }));

        } else if (adoption_SelectedPet === petSpeciesFishKey){

            setPetList(prev => ({
                ...prev,
                [adoption_AdoptPet_FinalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesFishKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesFishKey][0],
                        [petBirthDateKey]: adoption_AdoptPet_StartingTime,
                        [petGenderKey]: adoption_PetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [adoption_AdoptPet_FinalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime},
                        [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : adoption_AdoptPet_StartingTime, [petActivityTimeStampLastDamagedKey] : adoption_AdoptPet_StartingTime},
                    }
            }));

        }

        setRoom(prev => {

            let adoption_AdoptPet_Copy = [...prev];
            adoption_AdoptPet_Copy[ActiveCheckoutRoom] = adoption_AdoptPet_FinalPetName;
            return adoption_AdoptPet_Copy;
            
        });

        setActiveCheckoutRoom(-1);

    }


    const adoption_Undo = () => {

        helpers_PlaySound(soundScreenButtonPressKey);

        set_Adoption_SelectedPet("");
        set_Adoption_PetGender("");

    }
    

    const adoption_SelectPet = (adoption_SelectPet_Key) => {

        helpers_PlaySound(soundSelectionButtonPressKey);
        set_Adoption_SelectedPet(adoption_SelectPet_Key);

    }


    const adoption_ErrorMessageTimer = (adoption_ErrorMessageTimer_Message) => {
    
        helpers_PlaySound(soundAdoptionConfirmationErrorKey);
    
        set_Adoption_ErrorMessage(adoption_ErrorMessageTimer_Message);
    
        if (adoption_ConfirmationTimeoutRef.current) {
            clearTimeout(adoption_ConfirmationTimeoutRef.current);
        }
    
        adoption_ConfirmationTimeoutRef.current = setTimeout(() => {
            set_Adoption_ErrorMessage("");
            adoption_ConfirmationTimeoutRef.current = null;
        }, 5000); 
    
    }
    



    

    return (

        <>

            {adoption_MusicVolumeOpenFlag && 
            <MusicVolume
                set_MusicVolume_OpenFlag={set_Adoption_MusicVolumeOpenFlag}
            />}

            {adoption_InventoryOpenFlag && 
            <Inventory
                set_Inventory_OpenFlag={set_Adoption_InventoryOpenFlag}
            />}

            {adoption_SpeciesCareGuideOpenFlag &&
            <SpeciesCareGuide
                set_SpeciesCareGuide_OpenFlag = {set_Adoption_SpeciesCareGuideOpenFlag}
            />
            }

            <div className="UIStapleElements_Background-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar QuitAndGoHome" onClick = {() => adoption_Quit()}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar SpeciesCareGuide" onClick = {() => helpers_FlagOpener(set_Adoption_SpeciesCareGuideOpenFlag, 0)}> Species Care Guide <br/> [2]</button>
                </div>

                {adoption_PetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Select a species: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(petSpeciesImagePortraitList).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoption_SelectedPet ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => adoption_SelectPet("")}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => adoption_SelectPet(key)}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>
            
                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                        <h2>{key}</h2>
                                    </div>
                                    
                                </div>
            
                            ))}
            
                        </div>
                    
                        {adoption_SelectedPet === "" ? (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation <br/> [return]</button>
            
                        ) : (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen GoToConfirmation" onClick = {() => adoption_PetSelecting()}> Go to Confirmation <br/> [return]</button>
            
                        )}  

                    </div>

                ) : (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument"> 

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                                <h1> Adoption form: </h1> 
                                <hr/>
                            </div> 
                
                            <div className = "MiscellaneousElements_ComponentContainer-Template--GlobalDocumentWrittenContent Adoption_ComponentContainer-Structure--FormBody">
                                <p>Hello, my name is </p>

                                <div className="Adoption_ComponentContainer-Template--FormBodyNameRow">
                                    <div className="Adoption_ComponentContainer-Template--FormBodyNameRowPetImage">
                                        <img src = {petSpeciesImagePortraitList[adoption_SelectedPet][0]}/>
                                    </div>
                                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Adoption_ComponentContainer-Template--FormBodyNameRowName">
                                        <input 
                                            type="text"
                                            value={adoption_ConfirmationPetName}
                                            onChange={(e) => {set_Adoption_ConfirmationPetName(e.target.value)}}
                                            placeholder="Name your pet..."
                                        />
                                    </div>
                                </div>

                                <p> and I am a {adoption_PetGender} {adoption_SelectedPet}. Thank you for adopting me!</p>
                            </div>

                        </div>

                        <div className = "Adoption_ComponentContainer-Structure--Confirmation">
                            <p className = "Adoption_ComponentContainer-Template--ConfirmationError">{adoption_ErrorMessage}</p>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen UndoSelection" onClick = {() => adoption_Undo()}> Undo Selection <br/> [esc]</button>
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ConfirmSelection" onClick = {(e) => adoption_NameChecking(e)}> Confirm Selection <br/> [return]</button>
                            </div>
                        </div>

                    </div>

                )}
        
            </div>

            <Notifications/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpers_FlagOpener(set_Adoption_MusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpers_FlagOpener(set_Adoption_InventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>

            </div>

        </>
    
    );

};

export default Adoption;