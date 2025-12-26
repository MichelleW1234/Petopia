import {useState, useEffect, useRef} from "react";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import happy from "../../../../images/placeholderhappy.jpg";
import neutral from "../../../../images/placeholderneutral.jpg";
import sad from "../../../../images/placeholdersad.png";
import verySad from "../../../../images/placeholderverysad.png";

import "./PetWindow.css";

function PetWindow ({petEnergy}){


    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 15 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));
    const allHealthCapacities = [[12, 10, 5], [15, 10, 5], [4, 3, 2]];
    const mood = ActivePetNumber !== -1 ? PetList[ActivePetNumber][3] > allHealthCapacities[ActivePetNumber][0] ? 0
                                            : PetList[ActivePetNumber][3] > allHealthCapacities[ActivePetNumber][1] ? 1
                                            : PetList[ActivePetNumber][3] > allHealthCapacities[ActivePetNumber][2] ? 2
                                            : 3
                                        : -1;

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
            }, petEnergy + mood*20);

            return () => clearInterval(interval);

        }

    }, [ActivePetNumber, mood]);





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
        
        <div className = {`PetWindowBorder PetWindowBorder-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}>
            <div className= {`PetWindowGrid PetWindowGrid-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}>  
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

                                    mood === 0 ? (

                                        <img key={rowIndex + "," + colIndex} src = {happy} className = "PetWindowGridQuotationCell"/>

                                    ) : mood === 1 ? (

                                        <img key={rowIndex + "," + colIndex} src = {neutral} className = "PetWindowGridQuotationCell"/>

                                    ) : mood === 2 ? (

                                        <img key={rowIndex + "," + colIndex} src = {sad} className = "PetWindowGridQuotationCell"/>

                                    ) : (

                                        <img key={rowIndex + "," + colIndex} src = {verySad} className = "PetWindowGridQuotationCell"/>

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