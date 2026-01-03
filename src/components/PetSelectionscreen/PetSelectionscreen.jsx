import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import {usePetList} from "../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../providers/PetTimeStampsProvider.jsx";

import {dogHealthCap, catHealthCap, fishHealthCap, petImages} from "../../constants/Constants.js";

import "./PetSelectionscreen.css";

function PetSelectionscreen () {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const speciesInfo = [["dog", dogHealthCap], ["cat", catHealthCap], ["fish", fishHealthCap]];

    const [selectedPet, setSelectedPet] = useState(-1);
    const [petName, setPetName] = useState("");
    const [nameError, setNameError] = useState(false);

    const timeoutRef = useRef(null);


    const showErrorMessage = (message) => {

        setNameError(message);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setNameError("");
            timeoutRef.current = null;
        }, 5000);

    }

    
    const closePetOptions = () => {

        if (selectedPet === -1){

            showErrorMessage("Please select a new pet.");

        } else if (petName === ""){

            showErrorMessage("Please enter a name for your new pet.");

        } else if (petName.length > 10){

            showErrorMessage("Please shorten the name to 10 characters or less.");

        } else {

            const firstOpenSlot = PetList.findIndex(item => item.length === 0);
            const startingTime = Date.now();

            setPetList(prev => {

                const newCopy = [...prev];
                newCopy[firstOpenSlot] = [petName, speciesInfo[selectedPet][0], petImages[speciesInfo[selectedPet][0]][0], 1, speciesInfo[selectedPet][1], startingTime, 0];
                return newCopy;

            });
            
            setPetTimeStamps(prev => {

                const newCopy = [...prev];

                if (selectedPet === 0){

                    newCopy[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [startingTime, startingTime]];

                } else if (selectedPet === 1){

                    newCopy[firstOpenSlot] = [[startingTime, startingTime], [-1], [startingTime, startingTime]];

                } else if (selectedPet === 2){

                    newCopy[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [-1]];

                }

                return newCopy;

            })

        }

    }



    return (

        <div className="ScreenContainer">
            <h2 className="header"> Select a new Pet: </h2>
            <div className = "HomePetSelectorContainer">
                {speciesInfo.map((pet, index) => (

                    index === selectedPet ? (

                        <div className = "HomePetSelectorBoxActive" key = {index}> 
                            <p>Species: {pet[0]}</p>
                            <p>Vitality: {pet[1]}</p>
                        </div>

                    ) : (

                        <button className = "HomePetSelectorBox" key = {index} onClick = {() => setSelectedPet(index)}> 
                            <p>Species: {pet[0]}</p>
                            <p>Vitality: {pet[1]}</p>
                        </button>

                    )
                ))}
            </div>

            <div className="filler"></div>

            <input 
                className = "HomePetSelectorNameInput"
                type="text"
                value={petName}
                onChange={e => setPetName(e.target.value)}
                placeholder="Enter a pet name here..."
            />

            <p className = "HomePetSelectorNameInputError">{nameError}</p>

            <Link to = "/home" className = "FloatingFlagButton" onClick = {() => closePetOptions()}> Done </Link>
        </div>
        
    );

};

export default PetSelectionscreen;