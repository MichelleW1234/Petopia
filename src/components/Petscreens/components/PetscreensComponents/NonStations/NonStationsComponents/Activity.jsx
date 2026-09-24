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
                                        

    const activity_LastPerformedStrings = {

        [petActivityTimeStampFeedingKey]: "Last Fed: ",
        [petActivityTimeStampCleaningKey]: "Last Cleaned: ",
        [petActivityTimeStampPlayingKey]: "Last Played: ",
        [petMedicineKey]: "Last Dose: "

    }


    return (

        <div className = "Activity_ComponentContainer-Structure--Category">
            <h2>{activity_LastPerformedStrings[activity_CurrActivityKey]}</h2> 
            <p>{activity_CurrLastPerformedString}</p>
        </div>
        
    );
}
  
export default Activity;