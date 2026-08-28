import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpersPlaySound, helpersFlagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, soundNavButtonPressKey, soundSwapPetSpaceKey } from "../../../../constants/Constants.js";

import NoPetPortrait from "../../../../images/NoPetPortrait.png";
import "./RearrangePets.css";


function RearrangePets({setRearrangePetsOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {Room, setRoom} = useRoom();

        
    useKeyboardShortcut("Enter", () => {
    
        helpersFlagCloser(setRearrangePetsOpenFlag);

    },
        ".Done"
    );



    const rearrangePetsMoveForwards = (rearrangePetsMoveForwardsIndex) => {

        helpersPlaySound(soundSwapPetSpaceKey);

        setRoom(prev => {

            let rearrangePetsMoveForwardsCopy = [...prev];

            if (rearrangePetsMoveForwardsIndex === 2) {

                const rearrangePetsMoveForwardsTemp = rearrangePetsMoveForwardsCopy[0];
                rearrangePetsMoveForwardsCopy[0] = rearrangePetsMoveForwardsCopy[rearrangePetsMoveForwardsIndex];
                rearrangePetsMoveForwardsCopy[rearrangePetsMoveForwardsIndex] = rearrangePetsMoveForwardsTemp;

            } else {

                const rearrangePetsMoveForwardsTemp = rearrangePetsMoveForwardsCopy[rearrangePetsMoveForwardsIndex+1];
                rearrangePetsMoveForwardsCopy[rearrangePetsMoveForwardsIndex+1] = rearrangePetsMoveForwardsCopy[rearrangePetsMoveForwardsIndex];
                rearrangePetsMoveForwardsCopy[rearrangePetsMoveForwardsIndex] = rearrangePetsMoveForwardsTemp;

            }

            return rearrangePetsMoveForwardsCopy;

        });

    }



    return (
       
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Switch the order of your pets:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Room.map((petName, rearrangePetsMoveForwardsIndex) => (

                        petName === null ? (

                            <div key = {rearrangePetsMoveForwardsIndex} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>[ Name ]</h2>
                                </div>

                                <img src = {NoPetPortrait}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePetsMoveForwards(rearrangePetsMoveForwardsIndex)}> &#x2B95; </button>
                            </div>

                        ) : (

                            <div key = {rearrangePetsMoveForwardsIndex} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>{petName}</h2>
                                </div>

                                <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePetsMoveForwards(rearrangePetsMoveForwardsIndex)}> &#x2B95; </button>
                            </div>

                        )

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Done" onClick={() => helpersFlagCloser(setRearrangePetsOpenFlag)}> Done <br/> [return]</button>

            </div>

        </div>
    );
}
  
export default RearrangePets;