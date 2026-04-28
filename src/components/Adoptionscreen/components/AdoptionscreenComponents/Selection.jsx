import { portraitPetImages } from "../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <>
            <h1> Select a new Pet: </h1>

            <div className = "ComponentContainer-Structure--Row">

                {Object.keys(portraitPetImages).map((key) => (

                    <div className="ReusableMultitags_ComponentContainer-Structure--Button ReusableMultitags_ComponentContainer-Color--Screens_">
                        {key === selectedPet ? (

                            <div key = {key} className = "ReusableMultitags_ComponentButtonCircle-Structure--Active ReusableMultitags_ComponentButtonCircle-Color--Screens_Active">
                                <img src = {portraitPetImages[key][0]}/>
                            </div>

                        ) : (

                            <div key = {key} className = "ReusableMultitags_ComponentButtonCircle-Structure--Normal ReusableMultitags_ComponentButtonCircle-Color--Screens_Normal" onClick = {() => setSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </div>

                        )}
                    </div>

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--Screens_Normal" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "ReusableMultitags_ComponentButtonPill-Structure--Unclickable ReusableMultitags_ComponentButtonPill-Color--Screens_Unclickable"> Go to Confirmation </button>

            )}  
        </>
        
    );

};

export default Selection;