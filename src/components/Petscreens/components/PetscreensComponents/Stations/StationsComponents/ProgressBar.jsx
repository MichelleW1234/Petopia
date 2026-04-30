import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (

        <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">
            {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                num <= progressBarPercentUntilNextUpdate ? (

                    <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell ProgressBar_ComponentContainer-Color--ProgressbarCellDone"></div>

                ) : (

                    <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell ProgressBar_ComponentContainer-Color--ProgressbarCellLeft"></div>

                )

            ))}
        </div>
        
    );
}
  
export default ProgressBar;