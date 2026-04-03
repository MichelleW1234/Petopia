import {useState, useEffect} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import { playingKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth } from "../../../helpers/Helpers.js";
import { petImages } from "../../../../../constants/MainPetImages.js";

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

            <div className="StationsFlagContainer">

                {playSelection === -1 ? (

                    <Options
                        optionsActivityKey = {playingKey}
                        optionsDesiredOption = {playDesiredOption}
                        optionsList = {playOptions} 
                        setOptionsTotal = {setPlayTotal}
                        setOptionsSelection = {setPlaySelection}
                    />

                ) : (

                    !playDone ? (

                        <>
                            <h2>Game in progress...</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playCurrNumber/playTotal) * 100)))}
                            />
                            <div className="StationsWindow StationsWindow-Play">
                                
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

                            </div>
                        </>

                    ) : (

                        <>
                            <h2>Finished!!!!</h2>
                            <ProgressBar
                                progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playCurrNumber/playTotal) * 100)))}
                            />
                            <div className="StationsWindow StationsWindow-Play">
                                <img className = "StationsImage StationsImage-Feed" src = {petImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]-1][0]} />
                            </div>
                        </>

                    )

                )}
            
                {playSelection === -1 || !playDone ? (

                    <button className = "GeneralNavButton" onClick = {() => setPlayOpenFlag(false)}>Quit</button>

                ) : (

                    <button className = "FloatingFlagButton" onClick = {() => setPlayOpenFlag(false)}>Done</button>

                )}
            </div>

        </div>

    );

}


export default Play;