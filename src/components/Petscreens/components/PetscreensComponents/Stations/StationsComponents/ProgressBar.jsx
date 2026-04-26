import "./ProgressBar.css";

function ProgressBar({progressBarPercentUntilNextUpdate}) {

    return (
        <>

            <div className = "ProgressBar_Container">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (

                    num <= progressBarPercentUntilNextUpdate ? (

                        <div key = {num} className = "ProgressBar_DoneCell"></div>

                    ) : (

                        <div key = {num} className = "ProgressBar_LeftCell"></div>

                    )

                ))}
            </div>

        </>
    )
}
  
export default ProgressBar;