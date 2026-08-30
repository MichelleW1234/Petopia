/*
  For each achievement:
    - description
    - status
*/

import { createContext, useContext, useState, useEffect } from "react";

import { usePetList } from "./PetListProvider.jsx";
import { useNotifications } from "./NotificationsProvider.jsx";
import {useGlobalTimer} from "./GlobalTimerProvider.jsx";

import { notificationsDescriptionKey, notificationsDateKey, achievementDescriptionKey, achievementStatusKey, petSpeciesFishKey, petSpeciesKey, petStageKey, petSpeciesCatKey, petSpeciesDogKey } from "../constants/Constants";

const achievements_Context = createContext();

export function AchievementsProvider({ children }) {

  const [Achievements, setAchievements] = useState(() => {
    try {
      const bound_Sequence_achievementsStored = JSON.parse(localStorage.getItem("Achievements"));
      return bound_Sequence_achievementsStored ? bound_Sequence_achievementsStored : [
                                  {[achievementDescriptionKey]: "Evolve a fish to its final stage", [achievementStatusKey]: false},
                                  {[achievementDescriptionKey]: "Evolve a cat to its final stage", [achievementStatusKey]: false},
                                  {[achievementDescriptionKey]: "Evolve a dog to its final stage", [achievementStatusKey]: false},
                                  {[achievementDescriptionKey]: "Evolve all three pet species to their final stages", [achievementStatusKey]: false}
                                ];
    } catch {
      return  [
                {[achievementDescriptionKey]: "Evolve a fish to its final stage", [achievementStatusKey]: false},
                {[achievementDescriptionKey]: "Evolve a cat to its final stage", [achievementStatusKey]: false},
                {[achievementDescriptionKey]: "Evolve a dog to its final stage", [achievementStatusKey]: false},
                {[achievementDescriptionKey]: "Evolve all three pet species to their final stages", [achievementStatusKey]: false}
              ];
    }
  });

  const {PetList, setPetList} = usePetList();
  const {Notifications, setNotifications} = useNotifications();
  const {GlobalTimer} = useGlobalTimer();


  useEffect(() => {

    const bound_Boolean_FishFullyEvolved = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesFishKey && Achievements[0][achievementStatusKey] === false);
    const bound_Boolean_CatFullyEvolved = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesCatKey && Achievements[1][achievementStatusKey] === false);
    const bound_Boolean_DogFullyEvolved = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesDogKey && Achievements[2][achievementStatusKey] === false);

    const bound_Boolean_AllPetsFullyEvolved = Achievements[0][achievementStatusKey] === true && Achievements[1][achievementStatusKey] === true && bound_Boolean_DogFullyEvolved ||
                      bound_Boolean_FishFullyEvolved && Achievements[1][achievementStatusKey] === true && Achievements[2][achievementStatusKey] === true || 
                      Achievements[0][achievementStatusKey] === true && bound_Boolean_CatFullyEvolved && Achievements[2][achievementStatusKey] === true;

    setAchievements(prev => {

      const bound_Copy_Notifications = prev.map(inner =>
                  structuredClone(inner)
              );

      if (bound_Boolean_FishFullyEvolved) {
        bound_Copy_Notifications[0][achievementStatusKey] = true;
      }

      if (bound_Boolean_CatFullyEvolved) {
        bound_Copy_Notifications[1][achievementStatusKey] = true;
      }

      if (bound_Boolean_DogFullyEvolved) {
        bound_Copy_Notifications[2][achievementStatusKey] = true;
      }

      if (bound_Boolean_AllPetsFullyEvolved) {
        bound_Copy_Notifications[3][achievementStatusKey] = true;
      }

      return bound_Copy_Notifications;
      
    });

    setNotifications(prev => {

      const bound_Copy_Notifications = prev.map(inner =>
                structuredClone(inner)
            );

      const bound_String_GlobalTimer = new Date(GlobalTimer).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

      if (bound_Boolean_FishFullyEvolved) {
        bound_Copy_Notifications.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: bound_String_GlobalTimer});
      }

      if (bound_Boolean_CatFullyEvolved) {
        bound_Copy_Notifications.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: bound_String_GlobalTimer});
      }

      if (bound_Boolean_DogFullyEvolved) {
        bound_Copy_Notifications.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: bound_String_GlobalTimer});
      }

      if (bound_Boolean_AllPetsFullyEvolved) {
        bound_Copy_Notifications.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: bound_String_GlobalTimer});
      }

      return bound_Copy_Notifications;

    });

  }, [PetList]);


  useEffect(() => {
    localStorage.setItem("Achievements", JSON.stringify(Achievements));
  }, [Achievements]);

  return (
    <achievements_Context.Provider value={{ Achievements, setAchievements }}>
      {children}
    </achievements_Context.Provider>
  );
  
}

export function useAchievements() {
  return useContext(achievements_Context);
}

