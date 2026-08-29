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
      const achievements_CurrValue = JSON.parse(localStorage.getItem("Achievements"));
      return achievements_CurrValue ? achievements_CurrValue : [
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

    const achievements_FishComplete = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesFishKey && Achievements[0][achievementStatusKey] === false);
    const achievements_CatComplete = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesCatKey && Achievements[1][achievementStatusKey] === false);
    const achievements_DogComplete = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesDogKey && Achievements[2][achievementStatusKey] === false);

    const achievements_AllPetsComplete = Achievements[0][achievementStatusKey] === true && Achievements[1][achievementStatusKey] === true && achievements_DogComplete ||
                      achievements_FishComplete && Achievements[1][achievementStatusKey] === true && Achievements[2][achievementStatusKey] === true || 
                      Achievements[0][achievementStatusKey] === true && achievements_CatComplete && Achievements[2][achievementStatusKey] === true;

    setAchievements(prev => {

      const achievements_CurrCopy = prev.map(inner =>
                  structuredClone(inner)
              );

      if (achievements_FishComplete) {
        achievements_CurrCopy[0][achievementStatusKey] = true;
      }

      if (achievements_CatComplete) {
        achievements_CurrCopy[1][achievementStatusKey] = true;
      }

      if (achievements_DogComplete) {
        achievements_CurrCopy[2][achievementStatusKey] = true;
      }

      if (achievements_AllPetsComplete) {
        achievements_CurrCopy[3][achievementStatusKey] = true;
      }

      return achievements_CurrCopy;
      
    });

    setNotifications(prev => {

      const achievements_CurrCopy = prev.map(inner =>
                structuredClone(inner)
            );

      const achievements_CurrDateString = new Date(GlobalTimer).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

      if (achievements_FishComplete) {
        achievements_CurrCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_CurrDateString});
      }

      if (achievements_CatComplete) {
        achievements_CurrCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_CurrDateString});
      }

      if (achievements_DogComplete) {
        achievements_CurrCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_CurrDateString});
      }

      if (achievements_AllPetsComplete) {
        achievements_CurrCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievements_CurrDateString});
      }

      return achievements_CurrCopy;

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

