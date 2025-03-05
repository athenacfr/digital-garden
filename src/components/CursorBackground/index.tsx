import { useCursor, useCursorSync } from "@/stores/cursor";
import { cx } from "class-variance-authority";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef, type ComponentPropsWithoutRef } from "react";

export function CursorBackground({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursor = useCursor();
  const yLabel = useTransform(() => cursor.y.get() + "px");
  const xLabel = useTransform(() => cursor.x.get() + "px");

  useCursorSync(containerRef);

  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return;

  return (
    <div
      ref={containerRef}
      className={"relative overflow-hidden border-neutral-800 border"}
    >
      <div className="pointer-events-none z-0 select-none">
        <motion.div
          className="absolute border-neutral-800 border-t p-1 text-neutral-800"
          style={{
            width: cursor.x,
            left: 0,
            top: cursor.y,
            opacity: cursor.isVisible ? 1 : 0,
          }}
        >
          {yLabel}
        </motion.div>
        <motion.div
          className="absolute border-neutral-800 border-l p-1 text-neutral-800"
          style={{
            height: cursor.y,
            left: cursor.x,
            top: 0,
            opacity: cursor.isVisible ? 1 : 0,
          }}
        >
          {xLabel}
        </motion.div>
      </div>
      <div className={cx("z-1 isolate", className)} {...props}>
        {children}
      </div>
    </div>
  );
}
