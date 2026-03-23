import { useState, useEffect } from "react";

import { usePetList} from "../../providers/PetListProvider.jsx";
import { usePetTimeStamps } from "../../providers/PetTimeStampsProvider.jsx";
import {useActivePetName} from "../../providers/ActivePetNameProvider.jsx";

import { healthKey, feedingKey, bathingKey, playingKey, medicineKey } from "../../constants/Constants.js";

import "./SchedulingChart.css";


function SchedulingChart({activityKey, timeGap, setOpenPetScheduleFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const [currDate, setCurrDate] = useState(Date.now());


    const deadLine = activityKey === medicineKey ? 
                        PetList[ActivePetName][activityKey] + timeGap
                    : PetTimeStamps[ActivePetName][activityKey][0] + timeGap;

    const lastActivityString = activityKey === medicineKey ?
                                    PetList[ActivePetName][activityKey] > 0 ? 
                                        (new Date(PetList[ActivePetName][activityKey])).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                    : "N/A"
                                :   (new Date(PetTimeStamps[ActivePetName][activityKey][0])).toLocaleString([], {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

    const nextActivityString = activityKey === medicineKey ?  
                                    PetList[ActivePetName][activityKey] > 0 ? 
                                        (new Date(deadLine)).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }) 
                                    : "On Demand"
                                : 
                                    (new Date(deadLine)).toLocaleString([], {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

    const percentageUntilNextUpdate = activityKey === medicineKey ?  
                                            PetList[ActivePetName][activityKey] === 0 ? 
                                                100
                                            : deadLine > currDate ? 
                                                Math.round(((currDate -  PetList[ActivePetName][activityKey])/timeGap) * 100)
                                            : 100
                                        :
                                            deadLine > currDate ? 
                                                Math.round(((currDate - PetTimeStamps[ActivePetName][activityKey][0])/timeGap) * 100)
                                            : 100;

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

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrDate(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);



    return (
        <div className = "FloatingFlagBackground">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">
                    {PetList[ActivePetName][healthKey] === 0 ? (

                        <>
                            <h2>{lastStrings[activityKey] + lastActivityString}</h2>
                            <h2>{nextStrings[activityKey] + "--"} </h2>
                        </>

                    ) : (

                        <>
                            <h2>{lastStrings[activityKey] + lastActivityString}</h2>
                            <h2>{nextStrings[activityKey] + nextActivityString}</h2>
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