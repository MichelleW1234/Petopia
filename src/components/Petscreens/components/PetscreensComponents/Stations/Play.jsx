import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { petActivityOptionGameKey, petActivityOptionImageKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { petScreensHelpersManageHealth, petScreensHelpersPauseAudio, petScreensHelpersQuitActivity } from "../../../helpers/Helpers.js";
import { helpersFlagCloser } from "../../../../../helpers/Helpers.js";

import Playing from "../../../../../Music/PetImmersionSounds/Playing.mp3";

import "./Play.css";



function Play ({playOptionsList, playOptionsDesiredOption, setPlayOptionsDesiredOption, setPlayOpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [playOptionsTotal, setPlayOptionsTotal] = useState(10);
    const [playDone, setPlayDone] = useState(false);
    const [playOptionsSelection, setPlayOptionsSelection] = useState(-1);
    const [playCurrNumber, setPlayCurrNumber] = useState(0);
    const [playSuccess, setPlaySuccess] = useState(false);

    const PlaySelectedGameWindow = playOptionsSelection === -1 ? 
                                    null 
                                    : playOptionsList[playOptionsSelection][petActivityOptionGameKey];

    const playAudioRef = useRef(new Audio(Playing));

    
    useKeyboardShortcut("Enter", () => {
    
        if (playDone){

            helpersFlagCloser(setPlayOpenFlag);

        }

    },
        ".Done"
    );


    useKeyboardShortcut("Escape", () => {

        if (!playDone){

            petScreensHelpersQuitActivity(playAudioRef, setPlayOpenFlag);

        }

    },
        ".Quit"
    );

    
    
    useEffect(() => {
        
        if (playCurrNumber >= playOptionsTotal){

            petScreensHelpersPauseAudio(playAudioRef.current);
            setPlayDone(true);
            petScreensHelpersManageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampPlayingKey, playOptionsDesiredOption, setPlayOptionsDesiredOption, playOptionsSelection, setPlaySuccess);

        }

    }, [playCurrNumber]);




    return (
        
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">

            {playOptionsSelection === -1 ? (

                <Options
                    optionsDesiredOption = {playOptionsDesiredOption}
                    optionsList = {playOptionsList} 
                    setOptionsTotal = {setPlayOptionsTotal}
                    setOptionsSelection = {setPlayOptionsSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBarPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((playCurrNumber/playOptionsTotal) * 100)))}
                    />
     
                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        {playDone ? (

                            playSuccess ? (
                           
                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenSuccess">
                                    <h2>Success!</h2>
                                </div>

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenFail">
                                    <h2>Something's off...</h2>
                                </div>

                            )

                        ) : (

                            PlaySelectedGameWindow === null ? (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Play_ComponentContainer-Template--WindowScreen"></div>

                            ) : (

                                <PlaySelectedGameWindow
                                    playCurrNumber = {playCurrNumber}
                                    setPlayCurrNumber = {setPlayCurrNumber}
                                    playAudioRef = {playAudioRef}
                                />

                            )

                        )}

                    </div>

                </div>

            )}

            {playDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => helpersFlagCloser(setPlayOpenFlag)}>Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => petScreensHelpersQuitActivity(playAudioRef, setPlayOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Play;