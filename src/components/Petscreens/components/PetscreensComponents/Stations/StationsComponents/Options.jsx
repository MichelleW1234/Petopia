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

            <div className="Options_PetThoughtContainer"> 

                {/* Change this!!!!!!!!!!!!!*/}
                <img className = "Options_PetThoughtPetImage" src = {optionsList[0]} />

                <div className="Universal_OverlappingImagesContainer Options_PetThoughtDesiredOption">

                    {/* Change this!!!!!!!!!!!!!*/}
                    <img src = {bubble} className="Options_PetThoughtDesiredOptionBubbleImage"/>

                    {optionsDesiredOption === -1 ? (

                        /* Change this!!!!!!!!!!!!!*/
                        <img src = {heart} className="Options_PetThoughtDesiredOptionObjectImage"/>

                    ) : (

                        <img src = {optionsList[optionsDesiredOption]} className="Options_PetThoughtDesiredOptionObjectImage"/>

                    )}
                </div>

            </div>
            <div className= "Universal_RowContainer">  

                {optionsList.map((option, index) => (

                    <div className="ReusableComponentContainer_ButtonBorderStructure FloatingFlag_ReusableComponentContainer_StationColor">
                        <img key = {index} className = "ReusableComponentButtonCircle_Structure FloatingFlag_ReusableComponentButtonCircle_StationColor" src = {option} onClick = {() => judgeSelection(index)}/>
                    </div>

                ))}

            </div>
                    
        </div>
    )
}
  
export default Options