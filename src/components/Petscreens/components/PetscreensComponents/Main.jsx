import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, inventoryItemTypeFloorDecorationKey, petSoundHappyKey, petSpeciesHealthCapList, petHealthKey, petSoundSadKey, inventoryItemImageKey, inventoryItemOwnerKey, inventoryItemTypeKey, petSoundSleepKey, petSpeciesKey, petStageKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey } from "../../../../constants/Constants.js";
import { petScreensHelpers_PauseAudio } from "../../helpers/Helpers.js";

import PetSleepingSymbol from "../../../../images/PetSleepingSymbol.gif";
import PetUnhappySymbol from "../../../../images/PetUnhappySymbol.gif";
import PetHappySymbol from "../../../../images/PetHappySymbol.gif";
import HealthyPetHeart from "../../../../images/HealthyPetHeart.png";
import UnhealthyPetHeart from "../../../../images/UnhealthyPetHeart.png";

import "./Main.css";



function Main ({main_AnimationImages, main_SleepingImage, main_PetAudios, main_PetEnergy, main_PetMood, main_ActivityInProgress}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();
    const {GlobalTimer} = useGlobalTimer();
    const {Inventory, setInventory} = useInventory();

    const main_PetWindowLength = 20;

    const [main_Attention, set_Main_Attention] = useState(false);
    const [main_PetCurrentSpace, set_Main_PetCurrentSpace] = useState(Math.floor(Math.random() * main_PetWindowLength));
    const [main_PetDirection, set_Main_PetDirection] = useState(0);
    const [main_SleepAnimationImage, set_Main_SleepAnimationImage] = useState(0);

    const main_PetCurrentSpaceRef = useRef(main_PetCurrentSpace);
    const main_PetDirectionRef = useRef(main_PetDirection);
    const main_SleepAnimationImageRef = useRef(main_SleepAnimationImage);
    const main_TimeoutRef = useRef(null);

    const main_CurrHour = new Date(GlobalTimer).getHours();
    const main_PetSleeping = main_CurrHour < 6 || main_CurrHour >= 20;
        
    

    
    // For preloading images:
    useEffect(() => {

        const main_PreloadImages = [...main_AnimationImages.flat(1), main_SleepingImage, PetSleepingSymbol, PetUnhappySymbol, PetHappySymbol];

        main_PreloadImages.forEach((src) => {
        const main_Img = new Image();
            main_Img.src = src;
        });

    }, [main_AnimationImages]);


    useEffect(() => {
        main_PetCurrentSpaceRef.current = main_PetCurrentSpace;
    }, [main_PetCurrentSpace]);

    useEffect(() => {
        main_PetDirectionRef.current = main_PetDirection;
    }, [main_PetDirection]);


    useEffect(() => {
        main_SleepAnimationImageRef.current = main_SleepAnimationImage;
    }, [main_SleepAnimationImage]);



    useEffect(() => {

        if (main_Attention){
            
            let main_CurrSound;

            if (main_PetSleeping){

                main_CurrSound = main_PetAudios.current[petSoundSleepKey];

            } else {

                if (main_PetMood <= 1){

                    main_CurrSound = main_PetAudios.current[petSoundHappyKey];

                } else {

                    main_CurrSound = main_PetAudios.current[petSoundSadKey];

                }

            }

            main_CurrSound.volume = 0.75;
            main_CurrSound.play();
                
        }

    }, [main_Attention, main_PetMood])



    useEffect(() => {

        if (ActivePetName === "" || main_PetSleeping){

            return;

        }

        const main_Interval = setInterval(() => {

            main_PetPositionChange();

        }, main_PetEnergy);

        return () => clearInterval(main_Interval);

    }, [ActivePetName, main_PetSleeping]);




    const main_PetPositionChange = () => {

        if (main_PetCurrentSpaceRef.current === 0){

            set_Main_PetCurrentSpace(1);
            set_Main_PetDirection(1);

        } else if (main_PetCurrentSpaceRef.current === main_PetWindowLength - 1){

            set_Main_PetCurrentSpace(main_PetWindowLength - 2);
            set_Main_PetDirection(0);

        } else if (main_PetDirectionRef.current === 0){

            set_Main_PetCurrentSpace(prev => prev-1);

        } else if (main_PetDirectionRef.current === 1){

            set_Main_PetCurrentSpace(prev => prev+1);
            
        }

    }


    const main_ShowAttention = () => {

        if (ActivePetName === ""){

            return;

        } else {
                
            set_Main_Attention(true);

            // Cancels any existing timers:
            if (main_TimeoutRef.current) {
                clearTimeout(main_TimeoutRef.current);
            }

            // Starts a fresh 3s timer:
            main_TimeoutRef.current = setTimeout(() => {
                set_Main_Attention(false);
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
                                            onMouseEnter={() => main_ShowAttention()}
                                            src = {main_SleepingImage}
                                        />

                                        {main_Attention &&
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                            src = {PetSleepingSymbol} 
                                            onMouseEnter={() => main_ShowAttention()}
                                        />}
                                    </div>
                                </div>

                            ) : (

                                <div className="Main_ComponentContainer-Structure--WindowScreenGrid"> 
                                    {Array.from({ length: main_PetWindowLength }, (_, i) => i).map(index => {
                                        
                                        const main_PetHere = main_PetCurrentSpace === index;

                                        return(

                                            main_PetHere ? (

                                                <div key={index} 
                                                    className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenGridCellPet">
                                                    <img className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                                        src = {main_AnimationImages[main_PetDirection][index % 2]} 
                                                        onMouseEnter={() => main_ShowAttention()}
                                                    />

                                                    {main_Attention &&
                                                    <img
                                                        className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                                        src = {main_PetMood <= 1 ? PetHappySymbol : PetUnhappySymbol} 
                                                        onMouseEnter={() => main_ShowAttention()}
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