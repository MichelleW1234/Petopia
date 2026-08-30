import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import { useInventory } from "../../../../providers/InventoryProvider.jsx";

import { petSpeciesCatKey, inventoryItemTypeCeilingDecorationKey, petSpeciesDogKey, inventoryItemTypeFloorDecorationKey, petSoundHappyKey, petSpeciesHealthCapList, petHealthKey, petSoundSadKey, inventoryItemImageKey, inventoryItemOwnerKey, inventoryItemTypeKey, petSoundSleepKey, petSpeciesKey, petStageKey, inventoryItemTypeWallDecorationKey, inventoryItemTypeRoomDecorationKey } from "../../../../constants/Constants.js";
import { petScreensHelpers_Canceller_PetImmersionSounds } from "../../helpers/Helpers.js";

import PetSleepingSymbol from "../../../../images/PetSleepingSymbol.gif";
import PetUnhappySymbol from "../../../../images/PetUnhappySymbol.gif";
import PetHappySymbol from "../../../../images/PetHappySymbol.gif";
import HealthyPetHeart from "../../../../images/HealthyPetHeart.png";
import UnhealthyPetHeart from "../../../../images/UnhealthyPetHeart.png";

import "./Main.css";



function Main ({main_Sequence_StageAnimationImages, main_Image_StageSleepAnimation, main_Sequence_AudioRefs, main_Number_PetEnergy, main_Number_Mood, main_Boolean_ActivityInProgress}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();
    const {GlobalTimer} = useGlobalTimer();
    const {Inventory, setInventory} = useInventory();

    const main_Number_WindowLength = 20;

    const [main_Boolean_GiveAttention, set_Main_Boolean_GiveAttention] = useState(false);
    const [main_Number_PetPosition, set_Main_Number_PetPosition] = useState(Math.floor(Math.random() * main_Number_WindowLength));
    const [main_Number_PetDirection, set_Main_Number_PetDirection] = useState(0);

    const main_Ref_PetPosition = useRef(main_Number_PetPosition);
    const main_Ref_PetDirection = useRef(main_Number_PetDirection);
    const main_Ref_Timeout = useRef(null);

    const main_Number_HourOfDay = new Date(GlobalTimer).getHours();
    const main_Boolean_PetSleeping = main_Number_HourOfDay < 6 || main_Number_HourOfDay >= 20;
        
    

    
    // For preloading images:
    useEffect(() => {

        const bound_Sequence_PreloadImages = [...main_Sequence_StageAnimationImages.flat(1), main_Image_StageSleepAnimation, PetSleepingSymbol, PetUnhappySymbol, PetHappySymbol];

        bound_Sequence_PreloadImages.forEach((src) => {
            const bound_Image_CurrImageToLoad = new Image();
            bound_Image_CurrImageToLoad.src = src;
        });

    }, [main_Sequence_StageAnimationImages]);


    useEffect(() => {
        main_Ref_PetPosition.current = main_Number_PetPosition;
    }, [main_Number_PetPosition]);

    useEffect(() => {
        main_Ref_PetDirection.current = main_Number_PetDirection;
    }, [main_Number_PetDirection]);



    useEffect(() => {

        if (main_Boolean_GiveAttention){
            
            let bound_Audio_CurrPetSound;

            if (main_Boolean_PetSleeping){

                bound_Audio_CurrPetSound = main_Sequence_AudioRefs.current[petSoundSleepKey];

            } else {

                if (main_Number_Mood === 1){

                    bound_Audio_CurrPetSound = main_Sequence_AudioRefs.current[petSoundHappyKey];

                } else {

                    bound_Audio_CurrPetSound = main_Sequence_AudioRefs.current[petSoundSadKey];

                }

            }

            bound_Audio_CurrPetSound.volume = 0.75;
            bound_Audio_CurrPetSound.play();
                
        }

    }, [main_Boolean_GiveAttention, main_Number_Mood])



    useEffect(() => {

        if (ActivePetName === "" || main_Boolean_PetSleeping){

            return;

        }

        const main_Interval = setInterval(() => {

            main_Shifter_PetPosition();

        }, main_Number_PetEnergy);

        return () => clearInterval(main_Interval);

    }, [ActivePetName, main_Boolean_PetSleeping]);




    const main_Shifter_PetPosition = () => {

        if (main_Ref_PetPosition.current === 0){

            set_Main_Number_PetPosition(1);
            set_Main_Number_PetDirection(1);

        } else if (main_Ref_PetPosition.current === main_Number_WindowLength - 1){

            set_Main_Number_PetPosition(main_Number_WindowLength - 2);
            set_Main_Number_PetDirection(0);

        } else if (main_Ref_PetDirection.current === 0){

            set_Main_Number_PetPosition(prev => prev-1);

        } else if (main_Ref_PetDirection.current === 1){

            set_Main_Number_PetPosition(prev => prev+1);
            
        }

    }


    const main_Timer_EmotionExpression = () => {

        if (ActivePetName === ""){

            return;

        } else {
                
            set_Main_Boolean_GiveAttention(true);

            // Cancels any existing timers:
            if (main_Ref_Timeout.current) {
                clearTimeout(main_Ref_Timeout.current);
            }

            // Starts a fresh 3s timer:
            main_Ref_Timeout.current = setTimeout(() => {
                set_Main_Boolean_GiveAttention(false);
                main_Ref_Timeout.current = null;
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

                        main_Boolean_ActivityInProgress ? (

                            <div className= "Main_ComponentContainer-Structure--WindowScreenNongrid"></div>

                        ) : (

                            main_Boolean_PetSleeping ? (

                                <div className="Main_ComponentContainer-Structure--WindowScreenNongrid"> 

                                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenNongridPet">
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                            onMouseEnter={() => main_Timer_EmotionExpression()}
                                            src = {main_Image_StageSleepAnimation}
                                        />

                                        {main_Boolean_GiveAttention &&
                                        <img
                                            className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                            src = {PetSleepingSymbol} 
                                            onMouseEnter={() => main_Timer_EmotionExpression()}
                                        />}
                                    </div>
                                </div>

                            ) : (

                                <div className="Main_ComponentContainer-Structure--WindowScreenGrid"> 
                                    {Array.from({ length: main_Number_WindowLength }, (_, i) => i).map(index => {
                                        
                                        const bound_Boolean_PetHere = main_Number_PetPosition === index;

                                        return(

                                            bound_Boolean_PetHere ? (

                                                <div key={index} 
                                                    className = "MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Main_ComponentContainer-Structure--WindowScreenGridCellPet">
                                                    <img className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayBase"
                                                        src = {main_Sequence_StageAnimationImages[main_Number_PetDirection][index % 2]} 
                                                        onMouseEnter={() => main_Timer_EmotionExpression()}
                                                    />

                                                    {main_Boolean_GiveAttention &&
                                                    <img
                                                        className="MiscellaneousElements_ComponentImage-Structure--GlobalImageOverlayLayer"
                                                        src = {main_Number_Mood <= 1 ? PetHappySymbol : PetUnhappySymbol} 
                                                        onMouseEnter={() => main_Timer_EmotionExpression()}
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