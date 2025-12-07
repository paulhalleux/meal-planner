import * as React from "react";

/**
 * Converts an object of key-value pairs into CSS custom properties.
 *
 * @param obj - An object where keys are property names and values are property values.
 * @returns An object formatted for use as React CSS properties with custom properties.
 */
export const toCssCustomProperties = (
  obj: Record<string, string | number>,
): React.CSSProperties => {
  const cssProperties: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(obj)) {
    cssProperties[`--${key}`] = value;
  }
  return cssProperties;
};
