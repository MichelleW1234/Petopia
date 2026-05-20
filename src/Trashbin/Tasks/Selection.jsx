import { portraitPetImages } from "../../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <div className = "Selection_ComponentContainer-Structure">
            <h1> Select a new Pet: </h1>

            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                {Object.keys(portraitPetImages).map((key) => (

                    <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionButtonSlot">
                        {key === selectedPet ? (

                            <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => setSelectedPet("")}>
                                <img src = {portraitPetImages[key][0]}/>
                            </button>

                        ) : (

                            <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => setSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </button>

                        )}
                    </div>

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation </button>

            )}  
        </div>
        
    );

};

export default Selection;