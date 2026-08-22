/*
  For each achievement:
    - description
    - status
*/

import { createContext, useContext, useState, useEffect } from "react";

import { usePetList } from "./PetListProvider.jsx";
import { useNotifications } from "./NotificationsProvider.jsx";
import {useGlobalTimer} from "./GlobalTimerProvider.jsx";

import { notificationsDescriptionKey, notificationsDateKey, achievementDescriptionKey, achievementStatusKey, petSpeciesFishKey, petSpeciesKey, petStageKey } from "../constants/Constants";

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {

  const [Achievements, setAchievements] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Achievements"));
      return stored ? stored : [
                                  {[achievementDescriptionKey]: "Evolve a fish to its final stage", [achievementStatusKey]: true},
                                  {[achievementDescriptionKey]: "Evolve a cat to its final stage", [achievementStatusKey]: true},
                                  {[achievementDescriptionKey]: "Evolve a dog to its final stage", [achievementStatusKey]: true},
                                  {[achievementDescriptionKey]: "Evolve all three pet species to their final stages", [achievementStatusKey]: true}
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

    const adultFish = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesFishKey);
    const adultCat = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesCatKey);
    const adultDog = Object.values(PetList).some(pet => pet[petStageKey] === 2 && pet[petSpeciesKey] === petSpeciesDogKey);

    const allAdults = Achievements[0][achievementStatusKey] === true && adultCat && adultDog ||
                      Achievements[1][achievementStatusKey] === true && adultFish && adultDog || 
                      Achievements[2][achievementStatusKey] === true && adultFish && adultCat;

    //CHECK!!!!!!
    setAchievements(prev => {

      const copy = prev.map(inner =>
                  structuredClone(inner)
              );

      if (adultFish) {
        copy[0][achievementDescriptionKey] = true;
      }

      if (adultCat) {
        copy[1][achievementDescriptionKey] = true;
      }

      if (adultDog) {
        copy[2][achievementDescriptionKey] = true;
      }

      if (allAdults) {
        copy[3][achievementDescriptionKey] = true;
      }

      return copy;
      
    });

    setNotifications(prev => {

      const copy = prev.map(inner =>
                structuredClone(inner)
            );

      const date = new Date(GlobalTimer).toLocaleString([], {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

      if (adultFish) {
        copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: date});
      }

      if (adultCat) {
        copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: date});
      }

      if (adultDog) {
        copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: date});
      }

      if (allAdults) {
        copy.push({[notificationsDescriptionKey]: "One or more achievement(s) unlocked!", [notificationsDateKey]: date});
      }

      return copy;

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

