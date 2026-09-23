import "../../../../App.css";
import "./Warning.css";


function Warning({warning_types}) {

    return (

        <div className="MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags--Alerts">

            {warning_types.map((type, index) => (

                index === 0 && type ? (

                    <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                        <h2>Alert:</h2>
                        <p>Your pet is hungry!</p>
                    </div>
                
                ) : index === 1 && type ? (

                    <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                        <h2>Alert:</h2>
                        <p>Your pet is dirty!</p>
                    </div>

                ) : index === 2 && type ? (

                    <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                        <h2>Alert:</h2>
                        <p>Your pet wants to play!</p>
                    </div>

                ) : index === 3 && type ? (

                    <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                        <h2>Alert:</h2>
                        <p>Your pet needs to take its dose!</p>
                    </div>

                ) : (

                    null

                )

            ))}

        </div>

    );
}
  
export default Warning;