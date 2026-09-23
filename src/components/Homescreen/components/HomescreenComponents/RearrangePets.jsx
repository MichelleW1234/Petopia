import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags } from "../../../../helpers/helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, audioPillButtonPressKey, audioSwapPetSpaceKey, audioRectangleButtonPressKey } from "../../../../constants/Constants.js";

import NoPetPortrait from "../../../../images/NoPetPortrait.png";

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

        setRoom(prev => {

            let rearrangePets_ForwardShifter_CurrCopy = [...prev];

            const rearrangePets_ForwardShifter_CurrSuccessor = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection+1];
            rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection+1] = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection];
            rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection] = rearrangePets_ForwardShifter_CurrSuccessor;

            return rearrangePets_ForwardShifter_CurrCopy;

        });

    };



    const rearrangePets_BackwardsShifter = (rearrangePets_BackwardsShifter_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSwapPetSpaceKey);
        helpers_Player_UIIndicatorSounds(audioRectangleButtonPressKey);

        setRoom(prev => {

            let rearrangePets_BackwardsShifter_CurrCopy = [...prev];

            const rearrangePets_BackwardsShifter_CurrSuccessor = rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection-1];
            rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection-1] = rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection];
            rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection] = rearrangePets_BackwardsShifter_CurrSuccessor;

            return rearrangePets_BackwardsShifter_CurrCopy;

        });

    }



    return (
       
        <div className = "UIStapleElements_Background-Template--FloatingFlag">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">
                
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Adjust the Order of Your Pets:</h1>

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                        {Room.map((petName, rearrangePets_ForwardShifter_UserSelection) => (

                            <div key = {rearrangePets_ForwardShifter_UserSelection} className = "UIStapleElements_ComponentFrame-Template--Global RearrangePets_ComponentContainer-Template--Slot">

                                {rearrangePets_ForwardShifter_UserSelection === 0 ? (

                                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                                        <button className = "UIStapleElements_ComponentButtonRectangle-Template--Global" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B95; </button>
                                    </div>


                                ) : rearrangePets_ForwardShifter_UserSelection === 1 ? (

                                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                                        <button className = "UIStapleElements_ComponentButtonRectangle-Template--Global" onClick = {() => rearrangePets_BackwardsShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B05; </button>
                                        <button className = "UIStapleElements_ComponentButtonRectangle-Template--Global" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B95; </button>
                                    </div>

                                ) : (

                                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                                        <button className = "UIStapleElements_ComponentButtonRectangle-Template--Global" onClick = {() => rearrangePets_BackwardsShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B05; </button>
                                    </div>

                                )}
                                       
                                {petName === "" ? (

                                    <div className="RearrangePets_ComponentContainer-Structure--SlotImage">
                                        <img src = {NoPetPortrait}/>
                                    </div>

                                ) : (

                                    <div className="RearrangePets_ComponentContainer-Structure--SlotImage">
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </div>

                                )}

                                {petName === "" ? (

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                                        <h2>&lt;Pet Name&gt;</h2>
                                    </div>

                                ) : (

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                                        <h2>{petName}</h2>
                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButtonPill-Template--GlobalClick Done" onClick={() => helpers_Closer_Flags(set_RearrangePets_OpenFlag)}> Done <br/> [return]</button>

            </div>

        </div>
    );
}
  
export default RearrangePets;