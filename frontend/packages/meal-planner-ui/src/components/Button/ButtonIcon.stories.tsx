import preview from "../../../.storybook/preview";

import { Button } from "./index";

const defaultMeta = preview.meta({
  title: "Components/Button",
  component: Button.Icon,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "ghost"],
    },
  },
  args: {
    icon: "plus",
  },
});

export const Icon = defaultMeta.story({
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "plus",
  },
});
