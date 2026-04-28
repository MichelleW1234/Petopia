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
        <div className = "ReusableMultitags_BackgroundFloatingFlag-Structure--FloatingFlags_ ReusableMultitags_BackgroundFloatingFlag-Color--FloatingFlags_Nonstation">
            <div className="FloatingFlags_ComponentContainer-Structure--Content">
                <h1>Are you sure you want to restart the game? </h1>
            </div>
            <div className="ComponentContainer-Structure--Row">
                <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick = {() => restartGame()}>Yes</button>
                <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick = {() => setRestartOpenFlag(false)}>No</button>
            </div>
        </div>
    );
}
  
export default Restart;