import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, inventoryItemTypeFloorDecorationKey, petSoundHappyKey, petSpeciesHealthCapList, petHealthKey, petSoundSadKey, inventoryItemImageKey, inventoryItemOwnerKey, inventoryItemTypeKey, petSoundSleepKey, petSpeciesKey, petStageKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey } from "../../../../constants/Constants.js";
import { petScreensHelpers_AudioCanceller } from "../../helpers/Helpers.js";

import PetSleepingSymbol from "../../../../images/PetSleepingSymbol.gif";
import PetUnhappySymbol from "../../../../images/PetUnhappySymbol.gif";
import PetHappySymbol from "../../../../images/PetHappySymbol.gif";
import HealthyPetHeart from "../../../../images/HealthyPetHeart.png";
import UnhealthyPetHeart from "../../../../images/UnhealthyPetHeart.png";

import "./Main.css";



function Main ({main_CurrStageAnimationImages, main_CurrStageSleepAnimationImage, main_CurrSpeciesAudios, main_CurrPetEnergy, main_CurrMood, main_ActivityInProgress}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();
    const {GlobalTimer} = useGlobalTimer();
    const {Inventory, setInventory} = useInventory();

    const main_WindowLength = 20;

    const [main_GiveAttention, set_Main_GiveAttention] = useState(false);
    const [main_CurrPetPosition, set_Main_CurrPetPosition] = useState(Math.floor(Math.random() * main_WindowLength));
    const [main_CurrPetDirection, set_Main_CurrPetDirection] = useState(0);

    const main_CurrPetPositionRef = useRef(main_CurrPetPosition);
    const main_CurrPetDirectionRef = useRef(main_CurrPetDirection);
    const main_TimeoutRef = useRef(null);

    const main_CurrHour = new Date(GlobalTimer).getHours();
    const main_PetSleeping = main_CurrHour < 6 || main_CurrHour >= 20;
        
    

    
    // For preloading images:
    useEffect(() => {

        const main_CurrPreloadImages = [...main_CurrStageAnimationImages.flat(1), main_CurrStageSleepAnimationImage, PetSleepingSymbol, PetUnhappySymbol, PetHappySymbol];

        main_CurrPreloadImages.forEach((src) => {
            const main_Img = new Image();
            main_Img.src = src;
        });

    }, [main_CurrStageAnimationImages]);


    useEffect(() => {
        main_CurrPetPositionRef.current = main_CurrPetPosition;
    }, [main_CurrPetPosition]);

    useEffect(() => {
        main_CurrPetDirectionRef.current = main_CurrPetDirection;
    }, [main_CurrPetDirection]);



    useEffect(() => {

        if (main_GiveAttention){
            
            let main_CurrAudio;

            if (main_PetSleeping){

                main_CurrAudio = main_CurrSpeciesAudios.current[petSoundSleepKey];

            } else {

                if (main_CurrMood === 1){

                    main_CurrAudio = main_CurrSpeciesAudios.current[petSoundHappyKey];

                } else {

                    main_CurrAudio = main_CurrSpeciesAudios.current[petSoundSadKey];

                }

            }

            main_CurrAudio.volume = 0.75;
            main_CurrAudio.play();
                
        }

    }, [main_GiveAttention, main_CurrMood])



    useEffect(() => {

        if (ActivePetName === "" || main_PetSleeping){

            return;

        }

        const main_Interval = setInterval(() => {

            main_PetPositionShifter();

        }, main_CurrPetEnergy);

        return () => clearInterval(main_Interval);

    }, [ActivePetName, main_PetSleeping]);




    const main_PetPositionShifter = () => {

        if (main_CurrPetPositionRef.current === 0){

            set_Main_CurrPetPosition(1);
            set_Main_CurrPetDirection(1);

        } else if (main_CurrPetPositionRef.current === main_WindowLength - 1){

            set_Main_CurrPetPosition(main_WindowLength - 2);
            set_Main_CurrPetDirection(0);

        } else if (main_CurrPetDirectionRef.current === 0){

            set_Main_CurrPetPosition(prev => prev-1);

        } else if (main_CurrPetDirectionRef.current === 1){

            set_Main_CurrPetPosition(prev => prev+1);
            
        }

    }


    const main_AttentionTimer = () => {

        if (ActivePetName === ""){

            return;

        } else {
                
            set_Main_GiveAttention(true);

            // Cancels any existing timers:
            if (main_TimeoutRef.current) {
                clearTimeout(main_TimeoutRef.current);
            }

            // Starts a fresh 3s timer:
            main_TimeoutRef.current = setTimeout(() => {
                set_Main_GiveAttention(false);
                main_TimeoutRef.current = null;
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
                <div className = {`MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Main_ComponentContainer-Template--WindowScreen Main_ComponentContainer-Color--WindowScreen--${PetList[ActivePetName][petSpeciesKey]}`}>

                    <div className = "Main_ComponentContainer-Structure--WindowScreenPetStats">
                        <h1 className = "Main_ComponentHeading-Template--WindowScreenPetStatsName">{ActivePetName}:</h1>
                        <div className = "Main_ComponentContainer-Structure--WindowScreenPetStatsHealth">

                            {Array.from({ length: petSpeciesHealthCapList[PetList[ActivePetName][petSpeciesKey]][PetList[ActivePetName][petStageKey]]}, (_, i) => i + 1).map(num => (

                                <img 
                                    key = {num} 
                                    src = {num <= PetList[ActivePetName][petHealthKey] ? 
                                                HealthyPetHeart
                                            : UnhealthyPetHeart}
                                    className = "Main_ComponentImage-Template--WindowScreenPetStatsHealthHeart"
                                />

                            ))}

                        </div>
                    </div>

                    {PetList[ActivePetName][petHealthKey] === 0 ? (

                        <div className= "Main_ComponentContainer-Structure--WindowScreenNongrid"></div>

                    ) : (

                        main_ActivityInProgress ? (

                            <div className= "Main_ComponentContainer-Structure--WindowScreenNongrid"></div>

                        ) : (

                            main_PetSleeping ? (

                                <div className="Main_ComponentContainer-Structure--WindowScreenNongrid"> 

                                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenNongridPet">
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                            onMouseEnter={() => main_AttentionTimer()}
                                            src = {main_CurrStageSleepAnimationImage}
                                        />

                                        {main_GiveAttention &&
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                            src = {PetSleepingSymbol} 
                                            onMouseEnter={() => main_AttentionTimer()}
                                        />}
                                    </div>
                                </div>

                            ) : (

                                <div className="Main_ComponentContainer-Structure--WindowScreenGrid"> 
                                    {Array.from({ length: main_WindowLength }, (_, i) => i).map(index => {
                                        
                                        const main_PetHere = main_CurrPetPosition === index;

                                        return(

                                            main_PetHere ? (

                                                <div key={index} 
                                                    className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenGridCellPet">
                                                    <img className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                                        src = {main_CurrStageAnimationImages[main_CurrPetDirection][index % 2]} 
                                                        onMouseEnter={() => main_AttentionTimer()}
                                                    />

                                                    {main_GiveAttention &&
                                                    <img
                                                        className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                                        src = {main_CurrMood <= 1 ? PetHappySymbol : PetUnhappySymbol} 
                                                        onMouseEnter={() => main_AttentionTimer()}
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

                    {Inventory.map((item, index) => (

                        item[inventoryItemOwnerKey] === ActivePetName ? (

                            item[inventoryItemTypeKey] === inventoryItemTypeCeilingDecorationKey ? (

                                <img key = {index} className={`Main_ComponentImage-Structure--WindowScreenCeilingDecoration  Main_ComponentImage-Structure--WindowScreenCeilingDecoration--${PetList[ActivePetName][petSpeciesKey]}`} src = {item[inventoryItemImageKey]}/>

                            ) : item[inventoryItemTypeKey] === inventoryItemTypeWallDecorationKey ? (

                                <img key = {index} className={`Main_ComponentImage-Structure--WindowScreenWallDecoration Main_ComponentImage-Structure--WindowScreenWallDecoration--${PetList[ActivePetName][petSpeciesKey]}`} src = {item[inventoryItemImageKey]}/>

                            ) : item[inventoryItemTypeKey] === inventoryItemTypeRoomDecorationKey ? (

                                <img key = {index} className={`Main_ComponentImage-Structure--WindowScreenRoomDecoration Main_ComponentImage-Structure--WindowScreenRoomDecoration--${PetList[ActivePetName][petSpeciesKey]}`} src = {item[inventoryItemImageKey]}/>
                            
                            ) : item[inventoryItemTypeKey] === inventoryItemTypeFloorDecorationKey ? (

                                <img key = {index} className={`Main_ComponentImage-Structure--WindowScreenFloorDecoration Main_ComponentImage-Structure--WindowScreenFloorDecoration--${PetList[ActivePetName][petSpeciesKey]}`} src = {item[inventoryItemImageKey]}/>
                            
                            ) : (

                                null

                            )

                        ) : (

                            null

                        )

                    ))}
                    
                </div>
                
            </div>
        )   

    );

}


export default Main;