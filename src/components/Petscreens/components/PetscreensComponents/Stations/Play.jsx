import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBar from "./StationsComponents/ProgressBar.jsx";
import Options from "./StationsComponents/Options.jsx";

import { petActivityOptionGameKey, petActivityOptionImageKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_ManageHealth, petScreensHelpers_PauseAudio, petScreensHelpers_QuitActivity } from "../../../helpers/Helpers.js";
import { helpers_FlagCloser } from "../../../../../helpers/Helpers.js";

import Playing from "../../../../../Music/PetImmersionSounds/Playing.mp3";

import "./Play.css";



function Play ({play_OptionsList, play_OptionsDesiredOption, set_Play_OptionsDesiredOption, set_Play_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [play_OptionsTotal, set_Play_OptionsTotal] = useState(10);
    const [play_Done, set_Play_Done] = useState(false);
    const [play_OptionsSelection, set_Play_OptionsSelection] = useState(-1);
    const [play_CurrNumber, set_Play_CurrNumber] = useState(0);
    const [play_Success, set_Play_Success] = useState(false);

    const Play_SelectedGameWindow = play_OptionsSelection === -1 ? 
                                    null 
                                    : play_OptionsList[play_OptionsSelection][petActivityOptionGameKey];

    const play_AudioRef = useRef(new Audio(Playing));

    
    useKeyboardShortcut("Enter", () => {
    
        if (play_Done){

            helpers_FlagCloser(set_Play_OpenFlag);

        }

    },
        ".Done"
    );


    useKeyboardShortcut("Escape", () => {

        if (!play_Done){

            petScreensHelpers_QuitActivity(play_AudioRef, set_Play_OpenFlag);

        }

    },
        ".Quit"
    );

    
    
    useEffect(() => {
        
        if (play_CurrNumber >= play_OptionsTotal){

            petScreensHelpers_PauseAudio(play_AudioRef.current);
            set_Play_Done(true);
            petScreensHelpers_ManageHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampPlayingKey, play_OptionsDesiredOption, set_Play_OptionsDesiredOption, play_OptionsSelection, set_Play_Success);

        }

    }, [play_CurrNumber]);




    return (
        
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Station">

            {play_OptionsSelection === -1 ? (

                <Options
                    options_DesiredOption = {play_OptionsDesiredOption}
                    options_List = {play_OptionsList} 
                    set_Options_Total = {set_Play_OptionsTotal}
                    set_Options_Selection = {set_Play_OptionsSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                    <ProgressBar
                        progressBar_PercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((play_CurrNumber/play_OptionsTotal) * 100)))}
                    />
     
                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        {play_Done ? (

                            play_Success ? (
                           
                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenSuccess">
                                    <h2>Success!</h2>
                                </div>

                            ) : (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Template--FloatingFlagStationWindowScreenFail">
                                    <h2>Something's off...</h2>
                                </div>

                            )

                        ) : (

                            Play_SelectedGameWindow === null ? (

                                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen Play_ComponentContainer-Template--WindowScreen"></div>

                            ) : (

                                <Play_SelectedGameWindow
                                    play_CurrNumber = {play_CurrNumber}
                                    set_Play_CurrNumber = {set_Play_CurrNumber}
                                    play_AudioRef = {play_AudioRef}
                                />

                            )

                        )}

                    </div>

                </div>

            )}

            {play_Done ? (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => helpers_FlagCloser(set_Play_OpenFlag)}>Done <br/> [return]</button>
                </div>

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagStation" onClick = {() => petScreensHelpers_QuitActivity(play_AudioRef, set_Play_OpenFlag)}>Quit <br/> [esc]</button>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagStation">Done <br/> [return]</button>
                </div>

            )}

        </div>

    );

}


export default Play;