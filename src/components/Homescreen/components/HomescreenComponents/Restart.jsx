import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { playSound, flagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, soundNavButtonPressKey, soundRestartGameKey } from "../../../../constants/Constants.js";



function Restart({setRestartOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();

    
    useKeyboardShortcut("Enter", () => {
    
        restartGame();

    },
        ".Yes"
    );
    
        
    useKeyboardShortcut("Escape", () => {
    
        flagCloser(setRestartOpenFlag);

    },
        ".No"
    );
    


    const restartGame = () => {

        playSound(soundRestartGameKey);
        setPetList({});
        setPetTimeStamps({});
        setRoom([null, null, null]);

        flagCloser(setRestartOpenFlag);

    }


    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1>Are you sure you want to clear out all of your pets? </h1>
            </div>
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Yes" onClick = {() => restartGame()}>Yes <br/> [return]</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation No" onClick = {() => flagCloser(setRestartOpenFlag)}>No <br/> [esc]</button>
            </div>
        </div>
    );
}
  
export default Restart;