import { useState, useEffect } from "react";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { playSound } from "../../../../../helpers/Helpers.js";
import { screenButtonPressSoundKey, startActivitySoundKey } from "../../../../../constants/Constants.js";
import { startActivity } from "../../../helpers/Helpers.js";

import "./CatGameTwo.css";




function CatGameTwo({ playCurrNumber, setPlayCurrNumber, playAudioRef }) {

    const catGameTwoWindowWidth = 2;
    const catGameTwoWindowHeight = 4;

    const [catGameTwoStart, setCatGameTwoStart] = useState(false);

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

        }, 600);

        return () => clearInterval(interval);

    }, [catGameTwoStart]);




    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MouseHunt_ComponentContainer-Structure--Screen">

            {!catGameTwoStart && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Catch the fishing line when the feather hits the red line.</h2> 
                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow Start" onClick = {() => startActivity(setCatGameTwoStart)}> Start <br/> [return]</button>
            </div>}

            <div className="MouseHunt_ComponentContainer-Structure--Grid">

                {Array.from({ length: catGameTwoWindowHeight}, (_, row) => 
                    Array.from({ length: catGameTwoWindowWidth}, (_, col) => {

                        return (
                            
                            <div key = {row + " & " + col} className="MouseHunt_ComponentContainer-Template--GridCell"></div>
                        
                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default CatGameTwo;