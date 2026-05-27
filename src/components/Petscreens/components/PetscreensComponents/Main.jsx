import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";

import heart from "../../../../images/placeholderheart.png";
import anger from "../../../../images/placeholderangry.png";
import healthHeartGood from "../../../../images/placeholderheartGood.png";
import healthHeartBad from "../../../../images/placeholderheartBad.png";
import petTombStone from "../../../../images/PetTombStone.png";

import { catSpecies, dogSpecies, healthCapList, healthKey, speciesKey, stageKey } from "../../../../constants/Constants.js";

import "./Main.css";
import { playSound } from "../../../../helpers/helpers.js";
import { pauseAudios } from "../../helpers/Helpers.js";

function Main ({mainAnimationImages, mainSleepingImages, mainPetAudios, mainPetEnergy, mainPetMood, mainActivityInProgress}){


    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();
    const {GlobalTimer} = useGlobalTimer();

    const mainPetWindowLength = 20;

    const [mainAttention, setMainAttention] = useState(false);
    const [mainPetCurrentSpace, setMainPetCurrentSpace] = useState(Math.floor(Math.random() * mainPetWindowLength));
    const [mainPetDirection, setMainPetDirection] = useState(0);
    const [sleepAnimationImage, setSleepAnimationImage] = useState(0);

    const mainPetCurrentSpaceRef = useRef(mainPetCurrentSpace);
    const mainPetDirectionRef = useRef(mainPetDirection);
    const sleepAnimationImageRef = useRef(sleepAnimationImage);
    const mainTimeoutRef = useRef(null);

    const currHour = new Date(GlobalTimer).getHours();
    const petSleeping = currHour < 6 || currHour >= 20;
        
    

    
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
        sleepAnimationImageRef.current = sleepAnimationImage;
    }, [sleepAnimationImage]);


    useEffect(() => {
        sleepAnimationImageRef.current = sleepAnimationImage;
    }, [sleepAnimationImage]);


    useEffect(() => {

        if (mainAttention){

            pauseAudios(mainPetAudios);
            
            let currSound;

            if (petSleeping){

                currSound = mainPetAudios.current[2];

            } else {

                if (mainPetMood <= 1){

                    currSound = mainPetAudios.current[0];

                } else {

                    currSound = mainPetAudios.current[1];

                }

            }

            currSound.volume = 0.7;
            currSound.play();
                
        }

    }, [mainAttention, mainPetMood])


    useEffect(() => {

        if (ActivePetName === "" || !petSleeping){

            return;

        }

        const interval = setInterval(() => {

            if (sleepAnimationImageRef.current === 0) {
                setSleepAnimationImage(1);
            } else {
                setSleepAnimationImage(0);
            }

        }, 800);

        return () => clearInterval(interval);

    }, [ActivePetName, petSleeping])



    useEffect(() => {

        if (ActivePetName === "" || petSleeping){

            return;

        } else {

            const interval = setInterval(() => {

                petPositionChange();

            }, mainPetEnergy);

            return () => clearInterval(interval);

        }

    }, [ActivePetName, petSleeping]);




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

        ActivePetName === "" ? (

            <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">
                <div className= "Main_ComponentContainer-Structure--WindowScreenGridEmpty"></div>
            </div>

        ) : (

            <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">
                <div className = {`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Main_ComponentContainer-Structure--WindowScreen Main_ComponentContainer-Color--WindowScreen--${PetList[ActivePetName][speciesKey]}`}>

                    <div className = "Main_ComponentContainer-Structure--WindowScreenPetStats">
                        <h1 className = "Main_ComponentHeading-Template--WindowScreenPetStatsName">{ActivePetName}:</h1>
                        <div className = "Main_ComponentContainer-Structure--WindowScreenPetStatsHealth">

                            {Array.from({ length: healthCapList[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]]}, (_, i) => i + 1).map(num => (

                                num <= PetList[ActivePetName][healthKey] ? (
                                    <img key = {num} 
                                        src = {healthHeartGood}
                                        className = "Main_ComponentImage--Template--WindowScreenPetStatsHealthHeart"
                                    />
                                ) : (
                                    <img key = {num} 
                                        src = {healthHeartBad}
                                        className = "Main_ComponentImage--Template--WindowScreenPetStatsHealthHeart"
                                    />
                                )

                            ))}

                        </div>
                    </div>

                    {PetList[ActivePetName][healthKey] > 0 ? (

                        !mainActivityInProgress ? (

                            petSleeping ? (

                                <div className="Main_ComponentContainer-Structure--WindowScreenGridEmpty"> 

                                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenGridEmptyPet">
                                        <img 
                                            onMouseEnter={() => showAttention()}
                                            src = {mainSleepingImages[sleepAnimationImage]}
                                        />

                                        {mainAttention &&
                                        <img
                                            src = {mainPetMood <= 1 ? heart : anger} 
                                            onMouseEnter={() => showAttention()}
                                        />}

                                    </div>
                                </div>

                            ) : (

                                <div className="Main_ComponentContainer-Structure--WindowScreenGridNonempty"> 
                                    {Array.from({ length: mainPetWindowLength }, (_, i) => i).map(index => {
                                        
                                        const petHere = mainPetCurrentSpace === index;

                                        return(

                                            petHere ? (

                                                <div key={index} className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenGridNonemptyCellPet">
                                                    <img 
                                                        src = {mainAnimationImages[mainPetDirection][index % 2]} 
                                                        onMouseEnter={() => showAttention()}
                                                    />

                                                    {mainAttention &&
                                                    <img
                                                        src = {mainPetMood <= 1 ? heart : anger} 
                                                        onMouseEnter={() => showAttention()}
                                                    />}

                                                </div>

                                            ) : (

                                                <div key={index} className = "Main_ComponentContainer-Structure--WindowScreenGridNonemptyCellNonpet"></div>

                                            )
                                
                                        )

                                    })}
                                </div>

                            )

                        ) : (

                            <div className= "Main_ComponentContainer-Structure--WindowScreenGridEmpty"></div>

                        )

                    ) : (

                        <div className= "Main_ComponentContainer-Structure--WindowScreenGridEmpty">
                            <img src = {petTombStone}/>
                        </div>

                    )}
                    
                </div>
                
            </div>
        )   

    );

}


export default Main;