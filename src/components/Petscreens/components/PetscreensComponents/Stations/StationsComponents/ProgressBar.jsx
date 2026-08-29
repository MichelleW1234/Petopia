import "./ProgressBar.css";


function ProgressBar({progressBar_CurrPercentUntilNextUpdate}) {

    return (

        <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlagProgressionbar">
            {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                <div key = {num} 
                    className = {num <= progressBar_CurrPercentUntilNextUpdate ? 
                                "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell ProgressBar_ComponentContainer-Color--CellDone"
                                : "MiscellaneousElements_ComponentContainer-Structure--FloatingFlagProgressionbarCell ProgressBar_ComponentContainer-Color--CellLeft"
                            }>
                </div>

            ))}
        </div>
        
    );
}
  
export default ProgressBar;