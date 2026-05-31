import { useState, useEffect, useRef } from "react";
import "./GameOne.css";

import carrot from "../../../../../images/carrot.png";
import skull from "../../../../../images/skull.png";
import dog from "../../../../../images/HorizontalDog.png";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { starter } from "../../../helpers/Helpers.js";
import { playSound } from "../../../../../helpers/helpers.js";
import { gameButtonSoundKey } from "../../../../../constants/Constants.js";


function GameOne({ playSelection, playDone, playCurrNumber, setPlayCurrNumber, playAudioRef}) {

    const windowWidth = 8;
    const windowHeight = 5;

    const [start, setStart] = useState(false);
    const [objectPositions, setObjectPositions] = useState([]);
    const [dogPosition, setDogPosition] = useState([4, 2]);


    useKeyboardShortcut("Enter", () => {
    
        if (playSelection !== -1 && !playDone){

            starter(setStart);

        }

    },
        ".Start"
    );


    useKeyboardShortcut("ArrowUp", (e) => {
    
        if (start){

            e.preventDefault();
            moveUp();

        }

    },
        ".Up"
    );


    useKeyboardShortcut("ArrowDown", (e) => {
    
        if (start){

            e.preventDefault();
            moveDown();

        }

    },
        ".Down"
    );



    useEffect(() => {

        if (!start || playDone) {
            return;
        }

        playAudioRef.current[0].loop = true;
        playAudioRef.current[0].play();

        return () => {
            playAudioRef.current[0].pause();
            playAudioRef.current[0].currentTime = 0;
            playAudioRef.current[0].loop = false;
        };

    }, [start, playDone]);


    useEffect(() => {

        const preloadImages = [carrot, skull, dog];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, []);


    useEffect(() => {

        if (!start){

            return;

        } 

        const interval = setInterval(() => {

            setObjectPositions(prev => {

                const copy = prev.map(inner => [...inner]);

                for (let i = 0; i< copy.length; i++){

                    copy[i][0] -= 1;

                }

                const newList = copy.filter(item => item[0] >= 0);
                

                if (!newList.some(item => item[0] > 3)){

                    newList.push([windowWidth, Math.floor(Math.random() * windowHeight), Math.floor(Math.random() * 2)]);

                }

                return newList;

            });

        }, 200);

        return () => clearInterval(interval);

    }, [start]);

    
    useEffect(() => {

        const copy = objectPositions.map(inner => [...inner]);

        const hitIndex = copy.findIndex(item => item[0] === dogPosition[0] && item[1] === dogPosition[1]);
    
        if (hitIndex !== -1){

            if (copy[hitIndex][2] === 1){

                setPlayCurrNumber(prev => prev + 1);

            } else {

                setPlayCurrNumber(prev => Math.max(prev - 1, 0));

            }

            copy.splice(hitIndex, 1);
            setObjectPositions(copy);
            
        }

    }, [objectPositions, dogPosition]);



    const moveUp = () => {

        playSound(gameButtonSoundKey);

        if (dogPosition[1] > 0){

            setDogPosition(prev => [prev[0], prev[1]-1]);

        }

    }

    const moveDown = () => {

        playSound(gameButtonSoundKey);
        
        if (dogPosition[1] < windowHeight-1){

            setDogPosition(prev => [prev[0], prev[1]+1]);

        }

    }



    return (

        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen GameWindow">

            {!start && <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowStartFlag">
                <h2>Lead the dog on your walk to eat all the carrots! Avoid everything else!</h2> 
                <button className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowButton Start" onClick = {() => starter(setStart)}>Start <br/> [return]</button>
            </div>}

            <div className="UsersContainer">

                <button className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowButton Up" onClick = {() => moveUp()}> 
                    [&#x2B06;]
                </button>
                <button className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowButton Down" onClick = {() => moveDown()}> 
                    [&#x2B07;]
                </button>

            </div>

            <div className="SlotContainer">

                {Array.from({ length: windowHeight}, (_, row) => 
                    Array.from({ length: windowWidth}, (_, col) => {

                        const dogHere = col === dogPosition[0] && row === dogPosition[1];
                        const badHere = objectPositions.find(item => item[0] === col && item[1] === row && item[2] === 0);
                        const goodHere = objectPositions.find(item => item[0] === col && item[1] === row && item[2] === 1);

                        return (
                            
                            dogHere ? (

                                <img key = {row + " & " + col} className="CellSlot" src = {dog}/>
                                
                            ) : badHere ? (

                                <img key = {row + " & " + col} className="CellSlot" src = {skull}/>

                            ) : goodHere ? (
                                
                                <img key = {row + " & " + col} className="CellSlot" src = {carrot}/>
                                
                            ) : (

                                <div key = {row + " & " + col} className="CellSlot"></div>
        
                            )
                        
                        );

                    })
                )}

            </div>
                
        </div>
        
    );
}
  
export default GameOne;