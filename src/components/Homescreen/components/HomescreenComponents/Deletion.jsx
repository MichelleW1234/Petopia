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
        <div className = "Global_ReusableMultitag-BackgroundFloatingFlag_Structure Global_ReusableMultitag-BackgroundFloatingFlag_NonStationColor">
            <h1>Select pet(s) to clear:</h1>
            <div className="Global_RowContainer">

                {Object.keys(PetList).map((key) => (

                    <div key = {key} className = "Global_ReusableMultitag-ComponentContainer_ButtonBorderStructure FloatingFlag_ReusableMultitag-ComponentContainer_NonStationColor">

                        {deletionSelectedPets.includes(key) ? (

                            <button key = {key} className="Global_ReusableMultitag-ComponentButtonCircle_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonCircle_NonStationSelectedColor" onClick = {() => removePet(key)}> 
                                <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                            </button>

                        ) : (

                            <button key = {key} className="Global_ReusableMultitag-ComponentButtonCircle_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonCircle_NonStationNormalColor" onClick = {() => addPet(key)}> 
                                <img src = {portraitPetImages[PetList[key][speciesKey]][PetList[key][stageKey]]}/>
                            </button>

                        )}

                        <h2>{key}</h2>
                    </div>

                ))}
                
            </div>

            <div className="Global_RowContainer ">

                <button className="Global_ReusableMultitag-ComponentButtonPill_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationNormalColor" onClick={() => setDeletionOpenClearPetsFlag(false)}>Quit</button>

                {deletionSelectedPets.length > 0 ? (

                    <button className="Global_ReusableMultitag-ComponentButtonPill_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationNormalColor" onClick={() => clearPets()}>Clear Selected Pets</button>

                ) : (

                    <button className="Global_ReusableMultitag-ComponentButtonPill_UnclickableStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationUnclickableColor">Clear Selected Pets</button>

                )}

            </div>
        </div>
    )
}
  
export default Deletion;