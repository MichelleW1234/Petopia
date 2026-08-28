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

import { petSpeciesImagePortraitList, petActivityTimeStampCleaningKey, petBirthDateKey, petSpeciesCatKey, petSpeciesDogKey, petActivityTimeStampFeedingKey, petSpeciesFishKey, petHealthKey, petMedicineKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey, petGenderKey, petGenderMaleKey, petGenderFemaleKey, petSpeciesHealthCapList, soundSelectionButtonPressKey, soundNavButtonPressKey, soundAdoptionSuccessKey, soundScreenButtonPressKey, petActivityTimeStampLastPerformedKey, petActivityTimeStampLastDamagedKey, soundAdoptionConfirmationErrorKey } from "../../../constants/Constants.js";
import { helpersFlagOpener, helpersPlaySound } from "../../../helpers/Helpers.js";

import "./Adoption.css";
import Notifications from "../../GlobalComponents/components/Notifications.jsx";



function Adoption () {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();

    const [adoptionMusicVolumeOpenFlag, setAdoptionMusicVolumeOpenFlag] = useState(false);
    const [adoptionInventoryOpenFlag, setAdoptionInventoryOpenFlag] = useState(false);
    const [adoptionSpeciesCareGuideOpenFlag, setAdoptionSpeciesCareGuideOpenFlag] = useState(false);
    const [adoptionSelectedPet, setAdoptionSelectedPet] = useState("");
    const [adoptionPetGender, setAdoptionPetGender] = useState("");
    const [adoptionErrorMessage, setAdoptionErrorMessage] = useState("");
    const [adoptionConfirmationPetName, setAdoptionConfirmationPetName] = useState("");

    const adoptionConfirmationTimeoutRef = useRef(null);

    const adoptionNavigate = useNavigate();



    useKeyboardShortcut("v", () => {
    
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            helpersFlagOpener(setAdoptionMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    
    useKeyboardShortcut("i", () => {
    
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            helpersFlagOpener(setAdoptionInventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {
        
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            adoptionQuit();
            adoptionNavigate("/home");

        }

    },
        ".QuitAndGoHome"
    );

    
    useKeyboardShortcut("2", () => {
        
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            helpersFlagOpener(setAdoptionSpeciesCareGuideOpenFlag, 0);

        }

    },
        ".SpeciesCareGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (adoptionPetGender === "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            adoptionPetSelecting();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            adoptionUndo();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            adoptionNameChecking(e);

        }

    },
        ".ConfirmSelection"
    );



    const adoptionQuit = () => {

        helpersPlaySound(soundNavButtonPressKey);
        setActiveCheckoutRoom(-1);

    }


    const adoptionPetSelecting = () => {

        helpersPlaySound(soundScreenButtonPressKey);
        
        const adoptionPetSelectingGender = Math.floor(Math.random() * 2);
        
        if (adoptionPetSelectingGender === 0){

            setAdoptionPetGender(petGenderMaleKey);

        } else {

            setAdoptionPetGender(petGenderFemaleKey);

        }

    }


    const adoptionNameChecking = (e) => {

        helpersPlaySound(soundScreenButtonPressKey);

        const adoptionNameCheckingModifiedPetName = adoptionConfirmationPetName.trim().toLowerCase();
        setAdoptionConfirmationPetName(adoptionNameCheckingModifiedPetName);

        if (adoptionNameCheckingModifiedPetName === "") {

            e.preventDefault();
            adoptionErrorMessageTimer("Enter a name for your pet.");

        } else if (adoptionNameCheckingModifiedPetName.length > 20){

            e.preventDefault();
            adoptionErrorMessageTimer("Shorten the name to 20 characters max.");

        } else if (adoptionNameCheckingModifiedPetName in PetList && adoptionNameCheckingModifiedPetName in PetTimeStamps) {

            e.preventDefault();
            adoptionErrorMessageTimer("This name already exists.");

        } else {

            adoptionAdoptPet(adoptionNameCheckingModifiedPetName);
            adoptionNavigate("/home");

        }

    }


    const adoptionAdoptPet = (adoptionAdoptPetFinalPetName) => {

        helpersPlaySound(soundAdoptionSuccessKey);

        const adoptionAdoptPetStartingTime = GlobalTimer;

        if (adoptionSelectedPet === petSpeciesDogKey){

            setPetList(prev => ({
                ...prev,
                [adoptionAdoptPetFinalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesDogKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesDogKey][0],
                        [petBirthDateKey]: adoptionAdoptPetStartingTime,
                        [petGenderKey]: adoptionPetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [adoptionAdoptPetFinalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime},
                        [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime},
                        [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime}
                    }
            }));

        } else if (adoptionSelectedPet === petSpeciesCatKey){

            setPetList(prev => ({
                ...prev,
                [adoptionAdoptPetFinalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesCatKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesCatKey][0],
                        [petBirthDateKey]: adoptionAdoptPetStartingTime,
                        [petGenderKey]: adoptionPetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [adoptionAdoptPetFinalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime},
                        [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime}
                    }
            }));

        } else if (adoptionSelectedPet === petSpeciesFishKey){

            setPetList(prev => ({
                ...prev,
                [adoptionAdoptPetFinalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesFishKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesFishKey][0],
                        [petBirthDateKey]: adoptionAdoptPetStartingTime,
                        [petGenderKey]: adoptionPetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [adoptionAdoptPetFinalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime},
                        [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : adoptionAdoptPetStartingTime, [petActivityTimeStampLastDamagedKey] : adoptionAdoptPetStartingTime},
                    }
            }));

        }

        setRoom(prev => {

            let adoptionAdoptPetUpdated = [...prev];
            adoptionAdoptPetUpdated[ActiveCheckoutRoom] = adoptionAdoptPetFinalPetName;
            return adoptionAdoptPetUpdated;
            
        });

        setActiveCheckoutRoom(-1);

    }


    const adoptionUndo = () => {

        helpersPlaySound(soundScreenButtonPressKey);

        setAdoptionSelectedPet("");
        setAdoptionPetGender("");

    }
    

    const adoptionSelectPet = (adoptionSelectPetKey) => {

        helpersPlaySound(soundSelectionButtonPressKey);
        setAdoptionSelectedPet(adoptionSelectPetKey);

    }


    const adoptionErrorMessageTimer = (adoptionErrorMessageTimerMessage) => {
    
        helpersPlaySound(soundAdoptionConfirmationErrorKey);
    
        setAdoptionErrorMessage(adoptionErrorMessageTimerMessage);
    
        if (adoptionConfirmationTimeoutRef.current) {
            clearTimeout(adoptionConfirmationTimeoutRef.current);
        }
    
        adoptionConfirmationTimeoutRef.current = setTimeout(() => {
            setAdoptionErrorMessage("");
            adoptionConfirmationTimeoutRef.current = null;
        }, 5000); 
    
    }
    



    

    return (

        <>

            {adoptionMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setAdoptionMusicVolumeOpenFlag}
            />}

            {adoptionInventoryOpenFlag && 
            <Inventory
                setInventoryOpenFlag={setAdoptionInventoryOpenFlag}
            />}

            {adoptionSpeciesCareGuideOpenFlag &&
            <SpeciesCareGuide
                setSpeciesCareGuideOpenFlag = {setAdoptionSpeciesCareGuideOpenFlag}
            />
            }

            <div className="UIStapleElements_Background-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar QuitAndGoHome" onClick = {() => adoptionQuit()}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar SpeciesCareGuide" onClick = {() => helpersFlagOpener(setAdoptionSpeciesCareGuideOpenFlag, 0)}> Species Care Guide <br/> [2]</button>
                </div>

                {adoptionPetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Select a species: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(petSpeciesImagePortraitList).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoptionSelectedPet ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => adoptionSelectPet("")}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => adoptionSelectPet(key)}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>
            
                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                        <h2>{key}</h2>
                                    </div>
                                    
                                </div>
            
                            ))}
            
                        </div>
                    
                        {adoptionSelectedPet === "" ? (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation <br/> [return]</button>
            
                        ) : (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen GoToConfirmation" onClick = {() => adoptionPetSelecting()}> Go to Confirmation <br/> [return]</button>
            
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
                                        <img src = {petSpeciesImagePortraitList[adoptionSelectedPet][0]}/>
                                    </div>
                                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Adoption_ComponentContainer-Template--FormBodyNameRowName">
                                        <input 
                                            type="text"
                                            value={adoptionConfirmationPetName}
                                            onChange={(e) => {setAdoptionConfirmationPetName(e.target.value)}}
                                            placeholder="Name your pet..."
                                        />
                                    </div>
                                </div>

                                <p> and I am a {adoptionPetGender} {adoptionSelectedPet}. Thank you for adopting me!</p>
                            </div>

                        </div>

                        <div className = "Adoption_ComponentContainer-Structure--Confirmation">
                            <p className = "Adoption_ComponentContainer-Template--ConfirmationError">{adoptionErrorMessage}</p>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen UndoSelection" onClick = {() => adoptionUndo()}> Undo Selection <br/> [esc]</button>
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ConfirmSelection" onClick = {(e) => adoptionNameChecking(e)}> Confirm Selection <br/> [return]</button>
                            </div>
                        </div>

                    </div>

                )}
        
            </div>

            <Notifications/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => helpersFlagOpener(setAdoptionMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => helpersFlagOpener(setAdoptionInventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>

            </div>

        </>
    
    );

};

export default Adoption;