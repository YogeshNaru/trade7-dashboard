import { createContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

// 1. Create Context
const GeneralContext = createContext();

// 2. Provider Component
export const GeneralContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uid, setUid] = useState(null);

  // Open window
  const openBuyWindow = (stockId) => {
    setIsOpen(true);
    setUid(stockId);
  };

  // Close window
  const closeBuyWindow = () => {
    setIsOpen(false);
    setUid(null);
  };

  return (
    <GeneralContext.Provider value={{ openBuyWindow, closeBuyWindow }}>
      {children}

      {/* Show popup when open */}
      {isOpen && <BuyActionWindow uid={uid} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
