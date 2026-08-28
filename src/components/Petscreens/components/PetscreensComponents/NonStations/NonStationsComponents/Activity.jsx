import { useGlobalTimer } from "../../../../../../providers/GlobalTimerProvider.jsx";
import { usePetList} from "../../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../../../providers/ActivePetNameProvider.jsx";

import { petHealthKey, petActivityTimeStampFeedingKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey, petMedicineKey, petActivityTimeStampLastPerformedKey } from "../../../../../../constants/Constants.js";

import "./Activity.css";



function Activity({activity_Key, activity_TimeGap}) {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const activity_DeadLine = activity_Key === petMedicineKey ? 
                            PetList[ActivePetName][activity_Key] + activity_TimeGap
                        : PetTimeStamps[ActivePetName][activity_Key][petActivityTimeStampLastPerformedKey] + activity_TimeGap;

    const activity_LastTimeString = activity_Key === petMedicineKey ?
                                        PetList[ActivePetName][activity_Key] === 0 ? 
                                            "N/A"
                                        :   (new Date(PetList[ActivePetName][activity_Key])).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                    :   (new Date(PetTimeStamps[ActivePetName][activity_Key][petActivityTimeStampLastPerformedKey])).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

    const activity_NextTimeString = PetList[ActivePetName][petHealthKey] === 0 ?
                                        "--"
                                    :   activity_Key === petMedicineKey ?  
                                            PetList[ActivePetName][activity_Key] === 0 ? 
                                                "On Demand"
                                            : (new Date(activity_DeadLine)).toLocaleString([], {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                        : 
                                            (new Date(activity_DeadLine)).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            });

    const activity_CurrDate = GlobalTimer;
    const activity_PercentUntilNextUpdate = activity_Key === petMedicineKey ?  
                                                PetList[ActivePetName][activity_Key] === 0 ? 
                                                    100
                                                : Math.min(100, Math.max(0, Math.floor(((activity_CurrDate - PetList[ActivePetName][activity_Key])/activity_TimeGap) * 100)))
                                            : Math.min(100, Math.max(0, Math.floor(((activity_CurrDate - PetTimeStamps[ActivePetName][activity_Key][petActivityTimeStampLastPerformedKey])/activity_TimeGap) * 100)));

    const activity_LastStrings = {

        [petActivityTimeStampFeedingKey]: "Last Fed: ",
        [petActivityTimeStampCleaningKey]: "Last Cleaned: ",
        [petActivityTimeStampPlayingKey]: "Last Played: ",
        [petMedicineKey]: "Last Dose Recieved: "

    }

    const activity_NextStrings = {

        [petActivityTimeStampFeedingKey]: "Feed Before: ",
        [petActivityTimeStampCleaningKey]: "Clean Before: ",
        [petActivityTimeStampPlayingKey]: "Play Before: ",
        [petMedicineKey]: "Next Dose Available: "

    }


    return (

        <div className = "Activity_ComponentContainer-Structure--Category">
            <div className="Activity_ComponentContainer-Structure--CategoryField">
                <h2>{activity_LastStrings[activity_Key]}</h2> 
                <p>{activity_LastTimeString}</p>
            </div>
            <div className="Activity_ComponentContainer-Structure--CategoryField">
                <h2>{activity_NextStrings[activity_Key]}</h2>
                <p>{activity_NextTimeString}</p>
            </div>
    
            {PetList[ActivePetName][petHealthKey] === 0 ? (

                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">

                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell Activity_ComponentContainer-Color--TimebarCellDead"></div>

                    ))}
                    
                </div>

            ) : (

                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">
                    
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = {num === 50 ?
                                                        "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell Activity_ComponentContainer-Color--TimebarCellHalfway"
                                                    : num <= activity_PercentUntilNextUpdate ? 
                                                        "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell Activity_ComponentContainer-Color--TimebarCellDone"
                                                        : "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell Activity_ComponentContainer-Color--TimebarCellLeft"
                                                    }>
                        </div>

                    ))}

                </div>

            )} 

        </div>
        
    );
}
  
export default Activity;