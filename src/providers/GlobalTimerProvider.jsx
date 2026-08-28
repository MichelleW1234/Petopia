import { createContext, useContext, useState, useEffect } from "react";

export const globalTimer_Context = createContext();

export function GlobalTimerProvider ({ children }) {

    const [GlobalTimer, setGlobalTimer] = useState(Date.now());

    useEffect(() => {

        const globalTimer_Interval = setInterval(() => {
            setGlobalTimer(Date.now());
        }, 1000);

        return () => clearInterval(globalTimer_Interval);

    }, []);

    return (
        <globalTimer_Context.Provider value={{ GlobalTimer }}>
            {children}
        </globalTimer_Context.Provider>
    );

};

export function useGlobalTimer() {
  return useContext(globalTimer_Context);
}
