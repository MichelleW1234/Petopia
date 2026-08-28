import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { helpers_PlaySound, helpers_FlagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, soundNavButtonPressKey, soundSwapPetSpaceKey } from "../../../../constants/Constants.js";

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



    const rearrangePets_MoveForwards = (rearrangePets_MoveForwards_Index) => {

        helpers_PlaySound(soundSwapPetSpaceKey);

        setRoom(prev => {

            let rearrangePets_MoveForwards_Copy = [...prev];

            if (rearrangePets_MoveForwards_Index === 2) {

                const rearrangePets_MoveForwards_Temp = rearrangePets_MoveForwards_Copy[0];
                rearrangePets_MoveForwards_Copy[0] = rearrangePets_MoveForwards_Copy[rearrangePets_MoveForwards_Index];
                rearrangePets_MoveForwards_Copy[rearrangePets_MoveForwards_Index] = rearrangePets_MoveForwards_Temp;

            } else {

                const rearrangePets_MoveForwards_Temp = rearrangePets_MoveForwards_Copy[rearrangePets_MoveForwards_Index+1];
                rearrangePets_MoveForwards_Copy[rearrangePets_MoveForwards_Index+1] = rearrangePets_MoveForwards_Copy[rearrangePets_MoveForwards_Index];
                rearrangePets_MoveForwards_Copy[rearrangePets_MoveForwards_Index] = rearrangePets_MoveForwards_Temp;

            }

            return rearrangePets_MoveForwards_Copy;

        });

    }



    return (
       
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalHeadline"> Switch the order of your pets:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Room.map((petName, rearrangePets_MoveForwards_Index) => (

                        petName === null ? (

                            <div key = {rearrangePets_MoveForwards_Index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>[ Name ]</h2>
                                </div>

                                <img src = {NoPetPortrait}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_MoveForwards(rearrangePets_MoveForwards_Index)}> &#x2B95; </button>
                            </div>

                        ) : (

                            <div key = {rearrangePets_MoveForwards_Index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalEntryIdentifier">
                                    <h2>{petName}</h2>
                                </div>

                                <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => rearrangePets_MoveForwards(rearrangePets_MoveForwards_Index)}> &#x2B95; </button>
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