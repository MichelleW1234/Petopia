import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import {useActivePetNumber} from "../../../../providers/ActivePetNumberProvider.jsx";

function WashSchedule({setOpenPetScheduleFlag, timeLimits}) {

    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetNumber, setActivePetNumber} = useActivePetNumber();


    const lastTimeWashedRaw = new Date(PetTimeStamps[ActivePetNumber][1][0]);
    const lastTimeWashed = lastTimeWashedRaw.toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    const nextTimeWashedRaw = new Date(PetTimeStamps[ActivePetNumber][1][0] + timeLimits);
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
                    <h2>Last Washed: {lastTimeWashed}</h2>
                    <h2>Washed Before: {nextTimeWashed}</h2>
                </div>
                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default WashSchedule;