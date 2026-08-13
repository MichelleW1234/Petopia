import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { flagCloser } from "../../../../helpers/Helpers.js";



function ReadMe({setReadMeOpenFlag}) {

    useKeyboardShortcut("3", () => {

        flagCloser(setReadMeOpenFlag);

    },
        ".Close"
    );

    
    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <div className = "MiscellaneousElements_ComponentContainer-Template--GlobalDocument">
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                        <h1>Read Me:</h1>
                        <hr/>
                    </div>
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentWrittenContent">
                        <p> &bull; Complete an activity when its button is RED. You can predict when this will happen by looking at the pet's schedule. </p> 
                        <p> &bull; Be sure to select the option that the pet wants for an activity. If an activity isn't currently needed, there will be no desired option (an X).</p>
                        <p> &bull; While an incorrect option can be selected, the activity will take twice as much effort to complete and the pet will lose health.</p>
                        <p> &bull; A pet will also lose health if an actiivty isn't performed on time according to its schedule. Damage varies based on activity.</p>
                        <p> &bull; A pet can gain health when given (the correct) medicine. Medicine is most effective when pets are sleeping (between 8pm and 6am). Only one dose per 24 hours is allowed.</p>
                        <p> &bull; Pets will also gain health (increased health capacity) when they grow to their next stage. There are three stages in total.</p>
                        <p> &bull; Try interacting with your pets (hover over them) to see what happens!</p>
                        </div>
                </div>

            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setReadMeOpenFlag)}> Close <br/> [3]</button>

        </div>
    );
}
  
export default ReadMe;