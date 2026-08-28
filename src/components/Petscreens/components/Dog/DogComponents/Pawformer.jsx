import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petScreensHelpersStartActivity } from "../../../helpers/Helpers.js";
import { helpersPlaySound } from "../../../../../helpers/Helpers.js";
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

            petScreensHelpersStartActivity(setPawformerStart);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("W", () => {
     
        if (pawformerStart){

            pawformerCheckMove("W");

        }

    },
        ".W"
    );

    useKeyboardShortcut("A", () => {
    
        if (pawformerStart){

            pawformerCheckMove("A");

        }

    },
        ".A"
    );

    useKeyboardShortcut("S", () => {
     
        if (pawformerStart){

            pawformerCheckMove("S");

        }

    },
        ".S"
    );


    useKeyboardShortcut("D", () => {
    
        if (pawformerStart){

            pawformerCheckMove("D");

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

        const pawformerInterval = setInterval(() => {

            setPawformerMoves(prev => {

                const pawformerIntervalCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                const pawformerIntervalNewList = pawformerIntervalCopy.filter(move => move[pawformerColKey] < pawformerWindowWidth);

                for (let pawformerIntervalI = 0; pawformerIntervalI< pawformerIntervalNewList.length; pawformerIntervalI++){

                    pawformerIntervalNewList[pawformerIntervalI][pawformerColKey] += 1;

                }

                if (!pawformerIntervalNewList.some(move => move[pawformerColKey] < 3)){

                    const pawformerIntervalNumber = Math.floor(Math.random() * 4);

                    if (pawformerIntervalNumber === 0){

                        pawformerIntervalNewList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "W"});

                    } else if (pawformerIntervalNumber === 1){

                        pawformerIntervalNewList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "A"});

                    } else if (pawformerIntervalNumber === pawformerTargetCol){

                        pawformerIntervalNewList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "S"});

                    } else {

                        pawformerIntervalNewList.push({[pawformerColKey]: 0, [pawformerTypeKey]: "D"});

                    }

                }
    
                return pawformerIntervalNewList;

            });

            if (pawformerHitAttempt){

                setPawformerHitAttempt(false);

            }

        }, 250);

        return () => clearInterval(pawformerInterval);

    }, [pawformerStart, pawformerHitAttempt]);



    const pawformerCheckMove = (pawformerCheckMoveMoveSelected) => {

        helpersPlaySound(soundScreenButtonPressKey);

        const pawformerCheckMoveTargetMove = pawformerMoves.findIndex(move => move[pawformerColKey] === pawformerTargetCol);

        if (pawformerCheckMoveTargetMove !== -1 && !pawformerHitAttempt){

            if (pawformerCheckMoveMoveSelected === pawformerMoves[pawformerCheckMoveTargetMove][pawformerTypeKey]) {

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
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpersStartActivity(setPawformerStart)}> Start <br/> [return]</button>
            </div>}

            <img className = "Pawformer_ComponentContainer-Template--Arrow Pawformer_ComponentContainer-Template--Arrow--Top" src = {arrow}/>
            <img className = "Pawformer_ComponentContainer-Template--Arrow Pawformer_ComponentContainer-Template--Arrow--Bottom" src = {arrow}/>
            <div className= "Pawformer_ComponentContainer-Template--HitBox"></div>

            <div className="Pawformer_ComponentContainer-Structure--Grid">

                {Array.from({ length: pawformerWindowWidth}, (_, col) => {

                    const pawformerWHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "W");
                    const pawformerAHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "A");
                    const pawformerSHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "S");
                    const pawformerDHere = pawformerMoves.some(move => move[pawformerColKey] === col && move[pawformerTypeKey] === "D");

                    return (

                        pawformerWHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {w}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {w}/>

                            )

                        ) : pawformerAHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {a}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {a}/>

                            )

                        ) : pawformerSHere ? (

                            col === pawformerTargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {s}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {s}/>

                            )

                        ) : pawformerDHere ? (

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
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click W" onClick={() => pawformerCheckMove("W")}> W </button>
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click A" onClick={() => pawformerCheckMove("A")}> A </button>
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click S" onClick={() => pawformerCheckMove("S")}> S </button>
                <button className="MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click D" onClick={() => pawformerCheckMove("D")}> D </button>
            </div>
                
        </div>
        
    );
}
  
export default Pawformer;