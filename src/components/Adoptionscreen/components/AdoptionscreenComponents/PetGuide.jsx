import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonstationBackgroundColor">
            <h1 className="header">Read About Your Pet Options:</h1>
            <div className ="ReusableComponentContainer_Structure FloatingFlag_ReusableComponentContainer_NonStationColor PetGuide_InfoContainer">
                Hello. This is a placeholder
            </div> 
            <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetGuide;