import type { useTooltip } from "../../hooks/use-tooltip.ts";
import * as React from "react";

type TooltipContextType = ReturnType<typeof useTooltip>;

const TooltipContext = React.createContext<TooltipContextType | null>(null);

type TooltipProviderProps = React.PropsWithChildren<{
  value: TooltipContextType;
}>;

export const TooltipProvider = ({ children, value }: TooltipProviderProps) => {
  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

TooltipProvider.useContext = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error(
      "TooltipProvider.useContext must be used within a TooltipProvider",
    );
  }
  return context;
};
