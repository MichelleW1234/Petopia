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

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag Certificate">
                <div className="heading">
                    <h1>Birth Certificate:</h1>
                    <hr/>
                </div>
                <h2> Name: {ActivePetName} </h2>
                <h2> Gender: {PetList[ActivePetName][genderKey]}</h2>
                <h2> Birthdate: {birthday} </h2>

                <img className = "stamp" src = {stamp}/>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => screenFlagCloser(setBirthCertificateOpenFlag)}> Close </button>

        </div>
    );
}
  
export default BirthCertificate;