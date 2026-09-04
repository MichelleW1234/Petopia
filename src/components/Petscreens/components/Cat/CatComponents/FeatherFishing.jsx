import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { helpers_Player_UIIndicatorSounds } from "../../../../../helpers/Helpers.js";
import { audioScreenButtonPressKey, audioStartActivityKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_Starter_Activities } from "../../../helpers/Helpers.js";

import featherHead from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherHead.png";
import featherBody from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherBody.png";
import arrow from "../../../../../images/Cat/Play/Games/FeatherFishing/Arrow.png";

import "./FeatherFishing.css";




function FeatherFishing({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef }) {

    const featherFishing_WindowWidth = 9;
    const featherFishing_WindowHeight = 5;

    const [featherFishing_Start, set_FeatherFishing_Start] = useState(false);
    const [featherFishing_CurrHookLength, set_FeatherFishing_HookLength] = useState(0);
    const [featherFishing_HitAttempt, set_FeatherFishing_HitAttempt] = useState(false);

    useKeyboardShortcut("Enter", () => {
    
        if (!featherFishing_Start){

            petScreensHelpers_Starter_Activities(set_FeatherFishing_Start);

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

            const featherFishing_Interval_CurrDirectionNumber = Math.floor(Math.random() * 2);

            if (featherFishing_Interval_CurrDirectionNumber === 0) {

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



    const featherFishing_HitManager = (featherFishing_HitManager_Success) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        if (!featherFishing_HitAttempt){

            if (featherFishing_HitManager_Success === 1){

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
                <button className = "UIStapleElements_ComponentButtonRectangle-Structure--GlobalClick UIStapleElements_ComponentButtonRectangle-Color--GlobalClick Start" onClick = {() => petScreensHelpers_Starter_Activities(set_FeatherFishing_Start)}> Start <br/> [return]</button>
            </div>}

            
            <img className = "FeatherFishing_ComponentContainer-Template--Arrow FeatherFishing_ComponentContainer-Template--Arrow--Left" src = {arrow}/>
            <img className = "FeatherFishing_ComponentContainer-Template--Arrow FeatherFishing_ComponentContainer-Template--Arrow--Right" src = {arrow}/>
            <div className= "FeatherFishing_ComponentContainer-Template--HitBox"></div>

            <div className="FeatherFishing_ComponentContainer-Structure--Grid">

                {Array.from({ length: featherFishing_WindowHeight}, (_, row) => 
                    Array.from({ length: featherFishing_WindowWidth}, (_, col) => {

                        const featherFishing_HookHeadHere = col === 4 && row === featherFishing_CurrHookLength;
                        const featherFishing_HookBodyHere = col === 4 && row < featherFishing_CurrHookLength;

                        return (

                            featherFishing_HookHeadHere ? (

                                row === 2 ? (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead} onClick = {() => featherFishing_HitManager(1)}/>

                                ) : (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead}/>

                                )

                            ) : featherFishing_HookBodyHere ? (

                                row === 2 ? (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} onClick = {() => featherFishing_HitManager(0)}/>

                                ) : (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} />

                                )

                            ) : (

                                row === 2 && col === 4? (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" onClick = {() => featherFishing_HitManager(0)}></div>

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