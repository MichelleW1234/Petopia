import "./PetCareGuide.css";

function PetCareGuide({setPetCareGuideOpenFlag}) {


    return (
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonStationBackgroundColor">
            <h1 className="header">This tells you everything you need to know about caring for your pet:</h1>
            <h2 className="header"> &bull; when to perform activity </h2>
            <h2 className="header"> &bull; what to select for each activity ( and what it looks like when activity isn't wanted)</h2>
            <h2 className="header"> &bull; that it takes twice as long when a pet is given an activity option they don't want</h2>
            <h2 className="header"> &bull; the damage for not doing each task on time, and the damage for choosing the incorrect option</h2>
            <h2 className="header"> &bull; best medicine hours for healing and how much health they heal (+4 between 8pm and 6am, +2 otherwise)</h2>
            <h2 className="header"> &bull; hint at interacting with pet to see what happens</h2>
            <button className = "ReusableComponentButtonPill_Structure FloatingFlag_ReusableComponentButtonPill_NonStationColor" onClick = {() => setPetCareGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetCareGuide;