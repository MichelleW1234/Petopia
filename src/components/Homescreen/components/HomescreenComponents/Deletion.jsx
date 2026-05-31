import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";

import { buttonPressSoundKey, clearedSoundKey, portraitPetImages, speciesKey, stageKey } from "../../../../constants/Constants.js";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import "./Deletion.css";
import { flagCloser, playSound, screenFlagCloser } from "../../../../helpers/helpers.js";



function Deletion({deletionOpenClearPetsFlag, setDeletionOpenClearPetsFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const [deletionSelectedPets, setDeletionSelectedPets] = useState([]);


    useKeyboardShortcut("Enter", () => {
        
        if (deletionOpenClearPetsFlag && deletionSelectedPets.length > 0){

            clearPets();

        }

    },
        ".ClearSelectedPets"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (deletionOpenClearPetsFlag){

            screenFlagCloser(setDeletionOpenClearPetsFlag);

        }

    },
        ".Quit"
    );
    




    const addPet = (PetToAdd) => {

        playSound(buttonPressSoundKey);
        setDeletionSelectedPets(prev => [...prev, PetToAdd]);

    }


    const removePet = (PetToRemove) => {

        playSound(buttonPressSoundKey);
        setDeletionSelectedPets(prev => prev.filter(pet => pet !== PetToRemove));
        
    }


    const clearPets = () => {

        setPetTimeStamps(prev => {

            let updatedList = { ...prev };

            deletionSelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...rest } = updatedList;
                updatedList = rest;
            });

            return updatedList;

        });

        setPetList(prev => {

            let updatedList = { ...prev };

            deletionSelectedPets.forEach(petToRemove => {
                const { [petToRemove]: _, ...rest } = updatedList;
                updatedList = rest;
            });

            return updatedList;

        });

        playSound(clearedSoundKey);
        screenFlagCloser(setDeletionOpenClearPetsFlag);

    }


    const quit = () => {

        screenFlagCloser(setDeletionOpenClearPetsFlag);

    }

    

    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1>Select pet(s) to clear:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Object.keys(PetList).map((key) => (

                        <div key = {key} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionButtonSlot">

                            {deletionSelectedPets.includes(key) ? (

                                <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => removePet(key)}> 
                                    <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                </button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => addPet(key)}> 
                                    <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                </button>

                            )}

                            <h2>{key}</h2>
                        </div>

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow ">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Quit" onClick={() => quit()}>Quit <br/> [esc]</button>

                {deletionSelectedPets.length > 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation ClearSelectedPets" onClick={() => clearPets()}>Clear Selected Pets <br/> [return]</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation">Clear Selected Pets <br/> [return]</button>

                )}

            </div>

        </div>
        
    );
}
  
export default Deletion;