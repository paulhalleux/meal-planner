import * as React from "react";

type SidebarGroupContextType = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

const SidebarGroupContext = React.createContext<SidebarGroupContextType | null>(
  null,
);

type SidebarGroupProviderProps = React.PropsWithChildren;

export const SidebarGroupProvider = ({
  children,
}: SidebarGroupProviderProps) => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <SidebarGroupContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarGroupContext.Provider>
  );
};

SidebarGroupProvider.useContext = () => {
  const context = React.useContext(SidebarGroupContext);
  if (!context) {
    throw new Error(
      "SidebarGroupProvider.use must be used within a SidebarGroupProvider",
    );
  }
  return context;
};
