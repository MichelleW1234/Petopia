import { useState, useEffect } from "react";

import { helpers_Player_UIIndicatorSounds } from "../../../../../helpers/helpers.js";
import { audioScreenButtonPressKey, audioStartActivityKey } from "../../../../../constants/Constants.js";

import featherHead from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherHead.png";
import featherBody from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherBody.png";
import arrow from "../../../../../images/ActivityGameTargetArrow.png";
import Blank from "../../../../../images/BlankGridSpace.png";

import "../../../../../App.css";
import "./FeatherFishing.css";




function FeatherFishing({ play_CurrNumber, set_Play_CurrNumber, play_AudioRef }) {

    const featherFishing_WindowWidth = 5;

    const [featherFishing_Start, set_FeatherFishing_Start] = useState(false);
    const [featherFishing_CurrHookLength, set_FeatherFishing_HookLength] = useState(0);
    const [featherFishing_HitAttempt, set_FeatherFishing_HitAttempt] = useState(false);


    useEffect(() => {

        play_AudioRef.current.loop = true;
        play_AudioRef.current.play();

        return () => {
            play_AudioRef.current.pause();
            play_AudioRef.current.currentTime = 0;
            play_AudioRef.current.loop = false;
        };

    }, []);



    useEffect(() => {

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

    }, [featherFishing_HitAttempt]);



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

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Color--GlobalWindowScreen--FeatherFishing">
            
            <img className = "MiscellaneousElements_ComponentImage-Template--FloatingFlagGameTargetArrow MiscellaneousElements_ComponentImage-Template--FloatingFlagGameTargetArrow--Top" src = {arrow}/>
            <img className = "MiscellaneousElements_ComponentImage-Template--FloatingFlagGameTargetArrow MiscellaneousElements_ComponentImage-Template--FloatingFlagGameTargetArrow--Bottom" src = {arrow}/>

            <div className="FeatherFishing_ComponentContainer-Structure--Grid">

                {Array.from({ length: featherFishing_WindowWidth}, (_, row) => {

                    const featherFishing_HookHeadHere = row === featherFishing_CurrHookLength;
                    const featherFishing_HookBodyHere = row < featherFishing_CurrHookLength;

                    return (

                        featherFishing_HookHeadHere ? (

                            row === 2 ? (

                                <img key = {row} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead} onClick = {() => featherFishing_HitManager(1)}/>

                            ) : (

                                <img key = {row} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead} onClick = {() => featherFishing_HitManager(0)}/>

                            )

                        ) : featherFishing_HookBodyHere ? (

                            row === 2 ? (

                                <img key = {row} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} onClick = {() => featherFishing_HitManager(0)}/>

                            ) : (

                                <img key = {row} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} onClick = {() => featherFishing_HitManager(0)}/>

                            )

                        ) : (

                            row === 2 ? (

                                <img key = {row} className="FeatherFishing_ComponentContainer-Template--GridCellBlank" src={Blank}/>

                            ) : (

                                <img key = {row} className="FeatherFishing_ComponentContainer-Template--GridCellBlank" src={Blank}/>

                            )

                        ) 

                    );

                })}

            </div>
                
        </div>
        
    );
}
  
export default FeatherFishing;