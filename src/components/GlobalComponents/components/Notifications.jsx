import { notificationsDateKey, notificationsDescriptionKey } from "../../../constants/Constants";
import { useNotifications } from "../../../providers/NotificationsProvider";

import "./Notifications.css";


function Notifications() {

    const {Notifications, setNotifications} = useNotifications();

    const notificationsDeleteNotification = (notificationsDeleteNotificationIndex) => {

        setNotifications(prev => {

            const notificationsDeleteNotificationCopy = prev.map(inner =>
                structuredClone(inner)
            );

            notificationsDeleteNotificationCopy.splice(notificationsDeleteNotificationIndex, 1);

            return notificationsDeleteNotificationCopy;

        });

    };
    
    return (
        <div className = "Notifications_ComponentContainer-Structure--Cards">

            {Notifications.map((entry, notificationsDeleteNotificationIndex) => (

                <div key = {notificationsDeleteNotificationIndex} className="Notifications_ComponentContainer-Structure--Card">
                    <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Notifications_ComponentContainer-Structure--CardContent">
                        <h2>Alert:</h2>
                        <p>{entry[notificationsDescriptionKey]}</p>
                        <h2>Date:</h2>
                        <p>{entry[notificationsDateKey]}</p>
                    </div>
                    <button className="MiscellaneousElements_ComponentButton-Template--Screen" onClick = {() => notificationsDeleteNotification(notificationsDeleteNotificationIndex)}> X </button>
                </div>

            ))}

        </div>
    );
}
  
export default Notifications;