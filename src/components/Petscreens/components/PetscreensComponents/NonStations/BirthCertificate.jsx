import { screenFlagCloser } from "../../../../../helpers/helpers.js";
import useKeyboardShortcut from "../../../../../hooks/useKeyboardShortcut.js";

import "./BirthCertificate.css";

function BirthCertificate({setBirthCertificateOpenFlag}) {

    useKeyboardShortcut("3", () => {

        screenFlagCloser(setBirthCertificateOpenFlag);

    },
        ".Close"
    );

    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1>Pet Birth certificate:</h1>
                <h2> &bull; name </h2>
                <h2> &bull; stage </h2>
                <h2> &bull; birthdate </h2>
                <h2> &bull; gender</h2>
            </div>

            <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => screenFlagCloser(setBirthCertificateOpenFlag)}> Close </button>

        </div>
    );
}
  
export default BirthCertificate;