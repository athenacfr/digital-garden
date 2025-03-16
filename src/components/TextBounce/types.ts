import type { ComponentPropsWithoutRef } from "react";
import { motion } from "motion/react";

export interface TextBounceProps
  extends ComponentPropsWithoutRef<typeof motion.span> {
  children?: string;
}
