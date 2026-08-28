import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { helpersPlaySound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey, soundStartActivityKey } from "../../../../../constants/Constants.js";
import { petScreensHelpersStartActivity } from "../../../helpers/Helpers.js";

import featherHead from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherHead.png";
import featherBody from "../../../../../images/Cat/Play/Games/FeatherFishing/FeatherBody.png";
import arrow from "../../../../../images/Cat/Play/Games/FeatherFishing/Arrow.png";

import "./FeatherFishing.css";




function FeatherFishing({ playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const featherFishingWindowWidth = 9;
    const featherFishingWindowHeight = 5;

    const [featherFishingStart, setFeatherFishingStart] = useState(false);
    const [featherFishingHookLength, setFeatherFishingHookLength] = useState(0);
    const [featherFishingHitAttempt, setFeatherFishingHitAttempt] = useState(false);

    useKeyboardShortcut("Enter", () => {
    
        if (!featherFishingStart){

            petScreensHelpersStartActivity(setFeatherFishingStart);

        }

    },
        ".Start"
    );

    


    useEffect(() => {

        if (!featherFishingStart) {
            return;
        }

        playAudioRef.current.loop = true;
        playAudioRef.current.play();

        return () => {
            playAudioRef.current.pause();
            playAudioRef.current.currentTime = 0;
            playAudioRef.current.loop = false;
        };

    }, [featherFishingStart]);



    useEffect(() => {

        if (!featherFishingStart){

            return;

        } 

        const featherFishingInterval = setInterval(() => {

            const featherFishingIntervalMovement = Math.floor(Math.random() * 2);

            if (featherFishingIntervalMovement === 0) {

                setFeatherFishingHookLength(prev => Math.max(prev - 1, 0));

            } else {

                setFeatherFishingHookLength(prev => Math.min(prev + 1, 4));

            }

            if (featherFishingHitAttempt){

                setFeatherFishingHitAttempt(false);

            }

        }, 400);

        return () => clearInterval(featherFishingInterval);

    }, [featherFishingStart, featherFishingHitAttempt]);



    const featherFishingCheckHit = (featherFishingCheckHitSuccess) => {

        helpersPlaySound(soundScreenButtonPressKey);

        if (!featherFishingHitAttempt){

            if (featherFishingCheckHitSuccess === 1){

                setPlayCurrNumber(prev => prev + 1);

            } else {

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            }

            setFeatherFishingHitAttempt(true);

        }

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen FeatherFishing_ComponentContainer-Structure--Screen">

            {!featherFishingStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Only catch the fishing line when the feather lands on red.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click Start" onClick = {() => petScreensHelpersStartActivity(setFeatherFishingStart)}> Start <br/> [return]</button>
            </div>}

            
            <img className = "FeatherFishing_ComponentContainer-Template--Arrow FeatherFishing_ComponentContainer-Template--Arrow--Left" src = {arrow}/>
            <img className = "FeatherFishing_ComponentContainer-Template--Arrow FeatherFishing_ComponentContainer-Template--Arrow--Right" src = {arrow}/>
            <div className= "FeatherFishing_ComponentContainer-Template--HitBox"></div>

            <div className="FeatherFishing_ComponentContainer-Structure--Grid">

                {Array.from({ length: featherFishingWindowHeight}, (_, row) => 
                    Array.from({ length: featherFishingWindowWidth}, (_, col) => {

                        const featherFishingHookHead = col === 4 && row === featherFishingHookLength;
                        const featherFishingHookBody = col === 4 && row < featherFishingHookLength;

                        return (

                            featherFishingHookHead ? (

                                row === 2 ? (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead} onClick = {() => featherFishingCheckHit(1)}/>

                                ) : (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherHead}/>

                                )

                            ) : featherFishingHookBody ? (

                                row === 2 ? (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} onClick = {() => featherFishingCheckHit(0)}/>

                                ) : (

                                    <img key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" src = {featherBody} />

                                )

                            ) : (

                                row === 2 && col === 4? (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCell" onClick = {() => featherFishingCheckHit(0)}></div>

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