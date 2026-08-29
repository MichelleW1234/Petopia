import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_AudioPlayer, helpers_FlagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, audioNavButtonPressKey, audioSwapPetSpaceKey } from "../../../../constants/Constants.js";

import NoPetPortrait from "../../../../images/NoPetPortrait.png";
import "./RearrangePets.css";


function RearrangePets({set_RearrangePets_OpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {Room, setRoom} = useRoom();

        
    useKeyboardShortcut("Enter", () => {
    
        helpers_FlagCloser(set_RearrangePets_OpenFlag);

    },
        ".Done"
    );



    const rearrangePets_ForwardShifter = (rearrangePets_ForwardShifter_UserSelection) => {

        helpers_AudioPlayer(audioSwapPetSpaceKey);

        setRoom(prev => {

            let rearrangePets_ForwardShifter_CurrCopy = [...prev];

            if (rearrangePets_ForwardShifter_UserSelection === 2) {

                const rearrangePets_ForwardShifter_CurrSuccessor = rearrangePets_ForwardShifter_CurrCopy[0];
                rearrangePets_ForwardShifter_CurrCopy[0] = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection];
                rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection] = rearrangePets_ForwardShifter_CurrSuccessor;

            } else {

                const rearrangePets_ForwardShifter_CurrSuccessor = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection+1];
                rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection+1] = rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection];
                rearrangePets_ForwardShifter_CurrCopy[rearrangePets_ForwardShifter_UserSelection] = rearrangePets_ForwardShifter_CurrSuccessor;

            }

            return rearrangePets_ForwardShifter_CurrCopy;

        });

    }



    return (
       
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Switch the order of your pets:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Room.map((petName, rearrangePets_ForwardShifter_UserSelection) => (

                        petName === null ? (

                            <div key = {rearrangePets_ForwardShifter_UserSelection} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>[ Name ]</h2>
                                </div>

                                <img src = {NoPetPortrait}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B95; </button>
                            </div>

                        ) : (

                            <div key = {rearrangePets_ForwardShifter_UserSelection} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>{petName}</h2>
                                </div>

                                <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_ForwardShifter(rearrangePets_ForwardShifter_UserSelection)}> &#x2B95; </button>
                            </div>

                        )

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Done" onClick={() => helpers_FlagCloser(set_RearrangePets_OpenFlag)}> Done <br/> [return]</button>

            </div>

        </div>
    );
}
  
export default RearrangePets;