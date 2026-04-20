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
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonstationBackgroundColor">
            <h1 className="header">Are you sure you want to restart the game? </h1>
            <div className="Restart_ButtonContainer">
                <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick = {() => restartGame()}>Yes</button>
                <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick = {() => setRestartOpenFlag(false)}>No</button>
            </div>
        </div>
    )
}
  
export default Restart;