import * as React from "react";

export type SidebarContextType = {
  collapsed: boolean;
  collapsedWidth: number;
  collapseThreshold?: number;
  width: number;
  minWidth?: number;
  maxWidth?: number;
  setCollapsed: (value: boolean) => void;
  setWidth: (width: number) => void;
  resizing: boolean;
  setResizing: (resizing: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextType>({
  collapsed: false,
  collapsedWidth: 40,
  setCollapsed: () => {},
  width: 250,
  setWidth: () => {},
  resizing: false,
  setResizing: () => {},
});

type SidebarProviderProps = React.PropsWithChildren<{
  collapsedWidth: number;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  initialWidth?: number;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  collapseThreshold?: number;
  onCollapseToggle?: (collapsed: boolean) => void;
  onWidthChange?: (width: number) => void;
}>;

export const SidebarProvider = ({
  children,
  initialWidth,
  defaultCollapsed,
  collapsedWidth,
  minWidth,
  maxWidth,
  collapseThreshold,
  ...ctrl
}: SidebarProviderProps) => {
  const [resizing, setResizing] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed ?? false);
  const [width, setWidth] = React.useState(initialWidth ?? 275);

  const value: SidebarContextType = {
    collapsed: ctrl.collapsed ?? collapsed,
    setCollapsed:
      ctrl.onCollapseToggle ??
      (() => {
        setCollapsed((prev) => !prev);
      }),
    width: ctrl.width ?? width,
    setWidth: ctrl.onWidthChange ?? setWidth,
    resizing,
    setResizing,
    collapsedWidth,
    minWidth,
    maxWidth,
    collapseThreshold,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

SidebarProvider.Consumer = SidebarContext.Consumer;
SidebarProvider.useContext = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "SidebarProvider.use must be used within a SidebarProvider",
    );
  }
  return context;
};
