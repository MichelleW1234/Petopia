function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "floatingFlagLayout floatingFlagNonstationBackgroundColor">
            <div className = "FloatingFlagContainer">
                Hello
                <button onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
            </div>
        </div>
    )
}
  
export default PetGuide;