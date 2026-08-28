import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { helpersPlaySound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey, soundStartActivityKey } from "../../../../../constants/Constants.js";
import { petScreensHelpersStartActivity } from "../../../helpers/Helpers.js";

import Mouse from "../../../../../images/Cat/Play/Games/MouseHunt/Mouse.png";
import Cord from "../../../../../images/Cat/Play/Games/MouseHunt/Cord.png";

import "./MouseHunt.css";




function MouseHunt({ playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const mouseHuntWindowWidth = 2;
    const mouseHuntWindowHeight = 4;
    const mouseHuntNumberObjects = 3;

    const mouseHuntRowKey = "row";
    const mouseHuntColumnKey = "column";
    const mouseHuntTypeKey = "type";

    const [mouseHuntStart, setMouseHuntStart] = useState(false);
    const [mouseHuntCreaturePositions, setMouseHuntCreaturePositions] = useState([]);
    const [mouseHuntHitAttempt, setMouseHuntHitAttempt] = useState(false);


    useKeyboardShortcut("Enter", () => {
    
        if (!mouseHuntStart){

            petScreensHelpersStartActivity(setMouseHuntStart);

        }

    },
        ".Start"
    );

    


    useEffect(() => {

        if (!mouseHuntStart) {
            return;
        }

        playAudioRef.current.loop = true;
        playAudioRef.current.play();

        return () => {
            playAudioRef.current.pause();
            playAudioRef.current.currentTime = 0;
            playAudioRef.current.loop = false;
        };

    }, [mouseHuntStart]);



    useEffect(() => {

        if (!mouseHuntStart){

            return;

        } 

        const mouseHuntInterval = setInterval(() => {

            setMouseHuntCreaturePositions(prev => {

                const mouseHuntIntervalPossibleCombos = Array.from({ length: mouseHuntWindowHeight }, (_, a) =>
                    Array.from({ length: mouseHuntWindowWidth }, (_, b) => [a, b])
                    ).flat();

                for (let mouseHuntIntervalI = mouseHuntIntervalPossibleCombos.length - 1; mouseHuntIntervalI > 0; mouseHuntIntervalI--) {
                    const mouseHuntIntervalJ = Math.floor(Math.random() * (mouseHuntIntervalI + 1));
                    [mouseHuntIntervalPossibleCombos[mouseHuntIntervalI], mouseHuntIntervalPossibleCombos[mouseHuntIntervalJ]] = [mouseHuntIntervalPossibleCombos[mouseHuntIntervalJ], mouseHuntIntervalPossibleCombos[mouseHuntIntervalI]];
                }

                const mouseHuntIntervalChosenCombos = mouseHuntIntervalPossibleCombos.slice(0, mouseHuntNumberObjects);
                const mouseHuntIntervalFinalArray = [];

                const mouseHuntIntervalAddMouse = Math.floor(Math.random() * 2);
                if (mouseHuntIntervalAddMouse === 1){

                    const mouseHuntIntervalMouse = Math.floor(Math.random() * (mouseHuntNumberObjects));
                    for (let mouseHuntIntervalI =0; mouseHuntIntervalI<mouseHuntIntervalChosenCombos.length; mouseHuntIntervalI++){

                        if (mouseHuntIntervalI === mouseHuntIntervalMouse){

                            mouseHuntIntervalFinalArray.push({[mouseHuntRowKey] : mouseHuntIntervalChosenCombos[mouseHuntIntervalI][0], [mouseHuntColumnKey] : mouseHuntIntervalChosenCombos[mouseHuntIntervalI][1], [mouseHuntTypeKey] : 1});

                        } else {

                            mouseHuntIntervalFinalArray.push({[mouseHuntRowKey] : mouseHuntIntervalChosenCombos[mouseHuntIntervalI][0], [mouseHuntColumnKey] : mouseHuntIntervalChosenCombos[mouseHuntIntervalI][1], [mouseHuntTypeKey] : 0});

                        }

                    }

                } else {

                    for (let mouseHuntIntervalI =0; mouseHuntIntervalI<mouseHuntIntervalChosenCombos.length; mouseHuntIntervalI++){

                        mouseHuntIntervalFinalArray.push({[mouseHuntRowKey] : mouseHuntIntervalChosenCombos[mouseHuntIntervalI][0], [mouseHuntColumnKey] : mouseHuntIntervalChosenCombos[mouseHuntIntervalI][1], [mouseHuntTypeKey] : 0});

                    }

                }

                return mouseHuntIntervalFinalArray;

            });

            if (mouseHuntHitAttempt){

                setMouseHuntHitAttempt(false);

            }

        }, 600);

        return () => clearInterval(mouseHuntInterval);

    }, [mouseHuntStart, mouseHuntHitAttempt]);



    const mouseHuntHoleSelected = (mouseHuntHoleSelectedMouse) => {

        helpersPlaySound(soundScreenButtonPressKey);

        if (!mouseHuntHitAttempt){

            if (mouseHuntHoleSelectedMouse === 0){

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            } else {

                setPlayCurrNumber(prev => prev + 1);

            }

            setMouseHuntHitAttempt(true);

        }

    }





    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MouseHunt_ComponentContainer-Structure--Screen">

            {!mouseHuntStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Catch the toy mice and avoid the power cords.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpersStartActivity(setMouseHuntStart)}> Start <br/> [return]</button>
            </div>}

            <div className="MouseHunt_ComponentContainer-Structure--Grid">

                {Array.from({ length: mouseHuntWindowHeight}, (_, row) => 
                    Array.from({ length: mouseHuntWindowWidth}, (_, col) => {

                        const mouseHuntMouseHere = mouseHuntCreaturePositions.find(item => item[mouseHuntRowKey] === row && item[mouseHuntColumnKey] === col && item[mouseHuntTypeKey] === 1);
                        const mouseHuntCordHere = mouseHuntCreaturePositions.find(item => item[mouseHuntRowKey] === row && item[mouseHuntColumnKey] === col && item[mouseHuntTypeKey] === 0);

                        return (
                            
                            mouseHuntMouseHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => mouseHuntHoleSelected(1)}>
                                    <img src = {Mouse}/>
                                </div>
                                
                            ) : mouseHuntCordHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => mouseHuntHoleSelected(0)}>
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