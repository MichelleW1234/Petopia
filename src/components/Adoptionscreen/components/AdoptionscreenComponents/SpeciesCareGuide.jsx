import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { audioNavButtonPressKey } from "../../../../constants/Constants.js";
import { helpers_Closer_Flags } from "../../../../helpers/Helpers.js";

import "./SpeciesCareGuide.css";



function SpeciesCareGuide({set_SpeciesCareGuide_OpenFlag}) {


    useKeyboardShortcut("2", () => {

        helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag);

    },
        ".Close"
    );

    

    return (
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview">Species Care Guide:</h1>
                <div className="UIStapleElements_ComponentContainerTransparent-Template--Global"> 
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWrittenContent">
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

            <button className = "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag)}> Close <br/> [2]</button>
        </div>
    );
}
  
export default SpeciesCareGuide;