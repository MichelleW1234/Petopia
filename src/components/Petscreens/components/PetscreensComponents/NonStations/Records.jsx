import { useEffect } from "react";
import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { birthDateKey, genderKey } from "../../../../../constants/Constants.js";
import { flagCloser } from "../../../../../helpers/helpers.js";

import "./Records.css";



function Records({setRecordsOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();


    const recordsBirthdayString = new Date(PetList[ActivePetName][birthDateKey]).toLocaleString();


    useKeyboardShortcut("3", () => {

        flagCloser(setRecordsOpenFlag);

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
                            <p>{recordsBirthdayString}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setRecordsOpenFlag)}> Close <br/> [3]</button>

        </div>
    );
}
  
export default Records;