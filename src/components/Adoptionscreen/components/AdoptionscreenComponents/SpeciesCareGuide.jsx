import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { soundNavButtonPressKey } from "../../../../constants/Constants.js";
import { helpers_FlagCloser } from "../../../../helpers/Helpers.js";

import "./SpeciesCareGuide.css";



function SpeciesCareGuide({set_SpeciesCareGuide_OpenFlag}) {

    
    useKeyboardShortcut("2", () => {

        helpers_FlagCloser(set_SpeciesCareGuide_OpenFlag);

    },
        ".Close"
    );

    

    return (
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

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

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_FlagCloser(set_SpeciesCareGuide_OpenFlag)}> Close <br/> [2]</button>
        </div>
    );
}
  
export default SpeciesCareGuide;