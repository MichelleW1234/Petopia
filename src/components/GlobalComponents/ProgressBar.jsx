function ProgressBar({percentageUntilNextUpdate}) {

    return (
        <>

            <div className = "SchedulingChartProgressBar">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= percentageUntilNextUpdate ? (

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