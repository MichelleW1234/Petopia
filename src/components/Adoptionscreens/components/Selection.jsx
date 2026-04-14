import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import PetGuide from "./AdoptionscreensComponents/PetGuide.jsx";

import { useSelectedPet } from "../providers/SelectedPetProvider.jsx";

import { portraitPetImages } from "../../../constants/Constants.js";

import "./Selection.css";



function Adoption () {

    const {SelectedPet, setSelectedPet} = useSelectedPet();

    const [petGuideOpenFlag, setPetGuideOpenFlag] = useState(false);
    const [selectionSelectedPet, setSelectionSelectedPet] = useState("");
    


    return (

        <>

            {petGuideOpenFlag &&
                <PetGuide
                    setPetGuideOpenFlag = {setPetGuideOpenFlag}
                />
            }

            <div className="navbarContainer">
                <Link to = "/home" className = "linearGradientButtonStructure navbarButtonColor"> Quit and Go Home </Link>
                <button className = "linearGradientButtonStructure navbarButtonColor" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
            </div>
            <div className="screenLayout">

                <h1 className="header"> Select a new Pet: </h1>

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
            
                {selectionSelectedPet !== "" ? (

                    <Link to = "/confirm" className = "linearGradientButtonStructure screenGeneralButtonColor" onClick = {() => setSelectedPet(selectionSelectedPet)}> Go to Confirmation </Link>

                ) : (

                    <button className = "linearGradientButtonPlaceholderStructure screenGeneralButtonPlaceholderColor"> Go to Confirmation </button>

                )}
                        
            </div>
        </>
        
    );

};

export default Adoption;