import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { startActivity } from "../../../helpers/Helpers.js";
import { playSound } from "../../../../../helpers/Helpers.js";
import { screenButtonPressSoundKey } from "../../../../../constants/Constants.js";

import "./DogGameTwo.css";




function DogGameTwo({ playCurrNumber, setPlayCurrNumber, playAudioRef}) {

    const dogGameTwoWindowHeight = 5;

    const dogGameTwoRowKey = "row";
    const dogGameTwoTypeKey = "type";

    const [dogGameTwoStart, setDogGameTwoStart] = useState(false);
    const [dogGameTwoMoves, setDogGameTwoMoves] = useState([]);


    useKeyboardShortcut("Enter", () => {
    
        if (!dogGameTwoStart){

            startActivity(setDogGameTwoStart);

        }

    },
        ".Start"
    );


    useEffect(() => {

        if (!dogGameTwoStart) {
            return;
        }

        playAudioRef.current.loop = true;
        playAudioRef.current.play();

        return () => {
            playAudioRef.current.pause();
            playAudioRef.current.currentTime = 0;
            playAudioRef.current.loop = false;
        };

    }, [dogGameTwoStart]);


    useEffect(() => {

        if (!dogGameTwoStart){

            return;

        } 

        const interval = setInterval(() => {

            setDogGameTwoMoves(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                const newList = copy.filter(move => move[dogGameTwoRowKey] > 0);

                for (let i = 0; i< newList.length; i++){

                    newList[i][dogGameTwoRowKey] -= 1;

                }

                if (!newList.some(move => move[dogGameTwoRowKey] > 2)){

                    const number = Math.floor(Math.random() * 4);

                    if (number === 0){

                        newList.push({[dogGameTwoRowKey]: dogGameTwoWindowHeight, [dogGameTwoTypeKey]: "W"});

                    } else if (number === 1){

                        newList.push({[dogGameTwoRowKey]: dogGameTwoWindowHeight, [dogGameTwoTypeKey]: "A"});

                    } else if (number === 2){

                        newList.push({[dogGameTwoRowKey]: dogGameTwoWindowHeight, [dogGameTwoTypeKey]: "S"});

                    } else {

                        newList.push({[dogGameTwoRowKey]: dogGameTwoWindowHeight, [dogGameTwoTypeKey]: "D"});

                    }

                }
    
                return newList;

            });

        }, 400);

        return () => clearInterval(interval);

    }, [dogGameTwoStart]);



    const checkMove = (moveSelected) => {

        if (moveSelected === dogGameTwoMoves[0][dogGameTwoTypeKey] && dogGameTwoMoves[0][dogGameTwoRowKey] === 0){

            setPlayCurrNumber(prev => prev + 1);

        } else {

            setPlayCurrNumber(prev => Math.max(prev - 1, 0));

        }


    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen DogGameTwo_ComponentContainer-Template--Screen">

            {!dogGameTwoStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Hold the rope down when the light lands in the green area.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setDogGameTwoStart)}> Start <br/> [return]</button>
            </div>}

            <div className="DogGameTwo_ComponentContainer-Structure--Grid">

                {Array.from({ length: dogGameTwoWindowHeight}, (_, row) => {

                    const wHere = dogGameTwoMoves.some(move => move[dogGameTwoRowKey] === row && move[dogGameTwoTypeKey] === "W");
                    const aHere = dogGameTwoMoves.some(move => move[dogGameTwoRowKey] === row && move[dogGameTwoTypeKey] === "A");
                    const sHere = dogGameTwoMoves.some(move => move[dogGameTwoRowKey] === row && move[dogGameTwoTypeKey] === "S");
                    const dHere = dogGameTwoMoves.some(move => move[dogGameTwoRowKey] === row && move[dogGameTwoTypeKey] === "D");

                    return (

                        wHere ? (

                            row === 0 ? (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCellActive">
                                    <h2>W</h2>
                                </div>

                            ) : (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCell">
                                    <h2>W</h2>
                                </div>

                            )

                        ) : aHere ? (

                            row === 0 ? (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCellActive">
                                    <h2>A</h2>
                                </div>

                            ) : (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCell">
                                    <h2>A</h2>
                                </div>

                            )

                        ) : sHere ? (

                            row === 0 ? (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCellActive">
                                    <h2>S</h2>
                                </div>

                            ) : (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCell">
                                    <h2>S</h2>
                                </div>

                            )

                        ) : dHere ? (

                            row === 0 ? (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCellActive">
                                    <h2>D</h2>
                                </div>

                            ) : (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCell">
                                    <h2>D</h2>
                                </div>

                            )

                        ) : (

                            row === 0 ? (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCellActive"></div>

                            ) : (

                                <div key = {row} className="DogGameTwo_ComponentContainer-Structure--GridCell"></div>

                            )

                        )

                    )

                })}

            </div>

            <div className="DogGameTwo_ComponentContainer-Template--Buttons">
                <button className="MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow" onClick={() => checkMove("W")}> W </button>
                <button className="MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow" onClick={() => checkMove("A")}> A </button>
                <button className="MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow" onClick={() => checkMove("S")}> S </button>
                <button className="MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow" onClick={() => checkMove("D")}> D </button>
            </div>
                
        </div>
        
    );
}
  
export default DogGameTwo;