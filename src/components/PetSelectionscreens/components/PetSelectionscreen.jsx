import { Link } from "react-router-dom";
import {useState} from "react";

import { useFinalPetSelection } from "../providers/FinalPetSelectionProvider.jsx";

import {dogHealthCap, catHealthCap, fishHealthCap} from "../../../constants/Constants.js";

import "./PetSelectionscreen.css";

function PetSelectionscreen () {

    const {finalPetSelection, setFinalPetSelection} = useFinalPetSelection();

    const speciesInfo = [["dog", dogHealthCap], ["cat", catHealthCap], ["fish", fishHealthCap]];

    const [selectedPet, setSelectedPet] = useState(-1);



    const createNewPet = () => {

        setFinalPetSelection(selectedPet);

    }



    return (

        <div className="ScreenContainer ScreenContainer-petselector">
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

            <div className = "GeneralNavButtonContainer">
                <Link to = "/home" className = "GeneralNavButton"> Quit </Link>

                {selectedPet !== -1 ? (

                    <Link to = "/confirm" className = "GeneralNavButton" onClick = {() => createNewPet()}> Reveal New Pet </Link>

                ) : (

                    <button className = "GeneralNavButtonPlaceHolder"> Reveal New Pet </button>

                )}
               
            </div>
        </div>
        
    );

};

export default PetSelectionscreen;