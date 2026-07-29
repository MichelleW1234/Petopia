import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";

import { catSpecies, dogSpecies, happyAudioKey, healthCapList, healthKey, sadAudioKey, sleepAudioKey, speciesKey, stageKey } from "../../../../constants/Constants.js";
import { pauseAudio } from "../../helpers/Helpers.js";

import PetSleepingSymbol from "../../../../images/PetSleepingSymbol.gif";
import PetUnhappySymbol from "../../../../images/PetUnhappySymbol.gif";
import PetHappySymbol from "../../../../images/PetHappySymbol.gif";
import HealthyPetHeart from "../../../../images/HealthyPetHeart.png";
import UnhealthyPetHeart from "../../../../images/UnhealthyPetHeart.png";

import "./Main.css";



function Main ({mainAnimationImages, mainSleepingImage, mainPetAudios, mainPetEnergy, mainPetMood, mainActivityInProgress}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();
    const {GlobalTimer} = useGlobalTimer();

    const mainPetWindowLength = 20;

    const [mainAttention, setMainAttention] = useState(false);
    const [mainPetCurrentSpace, setMainPetCurrentSpace] = useState(Math.floor(Math.random() * mainPetWindowLength));
    const [mainPetDirection, setMainPetDirection] = useState(0);
    const [mainSleepAnimationImage, setMainSleepAnimationImage] = useState(0);

    const mainPetCurrentSpaceRef = useRef(mainPetCurrentSpace);
    const mainPetDirectionRef = useRef(mainPetDirection);
    const mainSleepAnimationImageRef = useRef(mainSleepAnimationImage);
    const mainTimeoutRef = useRef(null);

    const mainCurrHour = new Date(GlobalTimer).getHours();
    const mainPetSleeping = mainCurrHour < 6 || mainCurrHour >= 20;
        
    

    
    // For preloading images:
    useEffect(() => {

        const preloadImages = [...mainAnimationImages.flat(1), mainSleepingImage, PetSleepingSymbol, PetUnhappySymbol, PetHappySymbol];

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
        mainSleepAnimationImageRef.current = mainSleepAnimationImage;
    }, [mainSleepAnimationImage]);



    useEffect(() => {

        if (mainAttention){
            
            let currSound;

            if (mainPetSleeping){

                currSound = mainPetAudios.current[sleepAudioKey];

            } else {

                if (mainPetMood <= 1){

                    currSound = mainPetAudios.current[happyAudioKey];

                } else {

                    currSound = mainPetAudios.current[sadAudioKey];

                }

            }

            currSound.volume = 0.75;
            currSound.play();
                
        }

    }, [mainAttention, mainPetMood])



    useEffect(() => {

        if (ActivePetName === "" || mainPetSleeping){

            return;

        }

        const interval = setInterval(() => {

            petPositionChange();

        }, mainPetEnergy);

        return () => clearInterval(interval);

    }, [ActivePetName, mainPetSleeping]);




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
            }, 3000);

        }
        
    };


    

    return (

        ActivePetName === "" ? (

            <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">
                <div className= "Main_ComponentContainer-Structure--WindowScreenNongrid"></div>
            </div>

        ) : (

            <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">
                <div className = {`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Main_ComponentContainer-Template--WindowScreen Main_ComponentContainer-Color--WindowScreen--${PetList[ActivePetName][speciesKey]}`}>

                    <div className = "Main_ComponentContainer-Structure--WindowScreenPetStats">
                        <h1 className = "Main_ComponentHeading-Template--WindowScreenPetStatsName">{ActivePetName}:</h1>
                        <div className = "Main_ComponentContainer-Structure--WindowScreenPetStatsHealth">

                            {Array.from({ length: healthCapList[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]]}, (_, i) => i + 1).map(num => (

                                <img 
                                    key = {num} 
                                    src = {num <= PetList[ActivePetName][healthKey] ? 
                                                HealthyPetHeart
                                            : UnhealthyPetHeart}
                                    className = "Main_ComponentImage-Template--WindowScreenPetStatsHealthHeart"
                                />

                            ))}

                        </div>
                    </div>

                    {PetList[ActivePetName][healthKey] === 0 ? (

                        <div className= "Main_ComponentContainer-Structure--WindowScreenNongrid"></div>

                    ) : (

                        mainActivityInProgress ? (

                            <div className= "Main_ComponentContainer-Structure--WindowScreenNongrid"></div>

                        ) : (

                            mainPetSleeping ? (

                                <div className="Main_ComponentContainer-Structure--WindowScreenNongrid"> 

                                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenNongridPet">
                                        <img 
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                            onMouseEnter={() => showAttention()}
                                            src = {mainSleepingImage}
                                        />

                                        {mainAttention &&
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                            src = {PetSleepingSymbol} 
                                            onMouseEnter={() => showAttention()}
                                        />}
                                    </div>
                                </div>

                            ) : (

                                <div className="Main_ComponentContainer-Structure--WindowScreenGrid"> 
                                    {Array.from({ length: mainPetWindowLength }, (_, i) => i).map(index => {
                                        
                                        const petHere = mainPetCurrentSpace === index;

                                        return(

                                            petHere ? (

                                                <div key={index} 
                                                    className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenGridCellPet">
                                                    <img className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                                        src = {mainAnimationImages[mainPetDirection][index % 2]} 
                                                        onMouseEnter={() => showAttention()}
                                                    />

                                                    {mainAttention &&
                                                    <img
                                                        className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                                        src = {mainPetMood <= 1 ? PetHappySymbol : PetUnhappySymbol} 
                                                        onMouseEnter={() => showAttention()}
                                                    />}
                                                </div>

                                            ) : (

                                                <div key={index} className = "Main_ComponentContainer-Structure--WindowScreenGridCellNonpet"></div>

                                            )
                                
                                        )

                                    })}
                                </div>

                            )

                        )

                    )}
                    
                </div>
                
            </div>
        )   

    );

}


export default Main;