import {useState} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";

import "./PetSelector.css";

function PetSelector ({setPetSelectorFlag}) {

    const {PetList, setPetList} = usePetList();

    const petSpecies = ["dog", "cat", "fish"];
    const [selectedPet, setSelectedPet] = useState(-1);

    const closePetOptions = () => {

        if (selectedPet !== -1){

            const firstOpenSlot = PetList.findIndex(item => item.length === 0);
            const newPetList = [...PetList];

            if (selectedPet === 0){

                newPetList[firstOpenSlot] = ["dog", 0, 15, false, false, false];

            } else if (selectedPet === 1){

                newPetList[firstOpenSlot] = ["cat", 0, 20, false, false, false];

            } else if (selectedPet === 2){

                newPetList[firstOpenSlot] = ["fish", 0, 5, false, false];

            }

            setPetList(newPetList);

        }
       
        setPetSelectorFlag(false);

    }

    return (
        <div className="FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <h2 className="header"> Select a new Pet: </h2>
                <div className = "PetSelectorContainer">
                    {petSpecies.map((pet, index) => (

                        index === selectedPet ? (

                            <div className = "PetSelectorBoxActive" key = {index}> 
                                <img/>
                                <p>Species: {pet}</p>
                            </div>

                        ) : (

                            <button className = "PetSelectorBox" key = {index} onClick = {() => setSelectedPet(index)}> 
                                <img/>
                                <p>Species: {pet}</p>
                            </button>

                        )
                    ))}
                </div>
                <button className = "FloatingFlagButton" onClick = {() => closePetOptions()}> Done </button>
            </div>
        </div>
    );

};

export default PetSelector;