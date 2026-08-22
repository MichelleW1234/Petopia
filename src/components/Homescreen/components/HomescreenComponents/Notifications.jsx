import { notificationsDateKey, notificationsDescriptionKey } from "../../../../constants/Constants";
import { useNotifications } from "../../../../providers/NotificationsProvider";

import "./Notifications.css";


function Notifications() {

    const {Notifications, setNotifications} = useNotifications();

    const deleteNotification = (index) => {

        setNotifications(prev => {

            const copy = prev.map(inner =>
                structuredClone(inner)
            );

            copy.splice(index, 1);

            return copy;

        });

    };
    
    return (
        <div className = "Notifications_ComponentContainer-Structure--Cards">

            {Notifications.map((entry, index) => (

                <div key = {index} className="Notifications_ComponentContainer-Structure--Card">
                    <div className = "UIStapleElements_ComponentContainer-Structure--Global UIStapleElements_ComponentContainer-Color--Global--Screen Notifications_ComponentContainer-Structure--CardContent">
                        <h2>Alert:</h2>
                        <p>{entry[notificationsDescriptionKey]}</p>
                        <h2>Date:</h2>
                        <p>{entry[notificationsDateKey]}</p>
                    </div>
                    <button className="MiscellaneousElements_ComponentButton-Template--FloatingFlagStationWindow" onClick = {() => deleteNotification(index)}> X </button>
                </div>

            ))}

        </div>
    );
}
  
export default Notifications;