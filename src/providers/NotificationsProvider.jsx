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
      const notifications_CurrValue = JSON.parse(localStorage.getItem("Notifications"));
      return notifications_CurrValue ? notifications_CurrValue : [];
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

