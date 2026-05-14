import { useState, useEffect, useRef } from "react";
import "./GameOne.css";


function GameOne({ playCurrNumber, setPlayCurrNumber }) {

    const windowWidth = 10;

    const [start, setStart] = useState(false);
    const [activeSelection, setActiveSelection] = useState(-1);
    const [randomPattern, setRandomPattern] = useState([]);

    const randomPatternRef = useRef(randomPattern);




    useEffect(() => {
        randomPatternRef.current = randomPattern;
    }, [randomPattern]);


    useEffect(() => {

        if (!start){

            return;

        } 

        const interval = setInterval(() => {

            const copy = randomPatternRef.current.map(inner => [...inner]);

            for (let i = 0; i< copy.length; i++){

                copy[i][1] -= 1;

            }

            const newList = copy.filter(item => item[1] >= 0);

            if (!newList.some(item => item[1] >= windowWidth/2)){

                const newSlot = Math.floor(Math.random() * 4);
                newList.push([newSlot, windowWidth]);

            }
            
            setRandomPattern(newList);
            
        }, 150);

        return () => clearInterval(interval);

    }, [start]);



    useEffect(() => {

        const targetValue = randomPatternRef.current.find(item => item[1] === 0);

        if (targetValue){

            if (activeSelection === targetValue[0]){

                setPlayCurrNumber(prev => prev + 1);

            }

        }

    }, [activeSelection]);



    return (

        <div className = "Window">
            {!start && <div className="StartFlag">
                <h2>Match the keyboard pattern!</h2> 
                <button onClick = {() => setStart(true)}>Start Game</button>
            </div>}

            <div className="UsersContainer">

                <div>{activeSelection}</div>
                <button onMouseDown = {() => setActiveSelection(0)}
                        onMouseUp={() => setActiveSelection(-1)}> 
                    Up 
                    </button>
                <button onMouseDown = {() => setActiveSelection(1)}
                        onMouseUp={() => setActiveSelection(-1)}> 
                    Down 
                    </button>
                <button onMouseDown = {() => setActiveSelection(2)}
                        onMouseUp={() => setActiveSelection(-1)}> 
                    Left
                    </button>
                <button onMouseDown = {() => setActiveSelection(3)}
                        onMouseUp={() => setActiveSelection(-1)}> 
                    Right
                    </button>

            </div>

            <div className="SlotContainer">

                {Array.from({ length: windowWidth}, (_, i) => i).map(index => {

                    const slotData = randomPattern.find(item => item[1] === index);

                    return (
                        
                        slotData ? (

                            index === 0 ? (

                                <div key = {index} className="CellSlotThis">
                                    {slotData[0]}
                                </div>

                            ) : (

                                <div key = {index} className="CellSlot">
                                    {slotData[0]}
                                </div>

                            )

                        ) : (

                            index === 0 ? (

                                <div key = {index} className="CellSlotThis">
                                </div>

                            ) : (

                                <div key = {index} className="CellNormal">
                                </div>


                            )
    
                        )
                       
                    );

                })}

            </div>
                
        </div>
        
    );
}
  
export default GameOne;