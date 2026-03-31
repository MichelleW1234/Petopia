import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "./PetscreensComponents/Stations/Main.jsx";
import Feed from "./PetscreensComponents/Stations/Feed.jsx";
import Play from "./PetscreensComponents/Stations/Play.jsx";
import Medicine from "./PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "./PetscreensComponents/Schedule/Schedule.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import {feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, catSpecies, healthCapList, timeLimitList} from "../../../constants/Constants.js";
import { initiateActivity } from "../helpers/Helpers.js";



// CHANGE THIS LATER!!!!!!!!!
//const catPlayComponents = ["button 1", "button 2", "button 3"]

function Cat (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [catActivityInProgress, setCatActivityInProgress] = useState(false);
    const [catFeedOpenFlag, setCatFeedOpenFlag] = useState(false);
    const [catPlayOpenFlag, setCatPlayOpenFlag] = useState(false);
    const [catMedicineOpenFlag, setCatMedicineOpenFlag] = useState(false);
    const [catScheduleOpenFlag, setCatScheduleOpenFlag] = useState(false);
    const [catFeedDesiredOption, setCatFeedDesiredOption] = useState(-1);
    const [catPlayDesiredOption, setCatPlayDesiredOption] = useState(-1);

    const catAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const catHungry = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[catSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;
                            
    const catRestless = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][0]) >= timeLimitList[catSpecies][playingKey]/2 ? 
                                true 
                                : false
                            : false;

    const catMood = ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[catSpecies] >= 0.25 ? 
                            2
                            : 3
                        : -1;

    const catCanReceiveDose = ActivePetName !== "" ? 
                                    GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                        true
                                        : false
                                    : false;

    const catFeedOptions = ["tuna", "chicken", "salmon"];
    const catPlayOptions = ["tuna", "chicken", "salmon"]; // CHANGE THIS LATER!!!!!!!!! 
    const catPlayComponents = ["button 1", "button 2", "button 3"]; // DELETE THIS LATER




    useEffect(() => {
        if (catFeedOpenFlag || catPlayOpenFlag || catMedicineOpenFlag) {
            setCatActivityInProgress(true);
        } else {
            setCatActivityInProgress(false);
        }
    }, [catFeedOpenFlag, catPlayOpenFlag, catMedicineOpenFlag]);


    

    return (

        <>

            {catFeedOpenFlag &&
            <Feed
                feedOptions={catFeedOptions}
                feedDesiredOption = {catFeedDesiredOption}
                setFeedDesiredOption = {setCatFeedDesiredOption}
                setFeedOpenFlag = {setCatFeedOpenFlag}
            />}

            {catPlayOpenFlag &&
            <Play
                playOptions={catPlayOptions}
                playComponents={catPlayComponents}
                playDesiredOption = {catPlayDesiredOption}
                setPlayDesiredOption = {setCatPlayDesiredOption}
                setPlayOpenFlag = {setCatPlayOpenFlag}
            />}

            {catMedicineOpenFlag &&
            <Medicine
                setMedicineOpenFlag = {setCatMedicineOpenFlag}
            />}

            {catScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setCatScheduleOpenFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {catAlive ? (

                    <>
                        <button className={catHungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(catHungry, setCatFeedDesiredOption, setCatFeedOpenFlag, catFeedOptions)}> Feed Cat </button>
                        <button className={catRestless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(catRestless, setCatPlayDesiredOption, setCatPlayOpenFlag, catPlayOptions)}> Play With Cat </button>

                        {catCanReceiveDose ? (

                            <button className="NavBarButton" onClick = {() => setCatMedicineOpenFlag(true)}> Cat Medicine Available </button>

                        ) : (

                            <button className="NavBarButtonPlaceHolder"> Cat Medicine Available </button>

                        )}
                       
                    </>

                ) : (

                    <>
                        <button className="NavBarButtonPlaceHolder"> Feed Cat </button>
                        <button className="NavBarButtonPlaceHolder"> Play With Cat </button>
                        <button className="NavBarButtonPlaceHolder"> Give Cat Medicine </button>
                    </>

                )}

                <button className="NavBarButton" onClick = {() => setCatScheduleOpenFlag(true)}> Check Schedule </button>
                
            </div>
            
            <div className = "ScreenContainer">

                <Main
                    mainPetEnergy = {450}
                    mainPetMood = {catMood}
                    mainActivityInProgress = {catActivityInProgress}
                />
    
            </div>
        </>

    );

}


export default Cat;