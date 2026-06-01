import "./ProgressBar.css";


function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (

        <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">
            {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                num <= progressBarPercentUntilNextUpdate ? (

                    <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell ProgressBar_ComponentContainer-Color--CellDone"></div>

                ) : (

                    <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell ProgressBar_ComponentContainer-Color--CellLeft"></div>

                )

            ))}
        </div>
        
    );
}
  
export default ProgressBar;