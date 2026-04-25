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

                <div className="Global_OverlappingImagesContainer Options_PetThoughtDesiredOption">

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
            <div className= "Global_RowContainer">  

                {optionsList.map((option, index) => (

                    <div className="Global_ReusableMultitag-ComponentContainer_ButtonBorderStructure FloatingFlag_ReusableMultitag-ComponentContainer_StationColor">
                        <img key = {index} className = "Global_ReusableMultitag-ComponentButtonCircle_NormalStructure FloatingFlag_ReusableMultitag-ComponentButtonCircle_StationNormalColor" src = {option} onClick = {() => judgeSelection(index)}/>
                    </div>

                ))}

            </div>
                    
        </div>
    )
}
  
export default Options