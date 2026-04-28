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

            <div className="ReusableMultitags_BackgroundScreen-Structure--Screens_ ReusableMultitags_BackgroundScreen-Color--Adoption_">

                <div className="Screens_ComponentContainer-Structure--Navbar">
                    <Link to = "/home" className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarNormal"> Quit and Go Home </Link>
                    <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--Screens_NavbarNormal" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
                </div>

                <div className = "Screens_ComponentContainer-Structure--Components">
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