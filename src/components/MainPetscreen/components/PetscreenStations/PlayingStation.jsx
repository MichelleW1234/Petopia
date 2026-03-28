import {useState, useEffect} from "react";

import ProgressBar from "./PetscreenStationComponents/ProgressBar.jsx";

import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";

import { playingKey, speciesKey } from "../../../../constants/Constants.js";
import { judgeSelection, manageHealth } from "../../helpers/Helpers.js";

import "./PlayingStation.css";



function PlayingStation ({gameOptions, gameComponents, desiredOption, setDesiredOption, setOpenPlayingFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [totalWinsUntilTired, setTotalWinsUntilTired] = useState(10);
    const [done, setDone] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [numberOfWins, setNumberOfWins] = useState(0);

    const selectedGameWindow = selection !== -1 ? 
                                    gameComponents[selection]
                                    : null;



    useEffect(() => {

        if (numberOfWins >= totalWinsUntilTired){

            setDone(true);

        }

    }, [numberOfWins]);




    return (
        
        <div className = "FloatingFlagBackground">

            {selection === -1 ? (

                <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                    {desiredOption === -1 ? (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}>
                            Option: Not restless
                        </h2>

                    ) : (

                        <h2 className={`PetWindowSign PetWindowSign-${PetList[ActivePetName][speciesKey]}`}>
                            option: {gameOptions[desiredOption]}
                        </h2>

                    )}

                    <div className= "FeedingWindowSelectionContainer">  

                        {gameOptions.map((game, index) => (

                            <button key = {index} onClick = {() => judgeSelection(index, desiredOption, totalWinsUntilTired*2, setTotalWinsUntilTired, setSelection)}> {game} </button>
                            
                        ))}

                    </div>


                </div>

            ) : (

                !done ? (

                    <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                        <ProgressBar
                            percentageUntilNextUpdate={Math.round((numberOfWins/totalWinsUntilTired) * 100)}
                        />

                        {selectedGameWindow !== null ? (

                            <button onClick = {() => setNumberOfWins(prev => prev + 1)}> {selectedGameWindow} </button>
                            /*
                            <selectedGameWindow
                                setDone = {setDone}
                                numberOfWins = {numberOfWins}
                                setNumberOfWins = {setNumberOfWins}
                            />
                            */

                        ) : (

                            null /*Default window? */

                        )}

                    </div>

                ) : (

                    <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                        <ProgressBar
                            percentageUntilNextUpdate={Math.round((numberOfWins/totalWinsUntilTired) * 100)}
                        />

                        <h2>Finished!!!!</h2>

                    </div>

                )

            )}
           
            {selection === -1 || !done ? (

                <button className = "GeneralNavButton" onClick = {() => setOpenPlayingFlag(false)}>Quit</button>

            ) : (

                <button className = "FloatingFlagButton" onClick = {() => manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, playingKey, desiredOption, setDesiredOption, selection, setOpenPlayingFlag)}>Done</button>

            )}

        </div>

    );

}


export default PlayingStation;