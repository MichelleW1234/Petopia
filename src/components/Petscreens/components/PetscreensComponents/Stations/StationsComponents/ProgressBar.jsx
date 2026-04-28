import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (
        <>

            <div className = "ProgressBar_ComponentContainer-Structure">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBarPercentUntilNextUpdate ? (

                        <div key = {num} className = "ProgressBar_ComponentContainer-Template--CellDone"></div>

                    ) : (

                        <div key = {num} className = "ProgressBar_ComponentContainer-Template--CellLeft"></div>

                    )

                ))}
            </div>

        </>
    )
}
  
export default ProgressBar;