import * as React from "react";
import { useTooltip, type UseTooltipArgs } from "../../hooks/use-tooltip.ts";
import { TooltipProvider } from "./TooltipProvider.tsx";

type TooltipRootProps = React.PropsWithChildren<UseTooltipArgs>;

export const TooltipRoot = ({ children, ...options }: TooltipRootProps) => {
  return (
    <TooltipProvider value={useTooltip(options)}>{children}</TooltipProvider>
  );
};
