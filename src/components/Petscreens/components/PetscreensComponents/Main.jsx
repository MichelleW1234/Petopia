import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import anger from "../../../../images/placeholderangry.png";
import happy from "../../../../images/placeholderhappy.jpg";
import neutral from "../../../../images/placeholderneutral.jpg";
import sad from "../../../../images/placeholdersad.png";
import verySad from "../../../../images/placeholderverysad.png";

import { healthCapList, healthKey, speciesKey } from "../../../../constants/Constants.js";

import "./Main.css";

function Main ({mainAnimationImages, mainPetEnergy, mainPetMood, mainActivityInProgress}){


    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const mainInnerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [mainAttention, setMainAttention] = useState(false);
    const [mainPetCurrentSpace, setMainPetCurrentSpace] = useState(Math.floor(Math.random() * 8));

    const mainPetCurrentSpaceRef = useRef(mainPetCurrentSpace);
    const mainPetDirectionRef = useRef(0);
    const mainTimeoutRef = useRef(null);
    



    useEffect(() => {
        mainPetCurrentSpaceRef.current = mainPetCurrentSpace;
    }, [mainPetCurrentSpace]);

    useEffect(() => {

        if (ActivePetName === ""){

            return;

        } else {

            const interval = setInterval(() => {
                petPositionChange();
            }, mainPetEnergy);

            return () => clearInterval(interval);

        }

    }, [ActivePetName]);





    const petPositionChange = () => {

        if (mainPetCurrentSpaceRef.current === 0){

            setMainPetCurrentSpace(1);
            mainPetDirectionRef.current = 1;

        } else if (mainPetCurrentSpaceRef.current === 7){

            setMainPetCurrentSpace(6);
            mainPetDirectionRef.current = 0;

        } else if (mainPetDirectionRef.current === 0){

            setMainPetCurrentSpace(prev => prev-1);

        } else if (mainPetDirectionRef.current === 1){

            setMainPetCurrentSpace(prev => prev+1);
            
        }

    }


    const showAttention = () => {

        if (ActivePetName === ""){

            return;

        } else {
                 
            setMainAttention(true);

            // Cancels any existing timers:
            if (mainTimeoutRef.current) {
                clearTimeout(mainTimeoutRef.current);
            }

            // Starts a fresh 3s timer:
            mainTimeoutRef.current = setTimeout(() => {
                setMainAttention(false);
                mainTimeoutRef.current = null;
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

            ) : (
                
                <>

                    <div className = "MainHealthContainer">

                            {Array.from({ length: healthCapList[PetList[ActivePetName][speciesKey]]}, (_, i) => i + 1).map(num => (

                                <div key = {num} className = {num <= PetList[ActivePetName][healthKey] ? 
                                                                    "MainHealthHeartGood"
                                                                : "MainHealthHeartBad"
                                                            }>
                                </div>

                            ))}

                    </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        !mainActivityInProgress ? (

                            <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                                {mainInnerScreenSpace.map((row, rowIndex) => (
                                    row.map((__, colIndex) => {

                                        const petHere = rowIndex === 2 && mainPetCurrentSpace === colIndex;
                                        const quotationHere = rowIndex === 1 && mainPetCurrentSpace === colIndex;
                                        
                                        return (

                                            petHere ? (

                                                mainPetDirectionRef.current === 0 ? (

                                                    colIndex%2 === 0 ? (

                                                        <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {mainAnimationImages[0]} onMouseEnter={() => showAttention()}/>

                                                    ):(

                                                        <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {mainAnimationImages[1]} onMouseEnter={() => showAttention()}/>

                                                    )

                                                ) : (

                                                    colIndex%2 === 1 ? (

                                                        <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {mainAnimationImages[2]} onMouseEnter={() => showAttention()}/>

                                                    ):(

                                                        <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {mainAnimationImages[3]} onMouseEnter={() => showAttention()}/>

                                                    )

                                                )

                                            ) : quotationHere ? (

                                                mainPetMood === 0 ? (

                                                    <img key={rowIndex + "," + colIndex} src = {mainAttention ? heart: happy} className = "MainPetWindowGridQuotationCell"/>

                                                ) : mainPetMood === 1 ? (

                                                    <img key={rowIndex + "," + colIndex} src = {mainAttention ? heart: neutral} className = "MainPetWindowGridQuotationCell"/>

                                                ) : mainPetMood === 2 ? (

                                                    <img key={rowIndex + "," + colIndex} src = {mainAttention ?  anger: sad} className = "MainPetWindowGridQuotationCell"/>

                                                ) : (

                                                    <img key={rowIndex + "," + colIndex} src = {mainAttention ? anger: verySad} className = "MainPetWindowGridQuotationCell"/>

                                                )

                                            ) : (

                                                <div key={rowIndex + "," + colIndex} className = "MainPetWindowGridCell"></div>

                                            ) 

                                        )
                                    
                                    })
                                ))}
                            </div>

                        ) : (

                            // CHANGE THIS AFTER CREATING BACKGROUNDS FOR EACH PET
                            <div className= "MainPetWindowGrid MainPetWindowGrid-tomb"></div>

                        )

                    ) : (

                        <div className= "MainPetWindowGrid MainPetWindowGrid-tomb"></div>

                    )}
                    
                </>
            )}

        </div>

    );

}


export default Main;