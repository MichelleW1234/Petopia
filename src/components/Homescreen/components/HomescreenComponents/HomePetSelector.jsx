import {useState} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";

import {dogHealthCap, catHealthCap, fishHealthCap} from "../../../../constants/Constants.js";

import "./HomePetSelector.css";

function HomePetSelector ({setPetSelectorFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    const speciesInfo = [["dog", dogHealthCap, 3], ["cat", catHealthCap, 3], ["fish", fishHealthCap, 3]];

    const [selectedPet, setSelectedPet] = useState(-1);


    
    const closePetOptions = () => {

        if (selectedPet !== -1){

            const firstOpenSlot = PetList.findIndex(item => item.length === 0);
            const startingTime = Date.now();

            setPetList(prev => {

                const newCopy = prev.map(inner => [...inner]);

                newCopy[firstOpenSlot] = [speciesInfo[selectedPet][0], "", 1, speciesInfo[selectedPet][1], startingTime, 0];
                                
                return newCopy;

            });
           
            setPetTimeStamps(prev => {

                const newCopy = prev.map(pet =>
                    pet.map(group =>
                        [...group]
                    )
                );

                if (selectedPet === 0){

                    newCopy[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [startingTime, startingTime]];

                } else if (selectedPet === 1){

                    newCopy[firstOpenSlot] = [[startingTime, startingTime], [-1], [startingTime, startingTime]];

                } else if (selectedPet === 2){

                    newCopy[firstOpenSlot] = [[startingTime, startingTime], [startingTime, startingTime], [-1]];

                }

                return newCopy;

            })

        }
       
        setPetSelectorFlag(false);

    }



    return (

        <div className="FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <h2 className="header"> Select a new Pet: </h2>
                <div className = "HomePetSelectorContainer">
                    {speciesInfo.map((pet, index) => (

                        index === selectedPet ? (

                            <div className = "HomePetSelectorBoxActive" key = {index}> 
                                <p>Species: {pet[0]}</p>
                                <p>Vitality: {pet[1]}</p>
                                <p>Breeds: {pet[2]}</p>
                            </div>

                        ) : (

                            <button className = "HomePetSelectorBox" key = {index} onClick = {() => setSelectedPet(index)}> 
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

export default HomePetSelector;