import { notificationsDateKey, notificationsDescriptionKey } from "../../../constants/Constants";
import { useNotifications } from "../../../providers/NotificationsProvider";

import "./Notifications.css";


function Notifications() {

    const {Notifications, setNotifications} = useNotifications();

    const notifications_DeleteNotification = (notifications_DeleteNotification_Index) => {

        setNotifications(prev => {

            const notifications_DeleteNotification_Copy = prev.map(inner =>
                structuredClone(inner)
            );

            notifications_DeleteNotification_Copy.splice(notifications_DeleteNotification_Index, 1);

            return notifications_DeleteNotification_Copy;

        });

    };
    
    return (
        <div className = "Notifications_ComponentContainer-Structure--Cards">

            {Notifications.map((entry, notifications_DeleteNotification_Index) => (

                <div key = {notifications_DeleteNotification_Index} className="Notifications_ComponentContainer-Structure--Card">
                    <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Notifications_ComponentContainer-Structure--CardContent">
                        <h2>Alert:</h2>
                        <p>{entry[notificationsDescriptionKey]}</p>
                        <h2>Date:</h2>
                        <p>{entry[notificationsDateKey]}</p>
                    </div>
                    <button className="MiscellaneousElements_ComponentButton-Template--Screen" onClick = {() => notifications_DeleteNotification(notifications_DeleteNotification_Index)}> X </button>
                </div>

            ))}

        </div>
    );
}
  
export default Notifications;