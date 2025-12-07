/* eslint-disable react-hooks/refs */
import * as React from "react";
import { TooltipProvider } from "./TooltipProvider.tsx";
import { useMergeRefs } from "@floating-ui/react";

type TooltipTriggerProps = React.HTMLProps<HTMLElement> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLElement>;
};

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  children,
  asChild = false,
  ref: propRef,
  ...props
}) => {
  const context = TooltipProvider.useContext();
  const childrenRef = (children as { ref?: React.Ref<HTMLElement> }).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(typeof children.props === "object" ? children.props : {}),
      }),
    );
  }

  return (
    <button ref={ref} {...context.getReferenceProps(props)}>
      {children}
    </button>
  );
};
