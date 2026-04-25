import { portraitPetImages } from "../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <>
            <h1> Select a new Pet: </h1>

            <div className = "Global_RowContainer">

                {Object.keys(portraitPetImages).map((key) => (

                    <div className="Global_ReusableMultitag-ComponentContainer_ButtonBorderStructure Screen_ReusableMultitag-ComponentContainer_Color">
                        {key === selectedPet ? (

                            <div key = {key} className = "Global_ReusableMultitag-ComponentButtonCircle_ActiveStructure Screen_ReusableMultitag-ComponentButtonCircle_ActiveColor">
                                <img src = {portraitPetImages[key][0]}/>
                            </div>

                        ) : (

                            <div key = {key} className = "Global_ReusableMultitag-ComponentButtonCircle_NormalStructure Screen_ReusableMultitag-ComponentButtonCircle_NormalColor" onClick = {() => setSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </div>

                        )}
                    </div>

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "Global_ReusableMultitag-ComponentButtonPill_NormalStructure Screen_ReusableMultitag-ComponentButtonPill_NormalColor" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "Global_ReusableMultitag-ComponentButtonPill_UnclickableStructure Screen_ReusableMultitag-ComponentButtonPill_UnclickableColor"> Go to Confirmation </button>

            )}  
        </>
        
    );

};

export default Selection;