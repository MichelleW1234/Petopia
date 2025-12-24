import { useEffect, useRef } from "react";
import { usePetList } from "./PetListProvider";
import { useLastChecked } from "./LastCheckedProvider";

export function PetEngineProvider({ children }) {

    const {LastChecked, setLastChecked} = useLastChecked();
    const {PetList, setPetList} = usePetList();

    const millisInOneHour = 3600000; 

    useEffect(() => {

        const runCheck = () => {

            const now = Date.now();

            setPetList(prevPetList => {

                const petListCopy = prevPetList.map(pet =>
                    pet.map(group =>
                        [...group]
                    )
                );

                for (let i = 0; i < prevPetList.length; i++){

                    if (prevPetList[i].length > 0){

                        const healthChange = damageCheck(prevPetList[i], now);
                        petListCopy[i][1][1] = Math.max(petListCopy[i][1][1] - healthChange, 0);

                        console.log(healthChange);

                    }

                }

                return petListCopy;

            });

            setLastChecked(now);

        };

        runCheck();

        const interval = setInterval(runCheck, millisInOneHour);

        return () => clearInterval(interval);

    }, []);



    const damageCheck = (pet, now) => {

        let underFed;
        let underCleaned;
        let underWorked;

        if (pet[0][0] === "dog"){

            underFed = 46800000;
            underCleaned = 90000000;
            underWorked = 46800000;

        } else if (pet[0][0] === "cat"){

            underFed = 46800000;
            underCleaned = 0;
            underWorked = 46800000;

        } else if (pet[0][0] === "fish"){

            underFed = 46800000;
            underCleaned = 90000000;
            underWorked = 0;

        }
    
        
        let healthAffected = 0;

        for (let i=0; i<3; i++){

            if (pet[2][i] !== "X"){

                let subtrahend = LastChecked; 

                if (i === 0){
                // Hunger damage

                    if (LastChecked < pet[2][0]){
                        subtrahend = pet[2][0];
                    }

                    if (now - subtrahend > underFed){
                        const intervalsPassed = Math.floor((now - subtrahend) / subtrahend);
                        healthAffected += 4*intervalsPassed;
                    }

                } else if (i === 1){
                // Wash damage

                    if (LastChecked < pet[2][1]){
                        subtrahend = pet[2][1];
                    }

                    if (now - subtrahend > underCleaned){
                        const intervalsPassed = Math.floor((now - subtrahend) / subtrahend);
                        healthAffected += 1*intervalsPassed;
                    }

                } else if (i === 2){
                // Play damage

                    if (LastChecked < pet[2][2]){
                        subtrahend = pet[2][2];
                    }

                    if (now - subtrahend > underWorked){
                        const intervalsPassed = Math.floor((now - subtrahend) / subtrahend);
                        healthAffected += 1*intervalsPassed;
                    }

                }

            }

        }
        
        return healthAffected;

    }

    return children;

}