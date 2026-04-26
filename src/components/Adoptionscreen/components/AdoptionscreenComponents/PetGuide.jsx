import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "Global_ReusableMultitag_BackgroundFloatingFlag-Structure Global_ReusableMultitag_BackgroundFloatingFlag-NonStationColor">
            <h1>Read About Your Pet Options:</h1>
            <h2> Hello. This is a placeholder</h2>
            <button className = "Global_ReusableMultitag_ComponentButtonPill-NormalStructure FloatingFlag_ReusableMultitag_ComponentButtonPill-NonStationNormalColor" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetGuide;