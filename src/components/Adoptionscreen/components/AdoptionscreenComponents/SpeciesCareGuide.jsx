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

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview">Read the Species Maintenance Requirements:</h1>
                <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocument"> 
                    <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                        <h2>Dog &rarr; High Maintenance Pet</h2>
                        <div>
                            <p>&bull; Feeding Frequency: 3 fire </p>
                            <p>&bull; Cleaning Frequency: 1 fire </p>
                            <p>&bull; Playing Frequency: 2 fire </p>
                            <p>&bull; Growth Speed: 3 stars  </p>
                        </div>
                    </div>
                    <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                        <h2>Cat &rarr; Medium Maintenance Pet </h2>
                        <div>
                            <p>&bull; Feeding Frequency: 2 fire </p>
                            <p>&bull; Playing Frequency: 1 fire </p>
                           <p>&bull; Growth Speed: 1 star </p>
                        </div>
                    </div>
                    <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                        <h2>Fish &rarr; Low Maintenance Pet </h2>
                        <div>
                            <p>&bull; Feeding Frequency: 1 fire  </p>
                            <p>&bull; Cleaning Frequency: 1 fire </p>
                            <p>&bull; Growth Speed: 5 stars </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalClick Close" onClick = {() => helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag)}> Close <br/> [2]</button>
            </div>
            
        </div>
    );
}
  
export default SpeciesCareGuide;