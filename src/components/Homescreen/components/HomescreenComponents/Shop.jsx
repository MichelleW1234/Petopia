import {useState} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { playSound, flagCloser } from "../../../../helpers/Helpers.js";
import { navButtonPressSoundKey, restartGameSoundKey, selectionButtonPressSoundKey } from "../../../../constants/Constants.js";

import "./Shop.css";




function Shop({setShopOpenFlag}) {

    const shopItemNameKey = "Name";
    const shopItemImageKey = "Image";
    const shopItemCostKey = "Cost";
    const shopItemAmountPurchasedKey = "Amount";

    const [shopSelectedItems, setShopSelectedItems] = useState([]);

    const shopItems = [
        {[shopItemNameKey]: "Potion", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2khG4rZrt-xpupiJM3L8n-9n65PNSCjAEuvQUMg_AKV9o09WwZ6EJTjVn&s=10", [shopItemCostKey]: 1000, [shopItemAmountPurchasedKey]: 0},
        {[shopItemNameKey]: "Rug", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2khG4rZrt-xpupiJM3L8n-9n65PNSCjAEuvQUMg_AKV9o09WwZ6EJTjVn&s=10", [shopItemCostKey]: 1000, [shopItemAmountPurchasedKey]: 0},
        {[shopItemNameKey]: "Painting", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2khG4rZrt-xpupiJM3L8n-9n65PNSCjAEuvQUMg_AKV9o09WwZ6EJTjVn&s=10", [shopItemCostKey]: 1000, [shopItemAmountPurchasedKey]: 0},
        {[shopItemNameKey]: "Statue", [shopItemImageKey]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2khG4rZrt-xpupiJM3L8n-9n65PNSCjAEuvQUMg_AKV9o09WwZ6EJTjVn&s=10", [shopItemCostKey]: 1000, [shopItemAmountPurchasedKey]: 0}
    ]

    
    useKeyboardShortcut("Escape", () => {
    
        flagCloser(setShopOpenFlag);

    },
        ".Exit"
    );

    
    useKeyboardShortcut("Enter", () => {
    
        buyItems();

    },
        ".PurchaseItems"
    );


    const addItem = (itemToAdd) => {
    
        playSound(selectionButtonPressSoundKey);
        setShopSelectedItems(prev => [...prev, itemToAdd]);

    }


    const removeItem = (itemToRemove) => {

        playSound(selectionButtonPressSoundKey);
        setShopSelectedItems(prev => prev.filter(item => item !== itemToRemove));
        
    }

    const buyItems = () => {



    }



    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1> Purchase up to 100 of each item: </h1>

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                
                    {shopItems.map((item, index) => (

                        <div key = {index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Shop_ComponentContainer-Structure--ItemSlot">

                            <h2>{item[shopItemNameKey]}</h2>
                            <img src = {item[shopItemImageKey]}/>
                            <h2>Price: {item[shopItemCostKey]}</h2>

                            <h2>Purchasing: {item[shopItemAmountPurchasedKey]}</h2>
                            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagNonstationActive Exit"> + </button>
                                <button className = "MiscellaneousElements_ComponentButton-Template--FloatingFlagNonstationActive Exit"> - </button>
                            </div>
                        </div>

                    ))}
                    
                </div>
            </div>
            <h1>Balance: 1.5m</h1>
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Exit" onClick = {() => flagCloser(setShopOpenFlag)}> Exit <br/> [esc]</button>
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation PurchaseItems" onClick = {() => buyItems()}> Purchase Items <br/> [return]</button>
            </div>
        </div>
    );
}
  
export default Shop;