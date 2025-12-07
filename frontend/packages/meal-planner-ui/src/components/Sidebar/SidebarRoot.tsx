import { SidebarProvider } from "./SidebarProvider.tsx";
import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { toCssCustomProperties } from "../../utils/css-properties.ts";
import { Tooltip } from "../Tooltip";

type SidebarRootProps = React.ComponentProps<"div"> & {
  collapsedWidth?: number;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  collapseThreshold?: number;
  initialWidth?: number;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  onCollapseToggle?: (collapsed: boolean) => void;
  onWidthChange?: (width: number) => void;
};

const DEFAULT_COLLAPSED_WIDTH = 50;

export const SidebarRoot: React.FC<SidebarRootProps> = ({
  children,
  className,
  collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
  defaultCollapsed,
  collapsed,
  collapseThreshold,
  width,
  minWidth,
  maxWidth,
  initialWidth,
  onCollapseToggle,
  onWidthChange,
  ...rest
}) => {
  return (
    <Tooltip.Group delay={200}>
      <SidebarProvider
        collapsed={collapsed}
        defaultCollapsed={defaultCollapsed}
        initialWidth={initialWidth}
        width={width}
        onCollapseToggle={onCollapseToggle}
        onWidthChange={onWidthChange}
        collapseThreshold={collapseThreshold ?? 20}
        minWidth={minWidth}
        maxWidth={maxWidth}
        collapsedWidth={collapsedWidth}
      >
        <SidebarProvider.Consumer>
          {({ collapsed, width }) => (
            <div
              className={clsx(
                styles.sidebar,
                { [styles.collapsed]: collapsed },
                className,
              )}
              style={toCssCustomProperties({
                "collapsed-width": `${collapsedWidth}px`,
                "expanded-width": `${width}px`,
              })}
              {...rest}
            >
              {children}
            </div>
          )}
        </SidebarProvider.Consumer>
      </SidebarProvider>
    </Tooltip.Group>
  );
};
