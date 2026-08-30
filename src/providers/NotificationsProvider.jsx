/*
  For each achievement:
    - description
    - date created
*/

import { createContext, useContext, useState, useEffect } from "react";

import { usePetList } from "./PetListProvider.jsx";

import { achievementDescriptionKey, achievementStatusKey, petSpeciesFishKey, petSpeciesKey, petStageKey } from "../constants/Constants";

const notifications_Context = createContext();

export function NotificationsProvider({ children }) {

  const [Notifications, setNotifications] = useState(() => {
    try {
      const bound_Sequence_NotificationsStored = JSON.parse(localStorage.getItem("Notifications"));
      return bound_Sequence_NotificationsStored ? bound_Sequence_NotificationsStored : [];
    } catch {
      return  [];
    }
  });


  useEffect(() => {
    localStorage.setItem("Notifications", JSON.stringify(Notifications));
  }, [Notifications]);

  return (
    <notifications_Context.Provider value={{ Notifications, setNotifications }}>
      {children}
    </notifications_Context.Provider>
  );
  
}

export function useNotifications() {
  return useContext(notifications_Context);
}

