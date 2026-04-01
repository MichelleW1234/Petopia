import { usePetList } from "../../../../../../providers/PetListProvider.jsx";
import { useActivePetName } from "../../../../../../providers/ActivePetNameProvider.jsx";

import { cleaningKey, feedingKey, playingKey, speciesKey, stageKey } from "../../../../../../constants/Constants.js";
import { petImages } from "../../../../../../constants/MainPetImages.js";

import "./Options.css";



function Options({optionsActivityKey, optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {

    const {PetList, setPetList} = usePetList();
    const {ActivePetName, setActivePetName} = useActivePetName();

    const optionsNoneDesiredStrings = {

        [feedingKey]: "Not hungry",
        [cleaningKey]: "Not dirty",
        [playingKey]: "Not restless"

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
                        <h2>{optionsNoneDesiredStrings[optionsActivityKey]}</h2>
                    </>

                ) : (

                    <>
                        {/* Change this!!!!!!!!!!!!!*/}
                        <img src = {petImages[PetList[ActivePetName][speciesKey]][0][optionsDesiredOption]}/>
                        <h2>{optionsList[optionsDesiredOption]}</h2>
                    </>

                )}

            </div>
            <div className= "OptionsListContainer">  

                {/* Change this!!!!!!!!!!!!!*/}
                {optionsList.map((option, index) => (

                    <img className = "OptionsListButton" src = {petImages[PetList[ActivePetName][speciesKey]][0][index]} onClick = {() => judgeSelection(index)}/>

                ))}

            </div>
                    
        </>
    )
}
  
export default Options