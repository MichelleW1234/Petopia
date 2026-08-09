import { useState, useEffect, useRef } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { startActivity } from "../../../helpers/Helpers.js";
import { playSound } from "../../../../../helpers/Helpers.js";
import { screenButtonPressSoundKey } from "../../../../../constants/Constants.js";

import "./DogGameTwo.css";




function DogGameTwo({ playCurrNumber, setPlayCurrNumber, playAudioRef}) {

    const dogGameTwoWindowWidth = 8;
    const dogGameTwoWindowHeight = 5;

    const [dogGameTwoStart, setDogGameTwoStart] = useState(false);


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


        }, 200);

        return () => clearInterval(interval);

    }, [dogGameTwoStart]);




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen StrollPatrol_ComponentContainer-Template--Screen">

            {!dogGameTwoStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Hold the rope down when the light lands in the green area.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setDogGameTwoStart)}> Start <br/> [return]</button>
            </div>}

            <div className="StrollPatrol_ComponentContainer-Structure--Grid">

                {Array.from({ length: dogGameTwoWindowHeight}, (_, row) => 
                    Array.from({ length: dogGameTwoWindowWidth}, (_, col) => {

                        return (
                                
                            <div key = {row + " & " + col} className="StrollPatrol_ComponentContainer-Structure--GridCell"></div>
                        
                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default DogGameTwo;