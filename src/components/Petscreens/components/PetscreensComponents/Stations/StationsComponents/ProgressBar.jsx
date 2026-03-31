import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (
        <>

            <div className = "SchedulingChartProgressBar">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBarPercentUntilNextUpdate ? (

                        <div key = {num} className = "SchedulingChartProgressCellDoneNotClose"></div>

                    ) : (

                        <div key = {num} className = "SchedulingChartProgressCellLeft"></div>

                    )

                ))}
            </div>

        </>
    )
}
  
export default ProgressBar;