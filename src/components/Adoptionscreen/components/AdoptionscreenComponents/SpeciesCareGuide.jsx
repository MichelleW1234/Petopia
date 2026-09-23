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

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalClick Close" onClick = {() => helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag)}> Close <br/> [2]</button>
            </div>
            
        </div>
    );
}
  
export default SpeciesCareGuide;