import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonStationBackgroundColor">
            <h1>Read About Your Pet Options:</h1>
            <h2> Hello. This is a placeholder</h2>
            <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetGuide;