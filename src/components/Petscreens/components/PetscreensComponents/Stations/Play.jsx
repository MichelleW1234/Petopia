import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { moodPetImages, optionGameKey, optionImageKey, playingKey, speciesKey, stageKey } from "../../../../../constants/Constants.js";
import { manageHealth, pauseAudio, quitActivity } from "../../../helpers/Helpers.js";
import { flagCloser } from "../../../../../helpers/helpers.js";

import play from "../../../../../Music/PetImmersionSounds/Play.mp3";

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

    const PlaySelectedGameWindow = playOptionsSelection !== -1 ? 
                                    playOptionsList[playOptionsSelection][optionGameKey]
                                    : null;

    const playAudioRef = useRef(new Audio(play));

    
    useKeyboardShortcut("Enter", () => {
    
        if (playDone){

            flagCloser(setPlayOpenFlag);

        }

    },
        ".Done"
    );


    useKeyboardShortcut("Escape", () => {

        if (!playDone){

            quitActivity(playAudioRef, setPlayOpenFlag);

        }

    },
        ".Quit"
    );
        



    useEffect(() => {

        const preloadImages = [...playOptionsList.map(item => item[optionImageKey])];

        preloadImages.forEach((src) => {
        const img = new Image();
            img.src = src;
        });

    }, []);
    
    
    useEffect(() => {
        
        if (playCurrNumber >= playOptionsTotal){

            pauseAudio(playAudioRef.current);
            setPlayDone(true);
            manageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, playingKey, playOptionsDesiredOption, setPlayOptionsDesiredOption, playOptionsSelection, setPlaySuccess);

        }

    }, [playCurrNumber]);




    return (
        
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Station">

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

                        {!playDone ? (

                            PlaySelectedGameWindow !== null ? (

                                <PlaySelectedGameWindow
                                    playCurrNumber = {playCurrNumber}
                                    setPlayCurrNumber = {setPlayCurrNumber}
                                    playAudioRef = {playAudioRef}
                                />

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Play_ComponentContainer-Template--WindowScreen"></div>

                            )

                        ) : (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Play_ComponentContainer-Template--WindowScreen">

                                <img src = {playSuccess ? moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][0]
                                            : moodPetImages[PetList[ActivePetName][speciesKey]][PetList[ActivePetName][stageKey]][1]} 
                                />

                            </div>

                        )}

                    </div>

                </div>

            )}

            {!playDone ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => quitActivity(playAudioRef, setPlayOpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => flagCloser(setPlayOpenFlag)}>Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Play;