import { useState, useEffect } from "react";
import "./GameOne.css";

import mouse from "../../../../../images/mouse.png";
import snake from "../../../../../images/snake.png";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";
import { playSound } from "../../../../../helpers/helpers.js";
import { gameButtonSoundKey, startSoundKey } from "../../../../../constants/Constants.js";
import { starter } from "../../../helpers/Helpers.js";


function GameOne({ playSelection, playDone, playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const windowWidth = 3;
    const windowHeight = 5;
    const numberCreatures = 5;

    const [start, setStart] = useState(false);
    const [creaturePositions, setCreaturePositions] = useState([]);


    useKeyboardShortcut("Enter", () => {
    
        if (playSelection !== -1 && !playDone){

            starter(setStart);

        }

    },
        ".Start"
    );




    useEffect(() => {

        if (!start || playDone) {
            return;
        }

        playAudioRef.current[0].loop = true;
        playAudioRef.current[0].play();

        return () => {
            playAudioRef.current[0].pause();
            playAudioRef.current[0].currentTime = 0;
            playAudioRef.current[0].loop = false;
        };

    }, [start, playDone]);
    


    useEffect(() => {

        const preloadImages = [mouse, snake];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, []);
    


    useEffect(() => {

        if (!start){

            return;

        } 

        const interval = setInterval(() => {

            setCreaturePositions(prev => {

                const possibleCombos = Array.from({ length: windowHeight }, (_, a) =>
                    Array.from({ length: windowWidth }, (_, b) => [a, b])
                    ).flat();

                for (let i = possibleCombos.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [possibleCombos[i], possibleCombos[j]] = [possibleCombos[j], possibleCombos[i]];
                }

                const chosenCombos = possibleCombos.slice(0, numberCreatures);
                const finalArray = [];

                const addMouse = Math.floor(Math.random() * 2);
                if (addMouse === 1){

                    const mouse = Math.floor(Math.random() * (numberCreatures));
                    for (let i =0; i<chosenCombos.length; i++){

                        if (i === mouse){

                            finalArray.push([...chosenCombos[i], 1]);

                        } else {

                            finalArray.push([...chosenCombos[i], 0]);

                        }

                    }

                } else {

                    for (let i =0; i<chosenCombos.length; i++){

                        finalArray.push([...chosenCombos[i], 0]);

                    }

                }

                return finalArray;

            });

        }, 700);

        return () => clearInterval(interval);

    }, [start]);


    const holeSelected = (mouse) => {

        playSound(gameButtonSoundKey);
        
        if (mouse === 0){

            setPlayCurrNumber(prev => Math.max(prev - 1, 0));

        } else {

            setPlayCurrNumber(prev => prev + 1);

        }

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen ThisGameWindow">

            {!start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Hit the mouse and avoid the snakes!</h2> 
                <button className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowButton Start" onClick = {() => starter(setStart)}>Start</button>
            </div>}

            <div className="gridContainer">

                {Array.from({ length: windowHeight}, (_, row) => 
                    Array.from({ length: windowWidth}, (_, col) => {

                        const mouseHere = creaturePositions.find(item => item[0] === row && item[1] === col && item[2] === 1);
                        const snakeHere = creaturePositions.find(item => item[0] === row && item[1] === col && item[2] === 0);

                        return (
                            
                            mouseHere ? (

                                <div key = {row + " & " + col} className="hole" onClick = {() => holeSelected(1)}>
                                    <img src = {mouse}/>
                                </div>
                                
                            ) : snakeHere ? (

                                <div key = {row + " & " + col} className="hole" onClick = {() => holeSelected(0)}>
                                    <img src = {snake}/>
                                </div>

                            ) : (

                                <div key = {row + " & " + col} className="hole"></div>
        
                            )
                        
                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default GameOne;