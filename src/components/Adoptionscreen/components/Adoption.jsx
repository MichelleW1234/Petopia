import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import PetGuide from "./AdoptionscreenComponents/PetGuide.jsx";

import {useGlobalTimer} from "../../../providers/GlobalTimerProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import { portraitPetImages } from "../../../constants/Constants.js";
import { cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Adoption.css";



function Adoption () {

    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const [errorMessage, setErrorMessage] = useState("");
    const [petGuideOpenFlag, setPetGuideOpenFlag] = useState(false);
    const [selectionSelectedPet, setSelectionSelectedPet] = useState("");
    const [confirmationPetName, setConfirmationPetName] = useState("");

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

        if (selectionSelectedPet === dogSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: dogSpecies, 
                        [stageKey]: 1,
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

        } else if (selectionSelectedPet === catSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: catSpecies, 
                        [stageKey]: 1,
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

        } else if (selectionSelectedPet === fishSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: fishSpecies, 
                        [stageKey]: 1,
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


    


    return (

        <>

            {petGuideOpenFlag &&
                <PetGuide
                    setPetGuideOpenFlag = {setPetGuideOpenFlag}
                />
            }

            <div className="navbarContainer">
                <Link to = "/home" className = "linearGradientButtonStructure navbarButtonColor"> Quit </Link>
                <button className = "linearGradientButtonStructure navbarButtonColor" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
            </div>
            <div className="screenLayout">

                <h1 className="header"> Select a new Pet: </h1>

                <div className = "AdoptionOuterContainer">

                    <div className = "screenGeneralContainerTemplate AdoptionSelectionContainer">

                        {Object.keys(portraitPetImages).map((key) => (

                            key === selectionSelectedPet ? (

                                <div key = {key} className = "radialGradientButtonStructure screenOptionButtonColorActive">
                                    <img src = {portraitPetImages[key][0]}/>
                                </div>
        
                            ) : (

                                <div key = {key} className = "radialGradientButtonStructure screenOptionButtonColor" onClick = {() => setSelectionSelectedPet(key)}>
                                    <img src = {portraitPetImages[key][0]} />
                                </div>

                            )

                        ))}

                    </div>
                
                    <p className = "AdoptionNameError">{errorMessage}</p>

                    <div className = "AdoptionNameContainer">

                        <div className="screenGeneralContainerTemplate AdoptionNameInputBox">
                            <input 
                                type="text"
                                value={confirmationPetName}
                                onChange={(e) => {setConfirmationPetName(e.target.value)}}
                                placeholder="Hello, my name is..."
                            />
                        </div>

                        {selectionSelectedPet !== "" ? (

                            <Link to = "/home" className = "linearGradientButtonStructure screenGeneralButtonColor" onClick = {(e) => nameChecking(e)}> Adopt New Pet </Link>

                        ) : (

                            <button className = "linearGradientButtonPlaceholderStructure screenGeneralButtonPlaceholderColor"> Adopt New Pet </button>

                        )}
                        
                    </div>

                </div>
                        
            </div>
        </>
        
    );

};

export default Adoption;