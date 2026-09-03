import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Closer_Flags } from "../../../../helpers/Helpers.js";



function ReadMe({set_ReadMe_OpenFlag}) {

    useKeyboardShortcut("4", () => {

        helpers_Closer_Flags(set_ReadMe_OpenFlag);

    },
        ".Close"
    );

    
    return (
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

                <div className = "UIStapleElements_ComponentContainerTransparent-Template--Global">
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalHeading">
                        <h1>Read Me:</h1>
                        <hr/>
                    </div>
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalWrittenContent">
                        <p> &bull; Complete an activity when its button is RED. You can predict when this will happen by looking at the pet's schedule. </p> 
                        <p> &bull; Be sure to select the option that the pet wants for an activity. If an activity isn't currently needed, there will be no desired option (an X).</p>
                        <p> &bull; While an incorrect option can be selected, the activity will take twice as much effort to complete and the pet will lose health.</p>
                        <p> &bull; A pet will also lose health if an actiivty isn't performed on time according to its schedule. Damage varies based on activity.</p>
                        <p> &bull; A pet can gain health when given (the correct) medicine. Medicine is most effective when pets are sleeping (between 8pm and 6am). Only one dose per 24 hours is allowed.</p>
                        <p> &bull; Pets will also gain health (increased health capacity) when they grow to their next stage. There are three stages in total.</p>
                        <p> &bull; Once you've accomplished the achievement of fully evolving a species to its final stage, items will unlock in your inventory that can be use to decorate your pets' rooms.</p>
                        <p> &bull; Inside your inventory, there are 3 revival potions that can each be used on any pet that has died, but cannot be reused. You will not recieve any more after they have been used up unless you restart the game.</p>
                        <p> &bull; Try interacting with your pets (hover over them) to see what happens!</p>
                        </div>
                </div>

            </div>

            <button className = "UIStapleElements_ComponentButtonPillColored-Structure--GlobalClick UIStapleElements_ComponentButtonPillColored-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_Closer_Flags(set_ReadMe_OpenFlag)}> Close <br/> [4]</button>

        </div>
    );
}
  
export default ReadMe;