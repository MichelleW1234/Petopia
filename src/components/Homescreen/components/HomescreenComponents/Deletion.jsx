import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";

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
        <div className = "floatingFlagLayout floatingFlagNonstationBackgroundColor">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">
                    <h2>Select pet(s) to clear:</h2>

                    <div className = "DeletionClearPetsFlagList">
                        {Object.keys(PetList).map((key) => (

                            deletionSelectedPets.includes(key) ? (

                                <button key = {key} className="DeletionClearPetsFlagButtonActive" onClick = {() => removePet(key)}> {key} </button>

                            ) : (

                                <button key = {key} className="DeletionClearPetsFlagButton" onClick = {() => addPet(key)}> {key} </button>

                            )

                        ))}
                    </div>

                </div>
                <button className="FloatingFlagButton" onClick={() => clearPets()}>Done</button>
            </div>
        </div>
    )
}
  
export default Deletion;