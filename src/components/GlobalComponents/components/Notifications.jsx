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
        <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalDialogBoxes">

            {Notifications.map((entry, notifications_EntryRemover_UserSelection) => (

                <div key = {notifications_EntryRemover_UserSelection} className="UIStapleElements_ComponentFrameColored-Structure--Global UIStapleElements_ComponentFrameTransparent-Color--Global--Screen  MiscellaneousElements_ComponentContainer-Structure--GlobalDialogBox">
                    <button className="UIStapleElements_ComponentButtonRectangle-Structure--Global UIStapleElements_ComponentButtonRectangle-Color--Global--Screen" onClick = {() => notifications_EntryRemover(notifications_EntryRemover_UserSelection)}> 
                        X  
                    </button>
                    <div className = "MiscellaneousElements_ComponentContainer-Structure--GlobalDialogBoxContent">
                        <div className="WrittenContentField">
                            <h2>Alert:</h2>
                            <p>{entry[notificationsDescriptionKey]}</p>
                            </div>
                            <div className="WrittenContentField">
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