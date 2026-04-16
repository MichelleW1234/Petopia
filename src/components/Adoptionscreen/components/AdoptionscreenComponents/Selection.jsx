import { portraitPetImages } from "../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <>
            <h1 className="header"> Select a new Pet: </h1>

            <div className = "conicGradientContainerStructure screenGeneralContainerColor AdoptionSelectionContainer">

                {Object.keys(portraitPetImages).map((key) => (

                    key === selectedPet ? (

                        <div key = {key} className = "radialGradientButtonStructure screenOptionButtonColorActive">
                            <img src = {portraitPetImages[key][0]}/>
                        </div>

                    ) : (

                        <div key = {key} className = "radialGradientButtonStructure screenOptionButtonColor" onClick = {() => setSelectedPet(key)}>
                            <img src = {portraitPetImages[key][0]} />
                        </div>

                    )

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "linearGradientButtonStructure screenGeneralButtonColor" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "linearGradientButtonPlaceholderStructure screenGeneralButtonPlaceholderColor"> Go to Confirmation </button>

            )}         
        </>
        
    );

};

export default Selection;