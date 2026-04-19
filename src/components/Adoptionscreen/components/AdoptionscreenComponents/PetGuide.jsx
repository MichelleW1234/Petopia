function PetGuide({setPetGuideOpenFlag}) {


    return (
        <div className = "BackgroundFloatingFlag_Layout BackgroundFloatingFlag_NonstationBackgroundColor">
            <div className = "FloatingFlagContainer">
                Hello
                <button onClick = {() => setPetGuideOpenFlag(false)}> Close </button>
            </div>
        </div>
    )
}
  
export default PetGuide;