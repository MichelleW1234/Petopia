import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (
        <>

            <div className = "FloatingFlags_ComponentContainer-Template--Progressionbar">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBarPercentUntilNextUpdate ? (

                        <div key = {num} className = "FloatingFlags_ComponentContainer-Structure--ProgressionbarCell ProgressBar_ComponentContainer-Color--ProgressbarCellDone"></div>

                    ) : (

                        <div key = {num} className = "FloatingFlags_ComponentContainer-Structure--ProgressionbarCell ProgressBar_ComponentContainer-Color--ProgressbarCellLeft"></div>

                    )

                ))}
            </div>

        </>
    )
}
  
export default ProgressBar;