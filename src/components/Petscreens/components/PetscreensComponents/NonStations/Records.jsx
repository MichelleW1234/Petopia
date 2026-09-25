import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import { petBirthDateKey, petGenderKey } from "../../../../../constants/Constants.js";
import { helpers_Closer_Flags } from "../../../../../helpers/helpers.js";

import "../../../../../App.css";
import "./Records.css";



function Records({set_Records_OpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();


    const records_CurrPetBirthdateString = new Date(PetList[ActivePetName][petBirthDateKey]).toLocaleString([], {
                                                                                                year: "numeric",
                                                                                                month: "2-digit",
                                                                                                day: "2-digit",
                                                                                                hour: "2-digit",
                                                                                                minute: "2-digit",
                                                                                            });

    useKeyboardShortcut("2", () => {

        helpers_Closer_Flags(set_Records_OpenFlag);

    },
        ".Close"
    );




    return (
        <div className = "UIStapleElements_Background-Template--FloatingFlag">

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalContent">

                <h1 className="MiscellaneousElements_ComponentText-Template--GlobalDescriptor MiscellaneousElements_ComponentText-Template--GlobalDescriptor--GlobalOverview"> Records:</h1>

                <div className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--FloatingFlagDocument">
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
                        <p>{records_CurrPetBirthdateString}</p>
                    </div>
                </div>
            </div>

            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalButtonRow">
                <button className = "UIStapleElements_ComponentButtonPill-Template--GlobalClick  Close" onClick = {() => helpers_Closer_Flags(set_Records_OpenFlag)}> Close <br/> [2]</button>
            </div>
            
        </div>
    );
}
  
export default Records;