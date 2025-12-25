import {useState} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider";

import "./PetSelector.css";

function PetSelector ({setPetSelectorFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const speciesInfo = [["dog", 15, 3], ["cat", 20, 3], ["fish", 5, 3]];

    const [selectedPet, setSelectedPet] = useState(-1);


    
    const closePetOptions = () => {

        if (selectedPet !== -1){

            const firstOpenSlot = PetList.findIndex(item => item.length === 0);
            const newPetList = PetList.map(inner => [...inner]);
            const newPetTimeStampsList = PetTimeStamps.map(inner => [...inner]);
            const startingTime = Date.now();

            if (speciesInfo[selectedPet][0] === "dog"){

                newPetList[firstOpenSlot] = [speciesInfo[selectedPet][0], "", 0, speciesInfo[selectedPet][1], startingTime];
                newPetTimeStampsList[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [startingTime, startingTime]];

            } else if (speciesInfo[selectedPet][0] === "cat"){

                newPetList[firstOpenSlot] = [speciesInfo[selectedPet][0], "", 0, speciesInfo[selectedPet][1], startingTime];
                newPetTimeStampsList[firstOpenSlot] = [[startingTime, startingTime], [-1], [startingTime, startingTime]];

            } else if (speciesInfo[selectedPet][0] === "fish"){

                newPetList[firstOpenSlot] = [speciesInfo[selectedPet][0], "", 0, speciesInfo[selectedPet][1], startingTime];
                newPetTimeStampsList[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [-1]];

            }
           
            setPetTimeStamps(newPetTimeStampsList);
            setPetList(newPetList);

        }
       
        setPetSelectorFlag(false);

    }



    return (

        <div className="FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <h2 className="header"> Select a new Pet: </h2>
                <div className = "PetSelectorContainer">
                    {speciesInfo.map((pet, index) => (

                        index === selectedPet ? (

                            <div className = "PetSelectorBoxActive" key = {index}> 
                                <p>Species: {pet[0]}</p>
                                <p>Vitality: {pet[1]}</p>
                                <p>Breeds: {pet[2]}</p>
                            </div>

                        ) : (

                            <button className = "PetSelectorBox" key = {index} onClick = {() => setSelectedPet(index)}> 
                                <p>Species: {pet[0]}</p>
                                <p>Vitality: {pet[1]}</p>
                                <p>Breeds: {pet[2]}</p>
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