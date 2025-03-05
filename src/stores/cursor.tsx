import { motionValue, type MotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CursorState {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isVisible: boolean;
}

export const useCursor = create<CursorState>()(
  immer((set) => ({
    x: motionValue(-1),
    y: motionValue(-1),
    isVisible: false,
  }))
);

export const useCursorSync = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const controller = new AbortController();
    const container = ref.current;

    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      useCursor.setState((draft) => {
        draft.x.set(e.clientX - rect.x);
        draft.y.set(e.clientY - rect.y);
        draft.isVisible = true;
      });
    };

    const handleMouseLeave = () => {
      useCursor.setState({ isVisible: false });
    };

    container.addEventListener("mousemove", handleMouseMove, {
      signal: controller.signal,
    });
    container.addEventListener("mouseleave", handleMouseLeave, {
      signal: controller.signal,
    });

    return () => controller.abort();
  });
};
