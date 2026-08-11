import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { playSound } from "../../../../../helpers/Helpers.js";
import { screenButtonPressSoundKey, startActivitySoundKey } from "../../../../../constants/Constants.js";
import { startActivity } from "../../../helpers/Helpers.js";

import Mouse from "../../../../../images/Cat/Play/Games/Mouse.png";
import Cord from "../../../../../images/Cat/Play/Games/Cord.png";

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

            startActivity(setMouseHuntStart);

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

        const interval = setInterval(() => {

            setMouseHuntCreaturePositions(prev => {

                const possibleCombos = Array.from({ length: mouseHuntWindowHeight }, (_, a) =>
                    Array.from({ length: mouseHuntWindowWidth }, (_, b) => [a, b])
                    ).flat();

                for (let i = possibleCombos.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [possibleCombos[i], possibleCombos[j]] = [possibleCombos[j], possibleCombos[i]];
                }

                const chosenCombos = possibleCombos.slice(0, mouseHuntNumberObjects);
                const finalArray = [];

                const addMouse = Math.floor(Math.random() * 2);
                if (addMouse === 1){

                    const Mouse = Math.floor(Math.random() * (mouseHuntNumberObjects));
                    for (let i =0; i<chosenCombos.length; i++){

                        if (i === Mouse){

                            finalArray.push({[mouseHuntRowKey] : chosenCombos[i][0], [mouseHuntColumnKey] : chosenCombos[i][1], [mouseHuntTypeKey] : 1});

                        } else {

                            finalArray.push({[mouseHuntRowKey] : chosenCombos[i][0], [mouseHuntColumnKey] : chosenCombos[i][1], [mouseHuntTypeKey] : 0});

                        }

                    }

                } else {

                    for (let i =0; i<chosenCombos.length; i++){

                        finalArray.push({[mouseHuntRowKey] : chosenCombos[i][0], [mouseHuntColumnKey] : chosenCombos[i][1], [mouseHuntTypeKey] : 0});

                    }

                }

                return finalArray;

            });

            if (mouseHuntHitAttempt){

                setMouseHuntHitAttempt(false);

            }

        }, 600);

        return () => clearInterval(interval);

    }, [mouseHuntStart, mouseHuntHitAttempt]);



    const holeSelected = (Mouse) => {

        playSound(screenButtonPressSoundKey);

        if (!mouseHuntHitAttempt){

            if (Mouse === 0){

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
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setMouseHuntStart)}> Start <br/> [return]</button>
            </div>}

            <div className="MouseHunt_ComponentContainer-Structure--Grid">

                {Array.from({ length: mouseHuntWindowHeight}, (_, row) => 
                    Array.from({ length: mouseHuntWindowWidth}, (_, col) => {

                        const mouseHere = mouseHuntCreaturePositions.find(item => item[mouseHuntRowKey] === row && item[mouseHuntColumnKey] === col && item[mouseHuntTypeKey] === 1);
                        const cordHere = mouseHuntCreaturePositions.find(item => item[mouseHuntRowKey] === row && item[mouseHuntColumnKey] === col && item[mouseHuntTypeKey] === 0);

                        return (
                            
                            mouseHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => holeSelected(1)}>
                                    <img src = {Mouse}/>
                                </div>
                                
                            ) : cordHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => holeSelected(0)}>
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