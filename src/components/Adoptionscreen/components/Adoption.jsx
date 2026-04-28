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

            <div className="UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Color--ScreenNonstation">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal"> Quit and Go Home </Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--ScreenNavbarNormal" onClick = {() => setPetGuideOpenFlag(true)}> Open Pet Guide </button>
                </div>

                <div className = "MiscellaneousElements_ComponentContainer-Structure--ScreenContent">
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