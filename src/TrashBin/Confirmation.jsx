/*
import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import { useGlobalTimer } from "../providers/GlobalTimerProvider.jsx";
import {usePetList} from "../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../providers/PetTimeStampsProvider.jsx";
import { useFinalPetSelection } from "../components/PetSelectionscreens/providers/FinalPetSelectionProvider.jsx";

import { portraitPetImages } from "../constants/Constants.js";
import { cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey } from "../constants/Constants.js";

import "./Confirmation.css";



function Confirmation () {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {FinalPetSelection, setFinalPetSelection} = useFinalPetSelection();
    
    const confirmationDefaultMessage = "You are about to adopt this pet:";

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

        if (FinalPetSelection === 0){

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

        } else if (FinalPetSelection === 1){

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

        } else if (FinalPetSelection === 2){

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

        setFinalPetSelection(-1);

    }


    const deletePet = () => {

        setFinalPetSelection(-1);

    }



    return (

        <div className="ScreenContainer">

            <div className="PetWindowBorder PetWindowBorder-newpet">
                <h2 className="PetWindowSign PetWindowSign-newpet">{confirmationInfo}</h2>
                <div className="HomePetSelectorPetWindow">

                    <img src = { FinalPetSelection === 0 ? portraitPetImages[dogSpecies][0]
                        : FinalPetSelection !== 1 ? portraitPetImages[catSpecies][0]
                        : FinalPetSelection !== 2 ? portraitPetImages[fishSpecies][0]
                        : "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b" }
                    />
                </div>
                <div className="HomePetSelectorNameInputContainer">
                    <h2 className="header"> Pet Name:</h2>
                    <input 
                        className = "HomePetSelectorNameInput"
                        type="text"
                        value={confirmationPetName}
                        onChange={(e) => {setConfirmationPetName(e.target.value)}}
                        placeholder="Enter a name..."
                    />
                </div>
            </div>

            <div className="GeneralNavButtonContainer">
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => deletePet()}>Quit</Link>
                <Link to = "/select" className = "GeneralNavButton" onClick = {() => deletePet()}>Reselect Pet</Link>
                <Link to = "/home" className = "GeneralNavButton" onClick = {(e) => nameChecking(e)}> Adopt </Link>

            </div>
        </div>
        
    );

};

export default Confirmation;

*/