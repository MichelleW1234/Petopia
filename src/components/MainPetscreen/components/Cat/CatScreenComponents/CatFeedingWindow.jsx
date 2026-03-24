import {useState, useEffect, useRef} from "react";

import ProgressBar from "../../../../GlobalComponents/ProgressBar.jsx";

import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { feedingKey, speciesKey, stageKey, catTimeLimits } from "../../../../../constants/Constants.js";
import {CheckPetHealth} from "../../../../../helpers/Helpers.js";

import "./CatFeedingWindow.css";


function CatFeedingWindow ({menuOption, setMenuOption, setOpenFeedingFlag}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [selection, setSelection] = useState(-1);
    const [secondsAte, setSecondsAte] = useState(0);
    const [done, setDone] = useState(false);

    const [animationImage, setAnimationImage] = useState(0);

    const secondsAteRef = useRef(secondsAte);
    const animationImageRef = useRef(animationImage);


    useEffect(() => {
        secondsAteRef.current = secondsAte;
    }, [secondsAte]);


    useEffect(() => {
        animationImageRef.current = animationImage;
    }, [animationImage]);


    useEffect(() => {

        if (selection === -1 || done) {
            return;
        }

        const interval = setInterval(() => {
            const currSeconds = secondsAteRef.current + 1;
            setSecondsAte(currSeconds);
            if (currSeconds >= 10){
                setDone(true);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [selection, done]);


    useEffect(() => {

        if (selection === -1 || done) {
            return;
        }

        const interval = setInterval(() => {
            if (animationImageRef.current === 0) {
                setAnimationImage(1);
            } else {
                setAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [selection, done]);




    const manageHealth = () => {

        if (menuOption === selection){

            CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetName, catTimeLimits[feedingKey]/2, feedingKey, true);

        } else {
            
            CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetName, catTimeLimits[feedingKey]/2, feedingKey, false);

        }

        setMenuOption(-1);
        setOpenFeedingFlag(false);

    }



    return (

        <div className = "FloatingFlagBackground">
        
            <div className = {`PetWindowBorder PetWindowBorder-cat`}>

                {selection === -1 ? (

                    <>
                        <h2 className={`PetWindowSign PetWindowSign-cat`}> 
                            option: {menuOption}
                        </h2>
                        <div className= "CatFeedingWindowSelectionContainer">  

                            <button onClick = {() => setSelection(0)}> Option 1 </button>
                            <button onClick = {() => setSelection(1)}> Option 2 </button>
                            <button onClick = {() => setSelection(2)}> Option 3 </button>

                        </div>
                    </>
            
                ) : (

                    !done ? (

                        <>
                            <h2 className={`PetWindowSign PetWindowSign-cat`}> 
                                <ProgressBar
                                    percentageUntilNextUpdate={Math.round((secondsAte/10) * 100)}
                                />
                            </h2>
                            <div className= {`MainPetWindowGrid MainPetWindowGrid-cat`}>  

                                {innerScreenSpace.map((row, rowIndex) => (
                                    row.map((__, colIndex) => {

                                        return (

                                            rowIndex === 2 && colIndex === 3 ? (

                                                <img key={rowIndex + "," + colIndex} className = "MainPetWindowGridPetCell" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][animationImage]} />

                                            ) : (

                                                <div key={rowIndex + "," + colIndex} className = "MainPetWindowGridCell"></div>

                                            )

                                        )
                                    
                                    })
                                ))}

                            </div>

                        </>

                    ) : (

                        <>
                            <h2 className={`PetWindowSign PetWindowSign-cat`}> 
                                <ProgressBar
                                    percentageUntilNextUpdate={Math.round((secondsAte/10) * 100)}
                                />
                            </h2>
                            <div className= {`MainPetWindowGrid MainPetWindowGrid-cat`}>  

                                Finished!!

                            </div>
                        </>

                    )

                )}

            </div>

            {selection === -1 || !done ? (

                <button className = "GeneralNavButton" onClick = {() => setOpenFeedingFlag(false)}>Quit</button>

            ) : (

                <button className = "GeneralNavButton" onClick = {() => manageHealth()}>Done</button>

            )}

        </div>

    );

}


export default CatFeedingWindow;