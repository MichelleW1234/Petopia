import { useNavigate, Link } from "react-router-dom";
import {useState, useRef} from "react";

import PetSpeciesGuide from "./AdoptionscreenComponents/PetSpeciesGuide.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";

import { portraitPetImages, cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey, genderKey, maleGender, femaleGender, healthCapList, buttonPressSoundKey, buttonSoundKey, errorSoundKey, confirmedSoundKey, restartSoundKey, gameButtonSoundKey } from "../../../constants/Constants.js";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import "./Adoption.css";
import { flagOpener, playSound } from "../../../helpers/helpers.js";



function Adoption () {

    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const [petSpeciesGuideOpenFlag, setPetSpeciesGuideOpenFlag] = useState(false);
    const [selectedPet, setSelectedPet] = useState("");
    const [petGender, setPetGender] = useState("");
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationPetName, setConfirmationPetName] = useState("");

    const petPersonality = {

        [dogSpecies] : "Dogs are generally loyal and bond strongly with their owners—they often form deep attachments and like to stay close to their people. Many dogs are social and playful, meaning they enjoy interacting with humans and other dogs, especially through games and attention.",
        [catSpecies] : "Cats are often independent and self-sufficient—they like having their own space and don’t always rely on humans for attention. They can be affectionate, but on their own terms—many cats enjoy cuddling or being close, but usually when they choose to.",
        [fishSpecies] : "Fish are usually calm and low-interaction animals—they don’t seek attention or social bonding the way mammals do. Many fish are territorial or routine-based, meaning they can become used to specific areas of the tank and behave differently depending on their environment and feeding schedule."

    }

    const confirmationTimeoutRef = useRef(null);

    const navigate = useNavigate();


    useKeyboardShortcut("1", () => {
        
        if (!petSpeciesGuideOpenFlag){

            playSound(buttonSoundKey);
            navigate("/home");

        }

    },
        ".QuitAndGoHome"
    );

        
    
    useKeyboardShortcut("2", () => {
        
        flagOpener(setPetSpeciesGuideOpenFlag);

    },
        ".PetSpeciesGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (step === 0 && petGender === "" && selectedPet !== "" && !petSpeciesGuideOpenFlag){

            petSelecting();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (step !== 0 && petGender !== "" && selectedPet !== "" && !petSpeciesGuideOpenFlag){

            undo();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (step !== 0 && petGender !== "" && selectedPet !== "" && !petSpeciesGuideOpenFlag){

            nameChecking(e);

        }

    },
        ".ConfirmSelection"
    );



    const petSelecting = () => {

        playSound(gameButtonSoundKey);
        const gender = Math.floor(Math.random() * 2);
        
        if (gender === 0){

            setPetGender(maleGender);

        } else {

            setPetGender(femaleGender);

        }

        setStep(1);

    }


    const nameChecking = (e) => {

        playSound(gameButtonSoundKey);

        const trimmedPetName = confirmationPetName.trim();
        setConfirmationPetName(trimmedPetName);
            
        if (trimmedPetName === "") {

            e.preventDefault();
            showError("Enter a name for your pet.");

        } else if (trimmedPetName.length > 15){

            e.preventDefault();
            showError("Shorten the name to 15 characters max.");

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

        setErrorMessage(message);

        if (confirmationTimeoutRef.current) {
            clearTimeout(confirmationTimeoutRef.current);
        }

        confirmationTimeoutRef.current = setTimeout(() => {
            setErrorMessage("");
            confirmationTimeoutRef.current = null;
        }, 5000);

    }


    const adoptPet = (finalPetName) => {

        playSound(confirmedSoundKey);

        const startingTime = GlobalTimer;

        if (selectedPet === dogSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: dogSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[dogSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: petGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: [startingTime, startingTime],
                        [cleaningKey]: [startingTime, startingTime],
                        [playingKey]: [startingTime, startingTime]
                    }
            }));

        } else if (selectedPet === catSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: catSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[catSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: petGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: [startingTime, startingTime],
                        [playingKey]: [startingTime, startingTime]
                    }
            }));

        } else if (selectedPet === fishSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: fishSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[fishSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: petGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: [startingTime, startingTime],
                        [cleaningKey]: [startingTime, startingTime],
                    }
            }));

        }

    }


    const undo = () => {

        playSound(gameButtonSoundKey);

        setSelectedPet("");
        setPetGender("");
        setStep(0);

    }
    

    const selectPet = (key) => {

        playSound(buttonPressSoundKey);
        setSelectedPet(key);

    }

    

    return (

        <>

            {petSpeciesGuideOpenFlag &&
                <PetSpeciesGuide
                    setPetSpeciesGuideOpenFlag = {setPetSpeciesGuideOpenFlag}
                />
            }

            <div className="UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar QuitAndGoHome" onClick = {() => playSound(buttonSoundKey)}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar PetSpeciesGuide" onClick = {() => flagOpener(setPetSpeciesGuideOpenFlag)}> Pet Species Guide <br/> [2]</button>
                </div>

                {step === 0 && petGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1> Select a new Pet: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(portraitPetImages).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === selectedPet ? (
            
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
                    
                        {selectedPet !== "" ? (
            
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
                                    <img src = {portraitPetImages[selectedPet][0]}/>
                                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Adoption_ComponentContainer-Template--FormBodyNameRowName">
                                        <input 
                                            type="text"
                                            value={confirmationPetName}
                                            onChange={(e) => {setConfirmationPetName(e.target.value)}}
                                            placeholder="Name your pet..."
                                        />
                                    </div>
                                </div>

                                <p> and I am a {petGender} {selectedPet}.</p>
                                <p>This form is to verify that you have chosen to adopt me. Also be sure to read the Pet Care Guide!</p>
                            </div>
                            </div>

                                
                            <div className = "Adoption_ComponentContainer-Structure--Confirmation">
                                <p className = "Adoption_ComponentContainer-Template--ConfirmationError">{errorMessage}</p>
                                <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen UndoSelection" onClick = {() => undo()}> Undo Selection <br/> [esc]</button>
                                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ConfirmSelection" onClick = {(e) => nameChecking(e)}> Confirm Selection <br/> [return]</button>
                                </div>
                            </div>

                    </div>

                )}
        
            </div>

        </>
    
    );

};

export default Adoption;