import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petScreensHelpersStartActivity } from "../../../helpers/Helpers.js";
import { helpersPlaySound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey } from "../../../../../constants/Constants.js";

import Ball from "../../../../../images/Dog/Play/Games/StrollPatrol/Ball.png";
import Rock from "../../../../../images/Dog/Play/Games/StrollPatrol/Rock.png";
import Arrow from "../../../../../images/Dog/Play/Games/StrollPatrol/Arrow.png";

import "./StrollPatrol.css";




function StrollPatrol({ playCurrNumber, setPlayCurrNumber, playAudioRef}) {

    const strollPatrolWindowWidth = 8;
    const strollPatrolWindowHeight = 5;

    const strollPatrolRowKey = "row";
    const strollPatrolColumnKey = "column";
    const strollPatrolTypeKey = "type";

    const [strollPatrolStart, setStrollPatrolStart] = useState(false);
    const [strollPatrolObjectPositions, setStrollPatrolObjectPositions] = useState([]);
    const [strollPatrolDogPosition, setStrollPatrolDogPosition] = useState({[strollPatrolColumnKey] : 4, [strollPatrolRowKey] : 2});


    useKeyboardShortcut("Enter", () => {
    
        if (!strollPatrolStart){

            petScreensHelpersStartActivity(setStrollPatrolStart);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("ArrowUp", (e) => {
    
        if (strollPatrolStart){

            e.preventDefault();
            strollPatrolMoveUp();

        }

    },
        ".Up"
    );


    useKeyboardShortcut("ArrowDown", (e) => {
    
        if (strollPatrolStart){

            e.preventDefault();
            strollPatrolMoveDown();

        }

    },
        ".Down"
    );




    useEffect(() => {

        const strollPatrolPreloadImages = [Ball, Rock];

        strollPatrolPreloadImages.forEach((src) => {
        const strollPatrolImg = new Image();
            strollPatrolImg.src = src;
        });

    }, []);

    useEffect(() => {

        if (!strollPatrolStart) {
            return;
        }

        playAudioRef.current.loop = true;
        playAudioRef.current.play();

        return () => {
            playAudioRef.current.pause();
            playAudioRef.current.currentTime = 0;
            playAudioRef.current.loop = false;
        };

    }, [strollPatrolStart]);


    useEffect(() => {

        if (!strollPatrolStart){

            return;

        } 

        const strollPatrolInterval = setInterval(() => {

            setStrollPatrolObjectPositions(prev => {

                const strollPatrolIntervalCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                for (let strollPatrolIntervalI = 0; strollPatrolIntervalI< strollPatrolIntervalCopy.length; strollPatrolIntervalI++){

                    strollPatrolIntervalCopy[strollPatrolIntervalI][strollPatrolColumnKey] -= 1;

                }

                const strollPatrolIntervalNewList = strollPatrolIntervalCopy.filter(item => item[strollPatrolColumnKey] >= 0);
                

                if (!strollPatrolIntervalNewList.some(item => item[strollPatrolColumnKey] > 3)){

                    strollPatrolIntervalNewList.push({[strollPatrolColumnKey] : strollPatrolWindowWidth, [strollPatrolRowKey] : Math.floor(Math.random() * strollPatrolWindowHeight), [strollPatrolTypeKey] : Math.floor(Math.random() * 3)});

                }

                return strollPatrolIntervalNewList;

            });

        }, 200);

        return () => clearInterval(strollPatrolInterval);

    }, [strollPatrolStart]);

    
    useEffect(() => {

        const strollPatrolCopy = strollPatrolObjectPositions.map(inner =>
            structuredClone(inner)
        );

        const strollPatrolHitIndex = strollPatrolCopy.findIndex(item => item[strollPatrolRowKey] === strollPatrolDogPosition[strollPatrolRowKey] && item[strollPatrolColumnKey] === strollPatrolDogPosition[strollPatrolColumnKey]);
    
        if (strollPatrolHitIndex !== -1){

            if (strollPatrolCopy[strollPatrolHitIndex][strollPatrolTypeKey] === 0){

                setPlayCurrNumber(prev => prev + 1);

            } else {

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            }

            strollPatrolCopy.splice(strollPatrolHitIndex, 1);
            setStrollPatrolObjectPositions(strollPatrolCopy);
            
        }

    }, [strollPatrolObjectPositions, strollPatrolDogPosition]);



    const strollPatrolMoveUp = () => {

        helpersPlaySound(soundScreenButtonPressKey);

        if (strollPatrolDogPosition[strollPatrolRowKey] > 0){

            setStrollPatrolDogPosition(prev => ({
                ...prev,
                [strollPatrolRowKey]: prev[strollPatrolRowKey] - 1
            }));

        }

    }

    const strollPatrolMoveDown = () => {

        helpersPlaySound(soundScreenButtonPressKey);
        
        if (strollPatrolDogPosition[strollPatrolRowKey] < strollPatrolWindowHeight-1){

            setStrollPatrolDogPosition(prev => ({
                ...prev,
                [strollPatrolRowKey]: prev[strollPatrolRowKey] + 1
            }));

        }

    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen StrollPatrol_ComponentContainer-Template--Screen">

            {!strollPatrolStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Lead the Arrow on your walk to collect all the balls. Avoid the rocks.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpersStartActivity(setStrollPatrolStart)}> Start <br/> [return]</button>
            </div>}

            <div className="StrollPatrol_ComponentContainer-Template--Buttons">
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Up" onClick = {() => strollPatrolMoveUp()}> 
                    [&#x2B06;]
                </button>
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Down" onClick = {() => strollPatrolMoveDown()}> 
                    [&#x2B07;]
                </button>
            </div>

            <div className="StrollPatrol_ComponentContainer-Structure--Grid">

                {Array.from({ length: strollPatrolWindowHeight}, (_, row) => 
                    Array.from({ length: strollPatrolWindowWidth}, (_, col) => {

                        const strollPatrolDogHere = col === strollPatrolDogPosition[strollPatrolColumnKey] && row === strollPatrolDogPosition[strollPatrolRowKey];
                        const strollPatrolBadHere = strollPatrolObjectPositions.find(item => item[strollPatrolColumnKey] === col && item[strollPatrolRowKey] === row && item[strollPatrolTypeKey] > 0);
                        const strollPatrolGoodHere = strollPatrolObjectPositions.find(item => item[strollPatrolColumnKey] === col && item[strollPatrolRowKey] === row && item[strollPatrolTypeKey] === 0);

                        return (
                                
                            strollPatrolDogHere || strollPatrolBadHere || strollPatrolGoodHere ? (

                                <img 
                                    key = {row + " & " + col} 
                                    className="StrollPatrol_ComponentContainer-Structure--GridCell" 
                                    src = {strollPatrolDogHere ? 
                                            Arrow
                                            : strollPatrolBadHere ?
                                            Rock
                                            : Ball
                                    }
                                />
                                
                            ) : (

                                <div key = {row + " & " + col} className="StrollPatrol_ComponentContainer-Structure--GridCell"></div>
        
                            )
                        
                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default StrollPatrol;