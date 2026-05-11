import { useEffect } from "react";
import "./GameOne.css";


function GameOne({ playTotal, setPlayDone, playCurrNumber, setPlayCurrNumber }) {

    const windowWidth = 10;
    const boundary = 4;

    const [userPattern, setUserPattern] = useState(Array.from({ length: 10 }, () => -1));

    const [randomPattern, setRandomPattern] = useState(
            Array.from({ length: 10 }, () => [Math.floor(Math.random() * 4), -1])
        );

    const [activatedNumber, setActivatedNumber] = useState(0);

    const [pause, setPause] = useState(true);
    const [roundDone, setRoundDone] = false;



    useEffect(() => {

        if (playCurrNumber >= playTotal || pause){

            return;

        } else if (randomPattern.every(pair => pair[1] === -2)){

            let tally = 0;

            for (let i = 0; i< randomPattern.length; i++){

                if (randomPattern[i][0] === userPattern[i]){

                    tally += 1;

                }

            }

            if (tally >= 7) {

                setPlayCurrNumber(prev => prev + 1);

            }

            setPause(true);

        } else {

            const interval = setInterval(() => {

                const copy = randomPattern.map(inner => [...inner]);

                for (let i = 0; i< copy.length; i++){

                    if (copy[i][1] !== -2 && i <= activatedNumber) {

                        if (copy[i][1] === boundary){

                            copy[i][1] = -2;

                        } else if (i === activatedNumber){

                            copy[i][1] = windowWidth;
    
                        } else {

                            copy[i][1] -= 1;

                        }

                    }

                }

                setRandomPattern(copy);
                setActivatedNumber(prev => prev + 1);
                
            }, 100);

            return () => clearInterval(interval);

        }

    }, [randomPattern, pause]);




    
    const nextRund = () => {

        setPause(false);
        setRandomPattern(Array.from({ length: 10 }, () => [Math.floor(Math.random() * 4), -1]));

    }




    return (

        <div className = "Window">
            
        </div>
        
    );
}
  
export default GameOne;