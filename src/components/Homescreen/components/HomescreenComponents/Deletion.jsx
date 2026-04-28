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

        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlagNonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagContent">
                <h1>Select pet(s) to clear:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--Row">

                    {Object.keys(PetList).map((key) => (

                        <div key = {key} className = "UIStapleElements_ComponentContainer-Structure--Button UIStapleElements_ComponentContainer-Color--FloatingFlagNonstation">

                            {deletionSelectedPets.includes(key) ? (

                                <button key = {key} className="UIStapleElements_ComponentButtonCircle-Structure--Normal UIStapleElements_ComponentButtonCircle-Color--FloatingFlagNonstationSelected" onClick = {() => removePet(key)}> 
                                    <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                </button>

                            ) : (

                                <button key = {key} className="UIStapleElements_ComponentButtonCircle-Structure--Normal UIStapleElements_ComponentButtonCircle-Color--FloatingFlagNonstationNormal" onClick = {() => addPet(key)}> 
                                    <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                                </button>

                            )}

                            <h2>{key}</h2>
                        </div>

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--Row ">

                <button className="UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlagNonstationNormal" onClick={() => setDeletionOpenClearPetsFlag(false)}>Quit</button>

                {deletionSelectedPets.length > 0 ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlagNonstationNormal" onClick={() => clearPets()}>Clear Selected Pets</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--Unclickable UIStapleElements_ComponentButtonPill-Color--FloatingFlagNonstationUnclickable">Clear Selected Pets</button>

                )}

            </div>

        </div>
        
    );
}
  
export default Deletion;