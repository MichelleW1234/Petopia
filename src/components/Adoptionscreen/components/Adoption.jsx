import { useNavigate, Link } from "react-router-dom";
import {useState, useRef} from "react";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import {useActiveCheckoutRoom} from "../../../providers/ActiveCheckoutRoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import PetSpeciesGuide from "./AdoptionscreenComponents/PetSpeciesGuide.jsx";
import MusicVolume from "../../GlobalComponents/MusicVolume.jsx";

import { portraitPetImages, cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey, genderKey, maleGender, femaleGender, healthCapList, buttonPressSoundKey, buttonSoundKey, errorSoundKey, confirmedSoundKey, restartSoundKey, gameButtonSoundKey, activityLastPerformedKey, activityLastDamageKey } from "../../../constants/Constants.js";
import { flagOpener, playSound } from "../../../helpers/helpers.js";

import "./Adoption.css";



function Adoption () {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();

    const [adoptionMusicVolumeOpenFlag, setAdoptionMusicVolumeOpenFlag] = useState(false);
    const [adoptionPetSpeciesGuideOpenFlag, setAdoptionPetSpeciesGuideOpenFlag] = useState(false);
    const [adoptionSelectedPet, setAdoptionSelectedPet] = useState("");
    const [adoptionPetGender, setAdoptionPetGender] = useState("");
    const [adoptionErrorMessage, setAdoptionErrorMessage] = useState("");
    const [adoptionConfirmationPetName, setAdoptionConfirmationPetName] = useState("");


    const adoptionConfirmationTimeoutRef = useRef(null);


    const navigate = useNavigate();

    useKeyboardShortcut("v", () => {
    
        if (!adoptionPetSpeciesGuideOpenFlag && !adoptionMusicVolumeOpenFlag){

            flagOpener(setAdoptionMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );


    useKeyboardShortcut("1", () => {
        
        if (!adoptionPetSpeciesGuideOpenFlag && !adoptionMusicVolumeOpenFlag){

            quit();
            navigate("/home");

        }

    },
        ".QuitAndGoHome"
    );

        
    
    useKeyboardShortcut("2", () => {
        
        if (!adoptionPetSpeciesGuideOpenFlag && !adoptionMusicVolumeOpenFlag){

            flagOpener(setAdoptionPetSpeciesGuideOpenFlag, 0);

        }

    },
        ".PetSpeciesGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (adoptionPetGender === "" && adoptionSelectedPet !== "" && !adoptionPetSpeciesGuideOpenFlag && !adoptionMusicVolumeOpenFlag){

            petSelecting();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionPetSpeciesGuideOpenFlag && !adoptionMusicVolumeOpenFlag){

            undo();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionPetSpeciesGuideOpenFlag && !adoptionMusicVolumeOpenFlag){

            nameChecking(e);

        }

    },
        ".ConfirmSelection"
    );



    const quit = () => {

        playSound(buttonSoundKey);
        setActiveCheckoutRoom(-1);

    }


    const petSelecting = () => {

        playSound(gameButtonSoundKey);
        
        const gender = Math.floor(Math.random() * 2);
        
        if (gender === 0){

            setAdoptionPetGender(maleGender);

        } else {

            setAdoptionPetGender(femaleGender);

        }

    }


    const nameChecking = (e) => {

        playSound(gameButtonSoundKey);

        const trimmedPetName = adoptionConfirmationPetName.trim();
        setAdoptionConfirmationPetName(trimmedPetName);
            
        if (trimmedPetName === "") {

            e.preventDefault();
            showError("Enter a name for your pet.");

        } else if (trimmedPetName.length > 20){

            e.preventDefault();
            showError("Shorten the name to 20 characters max.");

        } else if (trimmedPetName in PetList && trimmedPetName in PetTimeStamps) {

            e.preventDefault();
            showError("This name already exists.");

        } else {

            adoptPet(trimmedPetName);
            navigate("/home");

        }

    }


    const showError = (message) => {

        playSound(errorSoundKey);

        setAdoptionErrorMessage(message);

        if (adoptionConfirmationTimeoutRef.current) {
            clearTimeout(adoptionConfirmationTimeoutRef.current);
        }

        adoptionConfirmationTimeoutRef.current = setTimeout(() => {
            setAdoptionErrorMessage("");
            adoptionConfirmationTimeoutRef.current = null;
        }, 5000); 

    }


    const adoptPet = (finalPetName) => {

        playSound(confirmedSoundKey);

        const startingTime = GlobalTimer;

        if (adoptionSelectedPet === dogSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: dogSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[dogSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: adoptionPetGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [cleaningKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [playingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime}
                    }
            }));

        } else if (adoptionSelectedPet === catSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: catSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[catSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: adoptionPetGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [playingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime}
                    }
            }));

        } else if (adoptionSelectedPet === fishSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: fishSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[fishSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: adoptionPetGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [cleaningKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
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

        playSound(gameButtonSoundKey);

        setAdoptionSelectedPet("");
        setAdoptionPetGender("");

    }
    

    const selectPet = (key) => {

        playSound(buttonPressSoundKey);
        setAdoptionSelectedPet(key);

    }

    

    return (

        <>

            {adoptionMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setAdoptionMusicVolumeOpenFlag}
            />}

            {adoptionPetSpeciesGuideOpenFlag &&
                <PetSpeciesGuide
                    setPetSpeciesGuideOpenFlag = {setAdoptionPetSpeciesGuideOpenFlag}
                />
            }

            <div className="UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar QuitAndGoHome" onClick = {() => quit()}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar PetSpeciesGuide" onClick = {() => flagOpener(setAdoptionPetSpeciesGuideOpenFlag, 0)}> Pet Species Guide <br/> [2]</button>
                </div>

                {adoptionPetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1> Select a new Pet: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(portraitPetImages).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoptionSelectedPet ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => selectPet("")}>
                                            <img src = {portraitPetImages[key][0]}/>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => selectPet(key)}>
                                            <img src = {portraitPetImages[key][0]}/>
                                        </button>
            
                                    )}

                                    <h2>{key}</h2>
                                </div>
            
                            ))}
            
                        </div>
                    
                        {adoptionSelectedPet !== "" ? (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen GoToConfirmation" onClick = {() => petSelecting()}> Go to Confirmation <br/> [return]</button>
            
                        ) : (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation <br/> [return]</button>
            
                        )}  

                    </div>

                ) : (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument"> 

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                                <h1>Fill out this form: </h1> 
                                <hr/>
                            </div> 
                
                            <div className = "Adoption_ComponentContainer-Structure--FormBody">
                                <p>Hello, my name is </p>

                                <div className="Adoption_ComponentContainer-Template--FormBodyNameRow">
                                    <div className="Adoption_ComponentContainer-Template--FormBodyNameRowPetImage">
                                        <img src = {portraitPetImages[adoptionSelectedPet][0]}/>
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

                                <p> and I am a {adoptionPetGender} {adoptionSelectedPet}.</p>
                                <p>This form is to verify that you have chosen to adopt me. Also be sure to read the Pet Care Guide!</p>
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

            <button 
                className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen MiscellaneousElements_ComponentButton-Position--ScreenToggle Volume" 
                onClick = {() => flagOpener(setAdoptionMusicVolumeOpenFlag, 1)}>
                Volume <br/> [v]
            </button>

        </>
    
    );

};

export default Adoption;