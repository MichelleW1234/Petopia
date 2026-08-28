import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { helpers_PlaySound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey, soundStartActivityKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_StartActivity } from "../../../helpers/Helpers.js";

import featherHead from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherHead.png";
import featherBody from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherBody.png";
import arrow from "../../../../../images/Cat/Play/Games/FeatherFishing/Arrow.png";

import "./FeatherFishing.css";




function FeatherFishing({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef }) {

    const featherFishing_WindowWidth = 9;
    const featherFishing_WindowHeight = 5;

    const [featherFishing_Start, set_FeatherFishing_Start] = useState(false);
    const [featherFishing_HookLength, set_FeatherFishing_HookLength] = useState(0);
    const [featherFishing_HitAttempt, set_FeatherFishing_HitAttempt] = useState(false);

    useKeyboardShortcut("Enter", () => {
    
        if (!featherFishing_Start){

            petScreensHelpers_StartActivity(set_FeatherFishing_Start);

        }

    },
        ".Start"
    );

    


    useEffect(() => {

        if (!featherFishing_Start) {
            return;
        }

        play_AudioRef.current.loop = true;
        play_AudioRef.current.play();

        return () => {
            play_AudioRef.current.pause();
            play_AudioRef.current.currentTime = 0;
            play_AudioRef.current.loop = false;
        };

    }, [featherFishing_Start]);



    useEffect(() => {

        if (!featherFishing_Start){

            return;

        } 

        const featherFishing_Interval = setInterval(() => {

            const featherFishing_Interval_Movement = Math.floor(Math.random() * 2);

            if (featherFishing_Interval_Movement === 0) {

                set_FeatherFishing_HookLength(prev => Math.max(prev - 1, 0));

            } else {

                set_FeatherFishing_HookLength(prev => Math.min(prev + 1, 4));

            }

            if (featherFishing_HitAttempt){

                set_FeatherFishing_HitAttempt(false);

            }

        }, 400);

        return () => clearInterval(featherFishing_Interval);

    }, [featherFishing_Start, featherFishing_HitAttempt]);



    const featherFishing_CheckHit = (featherFishing_CheckHit_Success) => {

        helpers_PlaySound(soundScreenButtonPressKey);

        if (!featherFishing_HitAttempt){

            if (featherFishing_CheckHit_Success === 1){

                set_Play_CurrNumber(prev => prev + 1);

            } else {

                set_Play_CurrNumber(prev => Math.max(prev - 1, 0));

            }

            set_FeatherFishing_HitAttempt(true);

        }

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen FeatherFishing_ComponentContainer-Structure--Screen">

            {!featherFishing_Start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Only catch the fishing line when the feather lands on red.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpers_StartActivity(set_FeatherFishing_Start)}> Start <br/> [return]</button>
            </div>}

            
            <img className = "FeatherFishing_ComponentContainer-Template--Arrow FeatherFishing_ComponentContainer-Template--Arrow--Left" src = {arrow}/>
            <img className = "FeatherFishing_ComponentContainer-Template--Arrow FeatherFishing_ComponentContainer-Template--Arrow--Right" src = {arrow}/>
            <div className= "FeatherFishing_ComponentContainer-Template--HitBox"></div>

            <div className="FeatherFishing_ComponentContainer-Structure--Grid">

                {Array.from({ length: featherFishing_WindowHeight}, (_, row) => 
                    Array.from({ length: featherFishing_WindowWidth}, (_, col) => {

                        const featherFishing_HookHead = col === 4 && row === featherFishing_HookLength;
                        const featherFishing_HookBody = col === 4 && row < featherFishing_HookLength;

                        return (

                            featherFishing_HookHead ? (

                                row === 2 ? (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead} onClick = {() => featherFishing_CheckHit(1)}/>

                                ) : (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead}/>

                                )

                            ) : featherFishing_HookBody ? (

                                row === 2 ? (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} onClick = {() => featherFishing_CheckHit(0)}/>

                                ) : (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} />

                                )

                            ) : (

                                row === 2 && col === 4? (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" onClick = {() => featherFishing_CheckHit(0)}></div>

                                ) : (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell"></div>

                                )

                            ) 

                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default FeatherFishing;