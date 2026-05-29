import { buttonSoundKey } from "../../../../constants/Constants.js";
import { flagCloser, playSound } from "../../../../helpers/helpers.js";
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {

    useKeyboardShortcut("2", () => {

        flagCloser(setPetGuideOpenFlag);

    },
        ".Close"
    );

    

    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <div className="heading">
                    <h1>Pet Options:</h1>
                    <hr/>
                </div>
                <h2>Dalmation: </h2>
                <h2>Orange Cat: </h2>
                <h2>Beta Fish: </h2>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setPetGuideOpenFlag)}> Close </button>
        </div>
    );
}
  
export default PetGuide;