import preview from "../../../.storybook/preview";

import { Button } from "./index";

const defaultMeta = preview.meta({
  component: Button,
  args: {
    children: "Button",
  },
});

export const Default = defaultMeta.story({
  parameters: {
    layout: "centered",
  },
});
