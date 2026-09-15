import "../../../../App.css";
import "./Warning.css";


function Warning() {
    
    return (

        <div className="UIStapleElements_ComponentFrame-Structure--Global UIStapleElements_ComponentFrame-Color--Global--Screen  MiscellaneousElements_ComponentContainer-Structure--GlobalDialogBox warning">
            <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalDialogBoxContent">
                <div className="WrittenContentField">
                    <h2>Alert:</h2>
                    <p>Your pet needs care! Check its schedule.</p>
                </div>
            </div>
        </div>

    );
}
  
export default Warning;