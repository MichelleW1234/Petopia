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

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {

  const [Achievements, setAchievements] = useState(() => {
    try {
      const achievementsStored = JSON.parse(localStorage.getItem("Achievements"));
      return achievementsStored ? achievementsStored : [
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

    const achievementsAdultFish = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesFishKey && Achievements[0][achievementStatusKey] === false);
    const achievementsAdultCat = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesCatKey && Achievements[1][achievementStatusKey] === false);
    const achievementsAdultDog = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesDogKey && Achievements[2][achievementStatusKey] === false);

    const achievementsAllAdults = Achievements[0][achievementStatusKey] === true && Achievements[1][achievementStatusKey] === true && achievementsAdultDog ||
                      achievementsAdultFish && Achievements[1][achievementStatusKey] === true && Achievements[2][achievementStatusKey] === true || 
                      Achievements[0][achievementStatusKey] === true && achievementsAdultCat && Achievements[2][achievementStatusKey] === true;

    setAchievements(prev => {

      const achievementsCopy = prev.map(inner =>
                  structuredClone(inner)
              );

      if (achievementsAdultFish) {
        achievementsCopy[0][achievementStatusKey] = true;
      }

      if (achievementsAdultCat) {
        achievementsCopy[1][achievementStatusKey] = true;
      }

      if (achievementsAdultDog) {
        achievementsCopy[2][achievementStatusKey] = true;
      }

      if (achievementsAllAdults) {
        achievementsCopy[3][achievementStatusKey] = true;
      }

      return achievementsCopy;
      
    });

    setNotifications(prev => {

      const achievementsCopy = prev.map(inner =>
                structuredClone(inner)
            );

      const achievementsDate = new Date(GlobalTimer).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

      if (achievementsAdultFish) {
        achievementsCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievementsDate});
      }

      if (achievementsAdultCat) {
        achievementsCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievementsDate});
      }

      if (achievementsAdultDog) {
        achievementsCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievementsDate});
      }

      if (achievementsAllAdults) {
        achievementsCopy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: achievementsDate});
      }

      return achievementsCopy;

    });

  }, [PetList]);


  useEffect(() => {
    localStorage.setItem("Achievements", JSON.stringify(Achievements));
  }, [Achievements]);

  return (
    <AchievementsContext.Provider value={{ Achievements, setAchievements }}>
      {children}
    </AchievementsContext.Provider>
  );
  
}

export function useAchievements() {
  return useContext(AchievementsContext);
}

