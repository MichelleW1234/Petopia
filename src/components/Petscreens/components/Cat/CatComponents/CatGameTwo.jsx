import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { playSound } from "../../../../../helpers/Helpers.js";
import { soundScreenButtonPressKey, soundStartActivityKey } from "../../../../../constants/Constants.js";
import { startActivity } from "../../../helpers/Helpers.js";

import "./CatGameTwo.css";




function CatGameTwo({ playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const catGameTwoWindowWidth = 8;
    const catGameTwoWindowHeight = 5;

    const [catGameTwoStart, setCatGameTwoStart] = useState(false);
    const [catGameTwoHookLength, setCatGameTwoHookLength] = useState(0);
    const [catGameTwoHitAttempt, setCatGameTwoHitAttempt] = useState(false);

    useKeyboardShortcut("Enter", () => {
    
        if (!catGameTwoStart){

            startActivity(setCatGameTwoStart);

        }

    },
        ".Start"
    );

    


    useEffect(() => {

        if (!catGameTwoStart) {
            return;
        }

        playAudioRef.current.loop = true;
        playAudioRef.current.play();

        return () => {
            playAudioRef.current.pause();
            playAudioRef.current.currentTime = 0;
            playAudioRef.current.loop = false;
        };

    }, [catGameTwoStart]);



    useEffect(() => {

        if (!catGameTwoStart){

            return;

        } 

        const interval = setInterval(() => {

            const movement = Math.floor(Math.random() * 2);

            if (movement === 0) {

                setCatGameTwoHookLength(prev => Math.max(prev - 1, 0));

            } else {

                setCatGameTwoHookLength(prev => Math.min(prev + 1, 4));

            }

            if (catGameTwoHitAttempt){

                setCatGameTwoHitAttempt(false);

            }

        }, 400);

        return () => clearInterval(interval);

    }, [catGameTwoStart, catGameTwoHitAttempt]);



    const checkHit = (success) => {

        playSound(soundScreenButtonPressKey);

        if (!catGameTwoHitAttempt){

            if (success === 1){

                setPlayCurrNumber(prev => prev + 1);

            } else {

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            }

            setCatGameTwoHitAttempt(true);

        }

    }




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MouseHunt_ComponentContainer-Structure--Screen">

            {!catGameTwoStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Only catch the fishing line when the feather lands on red.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setCatGameTwoStart)}> Start <br/> [return]</button>
            </div>}

            <div className="CatGameTwo_ComponentContainer-Structure--Grid">

                {Array.from({ length: catGameTwoWindowHeight}, (_, row) => 
                    Array.from({ length: catGameTwoWindowWidth}, (_, col) => {

                        const hookHead = col === 4 && row === catGameTwoHookLength;
                        const hookBody = col === 4 && row < catGameTwoHookLength;

                        return (

                            hookHead ? (

                                row === 2 ? (

                                    <div key = {row + " & " + col} className="CatGameTwo_ComponentContainer-Template--GridCellTarget" onClick = {() => checkHit(1)}>
                                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAqF8KjasQey3t0ylVdk3i3LUwBBMAXB56N4yXQCqQQ&s=10"></img>
                                    </div>

                                ) : (

                                    <div key = {row + " & " + col} className="CatGameTwo_ComponentContainer-Template--GridCellNontarget">
                                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAqF8KjasQey3t0ylVdk3i3LUwBBMAXB56N4yXQCqQQ&s=10"></img>
                                    </div>

                                )

                            ) : hookBody ? (

                                row === 2 ? (

                                    <div key = {row + " & " + col} className="CatGameTwo_ComponentContainer-Template--GridCellTarget" onClick = {() => checkHit(0)}>
                                        <img src = "https://img.favpng.com/2/20/14/line-clip-art-png-favpng-Aq2GcCNQxaktrgWaumHyCZw0D_t.jpg"></img>
                                    </div>

                                ) : (

                                    <div key = {row + " & " + col} className="CatGameTwo_ComponentContainer-Template--GridCellNontarget">
                                        <img src = "https://img.favpng.com/2/20/14/line-clip-art-png-favpng-Aq2GcCNQxaktrgWaumHyCZw0D_t.jpg"></img>
                                    </div>

                                )

                            ) : (

                                row === 2 ? (

                                    <div key = {row + " & " + col} className="CatGameTwo_ComponentContainer-Template--GridCellTarget" onClick = {() => checkHit(0)}></div>

                                ) : (

                                    <div key = {row + " & " + col} className="CatGameTwo_ComponentContainer-Template--GridCellNontarget"></div>

                                )

                            ) 

                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default CatGameTwo;