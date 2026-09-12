import { createContext, useContext, useState, useEffect } from "react";


const Revivers_Context = createContext();

export function ReviversProvider({ children }) {

  const [Revivers, setRevivers] = useState(() => {
    try {
      const bound_Sequence_ReviversStored = JSON.parse(localStorage.getItem("Revivers"));
      return bound_Sequence_ReviversStored ? bound_Sequence_ReviversStored : 3;
    } catch {
      return  3;
    }
  });


  useEffect(() => {
    localStorage.setItem("Revivers", JSON.stringify(Revivers));
  }, [Revivers]);

  return (
    <Revivers_Context.Provider value={{ Revivers, setRevivers }}>
      {children}
    </Revivers_Context.Provider>
  );
  
}

export function useRevivers() {
  return useContext(Revivers_Context);
}

