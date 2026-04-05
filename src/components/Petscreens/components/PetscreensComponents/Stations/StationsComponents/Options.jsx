import "./Options.css";



function Options({optionsDesiredOption, optionsList, setOptionsTotal, setOptionsSelection}) {

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

                    <div className = "OptionsPetMindContainer">
                        {/* Change this!!!!!!!!!!!!!*/}
                        <img />
                        {/* Change this!!!!!!!!!!!!!*/}
                        <img />
                    </div>

                ) : (

                    <div className = "OptionsPetMindContainer">
                        {/* Change this!!!!!!!!!!!!!*/}
                        <img />
                        <img src = {optionsList[optionsDesiredOption]}/>
                    </div>

                )}

            </div>
            <div className= "OptionsListContainer">  

                {optionsList.map((option, index) => (

                    <img key = {index} className = "OptionsListButton" src = {option} onClick = {() => judgeSelection(index)}/>

                ))}

            </div>
                    
        </>
    )
}
  
export default Options