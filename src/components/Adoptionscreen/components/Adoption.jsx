import { useNavigate, Link } from "react-router-dom";
import {useState, useRef} from "react";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import { usePetList } from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../providers/RoomProvider.jsx";
import {useActiveCheckoutRoom} from "../../../providers/ActiveCheckoutRoomProvider.jsx";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import SpeciesCareGuide from "./AdoptionscreenComponents/SpeciesCareGuide.jsx";
import MusicVolume from "../../GlobalComponents/components/MusicVolume.jsx";
import Inventory from "../../GlobalComponents/components/Inventory.jsx";

import { portraitPetImages, cleaningKey, birthDateKey, catSpecies, dogSpecies, feedingKey, fishSpecies, healthKey, medicineKey, playingKey, speciesKey, stageKey, genderKey, maleGender, femaleGender, healthCapList, selectionButtonPressSoundKey, navButtonPressSoundKey, adoptionSuccessSoundKey, restartGameSoundKey, screenButtonPressSoundKey, activityLastPerformedKey, activityLastDamageKey } from "../../../constants/Constants.js";
import { errorMessageTimer, flagOpener, playSound } from "../../../helpers/Helpers.js";

import "./Adoption.css";



function Adoption () {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {Room, setRoom} = useRoom();
    const {ActiveCheckoutRoom, setActiveCheckoutRoom} = useActiveCheckoutRoom();

    const [adoptionMusicVolumeOpenFlag, setAdoptionMusicVolumeOpenFlag] = useState(false);
    const [adoptionInventoryOpenFlag, setAdoptionInventoryOpenFlag] = useState(false);
    const [adoptionSpeciesCareGuideOpenFlag, setAdoptionSpeciesCareGuideOpenFlag] = useState(false);
    const [adoptionSelectedPet, setAdoptionSelectedPet] = useState("");
    const [adoptionPetGender, setAdoptionPetGender] = useState("");
    const [adoptionErrorMessage, setAdoptionErrorMessage] = useState("");
    const [adoptionConfirmationPetName, setAdoptionConfirmationPetName] = useState("");

    const adoptionMinPetsAdopted = Room.filter(x => x === null).length < 3;

    const adoptionConfirmationTimeoutRef = useRef(null);

    const navigate = useNavigate();



    useKeyboardShortcut("v", () => {
    
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            flagOpener(setAdoptionMusicVolumeOpenFlag, 1);

        }

    },
        ".Volume"
    );

    
    useKeyboardShortcut("i", () => {
    
        if (adoptionMinPetsAdopted && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            flagOpener(setAdoptionInventoryOpenFlag, 1);

        }

    },
        ".Inventory"
    );


    useKeyboardShortcut("1", () => {
        
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            quit();
            navigate("/home");

        }

    },
        ".QuitAndGoHome"
    );

    
    useKeyboardShortcut("2", () => {
        
        if (!adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            flagOpener(setAdoptionSpeciesCareGuideOpenFlag, 0);

        }

    },
        ".SpeciesCareGuide"
    );



    useKeyboardShortcut("Enter", () => {
        
        if (adoptionPetGender === "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            petSelecting();

        }

    },
        ".GoToConfirmation"
    );


    useKeyboardShortcut("Escape", () => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            undo();

        }

    },
        ".UndoSelection"
    );


    useKeyboardShortcut("Enter", (e) => {
        
        if (adoptionPetGender !== "" && adoptionSelectedPet !== "" && !adoptionSpeciesCareGuideOpenFlag && !adoptionMusicVolumeOpenFlag && !adoptionInventoryOpenFlag){

            nameChecking(e);

        }

    },
        ".ConfirmSelection"
    );



    const quit = () => {

        playSound(navButtonPressSoundKey);
        setActiveCheckoutRoom(-1);

    }


    const petSelecting = () => {

        playSound(screenButtonPressSoundKey);
        
        const gender = Math.floor(Math.random() * 2);
        
        if (gender === 0){

            setAdoptionPetGender(maleGender);

        } else {

            setAdoptionPetGender(femaleGender);

        }

    }


    const nameChecking = (e) => {

        playSound(screenButtonPressSoundKey);

        const modifiedPetName = adoptionConfirmationPetName.trim().toLowerCase();
        setAdoptionConfirmationPetName(modifiedPetName);

        if (modifiedPetName === "") {

            e.preventDefault();
            errorMessageTimer("Enter a name for your pet.", setAdoptionErrorMessage, adoptionConfirmationTimeoutRef);

        } else if (modifiedPetName.length > 20){

            e.preventDefault();
            errorMessageTimer("Shorten the name to 20 characters max.", setAdoptionErrorMessage, adoptionConfirmationTimeoutRef);

        } else if (modifiedPetName in PetList && modifiedPetName in PetTimeStamps) {

            e.preventDefault();
            errorMessageTimer("This name already exists.", setAdoptionErrorMessage, adoptionConfirmationTimeoutRef);

        } else {

            adoptPet(modifiedPetName);
            navigate("/home");

        }

    }


    const adoptPet = (finalPetName) => {

        playSound(adoptionSuccessSoundKey);

        const startingTime = GlobalTimer;

        if (adoptionSelectedPet === dogSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: dogSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[dogSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: adoptionPetGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [cleaningKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [playingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime}
                    }
            }));

        } else if (adoptionSelectedPet === catSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: catSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[catSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: adoptionPetGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [playingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime}
                    }
            }));

        } else if (adoptionSelectedPet === fishSpecies){

            setPetList(prev => ({
                ...prev,
                [finalPetName]: 
                    { 
                        [speciesKey]: fishSpecies, 
                        [stageKey]: 0,
                        [healthKey]: healthCapList[fishSpecies][0],
                        [birthDateKey]: startingTime,
                        [genderKey]: adoptionPetGender,
                        [medicineKey]: 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [finalPetName]:
                    {
                        [feedingKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                        [cleaningKey]: {[activityLastPerformedKey] : startingTime, [activityLastDamageKey] : startingTime},
                    }
            }));

        }

        setRoom(prev => {

            let updated = [...prev];
            updated[ActiveCheckoutRoom] = finalPetName;
            return updated;
            
        });

        setActiveCheckoutRoom(-1);

    }


    const undo = () => {

        playSound(screenButtonPressSoundKey);

        setAdoptionSelectedPet("");
        setAdoptionPetGender("");

    }
    

    const selectPet = (key) => {

        playSound(selectionButtonPressSoundKey);
        setAdoptionSelectedPet(key);

    }

    

    return (

        <>

            {adoptionMusicVolumeOpenFlag && 
            <MusicVolume
                setMusicVolumeOpenFlag={setAdoptionMusicVolumeOpenFlag}
            />}

            {adoptionInventoryOpenFlag && 
            <Inventory
                setInventoryOpenFlag={setAdoptionInventoryOpenFlag}
            />}

            {adoptionSpeciesCareGuideOpenFlag &&
                <SpeciesCareGuide
                    setSpeciesCareGuideOpenFlag = {setAdoptionSpeciesCareGuideOpenFlag}
                />
            }

            <div className="UIStapleElements_BackgroundBase-Structure--Screen UIStapleElements_BackgroundBase-Template--Screen">

                <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenNavbar">
                    <Link to = "/home" className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar QuitAndGoHome" onClick = {() => quit()}> Quit and Go Home <br/> [1]</Link>
                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--ScreenNavbar SpeciesCareGuide" onClick = {() => flagOpener(setAdoptionSpeciesCareGuideOpenFlag, 0)}> Species Care Guide <br/> [2]</button>
                </div>

                {adoptionPetGender === "" ? (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <h1> Select a species: </h1>
                        
                        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
            
                            {Object.keys(portraitPetImages).map((key) => (
            
                                <div key = {key} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionSlot">
                                    {key === adoptionSelectedPet ? (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--ScreenSelected" onClick = {() => selectPet("")}>
                                            <img src = {portraitPetImages[key][0]}/>
                                        </button>

                                    ) : (
            
                                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--Screen" onClick = {() => selectPet(key)}>
                                            <img src = {portraitPetImages[key][0]}/>
                                        </button>
            
                                    )}

                                    <h2>{key}</h2>
                                </div>
            
                            ))}
            
                        </div>
                    
                        {adoptionSelectedPet === "" ? (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen"> Go to Confirmation <br/> [return]</button>
            
                        ) : (
            
                            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen GoToConfirmation" onClick = {() => petSelecting()}> Go to Confirmation <br/> [return]</button>
            
                        )}  

                    </div>

                ) : (

                    <div className = "MiscellaneousElements_ComponentContainer-Structure--Screen">

                        <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument"> 

                            <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                                <h1> Adoption form: </h1> 
                                <hr/>
                            </div> 
                
                            <div className = "MiscellaneousElements_ComponentContainer-Template--GlobalDocumentWrittenContent Adoption_ComponentContainer-Structure--FormBody">
                                <p>Hello, my name is </p>

                                <div className="Adoption_ComponentContainer-Template--FormBodyNameRow">
                                    <div className="Adoption_ComponentContainer-Template--FormBodyNameRowPetImage">
                                        <img src = {portraitPetImages[adoptionSelectedPet][0]}/>
                                    </div>
                                    <div className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Adoption_ComponentContainer-Template--FormBodyNameRowName">
                                        <input 
                                            type="text"
                                            value={adoptionConfirmationPetName}
                                            onChange={(e) => {setAdoptionConfirmationPetName(e.target.value)}}
                                            placeholder="Name your pet..."
                                        />
                                    </div>
                                </div>

                                <p> and I am a {adoptionPetGender} {adoptionSelectedPet}. Thank you for adopting me!</p>
                            </div>

                        </div>

                        <div className = "Adoption_ComponentContainer-Structure--Confirmation">
                            <p className = "Adoption_ComponentContainer-Template--ConfirmationError">{adoptionErrorMessage}</p>
                            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen UndoSelection" onClick = {() => undo()}> Undo Selection <br/> [esc]</button>
                                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen ConfirmSelection" onClick = {(e) => nameChecking(e)}> Confirm Selection <br/> [return]</button>
                            </div>
                        </div>

                    </div>

                )}
        
            </div>

            <div className="MiscellaneousElements_ComponentButton-Position--ScreenToggle">
                <button 
                    className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Volume" 
                    onClick = {() => flagOpener(setAdoptionMusicVolumeOpenFlag, 1)}>
                    Volume <br/> [v]
                </button>

                {adoptionMinPetsAdopted ? (

                    <button 
                        className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--Screen Inventory" 
                        onClick = {() => flagOpener(setAdoptionInventoryOpenFlag, 1)}>
                        Inventory <br/> [I]
                    </button>

                ) : (

                    <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--Screen">
                        Inventory <br/> [I]
                    </button>

                )}
            </div>

        </>
    
    );

};

export default Adoption;