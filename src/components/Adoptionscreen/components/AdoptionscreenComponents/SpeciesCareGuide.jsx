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
                            <h2>Dog Care & Development:</h2>
                            <div className="speciesGuideFieldRow">
                                <p> Feeding Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p> Cleaning Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p> Playing Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p>Growth Speed &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                        </div>
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Cat Care & Development: </h2>
                            <div className="speciesGuideFieldRow">
                                <p> Feeding Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p> Playing Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p> Growth Speed &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                        </div>
                        <div className="SpeciesCareGuide_ComponentContainer-Structure--Category">
                            <h2>Fish Care & Development: </h2>
                            <div className="speciesGuideFieldRow">
                                <p> Feeding Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p>Cleaning Frequency &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                    <div className="speciesGuideFieldRowGridCell"></div>
                                </div>
                            </div>
                            <div className="speciesGuideFieldRow">
                                <p>Growth Speed &rarr;</p>
                                <div className="speciesGuideFieldRowGrid">
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                    <img className="speciesGuideFieldRowGridCell" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8JYWHkTOQWGL-CkdCQ2gg55OpB2VSoYJbJoKWowuhZA&s=10"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Close" onClick = {() => helpers_Closer_Flags(set_SpeciesCareGuide_OpenFlag)}> 
                    <div>
                        Close <br/> [2]
                    </div>
                </button>
            </div>
            
        </div>
    );
}
  
export default SpeciesCareGuide;