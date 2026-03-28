import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";

import "./HomescreenClearPetsFlag.css";

function HomescreenClearPetsFlag({setOpenClearPetsFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const [selectedPetsList, setSelectedPetsList] = useState([]);



    const addPet = (PetToAdd) => {

        setSelectedPetsList(prev => [...prev, PetToAdd]);

    }


    const removePet = (PetToRemove) => {

        setSelectedPetsList(prev => prev.filter(pet => pet !== PetToRemove));
        
    }


    const clearPets = () => {

        setPetTimeStamps(prev => {

            let updatedList = { ...prev };

            selectedPetsList.forEach(petToRemove => {
                const { [petToRemove]: _, ...rest } = updatedList;
                updatedList = rest;
            });

            return updatedList;

        });

        setPetList(prev => {

            let updatedList = { ...prev };

            selectedPetsList.forEach(petToRemove => {
                const { [petToRemove]: _, ...rest } = updatedList;
                updatedList = rest;
            });

            return updatedList;

        });

        setOpenClearPetsFlag(false);

    }

    return (
        <div className = "FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">
                    <h2>Select pet(s) to clear:</h2>

                    <div className = "HomeScreenClearPetsFlagList">
                        {Object.keys(PetList).map((key) => (

                            selectedPetsList.includes(key) ? (

                                <button key = {key} className="HomeScreenClearPetsFlagButtonActive" onClick = {() => removePet(key)}> {key} </button>

                            ) : (

                                <button key = {key} className="HomeScreenClearPetsFlagButton" onClick = {() => addPet(key)}> {key} </button>

                            )

                        ))}
                    </div>

                </div>
                <button className="FloatingFlagButton" onClick={() => clearPets()}>Done</button>
            </div>
        </div>
    )
}
  
export default HomescreenClearPetsFlag;