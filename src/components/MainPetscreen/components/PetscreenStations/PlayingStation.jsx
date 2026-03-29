import {useState, useEffect} from "react";

import ProgressBar from "./PetscreenStationComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";

import { playingKey, speciesKey } from "../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../helpers/Helpers.js";

import "./PlayingStation.css";



function PlayingStation ({playingOptions, playingComponents, playingDesiredOption, setPlayingDesiredOption, setPlayingOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [playingTotal, setPlayingTotal] = useState(10);
    const [playingDone, setPlayingDone] = useState(false);
    const [playingSelection, setPlayingSelection] = useState(-1);
    const [playingCurrNumber, setPlayingCurrNumber] = useState(0);

    const playingSelectedGameWindow = playingSelection !== -1 ? 
                                        playingComponents[playingSelection]
                                        : null;



    useEffect(() => {

        if (playingCurrNumber >= playingTotal){

            setPlayingDone(true);

        }

    }, [playingCurrNumber]);




    return (
        
        <div className = "FloatingFlagBackground">

            {playingSelection === -1 ? (

                <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                    {playingDesiredOption === -1 ? (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}>
                            Option: Not restless
                        </h2>

                    ) : (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}>
                            option: {playingOptions[playingDesiredOption]}
                        </h2>

                    )}

                    <div className= "FeedingWindowSelectionContainer">  

                        {playingOptions.map((game, index) => (

                            <button key = {index} onClick = {() => judgeSelection(index, playingDesiredOption, playingTotal*2, setPlayingTotal, setPlayingSelection)}> {game} </button>
                            
                        ))}

                    </div>


                </div>

            ) : (

                !playingDone ? (

                    <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                        <ProgressBar
                            percentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playingCurrNumber/playingTotal) * 100)))}
                        />

                        {playingSelectedGameWindow !== null ? (

                            <button onClick = {() => setPlayingCurrNumber(prev => prev + 1)}> {playingSelectedGameWindow} </button>
                            /*
                            <playingSelectedGameWindow
                                setPlayingDone = {setPlayingDone}
                                playingCurrNumber = {playingCurrNumber}
                                setPlayingCurrNumber = {setPlayingCurrNumber}
                            />
                            */

                        ) : (

                            null /*Default window? */

                        )}

                    </div>

                ) : (

                    <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                        <ProgressBar
                            percentageUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playingCurrNumber/playingTotal) * 100)))}
                        />

                        <h2>Finished!!!!</h2>

                    </div>

                )

            )}
           
            {playingSelection === -1 || !playingDone ? (

                <button className = "GeneralNavButton" onClick = {() => setPlayingOpenFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, playingKey, playingDesiredOption, setPlayingDesiredOption, playingSelection, setPlayingOpenFlag)}>Done</button>

            )}

        </div>

    );

}


export default PlayingStation;