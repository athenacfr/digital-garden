import type { TextBounceProps } from "@/components/TextBounce/types";
import { cx } from "class-variance-authority";
import { motion } from "motion/react";
import { useState } from "react";

export function TextBounce({ children = "", ...props }: TextBounceProps) {
  const chars = children.split("");

  const [animation, setAnimation] = useState<"initial" | "bouncing">("initial");

  return (
    <motion.span
      onViewportEnter={() => setAnimation("bouncing")}
      onHoverStart={() => setAnimation("bouncing")}
      {...props}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className={cx("inline-block", char === " " && "w-2")}
          animate={animation}
          onAnimationComplete={() =>
            index === chars.length - 1 && setAnimation("initial")
          }
          variants={{
            initial: {
              y: 0,
            },
            bouncing: {
              y: [0, -12, 0],
              transition: {
                duration: 0.3,
                delay: index * 0.03,
                ease: "easeInOut",
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
