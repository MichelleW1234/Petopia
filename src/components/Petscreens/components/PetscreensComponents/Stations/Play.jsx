import {useState, useEffect} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import { playingKey, speciesKey } from "../../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../../helpers/Helpers.js";

import "./Play.css";
import "./Stations.css";



function Play ({playOptions, playComponents, playDesiredOption, setPlayDesiredOption, setPlayOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [playTotal, setPlayTotal] = useState(10);
    const [playDone, setPlayDone] = useState(false);
    const [playSelection, setPlaySelection] = useState(-1);
    const [playCurrNumber, setPlayCurrNumber] = useState(0);

    const playSelectedGameWindow = playSelection !== -1 ? 
                                        playComponents[playSelection]
                                        : null;



    useEffect(() => {

        if (playCurrNumber >= playTotal){

            setPlayDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, playingKey, playDesiredOption, setPlayDesiredOption, playSelection);

        }

    }, [playCurrNumber]);




    return (
        
        <div className = "FloatingFlagBackground">

            {playSelection === -1 ? (

                <>

                    {playDesiredOption === -1 ? (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}>
                            Option: Not restless
                        </h2>

                    ) : (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}>
                            option: {playOptions[playDesiredOption]}
                        </h2>

                    )}

                    <div className= "StationsWindowSelectionContainer">  

                        {playOptions.map((game, index) => (

                            <button key = {index} className = "StationsWindowSelectionOptionButton" onClick = {() => judgeSelection(index, playDesiredOption, playTotal*2, setPlayTotal, setPlaySelection)}> {game} </button>
                            
                        ))}

                    </div>

                </>

            ) : (

                !playDone ? (

                    <>

                        <ProgressBar
                            progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playCurrNumber/playTotal) * 100)))}
                        />

                        {playSelectedGameWindow !== null ? (

                            <button onClick = {() => setPlayCurrNumber(prev => prev + 1)}> {playSelectedGameWindow} </button>
                            /*
                            <playSelectedGameWindow
                                setPlayDone = {setPlayDone}
                                playCurrNumber = {playCurrNumber}
                                setPlayCurrNumber = {setPlayCurrNumber}
                            />
                            */

                        ) : (

                            null /*Default window? */

                        )}

                    </>

                ) : (

                    <>

                        <ProgressBar
                            progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playCurrNumber/playTotal) * 100)))}
                        />

                        <h2>Finished!!!!</h2>

                    </>

                )

            )}
           
            {playSelection === -1 || !playDone ? (

                <button className = "GeneralNavButton" onClick = {() => setPlayOpenFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => setPlayOpenFlag(false)}>Done</button>

            )}

        </div>

    );

}


export default Play;