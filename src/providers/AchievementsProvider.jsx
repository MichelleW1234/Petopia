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
      const achievements_Stored = JSON.parse(localStorage.getItem("Achievements"));
      return achievements_Stored ? achievements_Stored : [
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

    const achievements_AdultFish = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesFishKey && Achievements[0][achievementStatusKey] === false);
    const achievements_AdultCat = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesCatKey && Achievements[1][achievementStatusKey] === false);
    const achievements_AdultDog = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesDogKey && Achievements[2][achievementStatusKey] === false);

    const achievements_AllAdults = Achievements[0][achievementStatusKey] === true && Achievements[1][achievementStatusKey] === true && achievements_AdultDog ||
                      achievements_AdultFish && Achievements[1][achievementStatusKey] === true && Achievements[2][achievementStatusKey] === true || 
                      Achievements[0][achievementStatusKey] === true && achievements_AdultCat && Achievements[2][achievementStatusKey] === true;

    setAchievements(prev => {

      const achievements_Copy = prev.map(inner =>
                  structuredClone(inner)
              );

      if (achievements_AdultFish) {
        achievements_Copy[0][achievementStatusKey] = true;
      }

      if (achievements_AdultCat) {
        achievements_Copy[1][achievementStatusKey] = true;
      }

      if (achievements_AdultDog) {
        achievements_Copy[2][achievementStatusKey] = true;
      }

      if (achievements_AllAdults) {
        achievements_Copy[3][achievementStatusKey] = true;
      }

      return achievements_Copy;
      
    });

    setNotifications(prev => {

      const achievements_Copy = prev.map(inner =>
                structuredClone(inner)
            );

      const achievements_Date = new Date(GlobalTimer).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

      if (achievements_AdultFish) {
        achievements_Copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_Date});
      }

      if (achievements_AdultCat) {
        achievements_Copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_Date});
      }

      if (achievements_AdultDog) {
        achievements_Copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_Date});
      }

      if (achievements_AllAdults) {
        achievements_Copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_Date});
      }

      return achievements_Copy;

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

