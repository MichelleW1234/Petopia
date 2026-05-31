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
                <div className="petGuide"> 
                    <div className="heading">
                        <h1>Pet Options:</h1>
                        <hr/>
                    </div>
                    <div className="petSection">
                        <h2>Dog: </h2>
                        <div>
                            <p>&bull; Feed 3 times a day </p>
                            <p>&bull; Clean 1 time a day </p>
                            <p>&bull; Play 2 times a day </p>
                            <p>&bull; Grows after 5 days  </p>
                        </div>
                    </div>
                    <div className="petSection">
                        <h2>Cat: </h2>
                        <div>
                            <p>&bull; Feed 2 times a day </p>
                            <p>&bull; Play 1 time a day </p>
                            <p>&bull; Grows after 7 days </p>
                        </div>
                    </div>
                    <div className="petSection">
                        <h2>Fish: </h2>
                        <div>
                            <p>&bull; Feed 1 time a day </p>
                            <p>&bull; Clean 1 time a day </p>
                            <p>&bull; Grows after 3 days </p>
                        </div>
                    </div>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setPetGuideOpenFlag)}> Close <br/> [2]</button>
        </div>
    );
}
  
export default PetGuide;