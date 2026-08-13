/*
  The amount of money that you currently have
*/

import { createContext, useContext, useState, useEffect } from "react";

const BalanceContext = createContext();

export function BalanceProvider({ children }) {

  const [Balance, setBalance] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Balance"));
      return stored ? stored : 30;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem("Balance", JSON.stringify(Balance));
  }, [Balance]);

  return (
    <BalanceContext.Provider value={{ Balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
  
}

export function useBalance() {
  return useContext(BalanceContext);
}

