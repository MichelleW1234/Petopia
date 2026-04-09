import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import PetGuide from "./PetSelectionscreenComponents/PetGuide.jsx";

import { portraitPetImages } from "../../../constants/Constants.js";
import { cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./PetSelection.css";



function PetSelection () {

    const confirmationDefaultMessage = "You are about to adopt this pet:";
    
    const [petGuideOpenFlag, setPetGuideOpenFlag] = useState(false);
    const [selectionSelectedPet, setSelectionSelectedPet] = useState("");
    const [confirmationPetName, setConfirmationPetName] = useState("");
    const [confirmationInfo, setConfirmationInfo] = useState(confirmationDefaultMessage);


    const confirmationTimeoutRef = useRef(null);




    const nameChecking = (e) => {

        const trimmedPetName = confirmationPetName.trim();
        setConfirmationPetName(trimmedPetName);
            
        if (trimmedPetName === "") {

            e.preventDefault();
            showErrorMessage("Enter a name for your new pet.");

        } else if (trimmedPetName.length > 15){

            e.preventDefault();
            showErrorMessage("Shorten the name to 15 characters max.");

        } else if (trimmedPetName in PetList && trimmedPetName in PetTimeStamps) {

            e.preventDefault();
            showErrorMessage("This pet name already exists.");

        } else {

            adoptPet(trimmedPetName);

        }

    }


    const showErrorMessage = (message) => {

        setConfirmationInfo(message);

        if (confirmationTimeoutRef.current) {
            clearTimeout(confirmationTimeoutRef.current);
        }

        confirmationTimeoutRef.current = setTimeout(() => {
            setConfirmationInfo(confirmationDefaultMessage);
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

            <div className="NavBarContainer">
                <Link to = "/home" className = "NavBarButton"> Quit </Link>
                <button className = "NavBarButton" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
            </div>
            <div className="ScreenContainer">

                <h2 className="header"> Select a new Pet: </h2>

                <div className = "SelectionContainer">

                    {Object.keys(portraitPetImages).map((key) => (

                        key === selectionSelectedPet ? (

                            <div key = {key} className = "HomePetSelectorBoxActive">
                                <img src = {portraitPetImages[key][0]}/>
                            </div>
    
                        ) : (

                            <div key = {key} className = "HomePetSelectorBox" onClick = {() => setSelectionSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </div>

                        )

                    ))}

                </div>

                <div className = "NameContainer">
                    <div className="HomePetSelectorNameInputContainer">
                        <input 
                            className = "HomePetSelectorNameInput"
                            type="text"
                            value={confirmationPetName}
                            onChange={(e) => {setConfirmationPetName(e.target.value)}}
                            placeholder="Hello, my name is..."
                        />
                    </div>

                    {selectionSelectedPet !== "" ? (

                        <Link to = "/home" className = "GeneralNavButton" onClick = {(e) => nameChecking(e)}> Adopt </Link>

                    ) : (

                        <button className = "GeneralNavButtonPlaceHolder"> Adopt </button>

                    )}
                </div>

            </div>
        </>
        
    );

};

export default PetSelection;