import { portraitPetImages } from "../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <>
            <h1> Select a new Pet: </h1>

            <div className = "MiscellaneousElements_ComponentContainer-Structure--Row">

                {Object.keys(portraitPetImages).map((key) => (

                    <div className="UIStapleElements_ComponentContainer-Structure--Button UIStapleElements_ComponentContainer-Color--Screens_">
                        {key === selectedPet ? (

                            <div key = {key} className = "UIStapleElements_ComponentButtonCircle-Structure--Active UIStapleElements_ComponentButtonCircle-Color--Screens_Active">
                                <img src = {portraitPetImages[key][0]}/>
                            </div>

                        ) : (

                            <div key = {key} className = "UIStapleElements_ComponentButtonCircle-Structure--Normal UIStapleElements_ComponentButtonCircle-Color--Screens_Normal" onClick = {() => setSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </div>

                        )}
                    </div>

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--Screens_Normal" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "UIStapleElements_ComponentButtonPill-Structure--Unclickable UIStapleElements_ComponentButtonPill-Color--Screens_Unclickable"> Go to Confirmation </button>

            )}  
        </>
        
    );

};

export default Selection;