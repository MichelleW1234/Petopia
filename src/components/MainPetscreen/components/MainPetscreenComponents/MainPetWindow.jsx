import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import anger from "../../../../images/placeholderangry.png";
import happy from "../../../../images/placeholderhappy.jpg";
import neutral from "../../../../images/placeholderneutral.jpg";
import sad from "../../../../images/placeholdersad.png";
import verySad from "../../../../images/placeholderverysad.png";

import { petImages } from "../../../../constants/MainPetImages.js";

import "./MainPetWindow.css";
import { healthKey, speciesKey, stageKey } from "../../../../constants/Constants.js";

function PetWindow ({petEnergy, mood}){


    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [attention, setAttention] = useState(false);
    const [petCurrentSpace, setPetCurrentSpace] = useState(Math.floor(Math.random() * 8));

    const petCurrentSpaceRef = useRef(petCurrentSpace);
    const petDirectionRef = useRef(0);
    const timeoutRef = useRef(null);
    



    useEffect(() => {
        petCurrentSpaceRef.current = petCurrentSpace;
    }, [petCurrentSpace]);

    useEffect(() => {

        if (ActivePetName === ""){

            return;

        } else {

            const interval = setInterval(() => {
                petPositionChange();
            }, petEnergy);

            return () => clearInterval(interval);

        }

    }, [ActivePetName]);





    const petPositionChange = () => {

        if (petCurrentSpaceRef.current === 0){

            setPetCurrentSpace(1);
            petDirectionRef.current = 1;

        } else if (petCurrentSpaceRef.current === 7){

            setPetCurrentSpace(6);
            petDirectionRef.current = 0;

        } else if (petDirectionRef.current === 0){

            setPetCurrentSpace(prev => prev-1);

        } else if (petDirectionRef.current === 1){

            setPetCurrentSpace(prev => prev+1);
            
        }

    }


    const showAttention = () => {

        if (ActivePetName === ""){

            return;

        } else {
                 
            setAttention(true);

            // Cancels any existing timers:
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Starts a fresh 3s timer:
            timeoutRef.current = setTimeout(() => {
                setAttention(false);
                timeoutRef.current = null;
            }, 2000);

        }
        
    };


    

    return (
        
        <div className = {`PetWindowBorder PetWindowBorder-${ActivePetName !== "" ? PetList[ActivePetName][speciesKey] : "default"}`}>
            <h2 className={`PetWindowSign PetWindowSign-${ActivePetName !== "" ? PetList[ActivePetName][speciesKey] : "default"}`}> 
                {ActivePetName !== "" ? 
                    `${ActivePetName}'s Health: ${PetList[ActivePetName][healthKey]}`
                    : `${ActivePetName}'s Health : --- `
                }
            </h2>

            {ActivePetName === "" ? (

                <div className= {"MainPetWindowGrid MainPetWindowGrid-default"}></div> 

            ) : PetList[ActivePetName][healthKey] === 0 ? (

                <div className= "MainPetWindowGrid MainPetWindowGrid-tomb"></div>

            ) : (

                <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                    {innerScreenSpace.map((row, rowIndex) => (
                        row.map((__, colIndex) => {

                            const petHere = rowIndex === 2 && petCurrentSpace === colIndex;
                            const quotationHere = rowIndex === 1 && petCurrentSpace === colIndex;
                            
                            return (

                                petHere ? (

                                    petDirectionRef.current === 0 ? (

                                        colIndex%2 === 0 ? (

                                            <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} onMouseEnter={() => showAttention()}/>

                                        ):(

                                            <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][1]} onMouseEnter={() => showAttention()}/>

                                        )

                                    ) : (

                                        colIndex%2 === 1 ? (

                                            <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][2]} onMouseEnter={() => showAttention()}/>

                                        ):(

                                            <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][3]} onMouseEnter={() => showAttention()}/>

                                        )

                                    )

                                ) : quotationHere ? (

                                    mood === 0 ? (

                                        <img key={rowIndex + "," + colIndex} src = {attention ? heart: happy} className = "MainPetWindowGridQuotationCell"/>

                                    ) : mood === 1 ? (

                                        <img key={rowIndex + "," + colIndex} src = {attention ? heart: neutral} className = "MainPetWindowGridQuotationCell"/>

                                    ) : mood === 2 ? (

                                        <img key={rowIndex + "," + colIndex} src = {attention ?  anger: sad} className = "MainPetWindowGridQuotationCell"/>

                                    ) : (

                                        <img key={rowIndex + "," + colIndex} src = {attention ? anger: verySad} className = "MainPetWindowGridQuotationCell"/>

                                    )

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


export default PetWindow;