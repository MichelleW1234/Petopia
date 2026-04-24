import { portraitPetImages } from "../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <>
            <h1> Select a new Pet: </h1>

            <div className = "Universal_RowContainer">

                {Object.keys(portraitPetImages).map((key) => (

                    <div className="ReusableComponentContainer_ButtonBorderStructure Screen_ReusableComponentContainer_Color">
                        {key === selectedPet ? (

                            <div key = {key} className = "ReusableComponentButtonCircle_ActiveStructure Screen_ReusableComponentButtonCircle_ActiveColor">
                                <img src = {portraitPetImages[key][0]}/>
                            </div>

                        ) : (

                            <div key = {key} className = "ReusableComponentButtonCircle_Structure Screen_ReusableComponentButtonCircle_Color" onClick = {() => setSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </div>

                        )}
                    </div>

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "ReusableComponentButtonPill_Structure Screen_ReusableComponentButtonPill_Color" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "ReusableComponentButtonPill_PlaceholderStructure Screen_ReusableComponentButtonPill_PlaceholderColor"> Go to Confirmation </button>

            )}  
        </>
        
    );

};

export default Selection;