import {useState} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";

import "./PetSelector.css";

function PetSelector ({setPetSelectorFlag}) {

    const {PetList, setPetList} = usePetList();

    const petSpecies = ["Dog", "Cat", "Fish"];
    const [selectedPet, setSelectedPet] = useState(-1);

    const closePetOptions = () => {

        if (selectedPet !== -1){

            const firstOpenSlot = PetList.findIndex(item => item.length === 0);
            const newPetList = [...PetList];

            if (selectedPet === 0){

                newPetList[firstOpenSlot] = ["woof"];
                    
            } else if (selectedPet === 1){

                newPetList[firstOpenSlot] = ["meow"];

            } else if (selectedPet === 2){

                newPetList[firstOpenSlot] = ["glub"];

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
                                <img src = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
                                <p>Species: {pet}</p>
                            </div>

                        ) : (

                            <button className = "PetSelectorBox" key = {index} onClick = {() => setSelectedPet(index)}> 
                                <img src = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
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