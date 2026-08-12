import{useState} from "react";

import { usePetList } from "../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import { flagCloser, playSound } from "../../../helpers/Helpers.js";
import { catSpecies, dogSpecies, fishSpecies, portraitPetImages, speciesKey, stageKey } from "../../../constants/Constants.js";

import "./Inventory.css";


function Inventory({setInventoryOpenFlag}) {

    const {PetList, setPetList} = usePetList();

    const inventoryItems = ["a", "b", "c", "d", "e"];
    const inventoryPets = [[catSpecies, dogSpecies], [catSpecies, dogSpecies, fishSpecies], [catSpecies, dogSpecies], [catSpecies, dogSpecies], [catSpecies, dogSpecies, fishSpecies]];
    const inventoryPetSelected = ["chester", null, null, null, null];



    useKeyboardShortcut("i", () => {
    
        flagCloser(setInventoryOpenFlag);

    },
        ".Close"
    );


    
    const selectPet = (item, petName) => {



    }

    const deselectPet = (item, petName) => {



    }


    

    return (

        <div className="UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1> Distribute items to your pets:</h1>
                
                {inventoryItems.map((item, index) => (
                    
                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Inventory_ComponentContainer-Structure--Item">

                        <div className="Inventory_ComponentContainer-Structure--ItemDescription">
                            <h2>{item}</h2>
                            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzOsXAGnBHRlP3m5OClYHGLxQHkqyJQGVI3Vxk3d6aA&s"/>
                        </div>

                        <div className="Inventory_ComponentContainer-Structure--ItemDescription">
                            <h2>Give to: </h2>

                            <div className="Inventory_ComponentContainer-Structure--ItemPetButtons">

                                {Object.entries(PetList).map(([key, value]) => (

                                    inventoryPets[index].includes(PetList[key][speciesKey]) ? (

                                        inventoryPetSelected[index] === key ? (

                                            <button key = {key} className="Inventory_ComponentButton-Template--ItemPetButtonSelected" onClick = {() => deselectPet(index, key)}> {key} </button>

                                        ) : (

                                            <button key = {key} className="Inventory_ComponentButton-Template--ItemPetButtonClick" onClick = {() => selectPet(index, key)}> {key} </button>

                                        )

                                    ) : (

                                        <button  key = {key} className="Inventory_ComponentButton-Template--ItemPetButtonNonclick"> {key} </button>

                                    )

                                ))}

                            </div>
                            
                        </div>

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setInventoryOpenFlag)}> Close <br/> [I]</button>
        </div>
    );
}
  
export default Inventory;