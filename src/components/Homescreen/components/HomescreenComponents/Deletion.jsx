import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";

import { portraitPetImages, speciesKey, stageKey } from "../../../../constants/Constants.js";

import "./Deletion.css";



function Deletion({setDeletionOpenClearPetsFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const [deletionSelectedPets, setDeletionSelectedPets] = useState([]);



    const addPet = (PetToAdd) => {

        setDeletionSelectedPets(prev => [...prev, PetToAdd]);

    }


    const removePet = (PetToRemove) => {

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

        setDeletionOpenClearPetsFlag(false);

    }

    return (

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagContent">
                <h1>Select pet(s) to clear:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Object.keys(PetList).map((key) => (

                        <div key = {key} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation MiscellaneousElements_ComponentContainer-Structure--GlobalButtonEncapsulation">

                            {deletionSelectedPets.includes(key) ? (

                                <button key = {key} className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => removePet(key)}> 
                                    <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                </button>

                            ) : (

                                <button key = {key} className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => addPet(key)}> 
                                    <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                </button>

                            )}

                            <h2>{key}</h2>
                        </div>

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow ">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation" onClick={() => setDeletionOpenClearPetsFlag(false)}>Quit</button>

                {deletionSelectedPets.length > 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation" onClick={() => clearPets()}>Clear Selected Pets</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation">Clear Selected Pets</button>

                )}

            </div>

        </div>
        
    );
}
  
export default Deletion;