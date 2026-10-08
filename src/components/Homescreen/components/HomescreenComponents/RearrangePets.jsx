import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags } from "../../../../helpers/helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, audioPillButtonPressKey, audioSwapPetSpaceKey, audioRectangleButtonPressKey } from "../../../../constants/Constants.js";

import NoPetPortrait from "../../../../images/NoPetPortrait.png";
import ForwardArrow from "../../../../images/SwapPetForwardArrow.png";
import BackwardArrow from "../../../../images/SwapPetBackwardArrow.png";

import "../../../../App.css";
import "./RearrangePets.css";


function RearrangePets({set_RearrangePets_OpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {Room, setRoom} = useRoom();

        
    useKeyboardShortcut("Enter", () => {
        
        helpers_Closer_Flags(set_RearrangePets_OpenFlag);

    },
        ".Done"
    );




    const rearrangePets_ForwardShifter = (rearrangePets_ForwardShifter_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSwapPetSpaceKey);
        helpers_Player_UIIndicatorSounds(audioRectangleButtonPressKey);

        if (rearrangePets_ForwardShifter_UserSelection === 2) {

            setRoom(prev => {

                let rearrangePets_ForwardShifter_CurrCopy = [...prev];

                const rearrangePets_ForwardShifter_CurrSuccessor = rearrangePets_ForwardShifter_CurrCopy[0];
                rearrangePets_ForwardShifter_CurrCopy[0] = rearrangePets_ForwardShifter_CurrCopy[2];
                rearrangePets_ForwardShifter_CurrCopy[2] = rearrangePets_ForwardShifter_CurrSuccessor;

                return rearrangePets_ForwardShifter_CurrCopy;

            });

        } else {

            setRoom(prev => {

                let rearrangePets_ForwardShifter_CurrCopy = [...prev];

                const rearrangePets_ForwardShifter_CurrSuccessor = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection+1];
                rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection+1] = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection];
                rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection] = rearrangePets_ForwardShifter_CurrSuccessor;

                return rearrangePets_ForwardShifter_CurrCopy;

            });

        }

    };



    return (
       
        <div className = "UIStapleElements_Background-Template--FloatingFlag">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">
                
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                    {Room.map((petName, rearrangePets_ForwardShifter_UserSelection) => (

                        <div key = {rearrangePets_ForwardShifter_UserSelection} className = "UIStapleElements_ComponentFrame-Template--Global  MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                            <button className = "UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected RearrangePets_ComponentContainer-Structure--SlotButton" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}>
                                <div>
                                    Swap With Next
                                </div>
                            </button>

                            <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">

                                {petName === "" ? (

                                    <img src = {NoPetPortrait}/>

                                ) : (

                                    <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>

                                )}

                                {petName === "" ? (

                                    <h1>&lt;Name&gt;</h1>

                                ) : (

                                    <h1>{petName}</h1>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton Done" onClick={() => helpers_Closer_Flags(set_RearrangePets_OpenFlag)}> 
                    <div>
                        Close <br/> [return]
                    </div>
                </button>

            </div>

        </div>

    );
}
  
export default RearrangePets;