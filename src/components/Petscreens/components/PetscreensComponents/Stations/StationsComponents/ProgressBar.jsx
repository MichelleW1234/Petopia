import "../../../../../../App.css";
import "./ProgressBar.css";

import Red from "../../../../../../images/RedProgressBarCell.png";
import Green from "../../../../../../images/GreenProgressBarCell.png";

function ProgressBar({progressBar_CurrPercentUntilNextUpdate, progressBar_ActivitySuccess}) {

    return (

        <div className="UIStapleElements_ComponentFrame-Structure--Global UIStapleElements_ComponentFrame-Color--Global--FloatingFlag ProgressBar_ComponentContainer-Structure--BarBackground">
            <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">

                {progressBar_ActivitySuccess ? (

                    Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        num <= progressBar_CurrPercentUntilNextUpdate ? (

                            <img key = {num} src = {Green} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                        ) : (

                            <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"> </div>

                        )
                

                    ))

                ) : (

                    Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                        num <= progressBar_CurrPercentUntilNextUpdate ? (

                            <img key = {num} src = {Red} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"/>

                        ) : (

                            <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell"> </div>

                        )

                    ))

                )}

            </div>
        </div>
        
    );
}
  
export default ProgressBar;