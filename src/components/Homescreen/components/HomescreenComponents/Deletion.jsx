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
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonstationBackgroundColor">
            <h1 className="header">Select pet(s) to clear:</h1>
            <div className="ReusableComponentContainer_Structure FloatingFlag_ReusableComponentContainer_NonStationColor Deletion_PetOptionContainer">
                {Object.keys(PetList).map((key) => (

                    <div key = {key} className = "Deletion_PetOptionSlot">

                        {deletionSelectedPets.includes(key) ? (

                            <button key = {key} className="ReusableComponentButtonCircle_Structure FloatingFlag_ReusableComponentButtonCircle_NonStationSelectedColor" onClick = {() => removePet(key)}> 
                                <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                            </button>

                        ) : (

                            <button key = {key} className="ReusableComponentButtonCircle_Structure FloatingFlag_ReusableComponentButtonCircle_NonStationColor" onClick = {() => addPet(key)}> 
                                <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                            </button>

                        )}

                        <h2>{key}</h2>
                    </div>

                ))}
            </div>

            <div className="Deletion_ButtonContainer ">

                <button className="ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick={() => setDeletionOpenClearPetsFlag(false)}>Quit</button>

                {deletionSelectedPets.length > 0 ? (

                    <button className="ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick={() => clearPets()}>Clear Selected Pets</button>

                ) : (

                    <button className="ReusableComponentButtonPill_PlaceholderStructure FloatingFlag_ReusableComponentButtonPill_NonStationPlaceholderColor">Clear Selected Pets</button>

                )}

            </div>
        </div>
    )
}
  
export default Deletion;