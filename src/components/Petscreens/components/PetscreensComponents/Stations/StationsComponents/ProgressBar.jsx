import "../../../../../../App.css";
import "./ProgressBar.css";

import Red from "../../../../../../images/RedProgressBarCell.png";
import Green from "../../../../../../images/GreenProgressBarCell.png";
import Blank from "../../../../../../images/BlankGridSpace.png";

function ProgressBar({progressBar_CurrPercentUntilNextUpdate, progressBar_ActivitySuccess}) {

    return (

        <div className="UIStapleElements_ComponentFrame-Template--Global ProgressBar_ComponentContainer-Structure--BarBackground">
            <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">

                {progressBar_ActivitySuccess ? (

                    Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        num <= progressBar_CurrPercentUntilNextUpdate ? (

                            <img key = {num} src = {Green} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                        ) : (

                            <img key = {num} src = {Blank} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                        )
                

                    ))

                ) : (

                    Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        num <= progressBar_CurrPercentUntilNextUpdate ? (

                            <img key = {num} src = {Red} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                        ) : (

                            <img key = {num} src = {Blank} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                        )

                    ))

                )}

            </div>
        </div>
        
    );
}
  
export default ProgressBar;