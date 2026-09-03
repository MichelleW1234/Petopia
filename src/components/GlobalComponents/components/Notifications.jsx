import { notificationsDateKey, notificationsDescriptionKey } from "../../../constants/Constants";
import { useNotifications } from "../../../providers/NotificationsProvider";

import "./Notifications.css";


function Notifications() {

    const {Notifications, setNotifications} = useNotifications();

    const notifications_EntryRemover = (notifications_EntryRemover_UserSelection) => {

        setNotifications(prev => {

            const notifications_EntryRemover_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

            notifications_EntryRemover_CurrCopy.splice(notifications_EntryRemover_UserSelection, 1);

            return notifications_EntryRemover_CurrCopy;

        });

    };
    
    return (
        <div className = "Notifications_ComponentContainer-Structure--Cards">

            {Notifications.map((entry, notifications_EntryRemover_UserSelection) => (

                <div key = {notifications_EntryRemover_UserSelection} className="Notifications_ComponentContainer-Structure--Card">
                    <div className = "UIStapleElements_ComponentContainerColored-Structure--Global UIStapleElements_ComponentContainerColored-Color--Global--Screen Notifications_ComponentContainer-Structure--CardContent">
                        <h2>Alert:</h2>
                        <p>{entry[notificationsDescriptionKey]}</p>
                        <h2>Date:</h2>
                        <p>{entry[notificationsDateKey]}</p>
                    </div>
                    <button className="UIStapleElements_ComponentButtonBox-Template--Global" onClick = {() => notifications_EntryRemover(notifications_EntryRemover_UserSelection)}> X </button>
                </div>

            ))}

        </div>
    );
}
  
export default Notifications;