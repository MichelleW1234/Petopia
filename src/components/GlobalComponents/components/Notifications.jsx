import { audioClearPetsKey, audioRectangleButtonPressKey, notificationsDateKey, notificationsDescriptionKey} from "../../../constants/Constants";
import { helpers_Player_UIIndicatorSounds } from "../../../helpers/helpers.js";
import { useNotifications } from "../../../providers/NotificationsProvider";

import "../../../App.css";
import "./Notifications.css";


function Notifications() {

    const {Notifications, setNotifications} = useNotifications();

    const notifications_EntryRemover = (notifications_EntryRemover_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioClearPetsKey);
        helpers_Player_UIIndicatorSounds(audioRectangleButtonPressKey);

        setNotifications(prev => {

            const notifications_EntryRemover_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            notifications_EntryRemover_CurrCopy.splice(notifications_EntryRemover_UserSelection, 1);

            return notifications_EntryRemover_CurrCopy;

        });

    };
    
    return (
        
        <div className = "MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlags--Notifications">

            {Notifications.map((entry, notifications_EntryRemover_UserSelection) => (

                <div key = {notifications_EntryRemover_UserSelection} className="UIStapleElements_ComponentFrame-Template--Global MiscellaneousElements_ComponentContainer-Structure--ScreenFixedFlagEntry">
                    <div className="Notifications_HeadingRow">
                        <button className="UIStapleElements_ComponentButtonRectangle-Template--Global Notifications_HeadingRowButton" onClick = {() => notifications_EntryRemover(notifications_EntryRemover_UserSelection)}> 
                            X  
                        </button>
                        <h2 className = "Notifications_HeadingRowTitle">Achievement Alert: </h2>
                    </div>
                    <p>You unlocked "{entry[notificationsDescriptionKey]}" on {entry[notificationsDateKey]}.</p>
                </div>

            ))}

        </div>
        
    );
}
  
export default Notifications;