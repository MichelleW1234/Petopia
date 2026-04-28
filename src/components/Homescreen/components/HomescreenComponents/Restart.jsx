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
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlagNonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagContent">
                <h1>Are you sure you want to restart the game? </h1>
            </div>
            <div className="MiscellaneousElements_ComponentContainer-Structure--Row">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlagNonstationNormal" onClick = {() => restartGame()}>Yes</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlagNonstationNormal" onClick = {() => setRestartOpenFlag(false)}>No</button>
            </div>
        </div>
    );
}
  
export default Restart;