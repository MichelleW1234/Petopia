import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


import s1DogLeftOne from "../../../images/Dog/Main/1dog.svg";
import s1DogLeftTwo from "../../../images/Dog/Main/1dog1.svg";
import s1DogRightOne from "../../../images/Dog/Main/1dog2.svg";
import s1DogRightTwo from "../../../images/Dog/Main/1dog3.svg";

import s2DogLeftOne from "../../../images/Dog/Main/2dog.svg";
import s2DogLeftTwo from "../../../images/Dog/Main/2dog1.svg";
import s2DogRightOne from "../../../images/Dog/Main/2dog2.svg";
import s2DogRightTwo from "../../../images/Dog/Main/2dog3.svg";

import s3DogLeftOne from "../../../images/Dog/Main/3dog.svg";
import s3DogLeftTwo from "../../../images/Dog/Main/3dog1.svg";
import s3DogRightOne from "../../../images/Dog/Main/3dog2.svg";
import s3DogRightTwo from "../../../images/Dog/Main/3dog3.svg";


import s1DogFeedOne from "../../../images/Dog/Main/1dog.svg";
import s1DogFeedTwo from "../../../images/Dog/Main/1dog1.svg";
import s2DogFeedOne from "../../../images/Dog/Main/2dog.svg";
import s2DogFeedTwo from "../../../images/Dog/Main/2dog1.svg";
import s3DogFeedOne from "../../../images/Dog/Main/3dog.svg";
import s3DogFeedTwo from "../../../images/Dog/Main/3dog1.svg";


import s1DogCleanOne from "../../../images/Dog/Main/1dog.svg";
import s1DogCleanTwo from "../../../images/Dog/Main/1dog1.svg";
import s2DogCleanOne from "../../../images/Dog/Main/2dog.svg";
import s2DogCleanTwo from "../../../images/Dog/Main/2dog1.svg";
import s3DogCleanOne from "../../../images/Dog/Main/3dog.svg";
import s3DogCleanTwo from "../../../images/Dog/Main/3dog1.svg";


import s1DogMedOne from "../../../images/Dog/Main/1dog.svg";
import s1DogMedTwo from "../../../images/Dog/Main/1dog1.svg";
import s2DogMedOne from "../../../images/Dog/Main/2dog.svg";
import s2DogMedTwo from "../../../images/Dog/Main/2dog1.svg";
import s3DogMedOne from "../../../images/Dog/Main/3dog.svg";
import s3DogMedTwo from "../../../images/Dog/Main/3dog1.svg";


import beef from "../../../images/Dog/Main/1dog.svg";
import turkey from "../../../images/Dog/Main/1dog1.svg";
import lamb from "../../../images/Dog/Main/1dog2.svg";
import soap from "../../../images/Dog/Main/1dog.svg";
import brush from "../../../images/Dog/Main/1dog1.svg";
import pill from "../../../images/Dog/Main/1dog.svg";

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

import { cleaningKey, feedingKey, healthKey, playingKey, medicineKey, medicineDoseTimeGap, dogSpecies, healthCapList, timeLimitList, speciesKey, stageKey} from "../../../constants/Constants.js";
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


    const dogMainImages = PetList[ActivePetName][stageKey]-1 === 0 ? 
                                [s1DogLeftOne, s1DogLeftTwo, s1DogRightOne, s1DogRightTwo]
                              : PetList[ActivePetName][stageKey]-1 === 1 ? 
                                [s2DogLeftOne, s2DogLeftTwo, s2DogRightOne, s2DogRightTwo]
                              : [s3DogLeftOne, s3DogLeftTwo, s3DogRightOne, s3DogRightTwo];

    const dogFeedImages = PetList[ActivePetName][stageKey]-1 === 0 ? 
                            [s1DogFeedOne, s1DogFeedTwo]
                          : PetList[ActivePetName][stageKey]-1 === 1 ? 
                            [s2DogFeedOne, s2DogFeedTwo]
                          : [s3DogFeedOne, s3DogFeedTwo];


    const dogCleanImages = PetList[ActivePetName][stageKey]-1 === 0 ? 
                            [s1DogCleanOne, s1DogCleanTwo]
                          : PetList[ActivePetName][stageKey]-1 === 1 ? 
                            [s2DogCleanOne, s2DogCleanTwo]
                          : [s3DogCleanOne, s3DogCleanTwo];

    const dogMedicineImages = PetList[ActivePetName][stageKey]-1 === 0 ? 
                            [s1DogMedOne, s1DogMedTwo]
                            : PetList[ActivePetName][stageKey]-1 === 1 ? 
                            [s2DogMedOne, s2DogMedTwo]
                            : [s3DogMedOne, s3DogMedTwo];

    const dogFeedOptions = [beef, turkey, lamb]; 
    const dogCleanOptions = [soap, brush];
    const dogPlayOptions = [beef, turkey, lamb]; // CHANGE THIS LATER!!!!!!!!!
    const dogPlayComponents = ["button 1", "button 2", "button 3"]; // DELETE THIS LATER
    const dogMedicineOptions = [pill];

    


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
                feedAnimationImages={dogFeedImages}
                feedOptions={dogFeedOptions}
                feedDesiredOption = {dogFeedDesiredOption}
                setFeedDesiredOption = {setDogFeedDesiredOption}
                setFeedOpenFlag = {setDogFeedOpenFlag}
            />}

            {dogCleanOpenFlag &&
            <Clean
                cleanAnimationImages={dogCleanImages}
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
                medicineAnimationImages={dogMedicineImages}
                medicineOptions={dogMedicineOptions}
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
                    mainAnimationImages={dogMainImages}
                    mainPetEnergy = {350}
                    mainPetMood = {dogMood}
                    mainActivityInProgress={dogActivityInProgress}
                />

            </div>
        </>

    );

}


export default Dog;