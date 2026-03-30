import { Link } from "react-router-dom";
import {useState} from "react";

import { useFinalPetSelection } from "../providers/FinalPetSelectionProvider.jsx";

import {catSpecies, dogSpecies, fishSpecies, healthCapList} from "../../../constants/Constants.js";

import "./Selection.css";



function Selection () {

    const {finalPetSelection, setFinalPetSelection} = useFinalPetSelection();

    const speciesList = [dogSpecies, catSpecies, fishSpecies];

    const [selectedPet, setSelectedPet] = useState(-1);



    const createNewPet = () => {

        setFinalPetSelection(selectedPet);

    }



    return (

        <div className="ScreenContainer ScreenContainer-petselector">
            <h2 className="header"> Select a new Pet: </h2>

            <div className = "HomePetSelectorContainer">
                {speciesList.map((species, index) => (

                    index === selectedPet ? (

                        <div className = "HomePetSelectorBoxActive" key = {index}> 
                            <p>Species: {species}</p>
                            <p>Vitality: {healthCapList[species]}</p>
                        </div>

                    ) : (

                        <button className = "HomePetSelectorBox" key = {index} onClick = {() => setSelectedPet(index)}> 
                            <p>Species: {species}</p>
                            <p>Vitality: {healthCapList[species]}</p>
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

export default Selection;