import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "./PetscreensComponents/Main.jsx";
import Feed from "./PetscreensComponents/Stations/Feed.jsx";
import Clean from "./PetscreensComponents/Stations/Clean.jsx";
import Play from "./PetscreensComponents/Stations/Play.jsx";
import Medicine from "./PetscreensComponents/Stations/Medicine.jsx";
import Schedule from "./PetscreensComponents/Schedule/Schedule.jsx";

import { useGlobalTimer } from "../../../providers/GlobalTimerProvider.jsx";
import {usePetTimeStamps} from "../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../providers/ActivePetNameProvider.jsx";
import {usePetList} from "../../../providers/PetListProvider.jsx";

import { cleaningKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, dogSpecies, healthCapList, timeLimitList} from "../../../constants/Constants.js";
import { initiateActivity } from "../helpers/Helpers.js";


// CHANGE THIS LATER!!!!!!!!!
//const dogPlayComponents = ["button 1", "button 2", "button 3"]

function Dog (){

    const {GlobalTimer} = useGlobalTimer();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();

    const [dogActivityInProgress, setDogActivityInProgress] = useState(false);
    const [dogFeedOpenFlag, setDogFeedOpenFlag] = useState(false);
    const [dogCleanOpenFlag, setDogCleanOpenFlag] = useState(false);
    const [dogPlayOpenFlag, setDogPlayOpenFlag] = useState(false);
    const [dogMedicineOpenFlag, setDogMedicineOpenFlag] = useState(false);
    const [dogScheduleOpenFlag, setDogScheduleOpenFlag] = useState(false);
    const [dogFeedDesiredOption, setDogFeedDesiredOption] = useState(-1);
    const [dogCleanDesiredOption, setDogCleanDesiredOption] = useState(-1);
    const [dogPlayDesiredOption, setDogPlayDesiredOption] = useState(-1);

    const dogAlive = ActivePetName !== "" ? 
                            PetList[ActivePetName][healthKey] > 0 ? 
                                true
                                : false
                            : false;

    const dogHungry = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][feedingKey][0]) >= timeLimitList[dogSpecies][feedingKey]/2 ? 
                                true 
                                : false
                            : false;

    const dogDirty = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][cleaningKey][0]) >= timeLimitList[dogSpecies][cleaningKey]/2 ? 
                                true
                                : false
                            : false;
                            
    const dogRestless = ActivePetName !== "" ? 
                            (GlobalTimer - PetTimeStamps[ActivePetName][playingKey][0]) >= timeLimitList[dogSpecies][playingKey]/2 ? 
                                true 
                                : false
                            : false;

    const dogMood = ActivePetName !== "" ? 
                        PetList[ActivePetName][healthKey]/healthCapList[dogSpecies] >= 0.75 ? 
                            0
                            : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies] >= 0.5 ? 
                            1
                            : PetList[ActivePetName][healthKey]/healthCapList[dogSpecies] >= 0.25 ? 
                            2
                            : 3
                        : -1;

    const dogCanReceiveDose = ActivePetName !== "" ? 
                                    GlobalTimer - PetList[ActivePetName][medicineKey] > medicineDoseTimeGap ? 
                                        true
                                        : false
                                    : false;

    const dogFeedOptions = ["beef", "Turkey", "lamb"];
    const dogCleanOptions = ["soap", "brush"];
    const dogPlayOptions = ["tuna", "chicken", "salmon"]; // CHANGE THIS LATER!!!!!!!!!
    const dogPlayComponents = ["button 1", "button 2", "button 3"]; // DELETE THIS LATER



    useEffect(() => {
        if (dogFeedOpenFlag || dogCleanOpenFlag || dogPlayOpenFlag || dogMedicineOpenFlag) {
            setDogActivityInProgress(true);
        } else {
            setDogActivityInProgress(false);
        }
    }, [dogFeedOpenFlag, dogCleanOpenFlag, dogPlayOpenFlag, dogMedicineOpenFlag]);



    
    return (
        
        <>

            {dogFeedOpenFlag &&
            <Feed
                feedOptions={dogFeedOptions}
                feedDesiredOption = {dogFeedDesiredOption}
                setFeedDesiredOption = {setDogFeedDesiredOption}
                setFeedOpenFlag = {setDogFeedOpenFlag}
            />}

            {dogCleanOpenFlag &&
            <Clean
                cleanOptions={dogCleanOptions}
                cleanDesiredOption = {dogCleanDesiredOption}
                setCleanDesiredOption = {setDogCleanDesiredOption}
                setCleanOpenFlag = {setDogCleanOpenFlag}
            />}

            {dogPlayOpenFlag &&
            <Play
                playOptions={dogPlayOptions}
                playComponents={dogPlayComponents}
                playDesiredOption = {dogPlayDesiredOption}
                setPlayDesiredOption = {setDogPlayDesiredOption}
                setPlayOpenFlag = {setDogPlayOpenFlag}
            />}

            {dogMedicineOpenFlag &&
            <Medicine
                setMedicineOpenFlag = {setDogMedicineOpenFlag}
            />}

            {dogScheduleOpenFlag &&
            <Schedule
                setScheduleOpenFlag={setDogScheduleOpenFlag}
            />}

            <div className="NavBarContainer">

                <Link to = "/home" className = "NavBarButton" onClick = {() => setActivePetName("")}> Back to Home </Link>

                {dogAlive ? (

                    <>
                        <button className={dogHungry ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(dogHungry, setDogFeedDesiredOption, setDogFeedOpenFlag, dogFeedOptions)}> Feed Dog </button>
                        <button className={dogDirty ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(dogDirty, setDogCleanDesiredOption, setDogCleanOpenFlag, dogCleanOptions)}> Bathe Dog </button>
                        <button className={dogRestless ? "NavBarButtonUrgent" : "NavBarButton"} onClick = {() => initiateActivity(dogRestless, setDogPlayDesiredOption, setDogPlayOpenFlag, dogPlayOptions)}> Play With Dog </button>

                        {dogCanReceiveDose ? (

                            <button className="NavBarButton" onClick = {() => setDogMedicineOpenFlag(true)}> Give Dog Medicine </button>

                        ) : (

                            <button className="NavBarButtonPlaceHolder"> Give Dog Medicine </button>

                        )}
                      
                    </>

                ) : (

                    <>
                        <button className="NavBarButtonPlaceHolder"> Feed Dog </button>
                        <button className="NavBarButtonPlaceHolder"> Clean Dog </button>
                        <button className="NavBarButtonPlaceHolder"> Play With Dog </button>
                        <button className="NavBarButtonPlaceHolder"> Give Dog Medicine </button>
                    </>

                )}

                <button className="NavBarButton" onClick = {() => setDogScheduleOpenFlag(true)}> Check Schedule </button>
               
            </div>
            <div className = "ScreenContainer">

                <Main
                    mainPetEnergy = {350}
                    mainPetMood = {dogMood}
                    mainActivityInProgress={dogActivityInProgress}
                />

            </div>
        </>

    );

}


export default Dog;