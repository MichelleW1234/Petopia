import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlagContent">
                <h1>Read About Your Pet Options:</h1>
                <h2> Hello. This is a placeholder</h2>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    );
}
  
export default PetGuide;