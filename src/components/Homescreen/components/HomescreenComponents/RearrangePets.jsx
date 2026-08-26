import {usePetList} from "../../../../providers/PetListProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { playSound, flagCloser } from "../../../../helpers/Helpers.js";
import { petSpeciesCatKey, petSpeciesDogKey, petSpeciesFishKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, soundNavButtonPressKey } from "../../../../constants/Constants.js";

import NoPetPortrait from "../../../../images/NoPetPortrait.png";
import "./RearrangePets.css";


function RearrangePets({setRearrangePetsOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {Room, setRoom} = useRoom();

        
    useKeyboardShortcut("Enter", () => {
    
        flagCloser(setRearrangePetsOpenFlag);

    },
        ".Done"
    );



    const moveForwards = (index) => {

        setRoom(prev => {

            let copy = [...prev];

            if (index === 2) {

                const temp = copy[0];
                copy[0] = copy[index];
                copy[index] = temp;

            } else {

                const temp = copy[index+1];
                copy[index+1] = copy[index];
                copy[index] = temp;

            }

            return copy;

        })

    }



    return (
       
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">
       
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--MainTitle"> Switch the order of your pets:</h1>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                    {Room.map((petName, index) => (

                        petName === null ? (

                            <div key = {index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--EntryTitle">
                                    <h2>[ Name ]</h2>
                                </div>

                                <img src = {NoPetPortrait}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => moveForwards(index)}> &#x2B95; </button>
                            </div>

                        ) : (

                            <div key = {index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation RearrangePets_ComponentContainer-Template--Slot">

                                <div className="MiscellaneousElements_ComponentText-Template--EntryTitle">
                                    <h2>{petName}</h2>
                                </div>

                                <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>

                                <button className = "MiscellaneousElements_ComponentButton-Structure--FloatingFlag MiscellaneousElements_ComponentButton-Template--FloatingFlag--Click" onClick = {() => moveForwards(index)}> &#x2B95; </button>
                            </div>

                        )

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Done" onClick={() => flagCloser(setRearrangePetsOpenFlag)}> Done <br/> [return]</button>

            </div>

        </div>
    );
}
  
export default RearrangePets;