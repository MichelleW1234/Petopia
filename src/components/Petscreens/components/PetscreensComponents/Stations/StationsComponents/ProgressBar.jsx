import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (
        <>

            <div className = "ProgressBarContainer">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBarPercentUntilNextUpdate ? (

                        <div key = {num} className = "ProgressBarCellDone"></div>

                    ) : (

                        <div key = {num} className = "ProgressBarCellLeft"></div>

                    )

                ))}
            </div>

        </>
    )
}
  
export default ProgressBar;