import React, { createContext, useState, ReactNode, useContext } from "react";

interface MnemonicContextType {
  mnemonic: Array<string>;
  setMnemonic: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const MnemonicContext = createContext<MnemonicContextType | undefined>(undefined);

// Create a provider component
export const MnemonicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mnemonic, setMnemonic] = useState<Array<string>>([]);

  return (
    <MnemonicContext.Provider value={{ mnemonic, setMnemonic }}>
      {children}
    </MnemonicContext.Provider>
  );
};

// Custom hook to use the MnemonicContext
export const useMnemonic = () => {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
};
