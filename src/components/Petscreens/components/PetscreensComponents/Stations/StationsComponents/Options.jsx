import "./Options.css";

import heart from "../../../../../../images/placeholderheart.png";
import bubble from "../../../../../../images/placeholderthoughtbubble.png";



function Options({optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {

    const judgeSelection = (chosenOption) => {

        if (chosenOption !== optionsDesiredOption) {

            setOptionsTotal(prev => prev*2);

        } 

        setOptionsSelection(chosenOption);

    }




    return (

        <div className="Options_ComponentContainer-Structure">

            <div className="Options_ComponentContainer-Structure--PetThought"> 

                {/* Change this!!!!!!!!!!!!!*/}
                <img className = "Options_ComponentImage-Template--PetThoughtPet" src = {optionsList[0]} />

                <div className="MiscellaneousElements_ComponentContainer-Structure--ImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">

                    {/* Change this!!!!!!!!!!!!!*/}
                    <img src = {bubble} className="Options_ComponentImage-Template--PetThoughtDesiredOptionBubble"/>

                    {optionsDesiredOption === -1 ? (

                        /* Change this!!!!!!!!!!!!!*/
                        <img src = {heart} className="Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                    ) : (

                        <img src = {optionsList[optionsDesiredOption]} className="Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                    )}
                </div>

            </div>
            <div className= "MiscellaneousElements_ComponentContainer-Structure--Row">  

                {optionsList.map((option, index) => (

                    <div className="UIStapleElements_ComponentContainer-Structure--Button UIStapleElements_ComponentContainer-Color--FloatingFlagStation">
                        <img key = {index} className = "UIStapleElements_ComponentButtonCircle-Structure--Normal UIStapleElements_ComponentButtonCircle-Color--FloatingFlagStationNormal" src = {option} onClick = {() => judgeSelection(index)}/>
                    </div>

                ))}

            </div>
                    
        </div>
    )
}
  
export default Options