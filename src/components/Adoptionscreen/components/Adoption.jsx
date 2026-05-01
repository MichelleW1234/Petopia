import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import PetGuide from "./AdoptionscreenComponents/PetGuide.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";

import { portraitPetImages, cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Adoption.css";



function Adoption () {

    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const [petGuideOpenFlag, setPetGuideOpenFlag] = useState(false);
    const [selectedPet, setSelectedPet] = useState("");
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationPetName, setConfirmationPetName] = useState("");

    const petPersonality = {

        [dogSpecies] : "Dogs are generally loyal and bond strongly with their owners—they often form deep attachments and like to stay close to their people. Many dogs are social and playful, meaning they enjoy interacting with humans and other dogs, especially through games and attention.",
        [catSpecies] : "Cats are often independent and self-sufficient—they like having their own space and don’t always rely on humans for attention. They can be affectionate, but on their own terms—many cats enjoy cuddling or being close, but usually when they choose to.",
        [fishSpecies] : "Fish are usually calm and low-interaction animals—they don’t seek attention or social bonding the way mammals do. Many fish are territorial or routine-based, meaning they can become used to specific areas of the tank and behave differently depending on their environment and feeding schedule."

    }

    const confirmationTimeoutRef = useRef(null);




    const nameChecking = (e) => {

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

        }

    }


    const showError = (message) => {

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

        const startingTime = GlobalTimer;

        if (selectedPet === dogSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: dogSpecies, 
                        [stageKey]: 0,
                        [healthKey]: 15,
                        [birthDateKey]: startingTime,
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
                        [healthKey]: 20,
                        [birthDateKey]: startingTime,
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
                        [healthKey]: 5,
                        [birthDateKey]: startingTime,
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

        setSelectedPet("");
        setStep(0);

    }
    

    

    return (

        <>

            {petGuideOpenFlag &&
                <PetGuide
                    setPetGuideOpenFlag = {setPetGuideOpenFlag}
                />
            }

            <div className="UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--Screen--Nonstation">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar"> Quit and Go Home </Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
                </div>

                {step === 0 ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1> Select a new Pet: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(portraitPetImages).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionButton">
                                    {key === selectedPet ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => setSelectedPet("")}>
                                            <img src = {portraitPetImages[key][0]}/>
                                        </button>
            
                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => setSelectedPet(key)}>
                                            <img src = {portraitPetImages[key][0]} />
                                        </button>
            
                                    )}
                                </div>
            
                            ))}
            
                        </div>
                    
                        {selectedPet !== "" ? (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen" onClick = {() => setStep(1)}> Go to Confirmation </button>
            
                        ) : (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation </button>
            
                        )}  

                    </div>

                ) : (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1>Fill out this form: </h1>  
            
                        <div className = "Adoption_ComponentContainer-Structure--Form">
                            <p>Hello, my name is </p>

                            <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Adoption_ComponentContainer-Template--FormName">
                                <input 
                                    type="text"
                                    value={confirmationPetName}
                                    onChange={(e) => {setConfirmationPetName(e.target.value)}}
                                    placeholder="Name your pet..."
                                />
                            </div>

                            <p> the {selectedPet}!</p>
                            <p>{petPersonality[selectedPet]}</p>
                            <p>Make sure to read the Pet Care Guide!!</p>
                        </div>
                            
                        <div className = "Adoption_ComponentContainer-Structure--FormChecking">
                            <p className = "Adoption_ComponentContainer-Template--FormCheckingError">{errorMessage}</p>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen" onClick = {() => undo()}> Undo Selection </button>
                                <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen" onClick = {(e) => nameChecking(e)}> Confirm Selection </Link>
                            </div>
                        </div>

                    </div>

                )}
        
            </div>

        </>
    
    );

};

export default Adoption;