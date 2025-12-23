import {useState, useEffect, useRef} from "react";

import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import {petPositionChange} from "../../helpers/Helpers.js";

import heart from "../../../../images/placeholderheart.png";
import mood from "../../../../images/placeholderhappy.jpg";

import "./MainPetInnerscreen.css";

function MainPetInnerscreen ({petNeed, petEnergy}){

    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();
    const {PetList, setPetList} = usePetList();

    const [loved, setLoved] = useState(false);
    const [petCurrentSpace, setPetCurrentSpace] = useState(Math.floor(Math.random() * 8));

    // 10 rows x 15 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));


    const petCurrentSpaceRef = useRef(petCurrentSpace);
    const petDirectionRef = useRef(0);
    const timeoutRef = useRef(null);



    useEffect(() => {
        petCurrentSpaceRef.current = petCurrentSpace;
    }, [petCurrentSpace]);

    useEffect(() => {

        const interval = setInterval(() => {
            petPositionChange(petCurrentSpaceRef.current, setPetCurrentSpace, petDirectionRef);
        }, petEnergy);

        return () => clearInterval(interval);

    }, []);




    const showLove = () => {
        
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
        
    };


    

    return (
        
        <div className = {`MainPetInnerScreenborder MainPetInnerScreenborder-${PetList[ActivePetNumber][0][0]}`}>
            <div className= {`MainPetScreen MainPetScreen-${PetList[ActivePetNumber][0][0]}`}>  
                {innerScreenSpace.map((row, rowIndex) => (
                    row.map((__, colIndex) => {

                        const petHere = rowIndex === 2 && petCurrentSpace === colIndex;
                        const quotationHere = rowIndex === 1 && petCurrentSpace === colIndex;
                        
                        return (

                            petHere ? (

                                <div key={rowIndex + "," + colIndex} className = "MainPetScreenPetCell"  onMouseEnter={() => showLove()}></div>

                            ) : quotationHere ? (

                                loved ? (

                                    <img src = {heart} className = "MainPetScreenQuotationCell"/>

                                ) : (

                                    petNeed === -1 ? (

                                        <img src = {mood} className = "MainPetScreenQuotationCell"/>

                                    ) : (

                                        <img src = {mood} className = "MainPetScreenQuotationCell"/>

                                    )

                                )

                            ) : (

                                <div key={rowIndex + "," + colIndex} className = "MainPetScreenCell"></div>

                            )

                        )
                        
                    })
                ))}

            </div>
        </div>

    );

}


export default MainPetInnerscreen;