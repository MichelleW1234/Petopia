import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { helpers_Player_UIIndicatorSounds } from "../../../../../helpers/Helpers.js";
import { audioScreenButtonPressKey, audioStartActivityKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_Starter_Activities } from "../../../helpers/Helpers.js";

import Mouse from "../../../../../images/Cat/Play/Games/MouseHunt/Mouse.png";
import Cord from "../../../../../images/Cat/Play/Games/MouseHunt/Cord.png";

import "./MouseHunt.css";




function MouseHunt({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef }) {

    const mouseHunt_WindowWidth = 2;
    const mouseHunt_WindowHeight = 4;
    const mouseHunt_TotalObjects = 3;

    const mouseHunt_RowKey = "row";
    const mouseHunt_ColumnKey = "column";
    const mouseHunt_TypeKey = "type";

    const [mouseHunt_Start, set_MouseHunt_Start] = useState(false);
    const [mouseHunt_CurrObjectPositions, set_MouseHunt_CurrObjectPositions] = useState([]);
    const [mouseHunt_HitAttempt, set_MouseHunt_HitAttempt] = useState(false);


    useKeyboardShortcut("Enter", () => {
    
        if (!mouseHunt_Start){

            petScreensHelpers_Starter_Activities(set_MouseHunt_Start);

        }

    },
        ".Start"
    );

    


    useEffect(() => {

        if (!mouseHunt_Start) {
            return;
        }

        play_AudioRef.current.loop = true;
        play_AudioRef.current.play();

        return () => {
            play_AudioRef.current.pause();
            play_AudioRef.current.currentTime = 0;
            play_AudioRef.current.loop = false;
        };

    }, [mouseHunt_Start]);



    useEffect(() => {

        if (!mouseHunt_Start){

            return;

        } 

        const mouseHunt_Interval = setInterval(() => {

            set_MouseHunt_CurrObjectPositions(prev => {

                const mouseHunt_Interval_AllPositions = Array.from({ length: mouseHunt_WindowHeight }, (_, a) =>
                    Array.from({ length: mouseHunt_WindowWidth }, (_, b) => [a, b])
                    ).flat();

                for (let mouseHunt_Interval_CurrI = mouseHunt_Interval_AllPositions.length - 1; mouseHunt_Interval_CurrI > 0; mouseHunt_Interval_CurrI--) {
                    const mouseHunt_Interval_CurrJ = Math.floor(Math.random() * (mouseHunt_Interval_CurrI + 1));
                    [mouseHunt_Interval_AllPositions[mouseHunt_Interval_CurrI], mouseHunt_Interval_AllPositions[mouseHunt_Interval_CurrJ]] = [mouseHunt_Interval_AllPositions[mouseHunt_Interval_CurrJ], mouseHunt_Interval_AllPositions[mouseHunt_Interval_CurrI]];
                }

                const mouseHunt_Interval_CurrSlicedPositions = mouseHunt_Interval_AllPositions.slice(0, mouseHunt_TotalObjects);
                const mouseHunt_Interval_CurrObjectPositions = [];

                const mouseHunt_Interval_AddMouseDeciderNumber = Math.floor(Math.random() * 2);
                if (mouseHunt_Interval_AddMouseDeciderNumber === 1){

                    const mouseHunt_Interval_CurrMousePositionNumber = Math.floor(Math.random() * (mouseHunt_TotalObjects));
                    for (let mouseHunt_Interval_CurrI =0; mouseHunt_Interval_CurrI<mouseHunt_Interval_CurrSlicedPositions.length; mouseHunt_Interval_CurrI++){

                        if (mouseHunt_Interval_CurrI === mouseHunt_Interval_CurrMousePositionNumber){

                            mouseHunt_Interval_CurrObjectPositions.push({[mouseHunt_RowKey] : mouseHunt_Interval_CurrSlicedPositions[mouseHunt_Interval_CurrI][0], [mouseHunt_ColumnKey] : mouseHunt_Interval_CurrSlicedPositions[mouseHunt_Interval_CurrI][1], [mouseHunt_TypeKey] : 1});

                        } else {

                            mouseHunt_Interval_CurrObjectPositions.push({[mouseHunt_RowKey] : mouseHunt_Interval_CurrSlicedPositions[mouseHunt_Interval_CurrI][0], [mouseHunt_ColumnKey] : mouseHunt_Interval_CurrSlicedPositions[mouseHunt_Interval_CurrI][1], [mouseHunt_TypeKey] : 0});

                        }

                    }

                } else {

                    for (let mouseHunt_Interval_CurrI =0; mouseHunt_Interval_CurrI<mouseHunt_Interval_CurrSlicedPositions.length; mouseHunt_Interval_CurrI++){

                        mouseHunt_Interval_CurrObjectPositions.push({[mouseHunt_RowKey] : mouseHunt_Interval_CurrSlicedPositions[mouseHunt_Interval_CurrI][0], [mouseHunt_ColumnKey] : mouseHunt_Interval_CurrSlicedPositions[mouseHunt_Interval_CurrI][1], [mouseHunt_TypeKey] : 0});

                    }

                }

                return mouseHunt_Interval_CurrObjectPositions;

            });

            if (mouseHunt_HitAttempt){

                set_MouseHunt_HitAttempt(false);

            }

        }, 600);

        return () => clearInterval(mouseHunt_Interval);

    }, [mouseHunt_Start, mouseHunt_HitAttempt]);



    const mouseHunt_HitManager = (mouseHunt_HitManager_TargetHit) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        if (!mouseHunt_HitAttempt){

            if (!mouseHunt_HitManager_TargetHit){

                set_Play_CurrNumber(prev => Math.max(prev - 1, 0));

            } else {

                set_Play_CurrNumber(prev => prev + 1);

            }

            set_MouseHunt_HitAttempt(true);

        }

    }





    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MouseHunt_ComponentContainer-Structure--Screen">

            {!mouseHunt_Start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Catch the toy mice and avoid the power cords.</h2> 
                <button className = "UIStapleElements_ComponentButtonRectangle-Structure--GlobalClick UIStapleElements_ComponentButtonRectangle-Color--GlobalClick Start" onClick = {() => petScreensHelpers_Starter_Activities(set_MouseHunt_Start)}> Start <br/> [return]</button>
            </div>}

            <div className="MouseHunt_ComponentContainer-Structure--Grid">

                {Array.from({ length: mouseHunt_WindowHeight}, (_, row) => 
                    Array.from({ length: mouseHunt_WindowWidth}, (_, col) => {

                        const mouseHunt_MouseHere = mouseHunt_CurrObjectPositions.find(item => item[mouseHunt_RowKey] === row && item[mouseHunt_ColumnKey] === col && item[mouseHunt_TypeKey] === 1);
                        const mouseHunt_CordHere = mouseHunt_CurrObjectPositions.find(item => item[mouseHunt_RowKey] === row && item[mouseHunt_ColumnKey] === col && item[mouseHunt_TypeKey] === 0);

                        return (
                            
                            mouseHunt_MouseHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => mouseHunt_HitManager(true)}>
                                    <img src = {Mouse}/>
                                </div>
                                
                            ) : mouseHunt_CordHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => mouseHunt_HitManager(false)}>
                                    <img src = {Cord}/>
                                </div>

                            ) : (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell"></div>
        
                            )
                        
                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default MouseHunt;