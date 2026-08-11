import{useState} from "react";

import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut.js";

import { flagCloser, playSound } from "../../../helpers/Helpers.js";

import "./Inventory.css";



function Inventory({setInventoryOpenFlag}) {


    const inventoryItems = ["a", "b", "c", "d", "e"];

    useKeyboardShortcut("i", () => {
    
        flagCloser(setInventoryOpenFlag);

    },
        ".Close"
    );


    

    return (

        <div className="UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">

            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1> Your Inventory :</h1>
                
                {inventoryItems.map((item, index) => (
                    
                    <div key = {index} className="Inventory_ComponentContainer-Structure--ItemSlot">

                        <h2>{item}</h2>
                        <img/>

                        <h2>Pet attached: </h2>

                        <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                            <button  className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation"> </button>
                            <button  className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation"> </button>
                            <button  className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation"> </button>
                        </div>

                    </div>

                ))}

            </div>

            <button className="UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Close" onClick = {() => flagCloser(setInventoryOpenFlag)}> Close <br/> [I]</button>
        </div>
    );
}
  
export default Inventory;