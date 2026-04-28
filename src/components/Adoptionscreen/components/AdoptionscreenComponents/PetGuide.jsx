import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "ReusableMultitags_BackgroundFloatingFlag-Structure--FloatingFlags_ ReusableMultitags_BackgroundFloatingFlag-Color--FloatingFlags_Nonstation">
            <h1>Read About Your Pet Options:</h1>
            <h2> Hello. This is a placeholder</h2>
            <button className = "ReusableMultitags_ComponentButtonPill-Structure--Normal ReusableMultitags_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    )
}
  
export default PetGuide;