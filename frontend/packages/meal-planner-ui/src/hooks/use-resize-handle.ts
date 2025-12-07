import * as React from "react";

type UseResizeHandleArgs = {
  minSize?: number;
  maxSize?: number;
  collapseThreshold?: number;
  currentSize?: number;
  collapsed?: boolean;
  collapsedWidth?: number;
  onCollapse?: (collapsed: boolean) => void;
  onResizeStart?: () => void;
  onResize?: (delta: number) => void;
  onResizeEnd?: () => void;
};

type ResizeState = {
  startX: number;
  startSize: number;
};

export const useResizeHandle = <El extends HTMLElement>({
  minSize = 0,
  maxSize = Number.POSITIVE_INFINITY,
  collapseThreshold = 20,
  currentSize = 0,
  collapsed,
  collapsedWidth = 60,
  onResizeStart,
  onResize,
  onResizeEnd,
  onCollapse,
}: UseResizeHandleArgs) => {
  const elementRef = React.useRef<El | null>(null);
  const resizeState = React.useRef<ResizeState | null>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const clamp = (v: number) => Math.max(minSize, Math.min(maxSize, v));
    const controller = new AbortController();

    const handleMouseDown = (event: MouseEvent) => {
      resizeState.current = {
        startX: event.clientX,
        startSize: clamp(collapsed ? collapsedWidth : currentSize),
      };
      onResizeStart?.();
      event.preventDefault();
    };

    const handleNewSize = (newSize: number) => {
      const clamped = clamp(newSize);
      if (collapsed && clamped > collapsedWidth + collapseThreshold) {
        onCollapse?.(false);
        onResize?.(clamped);
      } else if (!collapsed && clamped <= collapsedWidth + collapseThreshold) {
        onCollapse?.(true);
        onResize?.(clamped);
      } else {
        onResize?.(clamped);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!resizeState.current) return;

      const deltaX = event.clientX - resizeState.current.startX;
      const newSize = resizeState.current.startSize + deltaX;

      handleNewSize(newSize);

      event.preventDefault();
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!resizeState.current) return;
      resizeState.current = null;
      onResizeEnd?.();
      event.preventDefault();
    };

    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (!resizeState.current) return;
      if (event.key === "Escape") {
        onResize?.(clamp(resizeState.current.startSize ?? 0));
        resizeState.current = null;
        onResizeEnd?.();
        event.preventDefault();
      }
    };

    const handleElementKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleNewSize(currentSize - 10);
        event.preventDefault();
      } else if (event.key === "ArrowRight") {
        if (collapsed) {
          handleNewSize(collapsedWidth + collapseThreshold + 1);
        } else {
          handleNewSize(currentSize + 10);
        }
        event.preventDefault();
      }
    };

    element.addEventListener("keydown", handleElementKeyDown, {
      signal: controller.signal,
    });
    window.addEventListener("keydown", handleWindowKeyDown, {
      signal: controller.signal,
    });
    element.addEventListener("mousedown", handleMouseDown, {
      signal: controller.signal,
    });
    window.addEventListener("mousemove", handleMouseMove, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", handleMouseUp, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [
    minSize,
    maxSize,
    collapseThreshold,
    collapsed,
    collapsedWidth,
    currentSize,
    onCollapse,
    onResize,
    onResizeEnd,
    onResizeStart,
  ]);

  return {
    elementRef,
  };
};
