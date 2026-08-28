import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petBirthDateKey, petGenderKey } from "../../../../../constants/Constants.js";
import { helpers_FlagCloser } from "../../../../../helpers/Helpers.js";

import "./Records.css";



function Records({set_Records_OpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();


    const records_BirthdayString = new Date(PetList[ActivePetName][petBirthDateKey]).toLocaleString();


    useKeyboardShortcut("2", () => {

        helpers_FlagCloser(set_Records_OpenFlag);

    },
        ".Close"
    );




    return (
        <div className = "UIStapleElements_Background-Structure--FloatingFlag UIStapleElements_Background-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocument">
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentHeading">
                        <h1>Records:</h1>
                        <hr/>
                    </div>
                    <div className="MiscellaneousElements_ComponentContainer-Template--GlobalDocumentWrittenContent">
                        <div className="Records_ComponentContainer-Structure--DocumentField">
                            <h2> Name: </h2>
                            <p> {ActivePetName}</p>
                        </div>
                        <div className="Records_ComponentContainer-Structure--DocumentField">
                            <h2>Gender:</h2>
                            <p>{PetList[ActivePetName][petGenderKey]}</p>
                        </div>
                        <div className="Records_ComponentContainer-Structure--DocumentField">
                            <h2> Birthdate: </h2>
                            <p>{records_BirthdayString}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => helpers_FlagCloser(set_Records_OpenFlag)}> Close <br/> [2]</button>

        </div>
    );
}
  
export default Records;