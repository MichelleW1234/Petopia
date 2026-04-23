import "./PetCareGuide.css";

function PetCareGuide({setPetCareGuideOpenFlag}) {


    return (
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonStationBackgroundColor">
            <h1 className="header">This tells you everything you need to know about caring for your pet:</h1>
            <div className ="ReusableComponentContainer_Structure FloatingFlag_ReusableComponentContainer_NonStationColor PetGuide_InfoContainer">
                - when to perform activity
                - what to select for each activity ( and what it looks like when activity isn't wanted)
                - that it takes twice as long when a pet is given an activity option they don't want
                - the damage for not doing each task on time, and the damage for choosing the incorrect option
                - best medicine hours for healing and how much health they heal
                - hint at interacting with pet to see what happens
            </div> 
            <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick = {() => setPetCareGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetCareGuide;