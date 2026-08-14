import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { soundNavButtonPressKey } from "../../../../constants/Constants.js";
import { flagCloser } from "../../../../helpers/Helpers.js";

import "./SpeciesCareGuide.css";



function SpeciesCareGuide({setSpeciesCareGuideOpenFlag}) {

    
    useKeyboardShortcut("2", () => {

        flagCloser(setSpeciesCareGuideOpenFlag);

    },
        ".Close"
    );

    

    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument"> 
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                        <h1>Species Care Guide:</h1>
                        <hr/>
                    </div>
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentWrittenContent">
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Dog &rarr; High Maintenance Pet</h2>
                            <div>
                                <p>&bull; Feed 3 times a day </p>
                                <p>&bull; Clean 1 time a day </p>
                                <p>&bull; Play 2 times a day </p>
                                <p>&bull; Grows every 5 days  </p>
                            </div>
                        </div>
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Cat &rarr; Medium Maintenance Pet </h2>
                            <div>
                                <p>&bull; Feed 2 times a day </p>
                                <p>&bull; Play 1 time a day </p>
                                <p>&bull; Grows every 7 days </p>
                            </div>
                        </div>
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Fish &rarr; Low Maintenance Pet </h2>
                            <div>
                                <p>&bull; Feed 1 time a day </p>
                                <p>&bull; Clean 1 time a day </p>
                                <p>&bull; Grows every 3 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setSpeciesCareGuideOpenFlag)}> Close <br/> [2]</button>
        </div>
    );
}
  
export default SpeciesCareGuide;