import type { ComponentPropsWithoutRef } from "react";

export interface TextRainbowProps extends ComponentPropsWithoutRef<"span"> {
  children?: string;
}
