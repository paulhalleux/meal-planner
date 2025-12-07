import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarProvider } from "./SidebarProvider.tsx";
import { useResizeHandle } from "../../hooks/use-resize-handle.ts";

type SidebarResizerProps = React.ComponentProps<"div">;

export const SidebarResizer: React.FC<SidebarResizerProps> = ({
  className,
  ...rest
}) => {
  const {
    resizing,
    width: currentSize,
    setWidth,
    setResizing,
    setCollapsed,
    collapsed,
    collapsedWidth,
    minWidth,
    maxWidth,
    collapseThreshold,
  } = SidebarProvider.useContext();

  const { elementRef } = useResizeHandle<HTMLDivElement>({
    currentSize,
    collapsed,
    collapsedWidth,
    minSize: minWidth,
    maxSize: maxWidth,
    collapseThreshold,
    onResizeEnd: () => setResizing(false),
    onResize: (newWidth: number) => setWidth(newWidth),
    onResizeStart: () => setResizing(true),
    onCollapse: setCollapsed,
  });

  return (
    <div
      ref={elementRef}
      tabIndex={0}
      className={clsx(
        styles.sidebar__resizer,
        {
          [styles.resizing]: resizing,
        },
        className,
      )}
      {...rest}
    />
  );
};
