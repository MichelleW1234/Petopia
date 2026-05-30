import { screenFlagCloser } from "../../../../helpers/helpers.js";
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import "./PetCareGuide.css";

function PetCareGuide({setPetCareGuideOpenFlag}) {

    useKeyboardShortcut("4", () => {

        screenFlagCloser(setPetCareGuideOpenFlag);

    },
        ".Close"
    );

    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <div className = "guide">
                    <div className="heading">
                        <h1>Pet Guide:</h1>
                        <hr/>
                    </div>
                    <p> when to perform activity </p> 
                    <p> what to select for each activity ( and what it looks like when activity isn't wanted)</p>
                    <p> that it takes twice as long when a pet is given an activity option they don't want</p>
                    <p> the damage for not doing each task on time, and the damage for choosing the incorrect option</p>
                    <p> best medicine hours for healing and how much health they heal (+4 between 8pm and 6am, +2 otherwise)</p>
                    <p> hint at interacting with pet to see what happens</p>
                </div>

            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => screenFlagCloser(setPetCareGuideOpenFlag)}> Close </button>

        </div>
    );
}
  
export default PetCareGuide;