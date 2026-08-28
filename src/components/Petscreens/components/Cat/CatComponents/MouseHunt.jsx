import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { helpers_PlaySound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey, soundStartActivityKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_StartActivity } from "../../../helpers/Helpers.js";

import Mouse from "../../../../../images/Cat/Play/Games/MouseHunt/Mouse.png";
import Cord from "../../../../../images/Cat/Play/Games/MouseHunt/Cord.png";

import "./MouseHunt.css";




function MouseHunt({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef }) {

    const mouseHunt_WindowWidth = 2;
    const mouseHunt_WindowHeight = 4;
    const mouseHunt_NumberObjects = 3;

    const mouseHunt_RowKey = "row";
    const mouseHunt_ColumnKey = "column";
    const mouseHunt_TypeKey = "type";

    const [mouseHunt_Start, set_MouseHunt_Start] = useState(false);
    const [mouseHunt_CreaturePositions, set_MouseHunt_CreaturePositions] = useState([]);
    const [mouseHunt_HitAttempt, set_MouseHunt_HitAttempt] = useState(false);


    useKeyboardShortcut("Enter", () => {
    
        if (!mouseHunt_Start){

            petScreensHelpers_StartActivity(set_MouseHunt_Start);

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

            set_MouseHunt_CreaturePositions(prev => {

                const mouseHunt_Interval_PossibleCombos = Array.from({ length: mouseHunt_WindowHeight }, (_, a) =>
                    Array.from({ length: mouseHunt_WindowWidth }, (_, b) => [a, b])
                    ).flat();

                for (let mouseHunt_Interval_I = mouseHunt_Interval_PossibleCombos.length - 1; mouseHunt_Interval_I > 0; mouseHunt_Interval_I--) {
                    const mouseHunt_Interval_J = Math.floor(Math.random() * (mouseHunt_Interval_I + 1));
                    [mouseHunt_Interval_PossibleCombos[mouseHunt_Interval_I], mouseHunt_Interval_PossibleCombos[mouseHunt_Interval_J]] = [mouseHunt_Interval_PossibleCombos[mouseHunt_Interval_J], mouseHunt_Interval_PossibleCombos[mouseHunt_Interval_I]];
                }

                const mouseHunt_Interval_ChosenCombos = mouseHunt_Interval_PossibleCombos.slice(0, mouseHunt_NumberObjects);
                const mouseHunt_Interval_FinalArray = [];

                const mouseHunt_Interval_AddMouse = Math.floor(Math.random() * 2);
                if (mouseHunt_Interval_AddMouse === 1){

                    const mouseHunt_Interval_Mouse = Math.floor(Math.random() * (mouseHunt_NumberObjects));
                    for (let mouseHunt_Interval_I =0; mouseHunt_Interval_I<mouseHunt_Interval_ChosenCombos.length; mouseHunt_Interval_I++){

                        if (mouseHunt_Interval_I === mouseHunt_Interval_Mouse){

                            mouseHunt_Interval_FinalArray.push({[mouseHunt_RowKey] : mouseHunt_Interval_ChosenCombos[mouseHunt_Interval_I][0], [mouseHunt_ColumnKey] : mouseHunt_Interval_ChosenCombos[mouseHunt_Interval_I][1], [mouseHunt_TypeKey] : 1});

                        } else {

                            mouseHunt_Interval_FinalArray.push({[mouseHunt_RowKey] : mouseHunt_Interval_ChosenCombos[mouseHunt_Interval_I][0], [mouseHunt_ColumnKey] : mouseHunt_Interval_ChosenCombos[mouseHunt_Interval_I][1], [mouseHunt_TypeKey] : 0});

                        }

                    }

                } else {

                    for (let mouseHunt_Interval_I =0; mouseHunt_Interval_I<mouseHunt_Interval_ChosenCombos.length; mouseHunt_Interval_I++){

                        mouseHunt_Interval_FinalArray.push({[mouseHunt_RowKey] : mouseHunt_Interval_ChosenCombos[mouseHunt_Interval_I][0], [mouseHunt_ColumnKey] : mouseHunt_Interval_ChosenCombos[mouseHunt_Interval_I][1], [mouseHunt_TypeKey] : 0});

                    }

                }

                return mouseHunt_Interval_FinalArray;

            });

            if (mouseHunt_HitAttempt){

                set_MouseHunt_HitAttempt(false);

            }

        }, 600);

        return () => clearInterval(mouseHunt_Interval);

    }, [mouseHunt_Start, mouseHunt_HitAttempt]);



    const mouseHunt_HoleSelected = (mouseHunt_HoleSelected_Mouse) => {

        helpers_PlaySound(soundScreenButtonPressKey);

        if (!mouseHunt_HitAttempt){

            if (mouseHunt_HoleSelected_Mouse === 0){

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
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpers_StartActivity(set_MouseHunt_Start)}> Start <br/> [return]</button>
            </div>}

            <div className="MouseHunt_ComponentContainer-Structure--Grid">

                {Array.from({ length: mouseHunt_WindowHeight}, (_, row) => 
                    Array.from({ length: mouseHunt_WindowWidth}, (_, col) => {

                        const mouseHunt_MouseHere = mouseHunt_CreaturePositions.find(item => item[mouseHunt_RowKey] === row && item[mouseHunt_ColumnKey] === col && item[mouseHunt_TypeKey] === 1);
                        const mouseHunt_CordHere = mouseHunt_CreaturePositions.find(item => item[mouseHunt_RowKey] === row && item[mouseHunt_ColumnKey] === col && item[mouseHunt_TypeKey] === 0);

                        return (
                            
                            mouseHunt_MouseHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => mouseHunt_HoleSelected(1)}>
                                    <img src = {Mouse}/>
                                </div>
                                
                            ) : mouseHunt_CordHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => mouseHunt_HoleSelected(0)}>
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