import { useGlobalTimer } from "../../../../../../providers/GlobalTimerProvider.jsx";
import { usePetList} from "../../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../../../providers/ActivePetNameProvider.jsx";

import { healthKey, feedingKey, cleaningKey, playingKey, medicineKey } from "../../../../../../constants/Constants.js";

import "./Activity.css";


function Activity({activityKey, activityTimeGap}) {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const activityDeadLine = activityKey === medicineKey ? 
                            PetList[ActivePetName][activityKey] + activityTimeGap
                        : PetTimeStamps[ActivePetName][activityKey][0] + activityTimeGap;

    const activityLastTimeString = activityKey === medicineKey ?
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

    const activityNextTimeString = PetList[ActivePetName][healthKey] > 0 ?
                                        activityKey === medicineKey ?  
                                            PetList[ActivePetName][activityKey] > 0 ? 
                                                (new Date(activityDeadLine)).toLocaleString([], {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }) 
                                            : "On Demand"
                                        : 
                                            (new Date(activityDeadLine)).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                    : "--";

    const activityCurrDate = GlobalTimer;
    const activityPercentUntilNextUpdate = activityKey === medicineKey ?  
                                                PetList[ActivePetName][activityKey] === 0 ? 
                                                    100
                                                : Math.min(100, Math.max(0, Math.floor(((activityCurrDate - PetList[ActivePetName][activityKey])/activityTimeGap) * 100)))
                                            : Math.min(100, Math.max(0, Math.floor(((activityCurrDate - PetTimeStamps[ActivePetName][activityKey][0])/activityTimeGap) * 100)));

    const activityLastStrings = {

        [feedingKey]: "Last Fed: ",
        [cleaningKey]: "Last Cleaned: ",
        [playingKey]: "Last Played: ",
        [medicineKey]: "Last Dose Recieved: "

    }

    const activityNextStrings = {

        [feedingKey]: "Feed Before: ",
        [cleaningKey]: "Clean Before: ",
        [playingKey]: "Play Before: ",
        [medicineKey]: "Next Dose Available: "

    }


    return (
        <div className = "ActivityContainer">
            <div> 
                <h2>{activityLastStrings[activityKey] + activityLastTimeString}</h2>
                <h2>{activityNextStrings[activityKey] + activityNextTimeString}</h2>
            </div>
        
            {PetList[ActivePetName][healthKey] > 0 ? (

                <div className = "ActivityTimeBarContainer">
                    
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = {num === 50 ?
                                                        "ActivityTimeBarCellHalfway"
                                                        : num <= activityPercentUntilNextUpdate ? 
                                                            "ActivityTimeBarCellDone"
                                                            : "ActivityTimeBarCellLeft"
                                                        }>
                        </div>

                    ))}

                </div>

            ) : (

                <div className = "ActivityTimeBarContainer">

                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <div key = {num} className = "ActivityTimeBarCellCancelled"></div>

                    ))}
                    
                </div>

            )} 

        </div>
    )
}
  
export default Activity;