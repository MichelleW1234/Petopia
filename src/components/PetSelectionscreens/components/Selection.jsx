import { Link } from "react-router-dom";
import {useState} from "react";

import { useFinalPetSelection } from "../providers/FinalPetSelectionProvider.jsx";

import {catSpecies, dogSpecies, fishSpecies, healthCapList} from "../../../constants/Constants.js";

import "./Selection.css";



function Selection () {

    const {finalPetSelection, setFinalPetSelection} = useFinalPetSelection();

    const selectionSpeciesList = [dogSpecies, catSpecies, fishSpecies];

    const [selectionSelectedPet, setSelectionSelectedPet] = useState(-1);



    const createNewPet = () => {

        setFinalPetSelection(selectionSelectedPet);

    }



    return (

        <div className="ScreenContainer ScreenContainer-petselector">
            <h2 className="header"> Select a new Pet: </h2>

            <div className = "HomePetSelectorContainer">
                {selectionSpeciesList.map((species, index) => (

                    index === selectionSelectedPet ? (

                        <div className = "HomePetSelectorBoxActive" key = {index}> 
                            <p>Species: {species}</p>
                            <p>Vitality: {healthCapList[species]}</p>
                        </div>

                    ) : (

                        <button className = "HomePetSelectorBox" key = {index} onClick = {() => setSelectionSelectedPet(index)}> 
                            <p>Species: {species}</p>
                            <p>Vitality: {healthCapList[species]}</p>
                        </button>

                    )
                ))}
            </div>

            <div className = "GeneralNavButtonContainer">
                <Link to = "/home" className = "GeneralNavButton"> Quit </Link>

                {selectionSelectedPet !== -1 ? (

                    <Link to = "/confirm" className = "GeneralNavButton" onClick = {() => createNewPet()}> Reveal New Pet </Link>

                ) : (

                    <button className = "GeneralNavButtonPlaceHolder"> Reveal New Pet </button>

                )}
               
            </div>
        </div>
        
    );

};

export default Selection;