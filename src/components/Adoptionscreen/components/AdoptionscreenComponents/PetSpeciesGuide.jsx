import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { buttonSoundKey } from "../../../../constants/Constants.js";
import { flagCloser } from "../../../../helpers/helpers.js";

import "./PetSpeciesGuide.css";



function PetSpeciesGuide({setPetSpeciesGuideOpenFlag}) {

    useKeyboardShortcut("2", () => {

        flagCloser(setPetSpeciesGuideOpenFlag);

    },
        ".Close"
    );

    

    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument"> 
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                        <h1>Pet Species Guide:</h1>
                        <hr/>
                    </div>
                    <div className="PetSpeciesGuide_ComponentContainer-Structure--Category">
                        <h2>Dog: </h2>
                        <div>
                            <p>&bull; Feed 3 times a day </p>
                            <p>&bull; Clean 1 time a day </p>
                            <p>&bull; Play 2 times a day </p>
                            <p>&bull; Grows after 5 days  </p>
                        </div>
                    </div>
                    <div className="PetSpeciesGuide_ComponentContainer-Structure--Category">
                        <h2>Cat: </h2>
                        <div>
                            <p>&bull; Feed 2 times a day </p>
                            <p>&bull; Play 1 time a day </p>
                            <p>&bull; Grows after 7 days </p>
                        </div>
                    </div>
                    <div className="PetSpeciesGuide_ComponentContainer-Structure--Category">
                        <h2>Fish: </h2>
                        <div>
                            <p>&bull; Feed 1 time a day </p>
                            <p>&bull; Clean 1 time a day </p>
                            <p>&bull; Grows after 3 days </p>
                        </div>
                    </div>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setPetSpeciesGuideOpenFlag)}> Close <br/> [2]</button>
        </div>
    );
}
  
export default PetSpeciesGuide;