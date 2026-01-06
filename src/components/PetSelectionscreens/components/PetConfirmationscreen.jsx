import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useFinalPetSelection } from "../providers/FinalPetSelectionProvider.jsx";

import {petImages} from "../../../constants/Constants.js";

import "./PetConfirmationscreen.css";

function PetConfirmationscreen () {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {FinalPetSelection, setFinalPetSelection} = useFinalPetSelection();


    const [petName, setPetName] = useState("");
    const [nameError, setNameError] = useState(false);

    const timeoutRef = useRef(null);




    const showErrorMessage = () => {

        if (petName === ""){

            setNameError("Please enter a name for your new pet.");

        } else if (petName.length > 15){

            setNameError("Please shorten the name to 10 characters or less.");

        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setNameError("");
            timeoutRef.current = null;
        }, 5000);

    }

    
    const closePetOptions = () => {

        const firstOpenSlot = PetList.findIndex(item => item.length === 0);
        const startingTime = Date.now();

        setPetList(prev => {

            const newCopy = [...prev];
            newCopy[firstOpenSlot] = [petName, FinalPetSelection[0], FinalPetSelection[2], 1, FinalPetSelection[1], startingTime, 0];
            return newCopy;

        });
        
        setPetTimeStamps(prev => {

            const newCopy = [...prev];

            if (FinalPetSelection[0] === "dog"){

                newCopy[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [startingTime, startingTime]];

            } else if (FinalPetSelection[0] === "cat"){

                newCopy[firstOpenSlot] = [[startingTime, startingTime], [-1], [startingTime, startingTime]];

            } else if (FinalPetSelection[0] === "fish"){

                newCopy[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [-1]];

            }

            return newCopy;

        });

        setFinalPetSelection([]);

    }


    const deletePet = () => {

        setFinalPetSelection([]);

    }



    return (

        <div className="ScreenContainer">

            <div className="HomePetSelectorPetWindowBorder">
                <div className="HomePetSelectorNameInputContainer">
                    <h2 className="HomePetSelectorNameInputSign"> Name:</h2>
                    <input 
                        className = "HomePetSelectorNameInput"
                        type="text"
                        value={petName}
                        onChange={(e) => {setPetName(e.target.value)}}
                        placeholder="Enter pet name..."
                    />
                </div>
                <div className="HomePetSelectorPetWindow">
                    <img src = {FinalPetSelection.length > 0 ? petImages[FinalPetSelection[0]][FinalPetSelection[2]][0] : "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b" }/>
                </div>
            </div>

            <p className = "HomePetSelectorNameInputError">{nameError}</p>

            <div className="GeneralNavButtonContainer">
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => deletePet()}>Quit</Link>
                <Link to = "/select" className = "GeneralNavButton" onClick = {() => deletePet()}>Reselect Pet</Link>
                <Link to = "/home" className = "GeneralNavButton" onClick = {(e) => {

                                                                            const preventNav = petName === "" || petName.length > 15;
                                                                            if (preventNav) {

                                                                                e.preventDefault();
                                                                                showErrorMessage();

                                                                            } else {

                                                                                closePetOptions();

                                                                            }
                                                                        
                                                                        }}

                                                                    > Confirm Pet </Link>

            </div>
        </div>
        
    );

};

export default PetConfirmationscreen;