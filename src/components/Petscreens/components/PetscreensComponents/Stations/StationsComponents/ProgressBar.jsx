import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (
        <>

            <div className = "MiscellaneousElements_ComponentContainer-Template--FloatingFlags_Progressionbar">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBarPercentUntilNextUpdate ? (

                        <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlags_ProgressionbarCell ProgressBar_ComponentContainer-Color--ProgressbarCellDone"></div>

                    ) : (

                        <div key = {num} className = "MiscellaneousElements_ComponentContainer-Structure--FloatingFlags_ProgressionbarCell ProgressBar_ComponentContainer-Color--ProgressbarCellLeft"></div>

                    )

                ))}
            </div>

        </>
    )
}
  
export default ProgressBar;