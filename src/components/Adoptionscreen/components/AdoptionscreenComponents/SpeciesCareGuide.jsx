import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { audioPillButtonPressKey } from "../../../../constants/Constants.js";
import { helpers_Closer_Flags } from "../../../../helpers/helpers.js";

import "../../../../App.css";
import "./SpeciesCareGuide.css";



function SpeciesCareGuide({set_SpeciesCareGuide_OpenFlag}) {


    useKeyboardShortcut("2", () => {

        helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag);

    },
        ".Close"
    );

    

    return (
        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocument"> 
                    <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocumentContent">
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Dog:</h2>
                            <div>
                                <p>&bull; Feeding Frequency &rarr; 3 fire </p>
                                <p>&bull; Cleaning Frequency &rarr; 1 fire </p>
                                <p>&bull; Playing Frequency &rarr; 2 fire </p>
                                <p>&bull; Growth Speed &rarr; 3 stars  </p>
                            </div>
                        </div>
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Cat: </h2>
                            <div>
                                <p>&bull; Feeding Frequency &rarr; 2 fire </p>
                                <p>&bull; Playing Frequency &rarr; 1 fire </p>
                            <p>&bull; Growth Speed &rarr; 1 star </p>
                            </div>
                        </div>
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Fish: </h2>
                            <div>
                                <p>&bull; Feeding Frequency &rarr; 1 fire  </p>
                                <p>&bull; Cleaning Frequency &rarr; 1 fire </p>
                                <p>&bull; Growth Speed &rarr; 5 stars </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Close" onClick = {() => helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag)}> Close <br/> [2]</button>
            </div>
            
        </div>
    );
}
  
export default SpeciesCareGuide;