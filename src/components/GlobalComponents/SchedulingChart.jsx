import {usePetList} from "../../providers/PetListProvider.jsx";
import {useActivePetName} from "../../providers/ActivePetNameProvider.jsx";

import { healthKey, feedingKey, bathingKey, medicineKey, playingKey } from "../../constants/Constants.js";

import "./SchedulingChart.css";


function SchedulingChart({activity, lastActivityString, nextActivityString, percentageUntilNextUpdate, setOpenPetScheduleFlag}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const lastStrings = {

        [feedingKey]: "Last Fed: ",
        [bathingKey]: "Last Bathed: ",
        [playingKey]: "Last Player: ",
        [medicineKey]: "Last Dose Recieved: "

    }

    const nextStrings = {

        [feedingKey]: "Feed Before: ",
        [bathingKey]: "Bath Before: ",
        [playingKey]: "Play Before: ",
        [medicineKey]: "Next Dose Available: "

    }

    return (
        <div className = "FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">
                    {PetList[ActivePetName][healthKey] === 0 ? (

                        <>
                            <h2>{lastStrings[activity] + lastActivityString}</h2>
                            <h2>{nextStrings[activity] + "--"} </h2>
                        </>

                    ) : (

                        <>
                            <h2>{lastStrings[activity] + lastActivityString}</h2>
                            <h2>{nextStrings[activity] + nextActivityString}</h2>
                        </>

                    )}

                </div>
            
                {PetList[ActivePetName][healthKey] === 0 ? (

                    <div className = "SchedulingChartProgressBar">

                        {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                            <div key = {num} className = "SchedulingChartProgressCellCancelled"></div>

                        ))}
                        
                    </div>

                ) : (

                    <div className = "SchedulingChartProgressBar">
                        
                        {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                            <div key = {num} className = {num <= percentageUntilNextUpdate ? 
                                                            percentageUntilNextUpdate <= 50 ?
                                                                "SchedulingChartProgressCellDoneNotClose"
                                                                : "SchedulingChartProgressCellDoneClose"
                                                            : "SchedulingChartProgressCellLeft"
                                                        }>           
                            </div>

                        ))}

                    </div>

                )} 

                <button className="FloatingFlagButton" onClick={() => setOpenPetScheduleFlag(false)}>Close</button>
            </div>
        </div>
    )
}
  
export default SchedulingChart;