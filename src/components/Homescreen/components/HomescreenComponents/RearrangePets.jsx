import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, audioNavButtonPressKey, audioSwapPetSpaceKey } from "../../../../constants/Constants.js";

import NoPetPortrait from "../../../../images/NoPetPortrait.png";

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

        setRoom(prev => {

            let rearrangePets_BackwardsShifter_CurrCopy = [...prev];

            const rearrangePets_BackwardsShifter_CurrSuccessor = rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection-1];
            rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection-1] = rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection];
            rearrangePets_BackwardsShifter_CurrCopy[rearrangePets_BackwardsShifter_UserSelection] = rearrangePets_BackwardsShifter_CurrSuccessor;

            return rearrangePets_BackwardsShifter_CurrCopy;

        });

    }



    return (
       
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Switch the order of your pets:</h1>

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                        {Room.map((petName, rearrangePets_ForwardShifter_UserSelection) => (

                            <div key = {rearrangePets_ForwardShifter_UserSelection} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                {rearrangePets_ForwardShifter_UserSelection === 0 ? (

                                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick" > &#x2B05; </button>
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B95; </button>
                                    </div>


                                ) : rearrangePets_ForwardShifter_UserSelection === 1 ? (

                                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_BackwardsShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B05; </button>
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B95; </button>
                                    </div>

                                ) : (

                                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_BackwardsShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B05; </button>
                                        <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Nonclick"> &#x2B95; </button>
                                    </div>

                                )}

                                {petName === "" ? (

                                    <>
                                       
                                        <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut RearrangePets_ComponentContainer-Structure--SlotImage">
                                        <img src = {NoPetPortrait}/>
                                        </div>
                                        <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                            <h2>[ Name ]</h2>
                                        </div>
                                    </>

                                ) : (

                                    <>
                                      
                                        <div className="MiscellaneousElements_ComponentContainer-Template--FloatingFlagImageCutOut RearrangePets_ComponentContainer-Structure--SlotImage">
                                            <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                        </div>
                                        <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                            <h2>{petName}</h2>
                                        </div>
                                    </>

                                )}

                            </div>

                        ))}
                    </div>

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Done" onClick={() => helpers_Closer_Flags(set_RearrangePets_OpenFlag)}> Done <br/> [return]</button>

            </div>

        </div>
    );
}
  
export default RearrangePets;