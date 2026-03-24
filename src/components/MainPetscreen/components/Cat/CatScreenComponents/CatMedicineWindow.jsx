import {useState, useEffect, useRef} from "react";

import ProgressBar from "../../../../GlobalComponents/ProgressBar.jsx";

import {useActivePetName} from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetTimeStamps } from "../../../../../providers/PetTimeStampsProvider.jsx";
import {usePetList} from "../../../../../providers/PetListProvider.jsx";

import { petImages } from "../../../../../constants/MainPetImages.js";
import { catHealthCap, healthKey, medicineDoseTimeGap, medicineKey } from "../../../../../constants/Constants.js";
import { healPet } from "../../../../../helpers/Helpers.js";

import "./CatMedicineWindow.css";


function CatMedicineWindow ({setOpenMedicineFlag}){

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {PetList, setPetList} = usePetList();

    const [currDate, setCurrDate] = useState(Date.now()); 

    const canReceiveDose = currDate - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                                                    true
                                                                    : false;    

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrDate(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);







    // 10 rows x 8 columns
    const innerScreenSpace = Array.from({ length: 5 }, () => Array(8).fill(0));

    const [selection, setSelection] = useState(-1);
    const [secondsAte, setSecondsAte] = useState(0);
    const [done, setDone] = useState(false);

    const [animationImage, setAnimationImage] = useState(0);

    const secondsAteRef = useRef(secondsAte);
    const animationImageRef = useRef(animationImage);


    useEffect(() => {
        secondsAteRef.current = secondsAte;
    }, [secondsAte]);


    useEffect(() => {
        animationImageRef.current = animationImage;
    }, [animationImage]);


    useEffect(() => {

        if (selection === -1 || done) {
            return;
        }

        const interval = setInterval(() => {
            const currSeconds = secondsAteRef.current + 1;
            setSecondsAte(currSeconds);
            if (currSeconds >= 10){
                setDone(true);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [selection, done]);


    useEffect(() => {

        if (selection === -1 || done) {
            return;
        }

        const interval = setInterval(() => {
            if (animationImageRef.current === 0) {
                setAnimationImage(1);
            } else {
                setAnimationImage(0);
            }
        }, 300);

        return () => clearInterval(interval);

    }, [selection, done]);




    const manageHealth = () => {

        if (menuOption === selection){

            CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetName, catTimeLimits[feedingKey]/2, feedingKey, true);

        } else {
            
            CheckPetHealth(PetTimeStamps, setPetTimeStamps, PetList, setPetList, ActivePetName, catTimeLimits[feedingKey]/2, feedingKey, false);

        }

        setMenuOption(-1);
        setOpenFeedingFlag(false);

    }



    return (

        <div className = "FloatingFlagBackground">
        
            <div className="PetWindowBorder PetWindowBorder-cat">
                <h2 className="PetWindowSign PetWindowSign-cat"> Health: {PetList[ActivePetName][healthKey]} </h2>
                <div className = "filler"></div>
                {PetList[ActivePetName][healthKey] > 0 && canReceiveDose ? (

                    <button className = "PetWindowButton PetWindowButton-cat" onClick = {() => healPet(setPetList, ActivePetName, catHealthCap)}> Give Medicine </button>

                ) : (

                    <button className = "PetWindowButton PetWindowButton-placeholdercat"> Give Medicine </button>

                )}
            </div>

            <button className = "GeneralNavButton" onClick = {() => setOpenMedicineFlag(false)}>Quit</button>


        </div>

    );

}


export default CatMedicineWindow;