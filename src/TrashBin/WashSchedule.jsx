import {usePetList} from "../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../providers/ActivePetNameProvider.jsx";
import { bathingKey, healthKey } from "../constants/Constants.js";
import UpdateTrackingBar from "./UpdateTrackingBar.jsx";

function WashSchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const deadLine = PetTimeStamps[ActivePetName][bathingKey][0] + timeLimits;

    const lastTimeWashedRaw = new Date(PetTimeStamps[ActivePetName][bathingKey][0]);
    const lastTimeWashed = lastTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeWashedRaw = new Date(deadLine);
    const nextTimeWashed = nextTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

    const currTime = Date.now();
    const percentageUntilNextRound = deadLine > currTime ? 
                                        Math.round(((currTime - PetTimeStamps[ActivePetName][bathingKey][0])/timeLimits) * 100)
                                        : 100;

        
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

                <UpdateTrackingBar
                    percentageUntilNextUpdate={percentageUntilNextRound}
                />
                
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default WashSchedule;