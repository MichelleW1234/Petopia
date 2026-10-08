import { useState } from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import {useRevivers} from "../../../../providers/ReviversProvider.jsx";
import { useGlobalTimer } from "../../../../providers/GlobalTimerProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { audioCircleButtonPressKey, audioRevivePetKey, petSpeciesImagePortraitList, petSpeciesKey, petStageKey, inventoryItemOwnerKey, petHealthKey, petSpeciesDogKey, petSpeciesCatKey, petSpeciesFishKey, petSpeciesHealthCapList, petActivityTimeStampFeedingKey, petActivityTimeStampLastPerformedKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey, audioConfirmedKey } from "../../../../constants/Constants.js";
import { helpers_Player_UIIndicatorSounds, helpers_Closer_Flags, helpers_Quit } from "../../../../helpers/helpers.js";

import Reviver from "../../../../images/Reviver.png";
import EmptyReviver from "../../../../images/EmptyReviver.png";
import NoPets from "../../../../images/NoPetPortrait.png";

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
        ".ConfirmRevive"
    );


    useKeyboardShortcut("Escape", () => {
        
        helpers_Quit(set_RevivePets_OpenFlag);

    },
        ".QuitRevive"
    );



    const RevivePets_EntrySelector = (RevivePets_EntrySelector_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);
        set_RevivePets_CurrSelectedPets(RevivePets_EntrySelector_UserSelection);

    }


    const RevivePets_EntryDeselector = () => {

        helpers_Player_UIIndicatorSounds(audioCircleButtonPressKey);
        set_RevivePets_CurrSelectedPets("");
        
    }


    const RevivePets_SelectedEntriesManager = () => {


        helpers_Player_UIIndicatorSounds(audioRevivePetKey);        
        helpers_Player_UIIndicatorSounds(audioConfirmedKey);

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

        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                <div className="UIStapleElements_ComponentFrame-Template--Global potionBar">

                    <div className="potionImageContainer">
                        {Array.from({ length: 3}, (_, col) => (

                            Revivers > col ? (

                                <img key = {col} src = {Reviver} className="potionImage"/>

                            ) : (

                                <img key = {col} src = {EmptyReviver} className="potionImage"/>

                            )

                        ))}
                    </div>
                    
                </div>

                {!Object.values(PetList).some(pet => pet[petHealthKey] === 0) ? (

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                        <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                            <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton">
                                <div>
                                    Select
                                </div>
                            </button>
                            <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                <img src = {NoPets}/>
                                <h1>&lt;Name&gt;</h1>
                            </div>
                        </div>
                        <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                           <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton">
                                <div>
                                    Select
                                </div>
                            </button>
                            <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                <img src = {NoPets}/>
                                <h1>&lt;Name&gt;</h1>
                            </div>
                        </div>
                        <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                            <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton">
                                <div>
                                    Select
                                </div>
                            </button>
                            <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                <img src = {NoPets}/>
                                <h1>&lt;Name&gt;</h1>
                            </div>
                        </div>
                        
                    </div>

                ) : (

                    <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow--GlobalSelectionSlotRow">

                        {Room.map((petName, index) => (

                            petName === "" || PetList[petName][petHealthKey] > 0 ? (

                                null

                            ) : (

                                <div key = {index} className = "UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">

                                    {RevivePets_UserSelection === petName ? (

                                        <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalSelected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => RevivePets_EntryDeselector()}> 
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    ) : (

                                        <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalSlotButton" onClick = {() => RevivePets_EntrySelector(petName)}> 
                                            <div>
                                                Select
                                            </div>
                                        </button>

                                    )}

                                    <div className="MiscellaneousElements_ComponentText-Template--GlobalSelectionSlotName">
                                        <img src = {petSpeciesImagePortraitList[PetList[petName][petSpeciesKey]][PetList[petName][petStageKey]]}/>
                                        <h2>{petName}</h2>
                                    </div>

                                </div>

                            )

                        ))}
                            
                    </div>

                )}

            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">

                <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton QuitRevive" onClick={() => helpers_Quit(set_RevivePets_OpenFlag)}>
                    <div>
                        Quit<br/> [esc]
                    </div>
                </button>

                {RevivePets_UserSelection === "" ? (

                    <button className="UIStapleElements_ComponentButton-Template--GlobalNonclick MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton">
                        <div>
                            Confirm <br/> [return]
                        </div>
                    </button>

                ) : (

                    <button className="UIStapleElements_ComponentButton-Structure--GlobalClick UIStapleElements_ComponentButton-Color--GlobalClick--GlobalNonselected MiscellaneousElements_ComponentContainer-Structure--GlobalFreeButton ConfirmRevive" onClick={() => RevivePets_SelectedEntriesManager()}>
                        <div>
                            Confirm <br/> [return]
                        </div>
                    </button>

                )}

            </div>

        </div>
        
    );
}
  
export default RevivePets;