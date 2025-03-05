import type { ComponentPropsWithoutRef } from "react";

export interface TextBounceProps extends ComponentPropsWithoutRef<"span"> {
  children?: string;
}
