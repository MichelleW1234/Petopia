import { Link } from "react-router-dom";
import {useState, useRef} from "react";

import {usePetList} from "../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../providers/PetTimeStampsProvider.jsx";
import { useFinalPetSelection } from "../providers/FinalPetSelectionProvider.jsx";

import { petImages } from "../../../constants/HomePetImages.js";

import "./PetConfirmationscreen.css";

function PetConfirmationscreen () {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {FinalPetSelection, setFinalPetSelection} = useFinalPetSelection();


    const [petName, setPetName] = useState("");
    const [info, setInfo] = useState("You are about to adopt this pet:");

    const timeoutRef = useRef(null);




    const showErrorMessage = () => {

        if (petName === ""){

            setInfo("Enter a name for your new pet.");

        } else if (petName.length > 15){

            setInfo("Shorten the name to 15 characters max.");

        } else {
        //For testing purposes:

            setInfo("Sorry, this pet name already exists.");

        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setInfo("You are about to adopt this pet:");
            timeoutRef.current = null;
        }, 5000);

    }


    const adoptPet = () => {

        if (petName in PetList && petName in PetTimeStamps){

            showErrorMessage();
            return;

        }

        const startingTime = Date.now();

        if (FinalPetSelection === 0){

            setPetList(prev => ({
                ...prev,
                [petName]: 
                    { 
                        "species": "dog", 
                        "stage": 1,
                        "health": 15,
                        "birthDate": startingTime,
                        "medicine": 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [petName]:
                    {
                        "feeding": [startingTime, startingTime],
                        "bathing": [startingTime, startingTime],
                        "playing": [startingTime, startingTime]
                    }
            }));

        } else if (FinalPetSelection === 1){

            setPetList(prev => ({
                ...prev,
                [petName]: 
                    { 
                        "species": "cat", 
                        "stage": 1,
                        "health": 20,
                        "birthDate": startingTime,
                        "medicine": 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [petName]:
                    {
                        "feeding": [startingTime, startingTime],
                        "playing": [startingTime, startingTime]
                    }
            }));

        } else if (FinalPetSelection === 2){

            setPetList(prev => ({
                ...prev,
                [petName]: 
                    { 
                        "species": "fish", 
                        "stage": 1,
                        "health": 5,
                        "birthDate": startingTime,
                        "medicine": 0
                    }
            }));

            setPetTimeStamps(prev => ({
                ...prev,
                [petName]:
                    {
                        "feeding": [startingTime, startingTime],
                        "bathing": [startingTime, startingTime],
                    }
            }));

        }

        setFinalPetSelection(-1);

    }


    const deletePet = () => {

        setFinalPetSelection(-1);

    }



    return (

        <div className="ScreenContainer">

            <div className="PetWindowBorder PetWindowBorder-newpet">
                <h2 className="PetWindowSign PetWindowSign-newpet">{info}</h2>
                <div className="HomePetSelectorPetWindow">

                    <img src = { FinalPetSelection === 0 ? petImages["dog"][0]
                        : FinalPetSelection !== 1 ? petImages["cat"][0]
                        : FinalPetSelection !== 2 ? petImages["fish"][0]
                        : "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b" }
                    />
                </div>
                <div className="HomePetSelectorNameInputContainer">
                    <h2 className="header"> Pet Name:</h2>
                    <input 
                        className = "HomePetSelectorNameInput"
                        type="text"
                        value={petName}
                        onChange={(e) => {setPetName(e.target.value)}}
                        placeholder="Enter a name..."
                    />
                </div>
            </div>

            <div className="GeneralNavButtonContainer">
                <Link to = "/home" className = "GeneralNavButton" onClick = {() => deletePet()}>Quit</Link>
                <Link to = "/select" className = "GeneralNavButton" onClick = {() => deletePet()}>Reselect Pet</Link>
                <Link to = "/home" className = "GeneralNavButton" onClick = {(e) => {

                                                                            const preventNav = petName === "" || petName.length > 15;
                                                                            if (preventNav) {

                                                                                e.preventDefault();
                                                                                showErrorMessage();

                                                                            } else {

                                                                                adoptPet();

                                                                            }
                                                                        
                                                                        }}

                                                                    > Adopt </Link>

            </div>
        </div>
        
    );

};

export default PetConfirmationscreen;