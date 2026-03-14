import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

function PlaySchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();


    const lastTimePlayedRaw = new Date(PetTimeStamps[ActivePetNumber]["playing"][0]);
    const lastTimePlayed = lastTimePlayedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimePlayedRaw = new Date(PetTimeStamps[ActivePetNumber]["playing"][0] + timeLimits);
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
                    <h2>Last Played: {lastTimePlayed}</h2>
                    <h2>Play Before: {nextTimePlayed}</h2>
                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default PlaySchedule;