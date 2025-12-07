import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useDelayGroup,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import * as React from "react";

export type UseTooltipArgs = {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const useTooltip = ({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: UseTooltipArgs = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;
  const { delay } = useDelayGroup(context);

  const focus = useFocus(context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
    delay,
  });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return {
    open,
    setOpen,
    ...interactions,
    ...data,
  };
};
