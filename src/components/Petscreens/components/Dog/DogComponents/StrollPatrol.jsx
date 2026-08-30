import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petScreensHelpers_Starter_Activities } from "../../../helpers/Helpers.js";
import { helpers_Player_UIIndicatorSounds } from "../../../../../helpers/Helpers.js";
import { audioScreenButtonPressKey } from "../../../../../constants/Constants.js";

import Ball from "../../../../../images/Dog/Play/Games/StrollPatrol/Ball.png";
import Rock from "../../../../../images/Dog/Play/Games/StrollPatrol/Rock.png";
import Arrow from "../../../../../images/Dog/Play/Games/StrollPatrol/Arrow.png";

import "./StrollPatrol.css";




function StrollPatrol({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef}) {

    const strollPatrol_WindowWidth = 8;
    const strollPatrol_WindowHeight = 5;

    const strollPatrol_RowKey = "row";
    const strollPatrol_ColumnKey = "column";
    const strollPatrol_TypeKey = "type";

    const [strollPatrol_Start, set_StrollPatrol_Start] = useState(false);
    const [strollPatrol_CurrObjectPositions, set_StrollPatrol_CurrObjectPositions] = useState([]);
    const [strollPatrol_CurrDogPosition, set_StrollPatrol_CurrDogPosition] = useState({[strollPatrol_ColumnKey] : 4, [strollPatrol_RowKey] : 2});


    useKeyboardShortcut("Enter", () => {
    
        if (!strollPatrol_Start){

            petScreensHelpers_Starter_Activities(set_StrollPatrol_Start);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("ArrowUp", (e) => {
    
        if (strollPatrol_Start){

            e.preventDefault();
            strollPatrol_UpwardsShifter();

        }

    },
        ".Up"
    );


    useKeyboardShortcut("ArrowDown", (e) => {
    
        if (strollPatrol_Start){

            e.preventDefault();
            strollPatrol_DownwardsShifter();

        }

    },
        ".Down"
    );




    useEffect(() => {

        const strollPatrol_CurrPreloadImages = [Ball, Rock];

        strollPatrol_CurrPreloadImages.forEach((src) => {
        const strollPatrol_Img = new Image();
            strollPatrol_Img.src = src;
        });

    }, []);

    useEffect(() => {

        if (!strollPatrol_Start) {
            return;
        }

        play_AudioRef.current.loop = true;
        play_AudioRef.current.play();

        return () => {
            play_AudioRef.current.pause();
            play_AudioRef.current.currentTime = 0;
            play_AudioRef.current.loop = false;
        };

    }, [strollPatrol_Start]);


    useEffect(() => {

        if (!strollPatrol_Start){

            return;

        } 

        const strollPatrol_Interval = setInterval(() => {

            set_StrollPatrol_CurrObjectPositions(prev => {

                const strollPatrol_Interval_CurrCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                for (let strollPatrol_Interval_CurrI = 0; strollPatrol_Interval_CurrI< strollPatrol_Interval_CurrCopy.length; strollPatrol_Interval_CurrI++){

                    strollPatrol_Interval_CurrCopy[strollPatrol_Interval_CurrI][strollPatrol_ColumnKey] -= 1;

                }

                const strollPatrol_Interval_CurrFilteredCopy = strollPatrol_Interval_CurrCopy.filter(item => item[strollPatrol_ColumnKey] >= 0);
                

                if (!strollPatrol_Interval_CurrFilteredCopy.some(item => item[strollPatrol_ColumnKey] > 3)){

                    strollPatrol_Interval_CurrFilteredCopy.push({[strollPatrol_ColumnKey] : strollPatrol_WindowWidth, [strollPatrol_RowKey] : Math.floor(Math.random() * strollPatrol_WindowHeight), [strollPatrol_TypeKey] : Math.floor(Math.random() * 3)});

                }

                return strollPatrol_Interval_CurrFilteredCopy;

            });

        }, 200);

        return () => clearInterval(strollPatrol_Interval);

    }, [strollPatrol_Start]);

    
    useEffect(() => {

        const strollPatrol_CurrCopy = strollPatrol_CurrObjectPositions.map(inner =>
            structuredClone(inner)
        );

        const strollPatrol_CurrHitIndex = strollPatrol_CurrCopy.findIndex(item => item[strollPatrol_RowKey] === strollPatrol_CurrDogPosition[strollPatrol_RowKey] && item[strollPatrol_ColumnKey] === strollPatrol_CurrDogPosition[strollPatrol_ColumnKey]);
    
        if (strollPatrol_CurrHitIndex !== -1){

            if (strollPatrol_CurrCopy[strollPatrol_CurrHitIndex][strollPatrol_TypeKey] === 0){

                set_Play_CurrNumber(prev => prev + 1);

            } else {

                set_Play_CurrNumber(prev => Math.max(prev - 1, 0));

            }

            strollPatrol_CurrCopy.splice(strollPatrol_CurrHitIndex, 1);
            set_StrollPatrol_CurrObjectPositions(strollPatrol_CurrCopy);
            
        }

    }, [strollPatrol_CurrObjectPositions, strollPatrol_CurrDogPosition]);



    const strollPatrol_UpwardsShifter = () => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        if (strollPatrol_CurrDogPosition[strollPatrol_RowKey] > 0){

            set_StrollPatrol_CurrDogPosition(prev => ({
                ...prev,
                [strollPatrol_RowKey]: prev[strollPatrol_RowKey] - 1
            }));

        }

    }

    const strollPatrol_DownwardsShifter = () => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);
        
        if (strollPatrol_CurrDogPosition[strollPatrol_RowKey] < strollPatrol_WindowHeight-1){

            set_StrollPatrol_CurrDogPosition(prev => ({
                ...prev,
                [strollPatrol_RowKey]: prev[strollPatrol_RowKey] + 1
            }));

        }

    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen StrollPatrol_ComponentContainer-Template--Screen">

            {!strollPatrol_Start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Lead the Arrow on your walk to collect all the balls. Avoid the rocks.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpers_Starter_Activities(set_StrollPatrol_Start)}> Start <br/> [return]</button>
            </div>}

            <div className="StrollPatrol_ComponentContainer-Template--Buttons">
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Up" onClick = {() => strollPatrol_UpwardsShifter()}> 
                    [&#x2B06;]
                </button>
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Down" onClick = {() => strollPatrol_DownwardsShifter()}> 
                    [&#x2B07;]
                </button>
            </div>

            <div className="StrollPatrol_ComponentContainer-Structure--Grid">

                {Array.from({ length: strollPatrol_WindowHeight}, (_, row) => 
                    Array.from({ length: strollPatrol_WindowWidth}, (_, col) => {

                        const strollPatrol_DogHere = col === strollPatrol_CurrDogPosition[strollPatrol_ColumnKey] && row === strollPatrol_CurrDogPosition[strollPatrol_RowKey];
                        const strollPatrol_RockHere = strollPatrol_CurrObjectPositions.find(item => item[strollPatrol_ColumnKey] === col && item[strollPatrol_RowKey] === row && item[strollPatrol_TypeKey] > 0);
                        const strollPatrol_BallHere = strollPatrol_CurrObjectPositions.find(item => item[strollPatrol_ColumnKey] === col && item[strollPatrol_RowKey] === row && item[strollPatrol_TypeKey] === 0);

                        return (
                                
                            strollPatrol_DogHere || strollPatrol_RockHere || strollPatrol_BallHere ? (

                                <img 
                                    key = {row + " & " + col} 
                                    className="StrollPatrol_ComponentContainer-Structure--GridCell" 
                                    src = {strollPatrol_DogHere ? 
                                            Arrow
                                            : strollPatrol_RockHere ?
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