/*
  For each achievement:
    - description
    - date created
*/

import { createContext, useContext, useState, useEffect } from "react";

import { usePetList } from "./PetListProvider.jsx";

import { achievementDescriptionKey, achievementStatusKey, petSpeciesFishKey, petSpeciesKey, petStageKey } from "../constants/Constants";

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {

  const [Notifications, setNotifications] = useState(() => {
    try {
      const notificationsStored = JSON.parse(localStorage.getItem("Notifications"));
      return notificationsStored ? notificationsStored : [];
    } catch {
      return  [];
    }
  });


  useEffect(() => {
    localStorage.setItem("Notifications", JSON.stringify(Notifications));
  }, [Notifications]);

  return (
    <NotificationsContext.Provider value={{ Notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
  
}

export function useNotifications() {
  return useContext(NotificationsContext);
}

