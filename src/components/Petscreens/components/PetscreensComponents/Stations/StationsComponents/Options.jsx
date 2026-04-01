import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { cleaningKey, feedingKey, playingKey, speciesKey } from "../../../../../../constants/Constants.js";
import { petImages } from "../../../../../../constants/MainPetImages.js";

import "./Options.css";



function Options({optionsActivityKey, optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const optionsNoneDesiredStrings = {

        [feedingKey]: `${ActivePetName} is not hungry`,
        [cleaningKey]: `${ActivePetName} doesn't need to use these`,
        [playingKey]: `${ActivePetName} is tired`

    }

    const optionsDesiredStrings = {

        [feedingKey]: `${ActivePetName} wants ${optionsList[optionsDesiredOption]}`,
        [cleaningKey]: `${ActivePetName} needs ${optionsList[optionsDesiredOption]}`,
        [playingKey]: `${ActivePetName} wants to play ${optionsList[optionsDesiredOption]}`

    }



    const judgeSelection = (chosenOption) => {

        if (chosenOption !== optionsDesiredOption) {

            setOptionsTotal(prev => prev*2);

        } 

        setOptionsSelection(chosenOption);

    }




    return (

        <>

            <div className="OptionsDesiredOptionSign"> 

                {optionsDesiredOption === -1 ? (

                    <>
                        {/* Change this!!!!!!!!!!!!!*/}
                        <img />
                        <h2>{optionsNoneDesiredStrings[optionsActivityKey]}! Come back later. </h2>
                    </>

                ) : (

                    <>
                        {/* Change this!!!!!!!!!!!!!*/}
                        <img src = {petImages[PetList[ActivePetName][speciesKey]][0][optionsDesiredOption]}/>
                        <h2>{optionsDesiredStrings[optionsActivityKey]}! Select from the options below.</h2>
                    </>

                )}

            </div>
            <div className= "OptionsListContainer">  

                {/* Change this!!!!!!!!!!!!!*/}
                {optionsList.map((option, index) => (

                    <img key = {index} className = "OptionsListButton" src = {petImages[PetList[ActivePetName][speciesKey]][0][index]} onClick = {() => judgeSelection(index)}/>

                ))}

            </div>
                    
        </>
    )
}
  
export default Options