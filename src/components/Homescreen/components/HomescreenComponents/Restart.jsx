import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";

import "./Restart.css";



function Restart({setRestartOpenFlag}) {

    const {PetList, setPetList} = usePetList();
    const {PetTimeStamps, setPetTimeStamps} = usePetTimeStamps();



    const restartGame = () => {

        setPetList({});
        setPetTimeStamps({});

        setRestartOpenFlag(false);

    }


    return (
        <div className = "Global_ReusableMultitag-BackgroundFloatingFlag_Structure Global_ReusableMultitag-BackgroundFloatingFlag_NonStationColor">
            <h1>Are you sure you want to restart the game? </h1>
            <div className="Global_RowContainer">
                <button className = "Global_ReusableMultitag-ComponentButtonPill_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationNormalColor" onClick = {() => restartGame()}>Yes</button>
                <button className = "Global_ReusableMultitag-ComponentButtonPill_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationNormalColor" onClick = {() => setRestartOpenFlag(false)}>No</button>
            </div>
        </div>
    )
}
  
export default Restart;