import {useState, useEffect, useRef} from "react";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import anger from "../../../../images/placeholderangry.png";
import happy from "../../../../images/placeholderhappy.jpg";
import neutral from "../../../../images/placeholderneutral.jpg";
import sad from "../../../../images/placeholdersad.png";
import verySad from "../../../../images/placeholderverysad.png";

import "./MainPetWindow.css";

function PetWindow ({petEnergy, mood}){


    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 15 columns
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

        if (ActivePetNumber === -1){

            return;

        } else {

            const interval = setInterval(() => {
                petPositionChange();
            }, petEnergy + mood*100);

            return () => clearInterval(interval);

        }

    }, [mood, ActivePetNumber]);





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

        if (ActivePetNumber === -1){

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
        
        <div className = {`PetWindowBorder PetWindowBorder-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}>
            <h2 className={`PetWindowSign PetWindowSign-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}> Pet Health: {ActivePetNumber !== -1 ? PetList[ActivePetNumber][3] : -1}</h2>
            <div className= {`MainPetWindowGrid MainPetWindowGrid-${ActivePetNumber !== -1 ? PetList[ActivePetNumber][0] : "default"}`}>  
                {innerScreenSpace.map((row, rowIndex) => (
                    row.map((__, colIndex) => {

                        const petHere = rowIndex === 2 && petCurrentSpace === colIndex;
                        const quotationHere = rowIndex === 1 && petCurrentSpace === colIndex;
                        
                        return (

                            petHere ? (

                                <div key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell"  onMouseEnter={() => showAttention()}></div>

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
        </div>

    );

}


export default PetWindow;