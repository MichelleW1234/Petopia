import { createContext, useContext, useState, useEffect } from "react";

export const GlobalTimerContext = createContext();

export function GlobalTimerProvider ({ children }) {

    const [GlobalTimer, setGlobalTimer] = useState(Date.now());

    useEffect(() => {

        const interval = setInterval(() => {
            setGlobalTimer(Date.now());
        }, 1000);

        return () => clearInterval(interval);

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
