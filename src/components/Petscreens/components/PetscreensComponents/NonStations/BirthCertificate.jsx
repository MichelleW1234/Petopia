import { useActivePetName } from "../../../../../providers/ActivePetNameProvider.jsx";
import { usePetList } from "../../../../../providers/PetListProvider.jsx";

import { screenFlagCloser } from "../../../../../helpers/helpers.js";
import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import "./BirthCertificate.css";
import { birthDateKey, genderKey } from "../../../../../constants/Constants.js";

import stamp from "../../../../../images/stamp.png";

function BirthCertificate({setBirthCertificateOpenFlag}) {

    const {ActivePetName, setActivePetName} = useActivePetName();
    const {PetList, setPetList} = usePetList();


    const birthday = new Date(PetList[ActivePetName][birthDateKey]).toLocaleString();


    useKeyboardShortcut("3", () => {

        screenFlagCloser(setBirthCertificateOpenFlag);

    },
        ".Close"
    );



    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <div className="Certificate">
                    <div className="heading">
                        <h1>Birth Certificate:</h1>
                        <hr/>
                    </div>
                    <div className="column">
                        <h2> Name: </h2>
                        <p> {ActivePetName}</p>
                    </div>
                    <div className="column">
                        <h2>Gender:</h2>
                        <p>{PetList[ActivePetName][genderKey]}</p>
                    </div>
                    <div className="column">
                        <h2> Birthdate: </h2>
                        <p>{birthday}</p>
                    </div>
                    <img className = "stamp" src = {stamp}/>
                </div>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => screenFlagCloser(setBirthCertificateOpenFlag)}> Close </button>

        </div>
    );
}
  
export default BirthCertificate;