import type { TextZoomProps } from "@/components/TextZoom/types";
import { cx } from "class-variance-authority";
import { motion } from "motion/react";
import { useState } from "react";

export function TextZoom({ children = "", ...props }: TextZoomProps) {
  const chars = children.split("");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <span {...props}>
      {chars.map((char, index) => {
        const proximity = hoverIndex ? Math.abs(index - hoverIndex) : Infinity;
        const limit = Math.floor(chars.length * 0.75);

        const factor =
          proximity < limit
            ? 1 + (Math.abs(proximity - limit) / limit) * 0.5
            : 1;

        return (
          <motion.span
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            animate={{
              scale: factor,
              opacity: factor - 0.25,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className={cx(
              "inline-block transition-colors duration-200",
              char === " " && "w-2"
            )}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
