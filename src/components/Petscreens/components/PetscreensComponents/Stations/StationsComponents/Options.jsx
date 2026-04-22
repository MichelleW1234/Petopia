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

        <div className="Options_Container">

            <div className="Options_DesiredOptionContainer"> 

                {/* Change this!!!!!!!!!!!!!*/}
                <img className = "Options_Pet" src = {optionsList[0]} />

                <div className="Options_DesiredOption">

                    {/* Change this!!!!!!!!!!!!!*/}
                    <img src = {bubble} className="Options_DesiredOptionBubble"/>

                    {optionsDesiredOption === -1 ? (

                        /* Change this!!!!!!!!!!!!!*/
                        <img src = {heart} className="Options_DesiredOptionObject"/>

                    ) : (

                        <img src = {optionsList[optionsDesiredOption]} className="Options_DesiredOptionObject"/>

                    )}
                </div>

            </div>
            <div className= "Options_ListContainer">  

                {optionsList.map((option, index) => (

                    <div className="ReusableComponentContainer_Structure FloatingFlag_ReusableComponentContainer_StationColor test">
                        <img key = {index} className = "ReusableComponentButtonCircle_Structure FloatingFlag_ReusableComponentButtonCircle_StationColor" src = {option} onClick = {() => judgeSelection(index)}/>
                    </div>

                ))}

            </div>
                    
        </div>
    )
}
  
export default Options