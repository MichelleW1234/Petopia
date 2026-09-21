import { useGlobalTimer } from "../../../../../../providers/GlobalTimerProvider.jsx";
import { usePetList} from "../../../../../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../../../providers/ActivePetNameProvider.jsx";

import { petHealthKey, petActivityTimeStampFeedingKey, petActivityTimeStampCleaningKey, petActivityTimeStampPlayingKey, petMedicineKey, petActivityTimeStampLastPerformedKey } from "../../../../../../constants/Constants.js";

import Red from "../../../../../../images/RedProgressBarCell.png";
import Green from "../../../../../../images/GreenProgressBarCell.png";
import Black from "../../../../../../images/BlackProgressBarCell.png";
import Blank from "../../../../../../images/BlankGridSpace.png";

import "../../../../../../App.css";
import "./Activity.css";



function Activity({activity_CurrActivityKey, activity_CurrActivityTimeLimit}) {

    const {GlobalTimer} = useGlobalTimer();
    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const activity_CurrLastPerformedString = activity_CurrActivityKey === petMedicineKey ?
                                        PetList[ActivePetName][activity_CurrActivityKey] === 0 ? 
                                            "N/A"
                                        :   (new Date(PetList[ActivePetName][activity_CurrActivityKey])).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                    :   (new Date(PetTimeStamps[ActivePetName][activity_CurrActivityKey][petActivityTimeStampLastPerformedKey])).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

    const activity_CurrDeadLine = activity_CurrActivityKey === petMedicineKey ? 
                        PetList[ActivePetName][activity_CurrActivityKey] + activity_CurrActivityTimeLimit
                    : PetTimeStamps[ActivePetName][activity_CurrActivityKey][petActivityTimeStampLastPerformedKey] + activity_CurrActivityTimeLimit;

    const activity_CurrDeadLineString = PetList[ActivePetName][petHealthKey] === 0 ?
                                        "--"
                                    :   activity_CurrActivityKey === petMedicineKey ?  
                                            PetList[ActivePetName][activity_CurrActivityKey] === 0 ? 
                                                "On Demand"
                                            : (new Date(activity_CurrDeadLine)).toLocaleString([], {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                        : 
                                            (new Date(activity_CurrDeadLine)).toLocaleString([], {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            });

    const activity_CurrDate = GlobalTimer;
    const activity_CurrPercentUntilNextUpdate = activity_CurrActivityKey === petMedicineKey ?  
                                                PetList[ActivePetName][activity_CurrActivityKey] === 0 ? 
                                                    100
                                                : Math.min(100, Math.max(0, Math.floor(((activity_CurrDate - PetList[ActivePetName][activity_CurrActivityKey])/activity_CurrActivityTimeLimit) * 100)))
                                            : Math.min(100, Math.max(0, Math.floor(((activity_CurrDate - PetTimeStamps[ActivePetName][activity_CurrActivityKey][petActivityTimeStampLastPerformedKey])/activity_CurrActivityTimeLimit) * 100)));

    const activity_LastPerformedStrings = {

        [petActivityTimeStampFeedingKey]: "Last Fed: ",
        [petActivityTimeStampCleaningKey]: "Last Cleaned: ",
        [petActivityTimeStampPlayingKey]: "Last Played: ",
        [petMedicineKey]: "Last Dose: "

    }

    const activity_DeadLineStrings = {

        [petActivityTimeStampFeedingKey]: "Feed Before: ",
        [petActivityTimeStampCleaningKey]: "Clean Before: ",
        [petActivityTimeStampPlayingKey]: "Play Before: ",
        [petMedicineKey]: "Next Dose: "

    }


    return (

        <div className = "Activity_ComponentContainer-Structure--Category">
            <div className="Activity_ComponentContainer-Structure--CategoryField">
                <h2>{activity_LastPerformedStrings[activity_CurrActivityKey]}</h2> 
                <p>{activity_CurrLastPerformedString}</p>
            </div>
            <div className="Activity_ComponentContainer-Structure--CategoryField">
                <h2>{activity_DeadLineStrings[activity_CurrActivityKey]}</h2>
                <p>{activity_CurrDeadLineString}</p>
            </div>
    
            {PetList[ActivePetName][petHealthKey] === 0 ? (

                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">

                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        <img key = {num}  src = {Blank} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                    ))}
                    
                </div>

            ) : (

                <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">
                    
                    {activity_CurrPercentUntilNextUpdate <= 50 ? (

                        Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                            num === 50 ? (

                                <img key = {num} src = {Black} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                            ) : num <= activity_CurrPercentUntilNextUpdate ?  (

                                <img key = {num}  src = {Green} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                            ) : (

                                <img key = {num}  src = {Blank} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>
                                
                            )

                        ))

                    ) : (

                        Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                            num === 50 ? (

                                <img key = {num}  src = {Black} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                            ) : num <= activity_CurrPercentUntilNextUpdate ? (

                                <img key = {num}  src = {Red} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>
                            
                            ) : (

                                <img key = {num}  src = {Blank} className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>
                                
                            )

                        ))

                    )}

                </div>

            )} 

        </div>
        
    );
}
  
export default Activity;