import "./PetGuide.css";

function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "UIStapleElements_BackgroundFloatingFlag-Structure--FloatingFlags_ UIStapleElements_BackgroundFloatingFlag-Color--FloatingFlags_Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlags_Content">
                <h1>Read About Your Pet Options:</h1>
                <h2> Hello. This is a placeholder</h2>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--Normal UIStapleElements_ComponentButtonPill-Color--FloatingFlags_NonstationNormal" onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
        </div>
    );
}
  
export default PetGuide;