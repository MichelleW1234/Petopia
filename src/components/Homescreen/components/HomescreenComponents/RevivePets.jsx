import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import {useRevivers} from "../../../../providers/ReviversProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { audioSelectionButtonPressKey, audioRevivePetKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey, petHealthKey, petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey, petSpeciesHealthCapList, petActivityTimeStampFeedingKey, petActivityTimeStampLastPerformedKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey } from "../../../../constants/Constants.js";
import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags } from "../../../../helpers/Helpers.js";

import Potion from "../../../../images/Inventory/Reviver.png";

import "../../../../App.css";
import "./RevivePets.css";


function RevivePets({set_RevivePets_OpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {Revivers, setRevivers} = useRevivers();
    const {GlobalTimer, setGlobalTimer} = useGlobalTimer();


    const [RevivePets_UserSelection, set_RevivePets_CurrSelectedPets] = useState("");



    useKeyboardShortcut("Enter", () => {
        
        if (RevivePets_UserSelection.length > 0){

            RevivePets_SelectedEntriesManager();

        }

    },
        ".Confirm"
    );


    useKeyboardShortcut("Escape", () => {
        
        helpers_Closer_Flags(set_RevivePets_OpenFlag);

    },
        ".Quit"
    );
    




    const RevivePets_EntrySelector = (RevivePets_EntrySelector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);
        set_RevivePets_CurrSelectedPets(RevivePets_EntrySelector_UserSelection);

    }


    const RevivePets_EntryDeselector = () => {

        helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);
        set_RevivePets_CurrSelectedPets("");
        
    }


    const RevivePets_SelectedEntriesManager = () => {

        helpers_Player_UIIndicatorSounds(audioRevivePetKey);

        setPetList(prev => {

            const revivePets_EntryOwnerSelector_CurrCopy = structuredClone(prev);

            if (revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petSpeciesKey] === petSpeciesDogKey){

                revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petHealthKey] = petSpeciesHealthCapList[petSpeciesDogKey][0];

            } else if (revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petSpeciesKey] === petSpeciesCatKey){

                revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petHealthKey] = petSpeciesHealthCapList[petSpeciesCatKey][0];

            } else {

                revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petHealthKey] = petSpeciesHealthCapList[petSpeciesFishKey][0];

            }

            return revivePets_EntryOwnerSelector_CurrCopy;

        });

        setPetTimeStamps(prev => {

            const revivePets_EntryOwnerSelector_CurrCopy = structuredClone(prev);

            if (petActivityTimeStampFeedingKey in revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection]){

                revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petActivityTimeStampFeedingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

            }
            
            if (petActivityTimeStampCleaningKey in revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection]){

                revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petActivityTimeStampCleaningKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

            }

            if (petActivityTimeStampPlayingKey in revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection]){

                revivePets_EntryOwnerSelector_CurrCopy[RevivePets_UserSelection][petActivityTimeStampPlayingKey][petActivityTimeStampLastPerformedKey] = GlobalTimer;

            }

            return revivePets_EntryOwnerSelector_CurrCopy;

        });

        setRevivers(prev => Math.max(0, prev - 1));

        helpers_Closer_Flags(set_RevivePets_OpenFlag);

    }

    

    return (

        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Global">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Select a Pet to Revive:</h1>

                <div className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameTransparent-Color--Global--FloatingFlag potionImageContainer">
                    {Array.from({ length: 3}, (_, col) => (

                        Revivers > col ? (

                            <div key = {col} className="potionImage">
                                <img src = {Potion}/>
                            </div>

                        ) : (

                            <div key = {col} className="potionImage">
                                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDQ35yFc2N2SGf7GxIY88SwO1YTmC0MTvhDp8tal-PA&s=10"/>
                            </div>

                        )

                    ))}
                </div>
                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                    {Room.map((petName, index) => (

                        petName === "" || PetList[petName][petHealthKey] > 0 ? (

                            null

                        ) : (

                            <div key = {index} className = "UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameColored-Color--Global--FloatingFlag MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                                {RevivePets_UserSelection === petName ? (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => RevivePets_EntryDeselector()}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                ) : (

                                    <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlag MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => RevivePets_EntrySelector(petName)}> 
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                    </button>

                                )}

                                <div className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalEntry">
                                    <h2>{petName}</h2>
                                </div>
                            </div>

                        )

                    ))}
                    
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlag Quit" onClick={() => helpers_Closer_Flags(set_RevivePets_OpenFlag)}>Quit <br/> [esc]</button>

                {RevivePets_UserSelection === "" ? (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlag">Confirm <br/> [return]</button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlag Confirm" onClick={() => RevivePets_SelectedEntriesManager()}>Confirm <br/> [return]</button>

                )}

            </div>

        </div>
        
    );
}
  
export default RevivePets;