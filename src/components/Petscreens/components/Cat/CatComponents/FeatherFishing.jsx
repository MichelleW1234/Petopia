import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { playSound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey, soundStartActivityKey } from "../../../../../constants/Constants.js";
import { startActivity } from "../../../helpers/Helpers.js";

import "./FeatherFishing.css";




function FeatherFishing({ playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const featherFishingWindowWidth = 8;
    const featherFishingWindowHeight = 5;

    const [featherFishingStart, setFeatherFishingStart] = useState(false);
    const [featherFishingHookLength, setFeatherFishingHookLength] = useState(0);
    const [featherFishingHitAttempt, setFeatherFishingHitAttempt] = useState(false);

    useKeyboardShortcut("Enter", () => {
    
        if (!featherFishingStart){

            startActivity(setFeatherFishingStart);

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

        const interval = setInterval(() => {

            const movement = Math.floor(Math.random() * 2);

            if (movement === 0) {

                setFeatherFishingHookLength(prev => Math.max(prev - 1, 0));

            } else {

                setFeatherFishingHookLength(prev => Math.min(prev + 1, 4));

            }

            if (featherFishingHitAttempt){

                setFeatherFishingHitAttempt(false);

            }

        }, 400);

        return () => clearInterval(interval);

    }, [featherFishingStart, featherFishingHitAttempt]);



    const checkHit = (success) => {

        playSound(soundScreenButtonPressKey);

        if (!featherFishingHitAttempt){

            if (success === 1){

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
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setFeatherFishingStart)}> Start <br/> [return]</button>
            </div>}

            <div className="FeatherFishing_ComponentContainer-Structure--Grid">

                {Array.from({ length: featherFishingWindowHeight}, (_, row) => 
                    Array.from({ length: featherFishingWindowWidth}, (_, col) => {

                        const hookHead = col === 4 && row === featherFishingHookLength;
                        const hookBody = col === 4 && row < featherFishingHookLength;

                        return (

                            hookHead ? (

                                row === 2 ? (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCellTarget" onClick = {() => checkHit(1)}>
                                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAqF8KjasQey3t0ylVdk3i3LUwBBMAXB56N4yXQCqQQ&s=10"></img>
                                    </div>

                                ) : (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCellNontarget">
                                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAqF8KjasQey3t0ylVdk3i3LUwBBMAXB56N4yXQCqQQ&s=10"></img>
                                    </div>

                                )

                            ) : hookBody ? (

                                row === 2 ? (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCellTarget" onClick = {() => checkHit(0)}>
                                        <img src = "https://img.favpng.com/2/20/14/line-clip-art-png-favpng-Aq2GcCNQxaktrgWaumHyCZw0D_t.jpg"></img>
                                    </div>

                                ) : (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCellNontarget">
                                        <img src = "https://img.favpng.com/2/20/14/line-clip-art-png-favpng-Aq2GcCNQxaktrgWaumHyCZw0D_t.jpg"></img>
                                    </div>

                                )

                            ) : (

                                row === 2 ? (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCellTarget" onClick = {() => checkHit(0)}></div>

                                ) : (

                                    <div key = {row + " & " + col} className="FeatherFishing_ComponentContainer-Template--GridCellNontarget"></div>

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