import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { startActivity } from "../../../helpers/Helpers.js";
import { playSound } from "../../../../../helpers/Helpers.js";
import { screenButtonPressSoundKey } from "../../../../../constants/Constants.js";

import Ball from "../../../../../images/Dog/Play/Games/Ball.png";
import Rock from "../../../../../images/Dog/Play/Games/Rock.png";
import Arrow from "../../../../../images/Dog/Play/Games/Arrow.png";

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

            startActivity(setStrollPatrolStart);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("ArrowUp", (e) => {
    
        if (strollPatrolStart){

            e.preventDefault();
            moveUp();

        }

    },
        ".Up"
    );


    useKeyboardShortcut("ArrowDown", (e) => {
    
        if (strollPatrolStart){

            e.preventDefault();
            moveDown();

        }

    },
        ".Down"
    );




    useEffect(() => {

        const preloadImages = [Ball, Rock];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
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

        const interval = setInterval(() => {


            setStrollPatrolObjectPositions(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                for (let i = 0; i< copy.length; i++){

                    copy[i][strollPatrolColumnKey] -= 1;

                }

                const newList = copy.filter(item => item[strollPatrolColumnKey] >= 0);
                

                if (!newList.some(item => item[strollPatrolColumnKey] > 3)){

                    newList.push({[strollPatrolColumnKey] : strollPatrolWindowWidth, [strollPatrolRowKey] : Math.floor(Math.random() * strollPatrolWindowHeight), [strollPatrolTypeKey] : Math.floor(Math.random() * 3)});

                }

                return newList;

            });

        }, 200);

        return () => clearInterval(interval);

    }, [strollPatrolStart]);

    
    useEffect(() => {

        const copy = strollPatrolObjectPositions.map(inner =>
            structuredClone(inner)
        );

        const hitIndex = copy.findIndex(item => item[strollPatrolRowKey] === strollPatrolDogPosition[strollPatrolRowKey] && item[strollPatrolColumnKey] === strollPatrolDogPosition[strollPatrolColumnKey]);
    
        if (hitIndex !== -1){

            if (copy[hitIndex][strollPatrolTypeKey] === 0){

                setPlayCurrNumber(prev => prev + 1);

            } else {

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            }

            copy.splice(hitIndex, 1);
            setStrollPatrolObjectPositions(copy);
            
        }

    }, [strollPatrolObjectPositions, strollPatrolDogPosition]);



    const moveUp = () => {

        playSound(screenButtonPressSoundKey);

        if (strollPatrolDogPosition[strollPatrolRowKey] > 0){

            setStrollPatrolDogPosition(prev => ({
                ...prev,
                [strollPatrolRowKey]: prev[strollPatrolRowKey] - 1
            }));

        }

    }

    const moveDown = () => {

        playSound(screenButtonPressSoundKey);
        
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
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setStrollPatrolStart)}> Start <br/> [return]</button>
            </div>}

            <div className="StrollPatrol_ComponentContainer-Template--Buttons">

                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Up" onClick = {() => moveUp()}> 
                    [&#x2B06;]
                </button>
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Down" onClick = {() => moveDown()}> 
                    [&#x2B07;]
                </button>

            </div>

            <div className="StrollPatrol_ComponentContainer-Structure--Grid">

                {Array.from({ length: strollPatrolWindowHeight}, (_, row) => 
                    Array.from({ length: strollPatrolWindowWidth}, (_, col) => {

                        const dogHere = col === strollPatrolDogPosition[strollPatrolColumnKey] && row === strollPatrolDogPosition[strollPatrolRowKey];
                        const badHere = strollPatrolObjectPositions.find(item => item[strollPatrolColumnKey] === col && item[strollPatrolRowKey] === row && item[strollPatrolTypeKey] > 0);
                        const goodHere = strollPatrolObjectPositions.find(item => item[strollPatrolColumnKey] === col && item[strollPatrolRowKey] === row && item[strollPatrolTypeKey] === 0);

                        return (
                                
                            dogHere || badHere || goodHere ? (

                                <img 
                                    key = {row + " & " + col} 
                                    className="StrollPatrol_ComponentContainer-Structure--GridCell" 
                                    src = {dogHere ? 
                                            Arrow
                                            : badHere ?
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