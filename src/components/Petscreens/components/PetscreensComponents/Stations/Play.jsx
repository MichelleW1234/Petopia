import {useState, useEffect} from "react";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import { moodPetImages, playingKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth } from "../../../helpers/Helpers.js";

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

        const preloadImages = [...playOptions];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, []);
    
    useEffect(() => {

        if (playCurrNumber >= playTotal){

            setPlayDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, playingKey, playDesiredOption, setPlayDesiredOption, playSelection);

        }

    }, [playCurrNumber]);




    return (
        
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_StationBackgroundColor">

            {playSelection === -1 ? (

                <Options
                    optionsDesiredOption = {playDesiredOption}
                    optionsList = {playOptions} 
                    setOptionsTotal = {setPlayTotal}
                    setOptionsSelection = {setPlaySelection}
                />

            ) : (

                <>
                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playCurrNumber/playTotal) * 100)))}
                    />

                    <div className="ReusableComponentContainer_WindowBorderStructure FloatingFlag_ReusableComponentContainer_StationColor">
                        <div className="Stations_WindowContainer">
                            {!playDone ? (
                                        
                                playSelectedGameWindow !== null ? (

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

                                )

                            ) : (

                                /*CHANGE THIS LATER!!!!!!!!!!!!!!!*/
                                <img className = "Stations_WindowImage" src = {moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]} />

                            )}
                        </div>
                    </div>

                </>

            )}
        
            <div className="Universal_RowContainer">
                {playSelection === -1 || !playDone ? (

                    <>
                        <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_StationColor" onClick = {() => setPlayOpenFlag(false)}>Quit</button>
                        <button className = "ReusableComponentButtonPill_PlaceholderStructure FloatingFlag_ReusableComponentButtonPill_StationPlaceholderColor">Done</button>
                    </>

                ) : (

                    <>
                        <button className = "ReusableComponentButtonPill_PlaceholderStructure FloatingFlag_ReusableComponentButtonPill_StationPlaceholderColor">Quit</button>
                        <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_StationColor" onClick = {() => setPlayOpenFlag(false)}>Done</button>
                    </>

                )}
            </div>

        </div>

    );

}


export default Play;