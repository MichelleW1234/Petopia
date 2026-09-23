import { audioClearPetsKey, audioRectangleButtonPressKey, notificationsDateKey, notificationsDescriptionKey } from "../../../constants/Constants";
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
                    <button className="UIStapleElements_ComponentButtonRectangle-Template--Global" onClick = {() => notifications_EntryRemover(notifications_EntryRemover_UserSelection)}> 
                        X  
                    </button>
                    <div className = "Notification_ComponentContainer-Structure--EntryContent">
                        <div className="Notification_ComponentContainer-Structure--EntryContentField">
                            <h2>Message: </h2>
                            <p>{entry[notificationsDescriptionKey]}</p>
                            </div>
                            <div className="Notification_ComponentContainer-Structure--EntryContentField">
                            <h2>Date:</h2>
                            <p>{entry[notificationsDateKey]}</p>
                        </div>
                    </div>
                </div>

            ))}

        </div>
    );
}
  
export default Notifications;