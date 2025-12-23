export const resetActivePet = (setActivePetNumber) => {

    setActivePetNumber(-1);

}


export const petPositionChange = (petCurrentSpace, setPetCurrentSpace, petDirectionRef) => {

    if (petCurrentSpace === 0){

        setPetCurrentSpace(1);
        petDirectionRef.current = 1;

    } else if (petCurrentSpace === 7){

        setPetCurrentSpace(6);
        petDirectionRef.current = 0;

    } else if (petDirectionRef.current === 0){

        setPetCurrentSpace(prev => prev-1);

    } else if (petDirectionRef.current === 1){

        setPetCurrentSpace(prev => prev+1);
        
    }

}