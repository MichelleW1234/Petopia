import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import { feedingKey, healthKey } from "../../../../constants/Constants.js";

function FeedSchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const lastTimeFedRaw = new Date(PetTimeStamps[ActivePetName][feedingKey][0]);
    const lastTimeFed = lastTimeFedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeFedRaw = new Date(PetTimeStamps[ActivePetName][feedingKey][0] + timeLimits);
    const nextTimeFed = nextTimeFedRaw.toLocaleString([], {
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
                            <h2>Last Fed: {lastTimeFed} </h2>
                            <h2>Feed Before: -- </h2>
                        </>

                    ) : (

                        <>
                            <h2>Last Fed: {lastTimeFed}</h2>
                            <h2>Feed Before: {nextTimeFed}</h2>
                        </>

                    )}

                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default FeedSchedule;