import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useSelectedPet } from "../providers/SelectedPetProvider.jsx";

import { cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Confirmation.css";



function Confirmation() {

    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {SelectedPet, setSelectedPet} = useSelectedPet();

    const [errorMessage, setErrorMessage] = useState("");
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

        if (SelectedPet === dogSpecies){

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

        } else if (SelectedPet === catSpecies){

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

        } else if (SelectedPet === fishSpecies){

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
            <div className = "navbarContainer">
                <Link to = "/home" className = "linearGradientButtonStructure navbarButtonColor" onClick = {() => setSelectedPet("")}> Quit and Go Home </Link>
            </div>
            <div className = "screenLayout">
                <h1 className="header">Fill out this form and then confirm: </h1>  
                <div className = "ConfirmationContainer">
                    <p>Hello, my name is: </p>

                    <div className="screenGeneralContainerTemplate AdoptionNameInputBox">
                        <input 
                            type="text"
                            value={confirmationPetName}
                            onChange={(e) => {setConfirmationPetName(e.target.value)}}
                            placeholder="Name your pet..."
                        />
                    </div>

                    <p>I am a {SelectedPet}.</p>

                    <p>I require: </p>

                    <p>Thank you for adopting me!</p>

                    <p className = "AdoptionNameError">{errorMessage}</p>
                    
                    <div className = "ConfirmationButtonContainer">
                        <Link to = "/select" className = "linearGradientButtonStructure screenGeneralButtonColor" onClick = {() => setSelectedPet("")}> Undo Selection </Link>
                        <button className = "linearGradientButtonStructure screenGeneralButtonColor" onClick = {(e) => nameChecking(e)}> Confirm Selection </button>
                    </div>

                </div>
            </div>
        </>
    )
}
  
export default Confirmation;