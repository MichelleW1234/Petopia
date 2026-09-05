import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petScreensHelpers_Starter_Activities } from "../../../helpers/Helpers.js";
import { helpers_Player_UIIndicatorSounds } from "../../../../../helpers/Helpers.js";
import { audioScreenButtonPressKey } from "../../../../../constants/Constants.js";

import Ball from "../../../../../images/Dog/Play/Games/StrollPatrol/Ball.png";
import Rock from "../../../../../images/Dog/Play/Games/StrollPatrol/Rock.png";

import "./StrollPatrol.css";




function StrollPatrol({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef}) {

    const strollPatrol_WindowWidth = 8;
    const strollPatrol_WindowHeight = 4;

    const strollPatrol_RowKey = "row";
    const strollPatrol_ColumnKey = "column";
    const strollPatrol_TypeKey = "type";

    const [strollPatrol_Start, set_StrollPatrol_Start] = useState(false);
    const [strollPatrol_CurrObjectPositions, set_StrollPatrol_CurrObjectPositions] = useState([]);


    useKeyboardShortcut("Enter", () => {
    
        if (!strollPatrol_Start){

            petScreensHelpers_Starter_Activities(set_StrollPatrol_Start);

        }

    },
        ".Start"
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
                

                if (!strollPatrol_Interval_CurrFilteredCopy.some(item => item[strollPatrol_ColumnKey] > 6)){

                    strollPatrol_Interval_CurrFilteredCopy.push({[strollPatrol_ColumnKey] : strollPatrol_WindowWidth, [strollPatrol_RowKey] : Math.floor(Math.random() * strollPatrol_WindowHeight), [strollPatrol_TypeKey] : Math.floor(Math.random() * 3)});

                }

                return strollPatrol_Interval_CurrFilteredCopy;

            });

        }, 200);

        return () => clearInterval(strollPatrol_Interval);

    }, [strollPatrol_Start]);


    const strollPatrol_HitManager = (row, col, type) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        set_StrollPatrol_CurrObjectPositions(prev => {

            const strollPatrol_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            const hitIndex = strollPatrol_CurrCopy.findIndex(position => position[strollPatrol_RowKey] === row && position[strollPatrol_ColumnKey] === col);

            strollPatrol_CurrCopy.splice(hitIndex, 1);

            return strollPatrol_CurrCopy;

        });


        if (type === 0){

            set_Play_CurrNumber(prev => prev + 1);

        } else {

            set_Play_CurrNumber(prev => Math.max(prev - 1, 0));

        }

    }


    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen StrollPatrol_ComponentContainer-Template--Screen">

            {!strollPatrol_Start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Instructions: Click on all the balls to collect them. Avoid the rocks.</h2> 
                <button className = "UIStapleElements_ComponentButtonRectangle-Structure--GlobalClick UIStapleElements_ComponentButtonRectangle-Color--GlobalClick Start" onClick = {() => petScreensHelpers_Starter_Activities(set_StrollPatrol_Start)}> X </button>
            </div>}

            <div className="StrollPatrol_ComponentContainer-Structure--Grid">

                {Array.from({ length: strollPatrol_WindowHeight}, (_, row) => 
                    Array.from({ length: strollPatrol_WindowWidth}, (_, col) => {

                        const strollPatrol_RockHere = strollPatrol_CurrObjectPositions.find(item => item[strollPatrol_ColumnKey] === col && item[strollPatrol_RowKey] === row && item[strollPatrol_TypeKey] > 0);
                        const strollPatrol_BallHere = strollPatrol_CurrObjectPositions.find(item => item[strollPatrol_ColumnKey] === col && item[strollPatrol_RowKey] === row && item[strollPatrol_TypeKey] === 0);

                        return (

                            strollPatrol_BallHere ? (

                                <img 
                                    key = {row + " & " + col} 
                                    className="StrollPatrol_ComponentContainer-Structure--GridCell" 
                                    src = {Ball}
                                    onClick = {() => strollPatrol_HitManager(row, col, 0)}
                                />

                            ) : strollPatrol_RockHere ? (

                                <img 
                                    key = {row + " & " + col} 
                                    className="StrollPatrol_ComponentContainer-Structure--GridCell" 
                                    src = {Rock}
                                    onClick = {() => strollPatrol_HitManager(row, col, 1)}
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