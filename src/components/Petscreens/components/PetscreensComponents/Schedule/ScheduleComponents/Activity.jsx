import { useGlobalTimer } from "../../../../../../providers/GlobalTimerProvider.jsx";
import { usePetList} from "../../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../../../providers/ActivePetNameProvider.jsx";

import { healthKey, feedingKey, cleaningKey, playingKey, medicineKey } from "../../../../../../constants/Constants.js";

import "./Activity.css";


function Activity({activityKey, timeGap}) {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const deadLine = activityKey === medicineKey ? 
                            PetList[ActivePetName][activityKey] + timeGap
                        : PetTimeStamps[ActivePetName][activityKey][0] + timeGap;

    const lastActivityString = activityKey === medicineKey ?
                                        PetList[ActivePetName][activityKey] > 0 ? 
                                            (new Date(PetList[ActivePetName][activityKey])).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                        : "N/A"
                                    :   (new Date(PetTimeStamps[ActivePetName][activityKey][0])).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

    const nextActivityString = PetList[ActivePetName][healthKey] > 0 ?
                                        activityKey === medicineKey ?  
                                            PetList[ActivePetName][activityKey] > 0 ? 
                                                (new Date(deadLine)).toLocaleString([], {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }) 
                                            : "On Demand"
                                        : 
                                            (new Date(deadLine)).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                    : "--";

    const currDate = GlobalTimer;
    const percentageUntilNextUpdate = activityKey === medicineKey ?  
                                                PetList[ActivePetName][activityKey] === 0 ? 
                                                    100
                                                : Math.min(100, Math.max(0, Math.floor(((currDate - PetList[ActivePetName][activityKey])/timeGap) * 100)))
                                            : Math.min(100, Math.max(0, Math.floor(((currDate - PetTimeStamps[ActivePetName][activityKey][0])/timeGap) * 100)));

    const lastStrings = {

        [feedingKey]: "Last Fed: ",
        [cleaningKey]: "Last Cleaned: ",
        [playingKey]: "Last Played: ",
        [medicineKey]: "Last Dose Recieved: "

    }

    const nextStrings = {

        [feedingKey]: "Feed Before: ",
        [cleaningKey]: "Clean Before: ",
        [playingKey]: "Play Before: ",
        [medicineKey]: "Next Dose Available: "

    }


    return (
        <div className = "SchedulingChartActivityContainer">
            <div> 
                <h2>{lastStrings[activityKey] + lastActivityString}</h2>
                <h2>{nextStrings[activityKey] + nextActivityString}</h2>
            </div>
        
            {PetList[ActivePetName][healthKey] > 0 ? (

                <div className = "SchedulingChartProgressBar">
                    
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = {num === 50 ?
                                                        "SchedulingChartProgressCellHalfway"
                                                        : num <= percentageUntilNextUpdate ? 
                                                            "SchedulingChartProgressCellDone"
                                                            : "SchedulingChartProgressCellLeft"
                                                        }>
                        </div>

                    ))}

                </div>

            ) : (

                <div className = "SchedulingChartProgressBar">

                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = "SchedulingChartProgressCellCancelled"></div>

                    ))}
                    
                </div>

            )} 

        </div>
    )
}
  
export default Activity;