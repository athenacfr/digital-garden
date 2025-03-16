import { useMotionValue } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

export const useCursor = (ref: RefObject<HTMLElement | null>) => {
  const x = useMotionValue(-1);
  const y = useMotionValue(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const container = ref.current;

    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      x.set(e.clientX - rect.x);
      y.set(e.clientY - rect.y);
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    container.addEventListener("mousemove", handleMouseMove, {
      signal: controller.signal,
    });
    container.addEventListener("mouseleave", handleMouseLeave, {
      signal: controller.signal,
    });

    return () => controller.abort();
  });

  return { x, y, visible };
};
