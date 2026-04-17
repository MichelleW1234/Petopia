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
        <div className = "floatingFlagLayout floatingFlagNonstationBackgroundColor">
            <div className="FloatingFlagContainer">
                <div className="FloatingFlagInfoContainer">
                    <h2>Are you sure you want to restart the game? </h2>

                    <button className = "FloatingFlagButton" onClick = {() => restartGame()}>Yes</button>
                    <button className = "FloatingFlagButton" onClick = {() => setRestartOpenFlag(false)}>No</button>

                </div>
            </div>
        </div>
    )
}
  
export default Restart;