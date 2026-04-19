import { Link } from "react-router-dom";
import {useState} from "react";

import PetGuide from "./AdoptionscreenComponents/PetGuide.jsx";
import Selection from "./AdoptionscreenComponents/Selection.jsx";
import Confirmation from "./AdoptionscreenComponents/Confirmation.jsx";

import "./Adoption.css";



function Adoption () {

    const [petGuideOpenFlag, setPetGuideOpenFlag] = useState(false);
    const [selectedPet, setSelectedPet] = useState("");
    const [step, setStep] = useState(0);

    return (

        <>

            {petGuideOpenFlag &&
                <PetGuide
                    setPetGuideOpenFlag = {setPetGuideOpenFlag}
                />
            }

            <div className="BackgroundScreen_Layout Adoption_BackgroundScreen_Color">

                <div className="Navbar_Container">
                    <Link to = "/home" className = "ReusableComponentButtonPill_Structure Navbar_ReusableComponentButtonPill_Color"> Quit and Go Home </Link>
                    <button className = "ReusableComponentButtonPill_Structure Navbar_ReusableComponentButtonPill_Color" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
                </div>

                <div className = "Screen_ComponentsContainer">
                    {step === 0 ? (

                        <Selection
                            selectedPet = {selectedPet}
                            setSelectedPet = {setSelectedPet}
                            setStep = {setStep}
                        />

                    ) : (

                        <Confirmation
                            selectedPet = {selectedPet}
                            setSelectedPet = {setSelectedPet}
                            setStep = {setStep}
                        />

                    )}
                </div>
        
            </div>

        </>
    
    );

};

export default Adoption;