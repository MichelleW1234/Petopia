import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "Global_ReusableMultitag-BackgroundFloatingFlag_Structure Global_ReusableMultitag-BackgroundFloatingFlag_NonStationColor">
            <h1>Read About Your Pet Options:</h1>
            <h2> Hello. This is a placeholder</h2>
            <button className = "Global_ReusableMultitag-ComponentButtonPill_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonPill_NonStationNormalColor" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetGuide;