import type { TextBounceProps } from "@/components/TextBounce/types";
import { useTimeouts } from "@/hooks/useTimeouts";
import { cx } from "class-variance-authority";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const BOUNCE_PROPAGATION_DELAY_IN_MS = 50;

export function TextBounce({ children = "", ...props }: TextBounceProps) {
  const chars = children.split("");
  const timeouts = useTimeouts();
  const [animatedChars, setAnimatedChars] = useState<boolean[]>(
    new Array(chars.length).fill(false)
  );

  useEffect(() => {
    return () => timeouts.clear();
  }, []);

  const handleCharHover = (index: number) => {
    timeouts.clear();

    animatedChars.forEach((isAnimating, i) => {
      if (isAnimating) return;

      const distance = Math.abs(i - index);

      timeouts.add(
        setTimeout(() => {
          setAnimatedChars((prev) => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, distance * BOUNCE_PROPAGATION_DELAY_IN_MS)
      );
    });
  };

  const handleAnimationComplete = (index: number) => {
    setAnimatedChars((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <span {...props}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className={cx("inline-block", char === " " && "w-2")}
          onHoverStart={() => handleCharHover(index)}
          onAnimationComplete={() => handleAnimationComplete(index)}
          animate={{
            y: animatedChars[index] ? [0, -8, 0] : 0,
          }}
          transition={{
            duration: 0.2,
            stiffness: 200,
            times: [0, 0.5, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
