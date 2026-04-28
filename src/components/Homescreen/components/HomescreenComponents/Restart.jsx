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
        <div className = "UIStapleElements_BackgroundFloatingFlag-Structure--FloatingFlags_ UIStapleElements_BackgroundFloatingFlag-Color--FloatingFlags_Nonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlags_Content">
                <h1>Are you sure you want to restart the game? </h1>
            </div>
            <div className="MiscellaneousElements_ComponentContainer-Structure--Row">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick = {() => restartGame()}>Yes</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick = {() => setRestartOpenFlag(false)}>No</button>
            </div>
        </div>
    );
}
  
export default Restart;