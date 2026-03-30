import {useState, useEffect, useRef} from "react";

import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import heart from "../../../../../images/placeholderheart.png";
import anger from "../../../../../images/placeholderangry.png";
import happy from "../../../../../images/placeholderhappy.jpg";
import neutral from "../../../../../images/placeholderneutral.jpg";
import sad from "../../../../../images/placeholdersad.png";
import verySad from "../../../../../images/placeholderverysad.png";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { healthKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";

import "./Main.css";

function Main ({homePetEnergy, homePetMood, homeActivityInProgress}){


    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const homeInnerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [homeAttention, setHomeAttention] = useState(false);
    const [homePetCurrentSpace, setHomePetCurrentSpace] = useState(Math.floor(Math.random() * 8));

    const homePetCurrentSpaceRef = useRef(homePetCurrentSpace);
    const homePetDirectionRef = useRef(0);
    const homeTimeoutRef = useRef(null);
    



    useEffect(() => {
        homePetCurrentSpaceRef.current = homePetCurrentSpace;
    }, [homePetCurrentSpace]);

    useEffect(() => {

        if (ActivePetName === ""){

            return;

        } else {

            const interval = setInterval(() => {
                petPositionChange();
            }, homePetEnergy);

            return () => clearInterval(interval);

        }

    }, [ActivePetName]);





    const petPositionChange = () => {

        if (homePetCurrentSpaceRef.current === 0){

            setHomePetCurrentSpace(1);
            homePetDirectionRef.current = 1;

        } else if (homePetCurrentSpaceRef.current === 7){

            setHomePetCurrentSpace(6);
            homePetDirectionRef.current = 0;

        } else if (homePetDirectionRef.current === 0){

            setHomePetCurrentSpace(prev => prev-1);

        } else if (homePetDirectionRef.current === 1){

            setHomePetCurrentSpace(prev => prev+1);
            
        }

    }


    const showAttention = () => {

        if (ActivePetName === ""){

            return;

        } else {
                 
            setHomeAttention(true);

            // Cancels any existing timers:
            if (homeTimeoutRef.current) {
                clearTimeout(homeTimeoutRef.current);
            }

            // Starts a fresh 3s timer:
            homeTimeoutRef.current = setTimeout(() => {
                setHomeAttention(false);
                homeTimeoutRef.current = null;
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

            ) : PetList[ActivePetName][healthKey] > 0 ? (

                !homeActivityInProgress ? (

                    <div className= {`MainPetWindowGrid MainPetWindowGrid-${PetList[ActivePetName][speciesKey]}`}>  

                        {homeInnerScreenSpace.map((row, rowIndex) => (
                            row.map((__, colIndex) => {

                                const petHere = rowIndex === 2 && homePetCurrentSpace === colIndex;
                                const quotationHere = rowIndex === 1 && homePetCurrentSpace === colIndex;
                                
                                return (

                                    petHere ? (

                                        homePetDirectionRef.current === 0 ? (

                                            colIndex%2 === 0 ? (

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} onMouseEnter={() => showAttention()}/>

                                            ):(

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][1]} onMouseEnter={() => showAttention()}/>

                                            )

                                        ) : (

                                            colIndex%2 === 1 ? (

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][2]} onMouseEnter={() => showAttention()}/>

                                            ):(

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][3]} onMouseEnter={() => showAttention()}/>

                                            )

                                        )

                                    ) : quotationHere ? (

                                        homePetMood === 0 ? (

                                            <img key={rowIndex + "," + colIndex} src = {homeAttention ? heart: happy} className = "MainPetWindowGridQuotationCell"/>

                                        ) : homePetMood === 1 ? (

                                            <img key={rowIndex + "," + colIndex} src = {homeAttention ? heart: neutral} className = "MainPetWindowGridQuotationCell"/>

                                        ) : homePetMood === 2 ? (

                                            <img key={rowIndex + "," + colIndex} src = {homeAttention ?  anger: sad} className = "MainPetWindowGridQuotationCell"/>

                                        ) : (

                                            <img key={rowIndex + "," + colIndex} src = {homeAttention ? anger: verySad} className = "MainPetWindowGridQuotationCell"/>

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

        </div>

    );

}


export default Main;