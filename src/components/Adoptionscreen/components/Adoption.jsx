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
import { flagOpener, playSound } from "../../../helpers/Helpers.js";

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

    const navigate = useNavigate();



    useKeyboardShortcut("v", () => {
    
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            flagOpener(setAdoptionMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    
    useKeyboardShortcut("i", () => {
    
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            flagOpener(setAdoptionInventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {
        
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            quit();
            navigate("/home");

        }

    },
        ".QuitAndGoHome"
    );

    
    useKeyboardShortcut("2", () => {
        
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            flagOpener(setAdoptionSpeciesCareGuideOpenFlag, 0);

        }

    },
        ".SpeciesCareGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (adoptionPetGender === "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            petSelecting();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            undo();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            nameChecking(e);

        }

    },
        ".ConfirmSelection"
    );



    const quit = () => {

        playSound(soundNavButtonPressKey);
        setActiveCheckoutRoom(-1);

    }


    const petSelecting = () => {

        playSound(soundScreenButtonPressKey);
        
        const gender = Math.floor(Math.random() * 2);
        
        if (gender === 0){

            setAdoptionPetGender(petGenderMaleKey);

        } else {

            setAdoptionPetGender(petGenderFemaleKey);

        }

    }


    const nameChecking = (e) => {

        playSound(soundScreenButtonPressKey);

        const modifiedPetName = adoptionConfirmationPetName.trim().toLowerCase();
        setAdoptionConfirmationPetName(modifiedPetName);

        if (modifiedPetName === "") {

            e.preventDefault();
            errorMessageTimer("Enter a name for your pet.");

        } else if (modifiedPetName.length > 20){

            e.preventDefault();
            errorMessageTimer("Shorten the name to 20 characters max.");

        } else if (modifiedPetName in PetList && modifiedPetName in PetTimeStamps) {

            e.preventDefault();
            errorMessageTimer("This name already exists.");

        } else {

            adoptPet(modifiedPetName);
            navigate("/home");

        }

    }


    const adoptPet = (finalPetName) => {

        playSound(soundAdoptionSuccessKey);

        const startingTime = GlobalTimer;

        if (adoptionSelectedPet === petSpeciesDogKey){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesDogKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesDogKey][0],
                        [petBirthDateKey]: startingTime,
                        [petGenderKey]: adoptionPetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime},
                        [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime},
                        [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime}
                    }
            }));

        } else if (adoptionSelectedPet === petSpeciesCatKey){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesCatKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesCatKey][0],
                        [petBirthDateKey]: startingTime,
                        [petGenderKey]: adoptionPetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime},
                        [petActivityTimeStampPlayingKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime}
                    }
            }));

        } else if (adoptionSelectedPet === petSpeciesFishKey){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [petSpeciesKey]: petSpeciesFishKey, 
                        [petStageKey]: 0,
                        [petHealthKey]: petSpeciesHealthCapList[petSpeciesFishKey][0],
                        [petBirthDateKey]: startingTime,
                        [petGenderKey]: adoptionPetGender,
                        [petMedicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [petActivityTimeStampFeedingKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime},
                        [petActivityTimeStampCleaningKey]: {[petActivityTimeStampLastPerformedKey] : startingTime, [petActivityTimeStampLastDamagedKey] : startingTime},
                    }
            }));

        }

        setRoom(prev => {

            let updated = [...prev];
            updated[ActiveCheckoutRoom] = finalPetName;
            return updated;
            
        });

        setActiveCheckoutRoom(-1);

    }


    const undo = () => {

        playSound(soundScreenButtonPressKey);

        setAdoptionSelectedPet("");
        setAdoptionPetGender("");

    }
    

    const selectPet = (key) => {

        playSound(soundSelectionButtonPressKey);
        setAdoptionSelectedPet(key);

    }


    const errorMessageTimer = (message) => {
    
        playSound(soundAdoptionConfirmationErrorKey);
    
        setAdoptionErrorMessage(message);
    
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
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar QuitAndGoHome" onClick = {() => quit()}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar SpeciesCareGuide" onClick = {() => flagOpener(setAdoptionSpeciesCareGuideOpenFlag, 0)}> Species Care Guide <br/> [2]</button>
                </div>

                {adoptionPetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Select a species: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(petSpeciesImagePortraitList).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoptionSelectedPet ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => selectPet("")}>
                                            <img src = {petSpeciesImagePortraitList[key][0]}/>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => selectPet(key)}>
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
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen GoToConfirmation" onClick = {() => petSelecting()}> Go to Confirmation <br/> [return]</button>
            
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
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen UndoSelection" onClick = {() => undo()}> Undo Selection <br/> [esc]</button>
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ConfirmSelection" onClick = {(e) => nameChecking(e)}> Confirm Selection <br/> [return]</button>
                            </div>
                        </div>

                    </div>

                )}
        
            </div>

            <Notifications/>

            <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => flagOpener(setAdoptionMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                    onClick = {() => flagOpener(setAdoptionInventoryOpenFlag, 1)}>
                    Inventory <br/> [I]
                </button>

            </div>

        </>
    
    );

};

export default Adoption;