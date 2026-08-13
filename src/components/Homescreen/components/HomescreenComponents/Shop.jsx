import {useState, useRef} from "react";

import {usePetList} from "../../../../providers/PetListProvider.jsx";
import {usePetTimeStamps} from "../../../../providers/PetTimeStampsProvider.jsx";
import { useRoom } from "../../../../providers/RoomProvider.jsx";
import { useShopItems } from "../../../../providers/ShopItemsProvider.jsx";
import { usePetInventory } from "../../../../providers/PetInventoryProvider.jsx";
import { useBalance } from "../../../../providers/BalanceProvider.jsx";

import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut.js";

import { playSound, flagCloser, errorMessageTimer } from "../../../../helpers/Helpers.js";
import { navButtonPressSoundKey, petInventoryItemIndexKey, petInventoryItemOwnerKey, restartGameSoundKey, selectionButtonPressSoundKey, shopItemCostKey, shopItemImageKey, shopItemNameKey, shopItemSpeciesKey, shopItemTypeKey } from "../../../../constants/Constants.js";

import "./Shop.css";




function Shop({setShopOpenFlag}) {

    const {ShopItems, setShopItems} = useShopItems();
    const {PetInventory, setPetInventory} = usePetInventory();
    const {Balance, setBalance} = useBalance();

    const [shopSelectedItems, setShopSelectedItems] = useState([]);
    const [shopMessage, setShopMessage] = useState("");

    const shopConfirmationTimeoutRef = useRef(null);



    
    useKeyboardShortcut("Escape", () => {
    
        flagCloser(setShopOpenFlag);

    },
        ".Exit"
    );

    
    useKeyboardShortcut("Enter", (e) => {

        if (shopSelectedItems.length > 0){

            buyItems(e);

        }

    },
        ".PurchaseItems"
    );


    const addItem = (itemIndex) => {
    
        playSound(selectionButtonPressSoundKey);
        setShopSelectedItems(prev => [...prev, itemIndex]);

    }


    const removeItem = (itemIndex) => {

        playSound(selectionButtonPressSoundKey);
        setShopSelectedItems(prev => prev.filter(item => item !== itemIndex));

    }

    const buyItems = (e) => {

        let totalCost = 0;

        for (let i = 0; i<shopSelectedItems.length; i++){

            totalCost += ShopItems[shopSelectedItems[i]][shopItemCostKey];

        }

        if (Balance < totalCost){

            e.preventDefault();
            errorMessageTimer("Your balance is too low.", setShopMessage, shopConfirmationTimeoutRef);

        } else {

            setPetInventory(prev => {

                const copy = prev.map(inner =>
                    structuredClone(inner)
                );

                for (let i = 0; i<shopSelectedItems.length; i++){

                    let newItem = 
                        {
                            [petInventoryItemIndexKey] : shopSelectedItems[i],
                            [petInventoryItemOwnerKey] : null
                        }
                    
                    copy.push(newItem);

                }

                return copy;

            });

            setBalance(prev => prev - totalCost);
            flagCloser(setShopOpenFlag);

        }

    }



    return (
        <div className = "UIStapleElements_BackgroundOverlay-Structure--FloatingFlag UIStapleElements_BackgroundOverlay-Color--FloatingFlag--Nonstation">
            <div className="MiscellaneousElements_ComponentContainer-Structure--FloatingFlag">
                <h1> Purchase any item within your budget: </h1>

                <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                
                    {ShopItems.map((item, index) => (

                        <div key = {index} className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--FloatingFlagNonstation Shop_ComponentContainer-Structure--ItemSlot">

                            <h2>{item[shopItemNameKey]}</h2>
                            <h2>${item[shopItemCostKey]}</h2>
        
                            {shopSelectedItems.includes(index) ? (
                            
                                <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstationSelected" onClick = {() => removeItem(index)}> 
                                    <img src = {item[shopItemImageKey]}/>
                                </button>

                            ) : (

                                <button className="UIStapleElements_ComponentButtonCircle-Structure--Global UIStapleElements_ComponentButtonCircle-Color--Global--FloatingFlagNonstation" onClick = {() => addItem(index)}> 
                                    <img src = {item[shopItemImageKey]}/>
                                </button>

                            )}

                            <h2>Type: {item[shopItemTypeKey]}</h2>

                            
                            <h2> 
                                For your:                           
                                {item[shopItemSpeciesKey].map((item, index) => (
                                    <div key={index}>&gt; {item}</div>
                                ))}
                            </h2>

                        </div>

                    ))}
                    
                </div>
            </div>
            <div className="Shop_ComponentContainer-Template--BalanceInfo">
                <p className="Shop_ComponentContainer-Template--ConfirmationError">{shopMessage}</p>
                <h1>Balance: {Balance}</h1>
            </div> 
            <div className="MiscellaneousElements_ComponentContainer-Structure--GlobalRow">
                <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation Exit" onClick = {() => flagCloser(setShopOpenFlag)}> Exit <br/> [esc]</button>

                {shopSelectedItems.length === 0 ? (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalNonclick UIStapleElements_ComponentButtonPill-Color--GlobalNonclick--FloatingFlagNonstation"> Purchase Items <br/> [return]</button>

                ) : (

                    <button className = "UIStapleElements_ComponentButtonPill-Structure--GlobalClick UIStapleElements_ComponentButtonPill-Color--GlobalClick--FloatingFlagNonstation PurchaseItems" onClick = {(e) => buyItems(e)}> Purchase Items <br/> [return]</button>

                )}

            </div>
        </div>
    );
}
  
export default Shop;