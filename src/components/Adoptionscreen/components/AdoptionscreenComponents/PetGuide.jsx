import { buttonSoundKey } from "../../../../constants/Constants.js";
import { playSound } from "../../../../helpers/helpers.js";
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {

    useKeyboardShortcut("2", () => {

        close();

    },
        ".Close"
    );


    const close = () => {

        playSound(buttonSoundKey);
        setPetGuideOpenFlag(false);

    }
    

    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1>Read About Your Pet Options:</h1>
                <h2> Hello. This is a placeholder</h2>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => close()}> Close </button>
        </div>
    );
}
  
export default PetGuide;