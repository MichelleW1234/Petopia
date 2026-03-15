import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../../../providers/ActivePetNameProvider.jsx";
import { healthKey, playingKey } from "../../../../constants/Constants.js";

function PlaySchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();


    const lastTimePlayedRaw = new Date(PetTimeStamps[ActivePetName][playingKey][0]);
    const lastTimePlayed = lastTimePlayedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimePlayedRaw = new Date(PetTimeStamps[ActivePetName][playingKey][0] + timeLimits);
    const nextTimePlayed = nextTimePlayedRaw.toLocaleString([], {
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
                            <h2>Last Played: {lastTimePlayed} </h2>
                            <h2>Play Before: -- </h2>
                        </>

                    ) : (
                        
                        <>
                            <h2>Last Played: {lastTimePlayed}</h2>
                            <h2>Play Before: {nextTimePlayed}</h2>
                        </>

                    )}

                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default PlaySchedule;