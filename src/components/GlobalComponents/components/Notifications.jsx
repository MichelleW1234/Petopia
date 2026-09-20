import { audioScreenButtonPressKey, notificationsDateKey, notificationsDescriptionKey } from "../../../constants/Constants";
import { helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers";
import { useNotifications } from "../../../providers/NotificationsProvider";

import "../../../App.css";
import "./Notifications.css";


function Notifications() {

    const {Notifications, setNotifications} = useNotifications();

    const notifications_EntryRemover = (notifications_EntryRemover_UserSelection) => {

        helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);

        setNotifications(prev => {

            const notifications_EntryRemover_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            notifications_EntryRemover_CurrCopy.splice(notifications_EntryRemover_UserSelection, 1);

            return notifications_EntryRemover_CurrCopy;

        });

    };
    
    return (
        <div className = "Notification_ComponentContainer-Structure--Entries">

            {Notifications.map((entry, notifications_EntryRemover_UserSelection) => (

                <div key = {notifications_EntryRemover_UserSelection} className="UIStapleElements_ComponentFrame-Structure--Global UIStapleElements_ComponentFrame-Color--Global--Screen  Notification_ComponentContainer-Structure--Entry">
                    <button className="UIStapleElements_ComponentButtonRectangle-Structure--Global UIStapleElements_ComponentButtonRectangle-Color--Global--Screen" onClick = {() => notifications_EntryRemover(notifications_EntryRemover_UserSelection)}> 
                        X  
                    </button>
                    <div className = "Notification_ComponentContainer-Structure--EntryContent">
                        <div className="Notification_ComponentContainer-Structure--EntryContentField">
                            <h2>Alert:</h2>
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