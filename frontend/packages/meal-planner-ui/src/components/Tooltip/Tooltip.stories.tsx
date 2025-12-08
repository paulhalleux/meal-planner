import * as React from "react";
import preview from "../../../.storybook/preview";

import { Tooltip } from "./index";
import { Button } from "../Button";

const meta = preview.meta({
  title: "Components/Tooltip",
  component: Tooltip.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placement: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
  },
  args: {},
  decorators: [
    (story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: 20,
        }}
      >
        {story()}
      </div>
    ),
  ],
});

export const Default = meta.story({
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Tooltip content</Tooltip.Content>
    </Tooltip.Root>
  ),
});

export const Placements = meta.story({
  render: () => (
    <>
      <Tooltip.Root placement="top">
        <Tooltip.Trigger asChild>
          <Button>Top</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Top tooltip</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root placement="right">
        <Tooltip.Trigger asChild>
          <Button>Right</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Right tooltip</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root placement="bottom">
        <Tooltip.Trigger asChild>
          <Button>Bottom</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Bottom tooltip</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root placement="left">
        <Tooltip.Trigger asChild>
          <Button>Left</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Left tooltip</Tooltip.Content>
      </Tooltip.Root>
    </>
  ),
});

export const Grouped = meta.story({
  render: () => (
    <Tooltip.Group delay={500}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button>One</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>First</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button>Two</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Second</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button>Three</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Third</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Group>
  ),
});

const ControlledExample = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip.Root open={open} onOpenChange={(v) => setOpen(v)}>
      <Tooltip.Trigger asChild>
        <Button onClick={() => setOpen((s) => !s)}>
          {open ? "Hide" : "Show"}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Controlled tooltip</Tooltip.Content>
    </Tooltip.Root>
  );
};

export const Controlled = meta.story({
  render: () => <ControlledExample />,
});
