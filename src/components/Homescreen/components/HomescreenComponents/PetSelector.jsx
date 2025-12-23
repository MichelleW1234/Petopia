import {useState} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";

import "./PetSelector.css";

function PetSelector ({setPetSelectorFlag}) {

    const {PetList, setPetList} = usePetList();

    const speciesInfo = [["dog", 15, 3, [false, false, false]], ["cat", 20, 3, [false, false, false]], ["fish", 5, 3, [false, false]]];

    const [selectedPet, setSelectedPet] = useState(-1);


    
    const closePetOptions = () => {

        if (selectedPet !== -1){

            const firstOpenSlot = PetList.findIndex(item => item.length === 0);
            const newPetList = [...PetList];
            newPetList[firstOpenSlot] = [[speciesInfo[selectedPet][0], ""], [0, speciesInfo[selectedPet][1]], speciesInfo[selectedPet][3]];
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

                            <div>
                                <div className = "PetSelectorBoxActive" key = {index}> 
                                    <p>Species: {pet[0]}</p>
                                    <p>Vitality: {pet[1]}</p>
                                    <p>Breeds: {pet[2]}</p>
                                </div>
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