import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import anger from "../../../../images/placeholderangry.png";
import healthHeartGood from "../../../../images/placeholderheartGood.png";
import healthHeartBad from "../../../../images/placeholderheartBad.png";

import { healthCapList, healthKey, speciesKey } from "../../../../constants/Constants.js";

import "./Main.css";

function Main ({mainAnimationImages, mainPetEnergy, mainPetMood, mainActivityInProgress}){


    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const mainPetWindowLength = 20;

    const [mainAttention, setMainAttention] = useState(false);
    const [mainPetCurrentSpace, setMainPetCurrentSpace] = useState(Math.floor(Math.random() * mainPetWindowLength));

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

        } else if (mainPetCurrentSpaceRef.current === mainPetWindowLength - 1){

            setMainPetCurrentSpace(mainPetWindowLength - 2);
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
        
        <>

            <div className = "ReusableComponentContainer_Structure Screen_ReusableComponentContainer_Color Main_PetWindowBorder">

                {ActivePetName === "" ? (

                    <div className= "Main_PetWindowGridEmpty"></div>

                ) : (
                    
                    <div className = {`Main_FullWindowContainer Main_FullWindowContainer-${PetList[ActivePetName][speciesKey]}`}>

                        <div className = "Main_PetStatsContainer">
                            <h1 className = "Main_PetName">{ActivePetName}:</h1>
                            <div className = "Main_HealthContainer">

                                {Array.from({ length: healthCapList[PetList[ActivePetName][speciesKey]]}, (_, i) => i + 1).map(num => (

                                    num <= PetList[ActivePetName][healthKey] ? (
                                        <img key = {num} 
                                            src = {healthHeartGood}
                                            className = "Main_HealthHeart"
                                        />
                                    ) : (
                                        <img key = {num} 
                                            src = {healthHeartBad}
                                            className = "Main_HealthHeart"
                                        />
                                    )

                                ))}

                            </div>
                        </div>

                        {PetList[ActivePetName][healthKey] > 0 ? (

                            !mainActivityInProgress ? (

                                <div className="Main_PetWindowGrid"> 
                                    {Array.from({ length: mainPetWindowLength }, (_, i) => i).map(index => {
                                        
                                        const petHere = mainPetCurrentSpace === index;

                                        return(

                                            petHere ? (

                                            <div className = "Main_PetWindowGridPetCell">
                                                    <img 
                                                        key={index}
                                                        src = {mainPetDirectionRef.current === 0 ? 
                                                                    index%2 === 0 ?
                                                                        mainAnimationImages[0]
                                                                        : mainAnimationImages[1]
                                                                :
                                                                    index%2 === 1 ?
                                                                        mainAnimationImages[2]
                                                                        : mainAnimationImages[3]
                                                                } 
                                                        onMouseEnter={() => showAttention()}
                                                    />

                                                    {mainAttention &&
                                                    <img 
                                                        key={index} 
                                                        src = {mainPetMood <= 1 ? heart : anger} 
                                                        onMouseEnter={() => showAttention()}
                                                    />}

                                                </div>

                                            ) : (

                                                <div key={index} className = "Main_PetWindowGridCell"></div>

                                            )
                                
                                        )

                                    })}
                                </div>

                            ) : (

                                <div className= "Main_PetWindowGridEmpty"></div>

                            )

                        ) : (

                            <div className= "Main_PetWindowGridEmpty">
                                {/* Insert image of tomb !!!!!!!!!!!!*/}
                                <img/>
                            </div>

                        )}
                        
                    </div>
                )}

            </div>
        </>

    );

}


export default Main;