import {useState, useEffect, useRef} from "react";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import mood from "../../../../images/placeholderhappy.jpg";

import "./PetWindow.css";

function PetWindow ({petNeed, petEnergy}){

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 15 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [loved, setLoved] = useState(false);
    const [petCurrentSpace, setPetCurrentSpace] = useState(Math.floor(Math.random() * 8));

    const petCurrentSpaceRef = useRef(petCurrentSpace);
    const petDirectionRef = useRef(0);
    const timeoutRef = useRef(null);



    useEffect(() => {
        petCurrentSpaceRef.current = petCurrentSpace;
    }, [petCurrentSpace]);

    useEffect(() => {

        if (ActivePetNumber === -1){

            return;

        } else {

            const interval = setInterval(() => {
                petPositionChange();
            }, petEnergy);

            return () => clearInterval(interval);

        }

    }, [ActivePetNumber]);





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


    const showLove = () => {

        if (ActivePetNumber === -1){

            return;

        } else {
                 
            setLoved(true);

            // Cancels any existing timers:
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Starts a fresh 3s timer:
            timeoutRef.current = setTimeout(() => {
                setLoved(false);
                timeoutRef.current = null;
            }, 3000);

        }
        
    };


    

    return (
        
        <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetNumber]?.[0]?.[0] || "default"}`}>
            <div className= {`PetWindowGrid PetWindowGrid-${PetList[ActivePetNumber]?.[0]?.[0] || "default"}`}>  
                {innerScreenSpace.map((row, rowIndex) => (
                    row.map((__, colIndex) => {

                        const petHere = rowIndex === 2 && petCurrentSpace === colIndex;
                        const quotationHere = rowIndex === 1 && petCurrentSpace === colIndex;
                        
                        return (

                            petHere ? (

                                <div key={rowIndex + "," + colIndex} className = "PetWindowGridPetCell"  onMouseEnter={() => showLove()}></div>

                            ) : quotationHere ? (

                                loved ? (

                                    <img key={rowIndex + "," + colIndex} src = {heart} className = "PetWindowGridQuotationCell"/>

                                ) : (

                                    petNeed === -1 ? (

                                        <img key={rowIndex + "," + colIndex} src = {mood} className = "PetWindowGridQuotationCell"/>

                                    ) : (

                                        <img key={rowIndex + "," + colIndex} src = {mood} className = "PetWindowGridQuotationCell"/>

                                    )

                                )

                            ) : (

                                <div key={rowIndex + "," + colIndex} className = "PetWindowGridCell"></div>

                            )

                        )
                        
                    })
                ))}

            </div>
        </div>

    );

}


export default PetWindow;