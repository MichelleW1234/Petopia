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
    const [mainPetDirection, setMainPetDirection] = useState(0);

    const mainPetCurrentSpaceRef = useRef(mainPetCurrentSpace);
    const mainPetDirectionRef = useRef(mainPetDirection);
    const mainTimeoutRef = useRef(null);
    

    
    // For preloading images:
    useEffect(() => {

        const preloadImages = [...mainAnimationImages.flat(1), heart, anger, healthHeartGood, healthHeartBad];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, [mainAnimationImages]);


    useEffect(() => {
        mainPetCurrentSpaceRef.current = mainPetCurrentSpace;
    }, [mainPetCurrentSpace]);

    useEffect(() => {
        mainPetDirectionRef.current = mainPetDirection;
    }, [mainPetDirection]);

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
            setMainPetDirection(1);

        } else if (mainPetCurrentSpaceRef.current === mainPetWindowLength - 1){

            setMainPetCurrentSpace(mainPetWindowLength - 2);
            setMainPetDirection(0);

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

            <div className = "UIStapleElements_ComponentContainer-Structure--Window UIStapleElements_ComponentContainer-Color--Screen">

                {ActivePetName === "" ? (

                    <div className= "Main_ComponentContainer-Structure--WindowGridEmpty"></div>

                ) : (
                    
                    <div className = {`Main_ComponentContainer-Structure--Window Main_ComponentContainer-Color--Window${PetList[ActivePetName][speciesKey]}`}>

                        <div className = "Main_ComponentContainer-Structure--WindowStats">
                            <h1 className = "Main_ComponentHeading-Template--WindowStatsName">{ActivePetName}:</h1>
                            <div className = "Main_ComponentContainer-Structure--WindowStatsHealth">

                                {Array.from({ length: healthCapList[PetList[ActivePetName][speciesKey]]}, (_, i) => i + 1).map(num => (

                                    num <= PetList[ActivePetName][healthKey] ? (
                                        <img key = {num} 
                                            src = {healthHeartGood}
                                            className = "Main_ComponentImage--Template--WindowStatsHealthHeart"
                                        />
                                    ) : (
                                        <img key = {num} 
                                            src = {healthHeartBad}
                                            className = "Main_ComponentImage--Template--WindowStatsHealthHeart"
                                        />
                                    )

                                ))}

                            </div>
                        </div>

                        {PetList[ActivePetName][healthKey] > 0 ? (

                            !mainActivityInProgress ? (

                                <div className="Main_ComponentContainer-Structure--WindowGridNonempty"> 
                                    {Array.from({ length: mainPetWindowLength }, (_, i) => i).map(index => {
                                        
                                        const petHere = mainPetCurrentSpace === index;

                                        return(

                                            petHere ? (

                                                <div key={index} className = "MiscellaneousElements_ComponentContainer-Structure--ImageOverlay Main_ComponentContainer-Structure--WindowGridNonemptyCellPet">
                                                    <img 
                                                        className="MiscellaneousElements_ComponentImage-Structure--ImageOverlay Main_ComponentImage-Template--WindowGridNonemptyCellPet"
                                                        src = {mainAnimationImages[mainPetDirection][index % 2]} 
                                                        onMouseEnter={() => showAttention()}
                                                    />

                                                    {mainAttention &&
                                                    <img 
                                                        className="MiscellaneousElements_ComponentImage-Structure--ImageOverlay Main_ComponentImage-Template--WindowGridNonemptyCellPet"
                                                        src = {mainPetMood <= 1 ? heart : anger} 
                                                        onMouseEnter={() => showAttention()}
                                                    />}

                                                </div>

                                            ) : (

                                                <div key={index} className = "Main_ComponentContainer-Structure--WindowGridNonemptyCellNonpet"></div>

                                            )
                                
                                        )

                                    })}
                                </div>

                            ) : (

                                <div className= "Main_ComponentContainer-Structure--WindowGridEmpty"></div>

                            )

                        ) : (

                            <div className= "Main_ComponentContainer-Structure--WindowGridEmpty">
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