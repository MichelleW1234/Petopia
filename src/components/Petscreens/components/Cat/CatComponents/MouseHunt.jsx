import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { playSound } from "../../../../../helpers/helpers.js";
import { gameButtonSoundKey, startSoundKey } from "../../../../../constants/Constants.js";
import { startActivity } from "../../../helpers/Helpers.js";

import mouse from "../../../../../images/Cat/Play/Games/mouse.png";
import cord from "../../../../../images/Cat/Play/Games/cord.png";

import "./MouseHunt.css";




function MouseHunt({ playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const mouseHuntWindowWidth = 3;
    const mouseHuntWindowHeight = 5;
    const mouseHuntNumberCreatures = 5;

    const mouseHuntRowKey = "row";
    const mouseHuntColumnKey = "column";
    const mouseHuntTypeKey = "type";

    const [mouseHuntStart, setMouseHuntStart] = useState(false);
    const [mouseHuntCreaturePositions, setMouseHuntCreaturePositions] = useState([]);


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

        const preloadImages = [mouse, cord];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, []);
    


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

                const chosenCombos = possibleCombos.slice(0, mouseHuntNumberCreatures);
                const finalArray = [];

                const addMouse = Math.floor(Math.random() * 2);
                if (addMouse === 1){

                    const mouse = Math.floor(Math.random() * (mouseHuntNumberCreatures));
                    for (let i =0; i<chosenCombos.length; i++){

                        if (i === mouse){

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

        }, 700);

        return () => clearInterval(interval);

    }, [mouseHuntStart]);


    
    const holeSelected = (mouse) => {

        playSound(gameButtonSoundKey);
        
        if (mouse === 0){

            setPlayCurrNumber(prev => Math.max(prev - 1, 0));

        } else {

            setPlayCurrNumber(prev => prev + 1);

        }

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MouseHunt_ComponentContainer-Structure--Screen">

            {!mouseHuntStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <p>Catch the toy mice and avoid the power cords!</p> 
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
                                    <img src = {mouse}/>
                                </div>
                                
                            ) : cordHere ? (

                                <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell" onClick = {() => holeSelected(0)}>
                                    <img src = {cord}/>
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