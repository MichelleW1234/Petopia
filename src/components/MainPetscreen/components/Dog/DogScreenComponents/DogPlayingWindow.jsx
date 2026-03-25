import {useState} from "react";

import ProgressBar from "../../GlobalComponents/ProgressBar.jsx";

import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { healthKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";

import "./DogPlayingWindow.css";


function DogPlayingWindow ({gameOption, setActivePetActivity}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [scrubs, setScrubs] = useState(0);
    

    return (
        
        <div className = {`PetWindowBorder PetWindowBorder-dog`}>
            <h2 className={`PetWindowSign PetWindowSign-dog`}> 
                <ProgressBar
                    percentageUntilNextUpdate={Math.round((scrubs/50) * 100)}
                />
            </h2>

            {ActivePetName === "" ? (

                <div className= {"MainPetWindowGrid MainPetWindowGrid-default"}></div> 

            ) : PetList[ActivePetName][healthKey] === 0 ? (

                <div className= "MainPetWindowGrid MainPetWindowGrid-tomb"></div>

            ) : (

                <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                    {innerScreenSpace.map((row, rowIndex) => (
                        row.map((__, colIndex) => {

                            return (

                                rowIndex === 2 && colIndex === 3 ? (

                                    <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} 
                                        onMouseEnter={() => {
                                            setScrubs(prev => prev + 1)
                                        }}
                                    />

                                ) : (

                                    <div key={rowIndex + "," + colIndex} className = "MainPetWindowGridCell"></div>

                                )

                            )
                        
                        })
                    ))}
                </div>


            )}

        </div>

    );

}


export default DogPlayingWindow;