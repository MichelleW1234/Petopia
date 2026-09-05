import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petScreensHelpers_Starter_Activities } from "../../../helpers/Helpers.js";
import { helpers_Player_UIIndicatorSounds } from "../../../../../helpers/Helpers.js";
import { audioScreenButtonPressKey } from "../../../../../constants/Constants.js";

import w from "../../../../../images/Dog/Play/Games/Pawformer/W.png";
import a from "../../../../../images/Dog/Play/Games/Pawformer/A.png";
import s from "../../../../../images/Dog/Play/Games/Pawformer/S.png";
import d from "../../../../../images/Dog/Play/Games/Pawformer/D.png";
import arrow from "../../../../../images/Dog/Play/Games/Pawformer/Arrow.png";

import "./Pawformer.css";




function Pawformer({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef}) {

    const pawformer_WindowWidth = 9;
    const pawformer_TargetCol = 4;

    const pawformer_ColKey = "col";
    const pawformer_TypeKey = "type";

    const [pawformer_Start, set_Pawformer_Start] = useState(false);
    const [pawformer_CurrMovePositions, set_Pawformer_CurrMovePositions] = useState([]);
    const [pawformer_CurrMoveTarget, set_Pawformer_CurrMoveTarget] = useState(Math.floor(Math.random() * 4));
    const [pawformer_HitAttempt, set_Pawformer_HitAttempt] = useState(false);

    

    useEffect(() => {

        if (!pawformer_Start) {
            return;
        }

        play_AudioRef.current.loop = true;
        play_AudioRef.current.play();

        return () => {
            play_AudioRef.current.pause();
            play_AudioRef.current.currentTime = 0;
            play_AudioRef.current.loop = false;
        };

    }, [pawformer_Start]);


    useEffect(() => {

        if (!pawformer_Start){

            return;

        } 

        const pawformer_Interval = setInterval(() => {

            set_Pawformer_CurrMovePositions(prev => {

                const pawformer_Interval_CurrCopy = prev.map(inner =>
                    structuredClone(inner)
                );

                const pawformer_Interval_CurrFilteredCopy = pawformer_Interval_CurrCopy.filter(move => move[pawformer_ColKey] < pawformer_WindowWidth);

                for (let pawformer_Interval_CurrI = 0; pawformer_Interval_CurrI< pawformer_Interval_CurrFilteredCopy.length; pawformer_Interval_CurrI++){

                    pawformer_Interval_CurrFilteredCopy[pawformer_Interval_CurrI][pawformer_ColKey] += 1;

                }

                if (!pawformer_Interval_CurrFilteredCopy.some(move => move[pawformer_ColKey] < 3)){

                    const pawformer_Interval_CurrAddedMoveNumber = Math.floor(Math.random() * 4);

                    if (pawformer_Interval_CurrAddedMoveNumber === 0){

                        pawformer_Interval_CurrFilteredCopy.push({[pawformer_ColKey]: 0, [pawformer_TypeKey]: "W"});

                    } else if (pawformer_Interval_CurrAddedMoveNumber === 1){

                        pawformer_Interval_CurrFilteredCopy.push({[pawformer_ColKey]: 0, [pawformer_TypeKey]: "A"});

                    } else if (pawformer_Interval_CurrAddedMoveNumber === 2){

                        pawformer_Interval_CurrFilteredCopy.push({[pawformer_ColKey]: 0, [pawformer_TypeKey]: "S"});

                    } else {

                        pawformer_Interval_CurrFilteredCopy.push({[pawformer_ColKey]: 0, [pawformer_TypeKey]: "D"});

                    }

                }
    
                return pawformer_Interval_CurrFilteredCopy;

            });

            if (pawformer_HitAttempt){

                set_Pawformer_HitAttempt(false);

            }

        }, 250);

        return () => clearInterval(pawformer_Interval);

    }, [pawformer_Start, pawformer_HitAttempt]);




    useEffect(() => {

        if (!pawformer_Start){

            return;

        } 

        const pawformer_Interval = setInterval(() => {

            set_Pawformer_CurrMoveTarget(Math.floor(Math.random() * 4));

        }, 5000);

        return () => clearInterval(pawformer_Interval);

    }, [pawformer_Start]);



    const pawformer_MoveManager = (pawformer_MoveManager_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        if (!pawformer_HitAttempt){

            if (pawformer_MoveManager_UserSelection === pawformer_CurrMoveTarget) {

                set_Play_CurrNumber(prev => prev + 1);
            
            } else {

                set_Play_CurrNumber(prev => Math.max(prev - 1, 0));

            }

            set_Pawformer_HitAttempt(true);
        
        }

    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Pawformer_ComponentContainer-Template--Screen">

            {!pawformer_Start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Instructions: Click the Matching Letter.</h2> 
                <button className = "UIStapleElements_ComponentButtonRectangle-Structure--GlobalClick UIStapleElements_ComponentButtonRectangle-Color--GlobalClick Start" onClick = {() => petScreensHelpers_Starter_Activities(set_Pawformer_Start)}> X </button>
            </div>}

            <div className="correctMove">
                <img src = {pawformer_CurrMoveTarget === 0 ? w
                            : pawformer_CurrMoveTarget === 1 ? a
                            : pawformer_CurrMoveTarget === 2 ? s
                            : d
                }/>
            </div>
            <img className = "Pawformer_ComponentContainer-Template--Arrow Pawformer_ComponentContainer-Template--Arrow--Top" src = {arrow}/>
            <img className = "Pawformer_ComponentContainer-Template--Arrow Pawformer_ComponentContainer-Template--Arrow--Bottom" src = {arrow}/>
            <div className = "Pawformer_ComponentContainer-Template--HitBox"></div>

            <div className="Pawformer_ComponentContainer-Structure--Grid">

                {Array.from({ length: pawformer_WindowWidth}, (_, col) => {

                    const pawformer_WHere = pawformer_CurrMovePositions.some(move => move[pawformer_ColKey] === col && move[pawformer_TypeKey] === "W");
                    const pawformer_AHere = pawformer_CurrMovePositions.some(move => move[pawformer_ColKey] === col && move[pawformer_TypeKey] === "A");
                    const pawformer_SHere = pawformer_CurrMovePositions.some(move => move[pawformer_ColKey] === col && move[pawformer_TypeKey] === "S");
                    const pawformer_DHere = pawformer_CurrMovePositions.some(move => move[pawformer_ColKey] === col && move[pawformer_TypeKey] === "D");

                    return (

                        pawformer_WHere ? (

                            col === pawformer_TargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {w} onClick={() => pawformer_MoveManager(0)}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {w}/>

                            )

                        ) : pawformer_AHere ? (

                            col === pawformer_TargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {a} onClick={() => pawformer_MoveManager(1)}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {a}/>

                            )

                        ) : pawformer_SHere ? (

                            col === pawformer_TargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {s} onClick={() => pawformer_MoveManager(2)}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {s}/>

                            )

                        ) : pawformer_DHere ? (

                            col === pawformer_TargetCol ? (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Active" src = {d} onClick={() => pawformer_MoveManager(3)}/>

                            ) : (

                                <img key = {col} className="Pawformer_ComponentContainer-Structure--GridCell Pawformer_ComponentContainer-Structure--GridCell--Nonactive" src = {d}/>

                            )

                        ) : (

                            <div key = {col} ></div>

                        )

                    )

                })}

            </div>
                
        </div>
        
    );
}
  
export default Pawformer;