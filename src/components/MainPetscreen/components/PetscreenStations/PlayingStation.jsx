import {useState, useEffect} from "react";

import ProgressBar from "./PetscreenStationComponents/ProgressBar.jsx";

import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../providers/PetTimeStampsProvider.jsx";

import { playingKey, speciesKey } from "../../../../constants/Constants.js";
import { manageHealth } from "../../helpers/Helpers.js";

import "./PlayingStation.css";


function PlayingStation ({gameOptions, desiredOption, setDesiredOption, setOpenPlayingFlag}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const totalWinsUntilTired = 10;

    const [done, setDone] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [numberOfWins, setNumberOfWins] = useState(0);


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

                                <button key = {index} onClick = {() => setSelection(index)}> {game} </button>
                                
                            ))}

                    </div>


                </div>

            ) : (

                !done ? (

                    <div className = {`PetWindowBorder PetWindowBorder-${PetList[ActivePetName][speciesKey]}`}>

                        <ProgressBar
                            percentageUntilNextUpdate={Math.round((numberOfWins/totalWinsUntilTired) * 100)}
                        />

                        {selection === 0 ? (

                            <button onClick = {() => setNumberOfWins(prev => prev + 1)}> Placeholder Button 1 </button>

                        ) : selection ===  1 ? (

                            <button onClick = {() => setNumberOfWins(prev => prev + 1)}> Placeholder Button 2 </button>

                        ) : (

                            <button onClick = {() => setNumberOfWins(prev => prev + 1)}> Placeholder Button 3 </button>

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

                <button className = "FloatingFlagButton" onClick = {() => manageHealth(setPetTimeStamps, setPetList, ActivePetName, playingKey, desiredOption, setDesiredOption, selection, setOpenPlayingFlag)}>Done</button>

            )}

        </div>

    );

}


export default PlayingStation;