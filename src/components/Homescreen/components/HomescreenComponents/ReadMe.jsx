import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Closer_Flags } from "../../../../helpers/helpers.js";

import "../../../../App.css";


function ReadMe({set_ReadMe_OpenFlag}) {

    useKeyboardShortcut("5", () => {

        helpers_Closer_Flags(set_ReadMe_OpenFlag);

    },
        ".Close"
    );

    
    return (
        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">
                
                <h1 className = "MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Read How to Play Petopia: </h1>
                <div className = "UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocument">
                    <p> &bull; Complete an activity when its alert flag pops up in the bottom right corner of a pet's screen. As you spend more time taking care of a species, you can begin to predict the time range for when this occurs. </p> 
                    <p> &bull; Be sure to select the option that the pet wants for an activity.</p>
                    <p> &bull; While an incorrect option can be selected, the activity will take twice as much time or effort to complete and the pet will lose health.</p>
                    <p> &bull; A pet will also lose health if an actiivty isn't performed on time according to its schedule. Damage varies based on activity.</p>
                    <p> &bull; A pet will gain health when given (the correct) medicine. Medicine is most effective when pets are asleep. Access to medicine is limited, and only one dose can be given at a time per pet, so use it wisely! </p>
                    <p> &bull; Pets will also gain health via increased health capacity when they grow to their next stage. Each species has three stages in total.</p>
                    <p> &bull; Once you've accomplished the achievement of fully evolving a species to its final stage, items will unlock in your inventory that can be use to decorate your pets' rooms.</p>
                    <p> &bull; You also have revival potions that can be used on any pet that has died, but cannot be reused. You will not have access to any more after they have been used up unless you restart the game.</p>
                    <p> &bull; You can interact with your pets directly by hovering over them to see how they react!</p>
                </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalClick Close" onClick = {() => helpers_Closer_Flags(set_ReadMe_OpenFlag)}> Close <br/> [5]</button>

            </div>

        </div>
    );
}
  
export default ReadMe;