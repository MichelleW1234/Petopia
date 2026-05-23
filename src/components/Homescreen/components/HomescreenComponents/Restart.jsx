import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import "./Restart.css";



function Restart({restartOpenFlag, setRestartOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();

    
    useKeyboardShortcut("Enter", () => {
    
        if (restartOpenFlag){

            restartGame();

        }

    },
        ".Yes"
    );
    
        
    useKeyboardShortcut("Escape", () => {
    
        if (restartOpenFlag){

            setRestartOpenFlag(false);

        }

    },
        ".No"
    );
    


    const restartGame = () => {

        setPetList({});
        setPetTimeStamps({});

        setRestartOpenFlag(false);

    }


    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1>Are you sure you want to restart the game? </h1>
            </div>
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Yes" onClick = {() => restartGame()}>Yes</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation No" onClick = {() => setRestartOpenFlag(false)}>No</button>
            </div>
        </div>
    );
}
  
export default Restart;