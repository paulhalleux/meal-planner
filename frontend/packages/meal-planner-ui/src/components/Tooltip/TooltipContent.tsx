import * as React from "react";
import { TooltipProvider } from "./TooltipProvider.tsx";
import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import styles from "./Tooltip.module.css";

type TooltipContentProps = React.HTMLProps<HTMLElement> & {
  ref?: React.Ref<HTMLElement>;
};
export const TooltipContent: React.FC<TooltipContentProps> = ({
  style,
  ref: propRef,
  ...props
}) => {
  const context = TooltipProvider.useContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        className={styles.tooltip}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
      />
    </FloatingPortal>
  );
};
