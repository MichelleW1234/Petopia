import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { startActivity } from "../../../helpers/Helpers.js";
import { playSound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey } from "../../../../../constants/Constants.js";

import w from "../../../../../images/Dog/Play/Games/Pawformer/W.png";
import a from "../../../../../images/Dog/Play/Games/Pawformer/A.png";
import s from "../../../../../images/Dog/Play/Games/Pawformer/S.png";
import d from "../../../../../images/Dog/Play/Games/Pawformer/D.png";
import arrow from "../../../../../images/Dog/Play/Games/Pawformer/Arrow.png";

import "./Pawformer.css";




function Pawformer({ playCurrNumber, setPlayCurrNumber, playAudioRef}) {

    const pawformerWindowWidth = 9;
    const pawformerTargetCol = 4;

    const pawformerColKey = "col";
    const pawformerTypeKey = "type";

    const [pawformerStart, setPawformerStart] = useState(false);
    const [pawformerMoves, setPawformerMoves] = useState([]);
    const [pawformerHitAttempt, setPawformerHitAttempt] = useState(false);


    useKeyboardShortcut("Enter", () => {
    
        if (!pawformerStart){

            startActivity(setPawformerStart);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("W", () => {
     
        if (pawformerStart){

            checkMove("W");

        }

    },
        ".W"
    );

    useKeyboardShortcut("A", () => {
    
        if (pawformerStart){

            checkMove("A");

        }

    },
        ".A"
    );

    useKeyboardShortcut("S", () => {
     
        if (pawformerStart){

            checkMove("S");

        }

    },
        ".S"
    );


    useKeyboardShortcut("D", () => {
    
        if (pawformerStart){

            checkMove("D");

        }

    },
        ".D"
    );



    useEffect(() => {

        if (!pawformerStart) {
            return;
        }

        playAudioRef.current.loop = true;
        playAudioRef.current.play();

        return () => {
            playAudioRef.current.pause();
            playAudioRef.current.currentTime = 0;
            playAudioRef.current.loop = false;
        };

    }, [pawformerStart]);


    useEffect(() => {

        if (!pawformerStart){

            return;

        } 

        const interval = setInterval(() => {

            setPawformerMoves(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                const newList = copy.filter(move => move[pawformerColKey] < pawformerWindowWidth);

                for (let i = 0; i< newList.length; i++){

                    newList[i][pawformerColKey] += 1;

                }

                if (!newList.some(move => move[pawformerColKey] < 3)){

                    const number = Math.floor(Math.random() * 4);

                    if (number === 0){

                        newList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "W"});

                    } else if (number === 1){

                        newList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "A"});

                    } else if (number === pawformerTargetCol){

                        newList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "S"});

                    } else {

                        newList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "D"});

                    }

                }
    
                return newList;

            });

            if (pawformerHitAttempt){

                setPawformerHitAttempt(false);

            }

        }, 250);

        return () => clearInterval(interval);

    }, [pawformerStart, pawformerHitAttempt]);



    const checkMove = (moveSelected) => {

        playSound(soundScreenButtonPressKey);

        const targetMove = pawformerMoves.findIndex(move => move[pawformerColKey] === pawformerTargetCol);

        if (targetMove !== -1 && !pawformerHitAttempt){

            if (moveSelected === pawformerMoves[targetMove][pawformerTypeKey]) {

                setPlayCurrNumber(prev => prev + 1);
            
            } else {

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            }

            setPawformerHitAttempt(true);
        
        }

    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Pawformer_ComponentContainer-Template--Screen">

            {!pawformerStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Copy the moves.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => startActivity(setPawformerStart)}> Start <br/> [return]</button>
            </div>}

            <img className = "Pawformer_ComponentContainer-Template--Arrow Pawformer_ComponentContainer-Template--Arrow--Top" src = {arrow}/>
            <img className = "Pawformer_ComponentContainer-Template--Arrow Pawformer_ComponentContainer-Template--Arrow--Bottom" src = {arrow}/>
            <div className= "Pawformer_ComponentContainer-Template--HitBox"></div>

            <div className="Pawformer_ComponentContainer-Structure--Grid">

                {Array.from({ length: pawformerWindowWidth}, (_, col) => {

                    const wHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "W");
                    const aHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "A");
                    const sHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "S");
                    const dHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "D");

                    return (

                        wHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {w}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {w}/>

                            )

                        ) : aHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {a}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {a}/>

                            )

                        ) : sHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {s}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {s}/>

                            )

                        ) : dHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {d}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {d}/>

                            )

                        ) : (

                            <div key = {col} ></div>

                        )

                    )

                })}

            </div>

            <div className="Pawformer_ComponentContainer-Template--Buttons">
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click W" onClick={() => checkMove("W")}> W </button>
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click A" onClick={() => checkMove("A")}> A </button>
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click S" onClick={() => checkMove("S")}> S </button>
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click D" onClick={() => checkMove("D")}> D </button>
            </div>
                
        </div>
        
    );
}
  
export default Pawformer;