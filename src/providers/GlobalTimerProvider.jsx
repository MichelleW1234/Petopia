import { createContext, useContext, useState, useEffect } from "react";

export const GlobalTimerContext = createContext();

export function GlobalTimerProvider ({ children }) {

    const [GlobalTimer, setGlobalTimer] = useState(Date.now());

    useEffect(() => {

        const globalTimerInterval = setInterval(() => {
            setGlobalTimer(Date.now());
        }, 1000);

        return () => clearInterval(globalTimerInterval);

    }, []);

    return (
        <GlobalTimerContext.Provider value={{ GlobalTimer }}>
            {children}
        </GlobalTimerContext.Provider>
    );

};

export function useGlobalTimer() {
  return useContext(GlobalTimerContext);
}
