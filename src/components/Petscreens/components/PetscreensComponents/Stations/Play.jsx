import {useState, useEffect, useRef} from "react";

import { useGlobalTimer } from "../../../../../providers/GlobalTimerProvider.jsx";
import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import ProgressBarComponent from "./StationsComponents/ProgressBar.jsx";
import OptionsComponent from "./StationsComponents/Options.jsx";

import { petActivityOptionGameInstructionsKey, petActivityOptionGameKey, petActivityOptionImageKey, petActivityTimeStampPlayingKey, petSpeciesKey, petStageKey } from "../../../../../constants/Constants.js";
import { petScreensHelpers_Manager_PetHealth, petScreensHelpers_Canceller_PetImmersionSounds, petScreensHelpers_Canceller_Activities, optionSelectionManager } from "../../../helpers/helpers.js";
import { helpers_Closer_Flags } from "../../../../../helpers/helpers.js";

import Playing from "../../../../../Music/PetImmersionSounds/Playing.mp3";

import "../../../../../App.css";



function Play ({play_OptionsCurrSpeciesList, play_OptionsCurrDesiredOption, set_Play_OptionsCurrDesiredOption, set_Play_OpenFlag}){

    const {GlobalTimer} = useGlobalTimer();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [play_OptionsTotalNumber, set_Play_OptionsTotalNumber] = useState(10);
    const [play_OptionsUserSelection, set_Play_OptionsUserSelection] = useState(-1);
    const [play_CurrNumber, set_Play_CurrNumber] = useState(0);
    const [play_Success, set_Play_Success] = useState(false);
    const [play_Confirmed, set_Play_Confirmed] = useState(false);

    const Play_GameWindow = play_OptionsUserSelection === -1 ? 
                                    null 
                                    : play_OptionsCurrSpeciesList[play_OptionsUserSelection][petActivityOptionGameKey];

    const play_AudioRef = useRef(new Audio(Playing));



    useKeyboardShortcut("Enter", () => {
    
        if (play_OptionsUserSelection !== -1 && !play_Confirmed){

            optionSelectionManager(play_OptionsCurrDesiredOption, play_OptionsUserSelection, set_Play_OptionsTotalNumber, set_Play_Confirmed, set_Play_Success);

        }

    },
        ".Confirm"
    );
    


    useKeyboardShortcut("Escape", () => {

        petScreensHelpers_Canceller_Activities(play_AudioRef, set_Play_OpenFlag);

    },
        ".Quit"
    );

    
    
    useEffect(() => {
        
        if (play_CurrNumber >= play_OptionsTotalNumber){

            petScreensHelpers_Canceller_PetImmersionSounds(play_AudioRef.current);
            petScreensHelpers_Manager_PetHealth(GlobalTimer, setPetTimeStamps, setPetList, ActivePetName, petActivityTimeStampPlayingKey, play_OptionsCurrDesiredOption, set_Play_OptionsCurrDesiredOption, play_OptionsUserSelection, set_Play_Success);
            set_Play_OpenFlag(false);

        }

    }, [play_CurrNumber]);




    return (
        
        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            {!play_Confirmed ? (

                <OptionsComponent
                    options_CurrDesiredOption = {play_OptionsCurrDesiredOption}
                    options_CurrSpeciesList = {play_OptionsCurrSpeciesList} 
                    options_UserSelection = {play_OptionsUserSelection}
                    set_Options_UserSelection = {set_Play_OptionsUserSelection}
                />

            ) : (

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                    <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview">{play_OptionsCurrSpeciesList[play_OptionsUserSelection][petActivityOptionGameInstructionsKey]}</h1>

                    <ProgressBarComponent
                        progressBar_CurrPercentUntilNextUpdate={Math.min(100, Math.max(0, Math.floor((play_CurrNumber/play_OptionsTotalNumber) * 100)))}
                        progressBar_ActivitySuccess={play_Success}
                    />
     
                    <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalWindowFrame">

                        {Play_GameWindow === null ? (

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWindowScreen MiscellaneousElements_ComponentContainer-Color--GlobalWindowScreen--DefaultPlay"></div>

                        ) : (

                            <Play_GameWindow
                                play_CurrNumber = {play_CurrNumber}
                                set_Play_CurrNumber = {set_Play_CurrNumber}
                                play_AudioRef = {play_AudioRef}
                            />

                        )}

                    </div>

                </div>

            )}


            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalClick " onClick = {() => petScreensHelpers_Canceller_Activities(play_AudioRef, set_Play_OpenFlag)}>Quit <br/> [esc]</button>

                {play_OptionsUserSelection === -1 || play_Confirmed ? (

                    <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalNonclick "> Confirm <br/> [return]</button>                    

                ) : (

                    <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalClick  Confirm" onClick={() => optionSelectionManager(play_OptionsCurrDesiredOption, play_OptionsUserSelection, set_Play_OptionsTotalNumber, set_Play_Confirmed, set_Play_Success)}> Confirm <br/> [return]</button>

                )}

            </div>

        </div>

    );

}


export default Play;