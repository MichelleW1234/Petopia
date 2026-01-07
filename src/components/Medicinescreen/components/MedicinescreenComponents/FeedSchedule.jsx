import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

function FeedSchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();

    const lastTimeFedRaw = new Date(PetTimeStamps[ActivePetNumber][0][0]);
    const lastTimeFed = lastTimeFedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeFedRaw = new Date(PetTimeStamps[ActivePetNumber][0][0] + timeLimits);
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
                    <h2>Last Fed: {lastTimeFed}</h2>
                    <h2>Feed Before: {nextTimeFed}</h2>
                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default FeedSchedule;