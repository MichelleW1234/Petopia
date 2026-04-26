import { portraitPetImages } from "../../../../constants/Constants.js";

import "./Selection.css";



function Selection ({selectedPet, setSelectedPet, setStep}) {

    return (

        <>
            <h1> Select a new Pet: </h1>

            <div className = "Global_RowContainer">

                {Object.keys(portraitPetImages).map((key) => (

                    <div className="Global_ReusableMultitag_ComponentContainer-ButtonBorderStructure Screen_ReusableMultitag_ComponentContainer-Color">
                        {key === selectedPet ? (

                            <div key = {key} className = "Global_ReusableMultitag_ComponentButtonCircle-ActiveStructure Screen_ReusableMultitag_ComponentButtonCircle-ActiveColor">
                                <img src = {portraitPetImages[key][0]}/>
                            </div>

                        ) : (

                            <div key = {key} className = "Global_ReusableMultitag_ComponentButtonCircle-NormalStructure Screen_ReusableMultitag_ComponentButtonCircle-NormalColor" onClick = {() => setSelectedPet(key)}>
                                <img src = {portraitPetImages[key][0]} />
                            </div>

                        )}
                    </div>

                ))}

            </div>
        
            {selectedPet !== "" ? (

                <button className = "Global_ReusableMultitag_ComponentButtonPill-NormalStructure Screen_ReusableMultitag_ComponentButtonPill-NormalColor" onClick = {() => setStep(1)}> Go to Confirmation </button>

            ) : (

                <button className = "Global_ReusableMultitag_ComponentButtonPill-UnclickableStructure Screen_ReusableMultitag_ComponentButtonPill-UnclickableColor"> Go to Confirmation </button>

            )}  
        </>
        
    );

};

export default Selection;