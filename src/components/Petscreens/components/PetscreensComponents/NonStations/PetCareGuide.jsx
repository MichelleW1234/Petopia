import "./PetCareGuide.css";

function PetCareGuide({setPetCareGuideOpenFlag}) {


    return (
        <div className = "Global_ReusableMultitag_BackgroundFloatingFlag-Structure Global_ReusableMultitag_BackgroundFloatingFlag-NonStationColor">
            <h1>This tells you everything you need to know about caring for your pet:</h1>
            <h2> &bull; when to perform activity </h2>
            <h2> &bull; what to select for each activity ( and what it looks like when activity isn't wanted)</h2>
            <h2> &bull; that it takes twice as long when a pet is given an activity option they don't want</h2>
            <h2> &bull; the damage for not doing each task on time, and the damage for choosing the incorrect option</h2>
            <h2> &bull; best medicine hours for healing and how much health they heal (+4 between 8pm and 6am, +2 otherwise)</h2>
            <h2> &bull; hint at interacting with pet to see what happens</h2>
            <button className = "Global_ReusableMultitag_ComponentButtonPill-NormalStructure FloatingFlag_ReusableMultitag_ComponentButtonPill-NonStationNormalColor" onClick = {() => setPetCareGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetCareGuide;