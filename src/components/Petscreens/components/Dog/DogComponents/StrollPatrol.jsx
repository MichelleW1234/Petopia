import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petScreensHelpers_StartActivity } from "../../../helpers/Helpers.js";
import { helpers_PlaySound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey } from "../../../../../constants/Constants.js";

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
    const [strollPatrol_ObjectPositions, set_StrollPatrol_ObjectPositions] = useState([]);
    const [strollPatrol_DogPosition, set_StrollPatrol_DogPosition] = useState({[strollPatrol_ColumnKey] : 4, [strollPatrol_RowKey] : 2});


    useKeyboardShortcut("Enter", () => {
    
        if (!strollPatrol_Start){

            petScreensHelpers_StartActivity(set_StrollPatrol_Start);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("ArrowUp", (e) => {
    
        if (strollPatrol_Start){

            e.preventDefault();
            strollPatrol_MoveUp();

        }

    },
        ".Up"
    );


    useKeyboardShortcut("ArrowDown", (e) => {
    
        if (strollPatrol_Start){

            e.preventDefault();
            strollPatrol_MoveDown();

        }

    },
        ".Down"
    );




    useEffect(() => {

        const strollPatrol_PreloadImages = [Ball, Rock];

        strollPatrol_PreloadImages.forEach((src) => {
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

            set_StrollPatrol_ObjectPositions(prev => {

                const strollPatrol_Interval_Copy = prev.map(inner =>
                    structuredClone(inner)
                );

                for (let strollPatrol_Interval_I = 0; strollPatrol_Interval_I< strollPatrol_Interval_Copy.length; strollPatrol_Interval_I++){

                    strollPatrol_Interval_Copy[strollPatrol_Interval_I][strollPatrol_ColumnKey] -= 1;

                }

                const strollPatrol_Interval_NewList = strollPatrol_Interval_Copy.filter(item => item[strollPatrol_ColumnKey] >= 0);
                

                if (!strollPatrol_Interval_NewList.some(item => item[strollPatrol_ColumnKey] > 3)){

                    strollPatrol_Interval_NewList.push({[strollPatrol_ColumnKey] : strollPatrol_WindowWidth, [strollPatrol_RowKey] : Math.floor(Math.random() * strollPatrol_WindowHeight), [strollPatrol_TypeKey] : Math.floor(Math.random() * 3)});

                }

                return strollPatrol_Interval_NewList;

            });

        }, 200);

        return () => clearInterval(strollPatrol_Interval);

    }, [strollPatrol_Start]);

    
    useEffect(() => {

        const strollPatrol_Copy = strollPatrol_ObjectPositions.map(inner =>
            structuredClone(inner)
        );

        const strollPatrol_HitIndex = strollPatrol_Copy.findIndex(item => item[strollPatrol_RowKey] === strollPatrol_DogPosition[strollPatrol_RowKey] && item[strollPatrol_ColumnKey] === strollPatrol_DogPosition[strollPatrol_ColumnKey]);
    
        if (strollPatrol_HitIndex !== -1){

            if (strollPatrol_Copy[strollPatrol_HitIndex][strollPatrol_TypeKey] === 0){

                set_Play_CurrNumber(prev => prev + 1);

            } else {

                set_Play_CurrNumber(prev => Math.max(prev - 1, 0));

            }

            strollPatrol_Copy.splice(strollPatrol_HitIndex, 1);
            set_StrollPatrol_ObjectPositions(strollPatrol_Copy);
            
        }

    }, [strollPatrol_ObjectPositions, strollPatrol_DogPosition]);



    const strollPatrol_MoveUp = () => {

        helpers_PlaySound(soundScreenButtonPressKey);

        if (strollPatrol_DogPosition[strollPatrol_RowKey] > 0){

            set_StrollPatrol_DogPosition(prev => ({
                ...prev,
                [strollPatrol_RowKey]: prev[strollPatrol_RowKey] - 1
            }));

        }

    }

    const strollPatrol_MoveDown = () => {

        helpers_PlaySound(soundScreenButtonPressKey);
        
        if (strollPatrol_DogPosition[strollPatrol_RowKey] < strollPatrol_WindowHeight-1){

            set_StrollPatrol_DogPosition(prev => ({
                ...prev,
                [strollPatrol_RowKey]: prev[strollPatrol_RowKey] + 1
            }));

        }

    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen StrollPatrol_ComponentContainer-Template--Screen">

            {!strollPatrol_Start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Lead the Arrow on your walk to collect all the balls. Avoid the rocks.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpers_StartActivity(set_StrollPatrol_Start)}> Start <br/> [return]</button>
            </div>}

            <div className="StrollPatrol_ComponentContainer-Template--Buttons">
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Up" onClick = {() => strollPatrol_MoveUp()}> 
                    [&#x2B06;]
                </button>
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Down" onClick = {() => strollPatrol_MoveDown()}> 
                    [&#x2B07;]
                </button>
            </div>

            <div className="StrollPatrol_ComponentContainer-Structure--Grid">

                {Array.from({ length: strollPatrol_WindowHeight}, (_, row) => 
                    Array.from({ length: strollPatrol_WindowWidth}, (_, col) => {

                        const strollPatrol_DogHere = col === strollPatrol_DogPosition[strollPatrol_ColumnKey] && row === strollPatrol_DogPosition[strollPatrol_RowKey];
                        const strollPatrol_BadHere = strollPatrol_ObjectPositions.find(item => item[strollPatrol_ColumnKey] === col && item[strollPatrol_RowKey] === row && item[strollPatrol_TypeKey] > 0);
                        const strollPatrol_GoodHere = strollPatrol_ObjectPositions.find(item => item[strollPatrol_ColumnKey] === col && item[strollPatrol_RowKey] === row && item[strollPatrol_TypeKey] === 0);

                        return (
                                
                            strollPatrol_DogHere || strollPatrol_BadHere || strollPatrol_GoodHere ? (

                                <img 
                                    key = {row + " & " + col} 
                                    className="StrollPatrol_ComponentContainer-Structure--GridCell" 
                                    src = {strollPatrol_DogHere ? 
                                            Arrow
                                            : strollPatrol_BadHere ?
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