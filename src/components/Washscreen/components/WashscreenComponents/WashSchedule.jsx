import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import { bathingKey, healthKey } from "../../../../constants/Constants.js";

function WashSchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const lastTimeWashedRaw = new Date(PetTimeStamps[ActivePetName][bathingKey][0]);
    const lastTimeWashed = lastTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeWashedRaw = new Date(PetTimeStamps[ActivePetName][bathingKey][0] + timeLimits);
    const nextTimeWashed = nextTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        
    return (
        <div className = "FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">

                    {PetList[ActivePetName][healthKey] === 0 ? (

                        <>
                            <h2>Last Washed: {lastTimeWashed} </h2>
                            <h2>Wash Before: -- </h2>
                        </>
                        

                    ) : (

                        <>
                            <h2>Last Washed: {lastTimeWashed}</h2>
                            <h2>Wash Before: {nextTimeWashed}</h2>
                        </>

                    )}

                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default WashSchedule;