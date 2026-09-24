import "../../../../../../App.css";
import "./ProgressBar.css";

import Red from "../../../../../../images/RedProgressBarCell.png";
import Green from "../../../../../../images/GreenProgressBarCell.png";

function ProgressBar({progressBar_CurrPercentUntilNextUpdate, progressBar_ActivitySuccess}) {

    return (

        <div className="UIStapleElements_ComponentFrame-Template--Global ProgressBar_ComponentContainer-Structure--BarBackground">
            <div className = "ProgressBar_ComponentContainer-Template--Progressionbar">

                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBar_CurrPercentUntilNextUpdate ? (

                        <div key = {num} className="ProgressBar_ComponentContainer-Template--ProgressionbarCell ProgressBar_ComponentContainer-Template--ProgressionbarCell--Done"></div>

                    ) : (

                        <div key = {num} className="ProgressBar_ComponentContainer-Template--ProgressionbarCell"></div>

                    )
            

                ))}

            </div>
        </div>
        
    );
}
  
export default ProgressBar;