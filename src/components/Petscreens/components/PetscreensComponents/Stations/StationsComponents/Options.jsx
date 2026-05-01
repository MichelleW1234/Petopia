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

        <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">

            <div className="Options_ComponentContainer-Structure--PetThought"> 

                {/* Change this!!!!!!!!!!!!!*/}
                <img className = "Options_ComponentImage-Template--PetThoughtPet" src = {optionsList[0]} />

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalImageOverlay Options_ComponentContainer-Structure--PetThoughtDesiredOption">

                    {/* Change this!!!!!!!!!!!!!*/}
                    <img src = {bubble} className=" Options_ComponentImage-Template--PetThoughtDesiredOptionBubble"/>

                    {optionsDesiredOption === -1 ? (

                        /* Change this!!!!!!!!!!!!!*/
                        <img src = {heart} className=" Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                    ) : (

                        <img src = {optionsList[optionsDesiredOption]} className=" Options_ComponentImage-Template--PetThoughtDesiredOptionObject"/>

                    )}
                </div>

            </div>
            <div className= "MiscellaneousElements_ComponentContainer-Structure--GlobalRow">  

                {optionsList.map((option, index) => (

                    <div key = {index} className="UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagStation MiscellaneousElements_ComponentContainer-Structure--GlobalSelectionButton">
                        <button className = "UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagStation" onClick = {() => judgeSelection(index)}>
                            <img src = {option}/>
                        </button>
                    </div>

                ))}

            </div>
                    
        </div>
    );
}
  
export default Options