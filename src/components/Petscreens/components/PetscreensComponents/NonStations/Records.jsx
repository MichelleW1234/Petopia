import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { birthDateKey, genderKey } from "../../../../../constants/Constants.js";
import { screenFlagCloser } from "../../../../../helpers/helpers.js";

import stamp from "../../../../../images/stamp.png";

import "./Records.css";



function Records({setRecordsOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();


    const birthday = new Date(PetList[ActivePetName][birthDateKey]).toLocaleString();


    useKeyboardShortcut("3", () => {

        screenFlagCloser(setRecordsOpenFlag);

    },
        ".Close"
    );



    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument">
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                        <h1>Records:</h1>
                        <hr/>
                    </div>
                    <div className="Records_ComponentContainer-Structure--Content">
                        <div className="Records_ComponentContainer-Structure--ContentField">
                            <h2> Name: </h2>
                            <p> {ActivePetName}</p>
                        </div>
                        <div className="Records_ComponentContainer-Structure--ContentField">
                            <h2>Gender:</h2>
                            <p>{PetList[ActivePetName][genderKey]}</p>
                        </div>
                        <div className="Records_ComponentContainer-Structure--ContentField">
                            <h2> Birthdate: </h2>
                            <p>{birthday}</p>
                        </div>
                    </div>
                    <img className = "Records_ComponentContainer-Template--Stamp" src = {stamp}/>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => screenFlagCloser(setRecordsOpenFlag)}> Close <br/> [3]</button>

        </div>
    );
}
  
export default Records;